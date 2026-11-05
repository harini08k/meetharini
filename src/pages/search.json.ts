import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { receipts, moreProjects, experience, timeline } from '../data/resume';

// A tiny search index, built at deploy time. The ⌘K box reads it.
export const GET: APIRoute = async () => {
  const items: { title: string; text: string; href: string; kind: string }[] = [
    { title: 'BenchCall', kind: 'Project', href: '/projects/benchcall', text: 'Turf game organizer, Flutter, Serverpod, Postgres, row locks, replacement chain, 5th place hackathon, 1,000+ tests' },
    { title: 'ReachInbox Scheduler', kind: 'Project', href: '/projects/reachinbox', text: 'Email scheduler, BullMQ, Redis, delayed jobs, rate limits, Postgres, Prisma, Next.js, Slack, Elasticsearch' },
    ...moreProjects.map((p: any) => ({ title: p.name, kind: 'Project', href: '/#more', text: `${p.line ?? ''} ${p.inside ?? ''} ${p.mine ?? ''} ${(p.stack ?? []).join(' ')}` })),
    ...receipts.map((r: any) => ({ title: r.claim, kind: 'Receipt', href: '/#receipts', text: (r.proof ?? '').replaceAll('**', '') })),
    ...experience.map((x: any) => ({ title: x.org, kind: 'Work', href: '/#work', text: `${x.role ?? ''} ${x.intro ?? ''}` })),
    ...timeline.map((t: any) => ({ title: t.what, kind: 'Timeline', href: '/#growth', text: `${t.copy ?? ''} ${t.learned ?? ''} ${(t.stack ?? []).join(' ')}` })),
    { title: 'About', kind: 'About', href: '/#about', text: 'Chennai SVCE CSE Anna University CGPA AWS Certified AI Practitioner Vertex AI Snowflake User Group Chennai YouTube running pickleball biriyani' },
  ];
  const entries = await getCollection('scrapbook');
  for (const e of entries) {
    items.push({
      title: e.data.title,
      kind: 'Scrapbook',
      href: `/scrapbook/#e-${e.id}`,
      text: `${e.data.caption ?? ''} ${e.data.place ?? ''} ${e.data.tags.join(' ')}`,
    });
  }
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
