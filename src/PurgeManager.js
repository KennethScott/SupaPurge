import dayjs from 'dayjs';
import { LabelException } from './LabelException';
import { LabelManager } from './LabelManager';
import { TriggerManager } from './TriggerManager';

/// Purges emails based on retention specified in label name.  Retention period must be specified within square brackets such as
/// "Amazon [6 months]"
/// Note that starred messages are intentionally EXCLUDED from being purged, regardless of label and/or date
/// Any errors encountered will be emailed.
/// Labels that have brackets but the retention period can't be parsed will be RENAMED to ERR-{original label name} so as to be
/// excluded from future runs..

export class PurgeManager {
  constructor() {
    this.appName = 'SupaPurge';
    this.triggerManager = new TriggerManager('process');
    this.labelManager = new LabelManager();
    this.pageSize = 100;
    this.followUpIncrementInMinutes = 10; // 10 minutes
    this.retentionPeriodErrorPrefix = 'ERR-';

    // Find labels with a retention period defined inside brackets [], but not ones that have been placed into error.
    // Example "Amazon [6 months]" but not "Amazon [ERR-6 moxnths]"
    this.labelRegex = new RegExp(`\\[(?!${this.retentionPeriodErrorPrefix})(.*?)\\]`);
  }

  static activeUserEmail() {
    return Session.getActiveUser().getEmail();
  }

  static subtractFromToday(timePhrase) {
    const today = dayjs();
    const [quantity, units] = timePhrase.split(' ');
    const computedDate = today.subtract(parseInt(quantity), units);

    // If the original date is equal to the new date, the subtraction was not successful
    if (!computedDate.isValid() || today.isSame(computedDate, 'second')) {
      return undefined;
    }

    return computedDate;
  }

  static scriptPropertyExists(id) {
    return !!PropertiesService.getScriptProperties().getProperty(id);
  }

  processPurge(event) {
    Logger.log(`processPurge started. event: ${JSON.stringify(event)}`);

    let targetLabels;
    let lastRun;

    if (event && PurgeManager.scriptPropertyExists(event.triggerUid)) {
      // continuation run
      lastRun = this.triggerManager.handleTriggered(event.triggerUid);
      targetLabels = [this.labelManager.getLabel(lastRun.labelName)];
      Logger.log(`Continuation run of label: ${lastRun.labelName}`);
    } else {
      // new run
      targetLabels = this.labelManager.getLabelsToPurge(this.labelRegex);
    }

    targetLabels.forEach((label) => {
      this.purgeLabel(label);
    });
  }

  purgeLabel(label) {
    let retentionPeriod;

    try {
      const match = this.labelRegex.exec(label.name);
      if (!match) {
        throw new LabelException(`Unable to extract retention period from label: ${label.name}`);
      }

      retentionPeriod = match[1];

      Logger.log(`Retention Period: ${retentionPeriod}`);

      if (!retentionPeriod.startsWith(this.retentionPeriodErrorPrefix)) {
        const beforeDate = PurgeManager.subtractFromToday(retentionPeriod);

        if (!beforeDate) {
          throw new LabelException(
            `Error determining retention period in label: ${label.name}. Messages for this label are not being processed.`
          );
        }

        Logger.log(`Purge before: ${beforeDate.toString()}`);

        // Define all the filters.
        const filters = [
          `label:${label.name.replace(/ /g, '-')}`,
          '-in:chats',
          `before:${beforeDate.format('YYYY-MM-DD')}`,
          '-is:starred',
        ];

        Logger.log(`Filters: ${filters.join(' ')}`);

        const threads = GmailApp.search(filters.join(' '), 0, this.pageSize);

        // Move threads/messages which meet age criteria to trash
        Logger.log(`Processing ${threads.length} threads...`);
        threads.forEach((thread) => {
          if (thread.getLastMessageDate() < beforeDate) {
            thread.moveToTrash();
          }
        });
        Logger.log('Finished processing batch');

        // Resume again in RESUME_FREQUENCY minutes if max results returned (so we can come back later and get more)
        if (threads.length === this.pageSize) {
          Logger.log('Scheduling follow up job...');
          this.triggerManager.createTriggerFromNow(this.followUpIncrementInMinutes, {
            labelName: label.name,
          });
        }
      }
    } catch (ex) {
      if (ex instanceof LabelException) {
        Logger.log(ex);
        Logger.log(`Notifying user and renaming label with error: ${label.name}`);
        GmailApp.sendEmail(PurgeManager.activeUserEmail(), this.appName, ex.toString());
        // rename the label, prepending the bad period with the ERROR prefix
        const errLabelName = label.name.replace(retentionPeriod, this.retentionPeriodErrorPrefix + retentionPeriod);
        this.labelManager.renameLabel(label.name, errLabelName);
      } else {
        Logger.log(ex);
        GmailApp.sendEmail(PurgeManager.activeUserEmail(), this.appName, ex.toString());
      }
    }
  }
}
