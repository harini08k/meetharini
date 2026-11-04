// Content collections: the shape every scrapbook entry has to follow.
// A file that doesn't match (a missing title, an unknown type) fails the build with a clear message,
// instead of showing up broken on the site. The editor in keystatic.config.ts writes files in this same shape.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every scrapbook entry is one Markdown file in src/content/scrapbook.
// To post, add a file there (or use the editor once it's set up) and push.
const scrapbook = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/scrapbook' }),
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['post', 'moment', 'log', 'video', 'travel', 'thought']),
    tags: z.array(z.enum(['tech', 'life', 'travel', 'runs', 'videos', 'thoughts'])).default([]),
    caption: z.string().optional(),
    place: z.string().optional(),
    // Leave src empty to show a placeholder frame until the photo is uploaded.
    images: z
      .array(z.object({ src: image().optional(), alt: z.string(), id: z.string().optional() }))
      .default([]),
    stats: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    findings: z.array(z.string()).optional(),
    link: z.string().optional(),
      thumb: z.string().url().optional(),
    linkLabel: z.string().optional(),
    }),
});

export const collections = { scrapbook };
