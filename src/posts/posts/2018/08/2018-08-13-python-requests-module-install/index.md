---
title: "python requests module install"
date: 2018-08-13
categories: 
  - "python"
---

```
python3
pip3 install requests
http://docs.python-requests.org/en/latest/user/quickstart/#redirection-and-history

import requests
url = "http:"
r = requests.head(url, allow_redirects=True)
r = requests.get(url, allow_redirects=True)
r.url
r.history
r.text
r.status_code

f = open("out.txt","w")
f.write(r.text)
f.close()

```
