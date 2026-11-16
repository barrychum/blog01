---
title: "USB event trigger"
date: 2014-05-20
categories: 
  - "tips-and-tricks"
---

This is a method to use Windows Scheduled Task to trigger actions with windows events. http://community.spiceworks.com/how\_to/show/34985-automatically-backup-files-to-usb-drive-on-mount Set the Task Trigger In the Create Task dialog still: - Select the Trigger tab and click New... In the New Trigger dialog: - Change Begin the task: to "On an event" - Change the Log: to "Microsoft-Windows-DriverFrameworks-UserMode/Operational" - Change the Source: to "DriverFrameworks-UserMode" - Enter the Event ID: "1003" - Adjust the Advanced Settings as needed. I like to Delay task for 30 seconds, since sometimes you'll get a dialog asking questions about the USB (such as the one about it being detached uncleanly last time, asking whether Windows should scan and fix). While the dialog is open, the USB drive is inaccessible. - Ensure Enabled is ticked - Click OK A sample script to detect USB drive with a unique id file in the root folder of the USB drive REM ------------------------------------------------------ @ECHO OFF SET USBDRV=NA for %%a in (a b c d e f g h i j k l m n o p q r s t u v w x y z) do ( IF EXIST %%a:\\This\_is\_a\_USB\_Backup\_Drive.id SET USBDRV=%%a: IF EXIST %%a:\\This\_is\_a\_USB\_Backup\_Drive.id ECHO %%a:\\This\_is\_a\_USB\_Backup\_Drive.id ) ECHO.
