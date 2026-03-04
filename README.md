# Eleventy Minimal Blog Theme

A clean, lightweight blog theme built with **11ty (Eleventy)**.
Simple structure, minimal styling, and easy to customize.

## ✨ Features

* Minimal responsive layout
* Sidebar layout
* Blog post collections
* Archive page
* Clean CSS (no framework)
* Easy to extend

---

## 📦 Tech Stack

* Eleventy (11ty)
* Nunjucks templates
* Markdown
* Vanilla CSS
* Vanilla JavaScript

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npx @11ty/eleventy --serve
```

Site will run at:

```
http://localhost:8080
```

---

## 📁 Project Structure

```
.
├── _includes/        # Layouts & partials
├── _data/            # Global site data
├── posts/            # Blog posts
├── css/              # Styles
├── js/               # Scripts
├── index.md          # Homepage
├── archive.njk       # Archive page
└── .eleventy.js      # Eleventy config
```

---

## 📝 Creating a New Post

Create a Markdown file inside `posts/`:

```markdown
---
title: My New Post
date: 2026-03-01
tags: [blog]
---

Your content here...
```

---

## 🎨 Customization

You can customize:

* Colors → `css/style.css`
* Layout → `_includes/layout.njk`
* Site metadata → `_data/site.js`
* Collections → `.eleventy.js`

---

## 📦 Build for Production

```bash
npx @11ty/eleventy
```

Output will be generated in the `_site` folder.

---

## 🌍 Deployment

Works great with:

* GitHub Pages
* Netlify
* Vercel
* Any static hosting provider

---

## 📄 License

MIT License — feel free to use and modify.

---

If you'd like, I can also:

* Make it more “marketable” for GitHub
* Add badges
* Add a demo section
* Or write a short theme description for social sharing

