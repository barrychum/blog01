---
title: "Regex cheatsheet"
date: 2024-06-15
tags: 
  - "Cheatsheet/regex"
---
Here's a comprehensive table patterns:

| **Pattern** | **Description**                        | **Example**                |
|-------------|----------------------------------------|----------------------------|
| `.`         | Any single character except newline    | `a.b` matches `aab`, `acb` |
| `^`         | Start of a string                      | `^abc` matches `abc` at start |
| `$`         | End of a string                        | `abc$` matches `abc` at end |
| `*`         | Zero or more (greedy)                  | `a*` matches `a`, `aa`, `aaa` |
| `*?`        | Zero or more (lazy)                    | `a*?` matches `a`, `aa`, `aaa` minimally |
| `+`         | One or more (greedy)                   | `a+` matches `a`, `aa`, `aaa` |
| `+?`        | One or more (lazy)                     | `a+?` matches `a`, `aa`, `aaa` minimally |
| `?`         | Zero or one (greedy)                   | `a?` matches `a`, `""` |
| `??`        | Zero or one (lazy)                     | `a??` matches `a`, `""` minimally |
| `{n}`       | Exactly n times                        | `a{3}` matches `aaa` |
| `{n}?`      | Exactly n times (lazy)                 | `a{3}?` matches `aaa` minimally |
| `{n,}`      | n or more times (greedy)               | `a{2,}` matches `aa`, `aaa` |
| `{n,}?`     | n or more times (lazy)                 | `a{2,}?` matches `aa`, `aaa` minimally |
| `{n,m}`     | Between n and m times (greedy)         | `a{2,4}` matches `aa`, `aaa`, `aaaa` |
| `{n,m}?`    | Between n and m times (lazy)           | `a{2,4}?` matches `aa`, `aaa`, `aaaa` minimally |
| `[]`        | Any one character in set               | `[abc]` matches `a`, `b`, `c` |
| `[^]`       | Any one character not in set           | `[^abc]` matches any except `a`, `b`, `c` |
| `|`         | Alternation (OR)                       | `a|b` matches `a` or `b` |
| `()`        | Grouping                               | `(abc)` matches `abc` |
| `(?:...)`   | Non-capturing group                    | `(?:abc)` matches `abc` without capturing |
| `\`         | Escape special characters              | `\.` matches `.` |
| `\d`        | Any digit                              | `\d` matches `0-9` |
| `\D`        | Any non-digit                          | `\D` matches any non-digit |
| `\w`        | Any word character                     | `\w` matches `a-z`, `A-Z`, `0-9`, `_` |
| `\W`        | Any non-word character                 | `\W` matches any non-word character |
| `\s`        | Any whitespace                         | `\s` matches spaces, tabs, etc. |
| `\S`        | Any non-whitespace                     | `\S` matches any non-whitespace |
| `(?i)`      | Case-insensitive mode                  | `(?i)abc` matches `ABC`, `abc` |
| `(?<=x)`    | Positive lookbehind                    | `(?<=@)\w+` matches word after `@` |
| `(?<!x)`    | Negative lookbehind                    | `(?<!@)\w+` matches word not after `@` |
| `(?=x)`     | Positive lookahead                     | `\d(?=px)` matches digit before `px` |
| `(?!x)`     | Negative lookahead                     | `\d(?!px)` matches digit not before `px` |


Here are five excellent sites for learning regex:

1. **RegexOne** - An interactive tutorial that teaches practical uses of regex with hands-on examples. Great for beginners to learn by doing.
   [RegexOne](https://regexone.com)

2. **RegexLearn** - Offers step-by-step modules and a playground for testing regex patterns. Includes a handy cheatsheet and community contributions.
   [RegexLearn](https://regexlearn.com)

3. **Codecademy** - Provides a comprehensive course on regex, focusing on practical applications across various programming languages.
   [Codecademy](https://www.codecademy.com)

4. **Regular-Expressions.info** - A thorough tutorial covering everything from basics to advanced topics, with explanations of regex engines and flavors.
   [Regular-Expressions.info](https://www.regular-expressions.info)

5. **Regex101** - A tool for building, testing, and debugging regex with real-time explanations and match information.
   [Regex101](https://regex101.com)


