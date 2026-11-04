# How the site fits together

The site has two halves joined by one thread.

- **Résumé** (`/`): the clean page a recruiter reads in two minutes. Light colours.
- **Scrapbook** (`/scrapbook`): everything else, month by month. Dark colours.
- **The thread**: a line down the left of both pages. It ties a knot beside each section, and at the end of the résumé you pull it to cross over.

Everything is static HTML built by [Astro](https://astro.build). There's no database and no server for visitors. The only server-side piece is the editor (see *Posting*).

## Folder map

```
src/
  pages/            one file = one URL
    index.astro       résumé page, assembled from components
    scrapbook.astro   scrapbook: reads src/content/scrapbook, groups by month
    projects/         the two case studies
    search.json.ts    the search index the ⌘K box reads (built at deploy time)
    404.astro
  components/       one section or widget each (see below)
    demos/            the four click-through explainers
  data/
    site.ts           name, email, links
    resume.ts         homepage copy: receipts, projects, experience, timeline, about
    now.json          the "Now" box, written by the editor
  content/scrapbook/  one .mdx file per scrapbook entry
  content.config.ts   the shape an entry must have
  assets/photos/      named photos (IMG-03.jpg ...) that replace placeholders
  assets/scrapbook/   photos uploaded from the editor
  layouts/Base.astro  <head>, social preview, Google profile data, nav
  styles/global.css   colour tokens, page grid, shared look
scripts/
  fetch-videos.mjs    pulls YouTube uploads into the scrapbook (runs before every build)
  check-exif.mjs      warns about photos that still carry a location
keystatic.config.ts   the editor's forms
astro.config.mjs      integrations; the editor and the Cloudflare adapter are optional
.github/workflows/    daily rebuild
```

## Components worth knowing

| Component | What it does |
| --- | --- |
| `Thread.astro` | Measures the page, draws the line and ties a knot at every element marked `data-knot`. Without JavaScript it's a plain line. |
| `Hero.astro` | The kolam (one unbroken line through a grid of dots) that runs into the thread, the headline and the status chip. |
| `Receipts.astro` | Claims that open to show proof. Plain `<details>`, no script. |
| `Featured.astro` + `demos/*` | A project card with its click-through explainers in the slot. The two BenchCall explainers are drawn in the app's own look (its colours, fonts and copy, taken from BenchCall's `theme.dart` and `design/ui-proposal`), so they read as the real app. |
| `Experience.astro` | The classified-file cards. Declassify reveals the case study. |
| `Timeline.astro` | Steps light up on scroll (IntersectionObserver) and add their skills to the stack list. |
| `Unravel.astro` | The pull tag. Click or drag, a night-coloured circle grows, then it navigates to `/scrapbook`. |
| `Entry.astro` | One scrapbook entry, drawn differently for each type. |
| `Photo.astro` | Real photo if a file named like the IMG id exists, otherwise a placeholder. |
| `Nav.astro` | Top bar, ⌘K search dialog and Recruiter mode. |

## The pieces that touch more than one file

**Posting.** An entry is `src/content/scrapbook/<name>.mdx`. Its top block (frontmatter) must match `content.config.ts`, and `keystatic.config.ts` has the same fields as a form. If you add a field, add it in both.

**Photos.** Two routes, both through `astro:assets`, which re-encodes the image and drops its metadata:
`src/assets/photos/IMG-xx.*` for the site's own images, and the editor's upload for scrapbook entries.
The originals stay in the repo, which is why `check-exif.mjs` exists.

**YouTube.** `fetch-videos.mjs` reads the channel's public feed and writes `yt-<videoId>.mdx` files (git-ignored). Entries have `type: video`. If YouTube can't be reached, the previous files stay.

**Search.** `search.json.ts` lists projects, receipts, work, timeline and scrapbook entries. The dialog in `Nav.astro` loads it on first open and scores matches in the browser (title matches count more than body matches).

**Recruiter mode.** `Nav.astro` sets `data-recruiter` on `<html>`, opens every `<details>` and Declassify button, and `global.css` hides the thread, kolam, photos and explainers under that attribute. It's remembered in localStorage.

**Posting from the live site.** `/keystatic` needs a small server, so it only exists when `ADMIN=1` is set at build time (Cloudflare adapter) or in `npm run dev`. Without it the build is plain static files.

## Things deliberately kept simple

- The explainers are small scripts at the bottom of each component, not a framework. Each one is a short list of steps and a function that applies the current step.
- Motion respects `prefers-reduced-motion`: the thread is drawn instantly and the pull navigates without the circle.
- Every interactive piece is a real button or link with a visible focus ring.
