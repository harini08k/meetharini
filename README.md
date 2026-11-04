# meetharini.com

Harini Karthikeyan's portfolio and scrapbook. Built with Astro. Pages are plain static HTML; the little demos are small scripts.

```
npm install
npm run dev       # site at localhost:4321, editor at localhost:4321/keystatic
npm run build     # checks photos for locations, pulls YouTube videos, builds into dist/
```

How the code is organised is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Posting

**From the editor:** open `/keystatic`, pick *Scrapbook entries*, press Add, fill in the form, Save. Locally this writes a file; on the live site it commits to GitHub and the site redeploys in about a minute.

**By hand:** add a file to `src/content/scrapbook/` (copy any existing one). The top of the file says what it is: `type` is `post`, `moment`, `log`, `travel` or `thought`. Videos are not written by hand, they appear on their own from YouTube.

The *Now box* in the editor is the "Now" section on the homepage. Change the date when you update it.

## Photos

Drop a file named like `IMG-03.jpg` into `src/assets/photos/` and it replaces the matching placeholder (the list is in the content plan doc). Photos in scrapbook entries are uploaded through the editor. The site ships resized copies with the location removed.

Phone photos carry the place they were taken, and the original file sits in the repo. `npm run build` warns about any that do; `npm run strip-exif` cleans them. Safest: turn off Location for the Camera/Photos app, or keep this repo private (Cloudflare deploys private repos fine).

## Putting it live (Cloudflare Pages, free)

1. Push this folder to GitHub as `harini08k/meetharini`.
2. Cloudflare dashboard, Workers & Pages, Create, Pages, connect the repo.
3. Build command `npm run build`, output directory `dist/client`, and add the variable `ADMIN` = `1` (this turns on the editor).
4. Custom domains: add `meetharini.com` (you bought it on Cloudflare, so it connects in one click).
5. Editor sign-in on the live site needs a GitHub App. Run `npm run dev`, open `/keystatic`, and choose to set up GitHub mode; it creates the app for you and tells you which four variables to add in Cloudflare.
6. New videos: in Cloudflare create a Deploy hook, then add it to the GitHub repo as a secret named `DEPLOY_HOOK_URL`. The workflow in `.github/workflows` rebuilds the site daily.
7. Add the site to Google Search Console and submit `https://meetharini.com/sitemap-index.xml`.

Without `ADMIN=1` the build is fully static (output in `dist/`) and has no editor.

## Where the words live

- Homepage copy: `src/data/resume.ts` (the Now box is `src/data/now.json`, edited from the editor)
- Case studies: `src/pages/projects/`
- Scrapbook entries: `src/content/scrapbook/`
- Colors, type and spacing: top of `src/styles/global.css`
- Name, links, email: `src/data/site.ts`
