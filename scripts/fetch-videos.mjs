// Pulls the latest uploads from the YouTube channel feed and turns each one into a scrapbook entry.
// Runs before every build. If YouTube can't be reached, the last set of entries is kept as it is.
import { writeFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const CHANNEL_ID = 'UC10Q2ADxxLG-ds3LxoME8_w'; // @harini08k
const OUT = 'src/content/scrapbook';
const LIMIT = 12;

const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

try {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`YouTube answered ${res.status}`);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
    const body = m[1];
    const pick = (re) => body.match(re)?.[1];
    return {
      id: pick(/<yt:videoId>(.*?)<\/yt:videoId>/),
      title: unesc(pick(/<title>(.*?)<\/title>/) ?? ''),
      date: (pick(/<published>(.*?)<\/published>/) ?? '').slice(0, 10),
    };
  });
  if (!entries.length) throw new Error('The feed had no videos');

  for (const f of readdirSync(OUT)) if (/^yt-.*\.mdx$/.test(f)) rmSync(join(OUT, f));
  for (const v of entries.slice(0, LIMIT)) {
    const md = `---
title: ${JSON.stringify(v.title)}
date: ${v.date}
type: video
tags: [videos, tech]
caption: "On YouTube"
link: https://www.youtube.com/watch?v=${v.id}
linkLabel: Watch on YouTube
thumb: https://i.ytimg.com/vi/${v.id}/hqdefault.jpg
---
`;
    writeFileSync(join(OUT, `yt-${v.id}.mdx`), md);
  }
  console.log(`videos: wrote ${Math.min(entries.length, LIMIT)} entries from YouTube`);
} catch (err) {
  console.warn(`videos: skipped (${err.message}). Keeping what's already there.`);
}
