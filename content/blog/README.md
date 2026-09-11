# Blog authoring guide

Posts are Markdown files, one per locale, rendered into `src/content/blog.json` by `scripts/build-blog.mjs` at build time (the site runs on the edge and cannot read files at request time). The manifest is generated, not committed.

## Folder structure

```text
content/blog/
  authors.json
  en/my-post-slug.md
  pt/my-post-slug.md
public/blog/my-post-slug/
  cover.svg
```

- The file name is the slug. If the frontmatter carries a `slug`, it must match the file name.
- Routes are `/en/blog/my-post-slug` and `/pt/blog/my-post-slug`; `/es/blog/...` reads the EN post.
- A PT file is optional; the EN post is listed for PT readers when it is missing.

## Frontmatter

```yaml
---
title: "Post title"
description: "Short summary shown in the list and in link previews"
date: "2026-04-22"
slug: "my-post-slug"
coverImage: "/blog/my-post-slug/cover.svg"
author: "victor-marotta"
tags:
  - "geospatial"
---
```

`title`, `description` and `date` are required. Images inside the article use root-relative paths (`/blog/my-post-slug/figure.png`). Raw HTML such as `<figure>` is passed through.

## Local check

```sh
npm run blog:build      # regenerates src/content/blog.json and validates frontmatter
node --test scripts/    # unit tests for the manifest builder
npm run dev             # http://localhost:3000/en/blog
```
