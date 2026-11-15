---
title: "Linux find files between dates"
date: 2019-02-07
categories: 
  - "debian"
  - "unix-linux"
---

First one:

start\_date=201105040000

end\_date=201105042359

touch -t ${start\_date} start

touch -t ${end\_date} end

find /you/path -type f -name '_you_pattern\*' -newer start ! -newer end -exec ls -s {} \\;

Second one: find files modified between 20 and 21 days ago:

find -ctime +20 -ctime -21

finds files modified between 2500 and 2800 minutes ago:

find -cmin +2500 -cmin -2800

reference:

[https://stackoverflow.com/questions/5893748/linux-command-to-check-new-files-in-file-system](https://stackoverflow.com/questions/5893748/linux-command-to-check-new-files-in-file-system)

[https://www.cyberciti.biz/faq/howto-finding-files-by-date/](https://www.cyberciti.biz/faq/howto-finding-files-by-date/)
