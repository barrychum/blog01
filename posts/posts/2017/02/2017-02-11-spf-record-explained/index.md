---
title: "SPF record explained"
date: 2017-02-11
categories: 
  - "misc-info"
---

Typical?parameters

```
"v=spf1 a/24 a:offsite.example.com/24  ip4:192.168.0.1/16 -all"
```

| _Result_ | _Explanation_ | _Intended action_ |
| :-: | :-: | --- |
| \+ Pass | The SPF record designates the host to be allowed to send | accept |
| \- Fail | The SPF record has designated the host as NOT being allowed to send | reject |
| ~ SoftFail | The SPF record has designated the host as NOT being allowed to send but is in transition | accept but mark |
| ? Neutral | The SPF record specifies explicitly that nothing can be said about validity | accept |

reference

http://www.spfwizard.net/

http://www.openspf.org/SPF\_Record\_Syntax
