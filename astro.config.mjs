import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// The public site is plain static pages. The editor at /keystatic needs a small server,
// so it only switches on when you're running `npm run dev` or when ADMIN=1 is set on the host.
const admin = process.env.ADMIN === '1' || process.argv.includes('dev');
const deploy = process.env.ADMIN === '1';

export default defineConfig({
  site: 'https://meetharini.com',
  integrations: [mdx(), sitemap(), ...(admin ? [react(), keystatic()] : [])],
  ...(deploy ? { adapter: cloudflare() } : {}),
});
