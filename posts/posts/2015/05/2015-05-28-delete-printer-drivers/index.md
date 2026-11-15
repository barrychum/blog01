---
title: "Delete printer drivers"
date: 2015-05-28
categories: 
  - "tips-and-tricks"
---

1.. right-click on desktop, create a new shortcut with target as 'cmd.exe'. 2. right-click on the shortcut, "Run as Administrator" 3. Run the printui tool: printui /s /t2 4. Try deleting the printers. If that doesn't work... 5. CLick Start > Run > Services.msc 6. Locate the Print Spooler service, and right-click > Properties > stop service. 7. Open My Computer and browse to c:\\Windows\\System32\\spool\\Printers (you will need to say "oK" to get access to the folder). 8. DELETE the contents of that folder. 9. Restart the Print Spooler service. 10. Go back into the printui utillity (might need to restart it using same method as above) and try removing printers again. This time it should work. If necessary, check the "Ports" tab and remove any TCP/IP ports that are associated with the old printer.
