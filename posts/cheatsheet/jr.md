---
title: "bash jq"
date: 2024-07-11
tags: 
  - "Cheatsheet/jq"
---
The issue you're encountering is due to a common pitfall in Bash: the pipe creates a subshell, and variables modified inside the subshell are not visible to the parent shell.

In your code:

```bash
fzf_list=""
jq ... | while IFS='|' read -r key value; do
    ...
    fzf_list+="$key $value"$'\n'
done
```

The `while` loop is running in a subshell because of the pipe from `jq`. Any changes to `fzf_list` inside this loop are local to the subshell and don't affect the `fzf_list` variable in the main shell.

To solve this, you can use one of these approaches:

1. Use process substitution:

```bash
fzf_list=""
while IFS='|' read -r key value; do
    echo "Processing $key.subkey1: $value"
    fzf_list+="$key $value"$'\n'
done < <(jq -r '
    to_entries[] |
    select(.value.subkey1 != null) |
    "\(.key)|\(.value.subkey1)"
' "$json_file")

echo "fzf_list: $fzf_list"
```

2. Use an array to capture the output, then process it:

```bash
mapfile -t entries < <(jq -r '
    to_entries[] |
    select(.value.subkey1 != null) |
    "\(.key)|\(.value.subkey1)"
' "$json_file")

fzf_list=""
for entry in "${entries[@]}"; do
    IFS='|' read -r key value <<< "$entry"
    echo "Processing $key.subkey1: $value"
    fzf_list+="$key $value"$'\n'
done

echo "fzf_list: $fzf_list"
```

3. Use a here-string with `read` in a loop:

```bash
fzf_list=""
while IFS='|' read -r key value; do
    echo "Processing $key.subkey1: $value"
    fzf_list+="$key $value"$'\n'
done <<< "$(jq -r '
    to_entries[] |
    select(.value.subkey1 != null) |
    "\(.key)|\(.value.subkey1)"
' "$json_file")"

echo "fzf_list: $fzf_list"
```

All of these methods avoid the subshell issue and will allow `fzf_list` to be updated correctly. Choose the one that best fits your scripting style and requirements.
