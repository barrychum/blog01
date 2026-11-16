---
title: "HTML Selector Cheatsheet"
date: 2024-06-07
tags: 
  - "Cheatsheet/HTML"
---
## Summary of CSS Selectors for Identifying Elements

| Feature                 | Description                                                | Example                                              |
|-------------------------|-----------------------------------------------------------|-------------------------------------------------------|
| **`id`**                 | Assigns a unique identifier to an element.                | `<h1 id="main-heading">This is the main heading</h1>`    |
| **`class`**               | Assigns a reusable style name to an element (can be used on multiple elements). | `<p class="important">This is important text.</p>`     |
| **Element Selectors**     | Targets all elements of a specific type (e.g., `h1`, `p`, `div`). | `h1 { color: blue; font-size: 2em; }`                 |
| **Pseudo-Classes**        | Targets elements based on a specific state or condition (e.g., `:hover`, `:focus`, `:active`). | `a:hover { color: red; text-decoration: underline; }` |
| **Pseudo-Elements**       | Targets specific parts of an element for independent styling (e.g., `::before`, `::after`, `::first-letter`). | `h1::first-letter { font-size: 1.5em; font-weight: bold; }` |
| **Attribute Selectors**   | Targets elements based on the presence or value of a specific attribute. | `input[type="text"] { border: 1px solid #ccc; padding: 5px; }` |
