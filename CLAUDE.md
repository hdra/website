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
- `photography` — `src/content/photography/`. Each entry is a subdirectory containing an `index.md` and image files. Images can sit at the entry root or inside a `photos/` subdirectory.
  - `cover` (optional) — path relative to the entry directory (e.g. `photos/shot.jpg`) to use as the listing preview. If omitted, a file named `cover.*` (any extension) is used if present, otherwise the first image alphabetically.
  - `coverPosition` (optional) — sets `object-position` on the preview image in the listing. Controls which part of the image is visible within the fixed-height crop. Accepts any CSS `object-position` value:
    - Keywords: `top`, `bottom`, `left`, `right`, `center`, combinable e.g. `top left`, `center right`
    - Percentages: `50% 25%` (x y) — `0% 0%` is top-left, `100% 100%` is bottom-right
    - Lengths: `0px 100px`
    - Mixed: `50% 30px`
    - Default (when omitted): `50% 50%` (centered)

**Pages** (`src/pages/`) use file-based routing. Dynamic routes like `posts/[...slug].astro` render individual collection entries.

**Layouts**: `Baselayout.astro` is the root shell (nav, header, footer). `MarkdownPostLayout.astro` wraps blog posts and extends `Baselayout`.

**Styling**: single flat CSS file at `src/styles/global.css` using CSS custom properties. A `global.sass` file also exists but `global.css` is what's imported in `Baselayout`.
