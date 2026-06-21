# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # dev server at localhost:4321
npm run build     # build to ./dist/
npm run preview   # preview the build locally
```

No linting or test setup exists in this project.

## Architecture

This is a personal site ([hendra.dev](https://beta.hendra.dev)) built with Astro 5, deployed to GitHub Pages via `/.github/workflows/` on every push to `main`.

**Content collections** (`src/content.config.ts`) define three collections:

- `blog` — Markdown posts under `src/content/posts/` (nested in category/year subdirs). Slugs are generated from `date + title` using `github-slugger`, not from file paths. The main blog listing (`/posts`) filters to posts from 2017 onward; pre-2017 posts are at `/posts/archives`.
- `projects` — `src/content/projects/`
- `photography` — `src/content/photography/`. Each entry is a subdirectory containing an `index.md` and image files. Images can sit at the entry root or inside a `photos/` subdirectory. The `cover` frontmatter field (optional) sets the index listing preview image — specify it as a path relative to the entry directory (e.g. `photos/shot.jpg` or just `shot.jpg`). If omitted, the first image alphabetically is used.

**Pages** (`src/pages/`) use file-based routing. Dynamic routes like `posts/[...slug].astro` render individual collection entries.

**Layouts**: `Baselayout.astro` is the root shell (nav, header, footer). `MarkdownPostLayout.astro` wraps blog posts and extends `Baselayout`.

**Styling**: single flat CSS file at `src/styles/global.css` using CSS custom properties. A `global.sass` file also exists but `global.css` is what's imported in `Baselayout`.
