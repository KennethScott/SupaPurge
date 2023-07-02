export class TriggerManager {
  constructor(entryPoint) {
    this.entryPoint = entryPoint;
  }

  createTriggerFromNow(followUpIncrementInMinutes, functionArguments) {
    const runAt = new Date(new Date().getTime() + 1000 * 60 * followUpIncrementInMinutes);
    this.createTrigger(runAt, functionArguments);
  }

  createTrigger(runAt, functionArguments) {
    const trigger = ScriptApp.newTrigger(this.entryPoint).timeBased().at(runAt).create();
    TriggerManager.setupTriggerArguments(trigger, functionArguments, false);
  }

  static setupTriggerArguments(trigger, functionArguments, recurring) {
    const triggerUid = trigger.getUniqueId();
    const triggerData = {
      RECURRING_KEY: recurring,
      ARGUMENTS_KEY: functionArguments,
    };

    PropertiesService.getScriptProperties().setProperty(triggerUid, JSON.stringify(triggerData));
  }

  handleTriggered(triggerUid) {
    const scriptProperties = PropertiesService.getScriptProperties();
    const triggerData = JSON.parse(scriptProperties.getProperty(triggerUid));

    if (!triggerData.RECURRING_KEY) {
      this.deleteTriggerByUid(triggerUid);
    }

    return triggerData.ARGUMENTS_KEY;
  }

  static deleteTriggerArguments(triggerUid) {
    PropertiesService.getScriptProperties().deleteProperty(triggerUid);
  }

  // eslint-disable-next-line class-methods-use-this
  deleteTriggerByUid(triggerUid) {
    const triggers = ScriptApp.getProjectTriggers();

    const deleted = triggers.some((trigger) => {
      if (trigger.getUniqueId() === triggerUid) {
        ScriptApp.deleteTrigger(trigger);
        return true;
      }
      return false;
    });

    if (deleted) {
      TriggerManager.deleteTriggerArguments(triggerUid);
    }
  }

  deleteTriggers() {
    const triggers = ScriptApp.getProjectTriggers();

    triggers.forEach((trigger) => {
      if (trigger.getHandlerFunction() === this.entryPoint) {
        ScriptApp.deleteTrigger(trigger);
      }
    });
  }
}
