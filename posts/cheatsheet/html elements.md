---
title: "HTML elements cheatsheet"
date: 2024-06-07
tags: 
  - "Cheatsheet"
---
## Comparison of class, div, span, and id in HTML

Here's a table summarizing the key differences between `class`, `div`, `span`, and `id` in HTML:

| Feature                 | `class`                 | `div`                     | `span`                     | `id`                        |
|-------------------------|-------------------------|---------------------------|---------------------------|----------------------------|
| Type                     | Attribute                | Element                    | Element                    | Attribute                   |
| Purpose                  | Assigns a style name     | Creates a block-level       | Groups inline content       | Uniquely identifies an     |
|                           | to an element            | container                 | and applies inline styles  | element                     |
| Content Type             | N/A                      | Blocks (starts on a new line)| Inline (flows with          | N/A                         |
| Style Impact             | Used in CSS selectors    | Can be styled with CSS    | Can be styled with CSS      | Can be styled with CSS     |
| Multiple Instances      | Yes (one element can     | Yes (multiple divs can     | Yes (multiple spans can     | No (only one element can   |
|                           | have multiple classes)   | exist on a page)           | exist on a page)           | have a specific id)         |
| Common Use Cases         | Styling groups of         | Sections, headers, footers, | Highlighting text,          | Targeting specific elements |
|                           | elements                 | main content areas, etc.   | applying inline styles     | for actions (e.g., buttons)  |

**Additional Notes:**

- **`class`:** You can add multiple classes to an element separated by spaces, allowing for more complex styling combinations.
- **`div`:** While `div` adds some space by default, you can use CSS to remove the margins and padding for a more flexible layout.
- **`span`:** Unlike `div`, `span` does not create a new line and flows with surrounding content.
- **`id`:** An element can only have one unique `id` attribute within a document. This is useful for targeting specific elements with JavaScript or for creating named anchors for linking within a page.

**Choosing the Right Element:**

- Use `class` when you want to define a style that can be applied to multiple elements.
- Use `div` when you need to create a distinct section with its own space and potentially containing other elements.
- Use `span` when you want to group a small portion of inline content and apply specific styles to that part without affecting the layout.
- Use `id` when you need to uniquely identify an element for specific styling, targeting in JavaScript, or creating named anchors.
