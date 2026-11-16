---
title: "Powershell performance Cheatsheet"
date: 2026-04-10
tags: 
  - "Cheatsheet/powershell"
---
{% raw %}

The `+=` array problem is fixed by switching to a `[System.Collections.Generic.List]`, which adds items in-place without rebuilding the array each time.

**The problem:**
```powershell
$results = @()
foreach ($message in $newMessages) {
    $results += $result   # Destroys and rebuilds the entire array every iteration
}
```

**The fix:**
```powershell
$results = [System.Collections.Generic.List[PSCustomObject]]::new()
foreach ($message in $newMessages) {
    $results.Add($result)   # Appends in-place, no rebuild
}
```

Apply the same change to `$existingList`:
```powershell
# Before
$existingList = @()
$existingList += $indresult

# After
$existingList = [System.Collections.Generic.List[PSCustomObject]]::new()
$existingList.Add($indresult)
```

**Why it matters in practice** — every `+=` on a plain `@()` array copies every existing element into a new array, then adds the new one. The cost grows with each iteration:

| Messages | `+=` array | List `.Add()` |
|---|---|---|
| 100 | ~5,000 copy operations | 100 operations |
| 500 | ~125,000 copy operations | 500 operations |
| 1,000 | ~500,000 copy operations | 1,000 operations |

An alternative that's equally valid is to just let PowerShell collect the output of the `foreach` directly into a variable, which avoids the issue entirely without needing a List:

```powershell
$results = foreach ($message in $newMessages) {
    # No $results += needed — just output the object directly
    [PSCustomObject]@{
        MessageID = $message.Id
        # ... etc
    }
}
```

PowerShell handles the collection internally and this is arguably the most idiomatic approach for pure data transformation loops.

{% endraw %}