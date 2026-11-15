---
title: "Batch command cheat sheet"
date: 2013-12-23
categories: 
  - "cmd"
---

```
set /a 5+5
```

```
&& : put multiple commands in a line
```

```
%0% : command
```

```
date /t
```

```
for /f "tokens=1-5 delims=/" %%d in ("%date%") do echo %%e-%%f-%%g
```

```
time /t
```

```
for /f "tokens=1-5 delims=:." %%d in ("%time%") do echo %%e %%f %%g %%h %%i
```

```
start /d "directory"
```

```
call (another batch)
```

```
if %...% == 12345
```

```
for /d
```

```
for /r
```

```
for /l
```

```
for /f
```
