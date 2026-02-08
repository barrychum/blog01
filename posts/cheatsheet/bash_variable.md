---
title: "Bash variable cheatsheet"
date: 2024-06-17
tags: 
  - "Cheatsheet/bash"
---

bash variable expansion

### Example with Clarification

```sh
#!/bin/bash

# Assign a value to the greeting variable
greeting="Hello World"

# Example without braces
echo "$greeting"  # Output: Hello World

# Example with braces
echo "${greeting}"  # Output: Hello World

# Using braces for clarity when appending text
echo "${greeting}_user"  # Correct: Hello World_user
echo "$greeting_user"    # Incorrect: empty or undefined variable

# Another example with text immediately after the variable
filename="file"
echo "${filename}_backup"  # Correct: file_backup
echo "$filename_backup"    # Incorrect: empty or undefined variable

# Double quotes to preserve spaces
text="Spaces are preserved"
echo "$text"  # Correct: Spaces are preserved

# Single quotes to prevent variable expansion
literal_text='${greeting} is not expanded'
echo "$literal_text"  # Output: ${greeting} is not expanded
```

### Key Points:

- **Using Double Quotes (`""`)**: Double quotes are used to preserve spaces and special characters in variable values. When a variable is enclosed in double quotes, it prevents word splitting and preserves the literal value of the variable.
- **Using Curly Braces (`${}`)**: Curly braces are used to clearly delimit the variable name, which is particularly useful when appending text or when the variable name is followed by characters that could be interpreted as part of the variable name.

#### When to Use `${}`:

- When appending text immediately after a variable.
- To avoid ambiguity when the variable name is followed by alphanumeric characters or underscores.

#### When Double Quotes (`""`) are Necessary:

- To preserve spaces and special characters in the variable's value.
- To prevent word splitting and globbing.

### Practical Usage:

Using curly braces for clarity and to avoid errors is a good practice, but not always strictly necessary. Double quotes are essential when dealing with variables containing spaces or special characters.

In summary, `echo "$greeting"` and `echo "${greeting}"` both work in the given context, but using `${greeting}` provides additional safety and clarity, especially when concatenating or appending strings.