# SupaPurge: A Google Apps Script Project for GMail

SupaPurge is a Google Apps Script (GAS) project that helps you keep your Gmail inbox clean by automatically purging emails that exceed the desired retention period. Simply apply a [Label](https://support.google.com/mail/answer/118708) to the desired messages that includes the needed retention period in the label name. The retention period is specified by appending it to the label name in square brackets.  Examples:

* Amazon [1 month]
* Misc [2 weeks]
* Notifications [5 days]
* Finance [2 years]

As we are using labels, they could be manually applied or automatically applied via [Filters](https://workspace.google.com/blog/productivity-collaboration/how-to-master-gmails-advanced-search-and-labelling), providing for a powerful automated purging solution.

If an error is encountered attempting to parse the retention period from a label name, the label will be renamed, prepending "ERR-" to the retention period.  Example:  "Amazon [1 moxth]" would be renamed to "Amazon [ERR-1 moxth]". This simply provides a visual indication to the user that something is wrong, and it allows us to exclude the labels in error from future runs until corrected.

Due to quota restrictions with Google, if a label is processed and more than 100 messages are selected for purging, only 100 messages will be purged per run.  The script will automatically schedule additional follow-up runs at 10-minute increments until all selected messages are purged.

The app leverages the [dayjs](https://day.js.org/) library for date manipulation.  Specifically, the [subtract](https://day.js.org/docs/en/manipulate/subtract) method is used compute the retention period by subtracting the time period from today.  All of the dayjs supported [units of time](https://day.js.org/docs/en/manipulate/add#list-of-all-available-units) are allowed, but please note that the GMail filter is specified in **YYYY-MM-DD** format, so the most relevant ones would be day(s), week(s), month(s), and year(s).  The dayjs unit shorthand/abbreviations are also supported.  *Note that a space between the number and unit of measure is **required** (i.e. for 2 days, it would be "2 days" NOT "2days")*

Messages may be *excluded* from purging (regardless of label or date) by [starring them](https://support.google.com/mail/answer/5904).

The specific filters used to select the messages for purging are:
* label:{label name}
* -in:chats (note the hyphen means *NOT* in chats)
* before:{beforeDate as YYYY-MM-DD}
* -is:starred (note the hyphen means *NOT* starred)

Errors encountered during processing will be emailed to you.

Messages are moved to Trash.

The execution log (within the Google Apps Script portal) may be reviewed for details of each processing run.

## Table of Contents

1. [Installation](#installation)
2. [Deployment](#deployment)
3. [Granting Permissions](#granting-permissions)
4. [Scheduling a Trigger](#scheduling-a-trigger)
5. [Building From Source](#building-from-source)

## Installation

To install using clasp, you'll need to create your ````.clasp.json```` file in the root and specify your own scriptId and set the rootdir to "dist". 

To manually install:

1. **Visit Google Apps Script**: Start by navigating to the Google Apps Script environment. You can do this by going to [script.google.com](https://script.google.com/). 

2. **New project**: Click on the "New Project" button to create a new script.

3. **Copy the script**: In the script editor, replace the default content of your ````code.gs```` file with the content of this script ````/dist/code.js````. Here is an example of how your code should look like:

4. **Name the project**: Click the **Untitled Project** label at the top of the page and name your project as desired.

5. **Save the script**: Click the **Save** icon in the toolbar near the top of the page. 

6. **Edit the project settings**: Click the **Project Settings** icon on the left side of the page.  Ensure the **Enable Chrome V8 runtime** option is **checked**.

## Deployment

Follow these steps to deploy the script:

1. **Select "Deploy"**: In the bar at the top/right of the page, click on "Deploy" -> "New deployment".  

2. **Deploy the script**: In the dialogue box that appears, select the appropriate settings:
    - Select "Web app" as the type
    - Description: Enter an appropriate description, if desired
    - Execute as: "Me"
    - Who has access: "Only myself"

    Click "Deploy"

## Granting Permissions

You will need to authorize the script to access and modify your Gmail.

1. **Authorize the app**: The first time you **Run** the script, it will request permissions. Click on "Review Permissions".

2. **Choose your account**: Choose the account you want to run the script on.

3. **Grant permissions**: You'll likely see a warning message from Google. This is because the script isn't Google-verified. To proceed, click on "Advanced" and then "Go to Project Name (unsafe)". Finally, click on "Allow" to give the necessary permissions.

## Scheduling a Trigger

To make the script run automatically, you will need to create a trigger.

1. **Access the triggers menu**: Click on the clock icon ("Current project's triggers") on the left sidebar.

2. **Add a new trigger**: Click on "+ Add Trigger" at the bottom right of the page.

3. **Configure the trigger**: Set up your trigger with these settings:

    - Choose which function to run: Select the **process** function
    - Choose which deployment should run: Select "Head".
    - Select event source: Choose "Time-driven".
    - Select type of time-based trigger: Depending on your needs, you can select "Specific date and time", "Minutes timer", "Hour timer", "Day timer", or "Week timer".  The most common choice would be "Day timer" so as to run once daily.
   
    Click "Save".

That's it! You've now installed, deployed, and scheduled the purge. 

## Building from Source

If you want to customize the source and build your own, simply clone the repo, ensure you have node and npm installed, and run the following:
* npm install
* npm run build
