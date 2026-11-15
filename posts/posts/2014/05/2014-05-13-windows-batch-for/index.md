---
title: "Windows batch for"
date: 2014-05-13
categories: 
  - "cmd"
---

http://technet.microsoft.com/en-us/library/bb490909.aspx

| Variable with modifier | Description |
| --- | --- |
| %~I | Expands %I which removes any surrounding quotation marks (""). |
| %~fI | Expands %I to a fully qualified path name. |
| %~dI | Expands %I to a drive letter only. |
| %~pI | Expands %I to a path only. |
| %~nI | Expands %I to a file name only. |
| %~xI | Expands %I to a file extension only. |
| %~sI | Expands path to contain short names only. |
| %~aI | Expands %I to the file attributes of file. |
| %~tI | Expands %I to the date and time of file. |
| %~zI | Expands %I to the size of file. |
| %~$PATH:I | Searches the directories listed in the PATH environment variable and expands %I to the fully qualified name of the first one found. If the environment variable name is not defined or the file is not found by the search, this modifier expands to the empty string. |

The following table lists modifier combinations that you can use to get compound results.
