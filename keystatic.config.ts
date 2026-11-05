import { config, collection, singleton, fields } from '@keystatic/core';

// This is the editor at /keystatic. Locally it edits files on disk.
// On the live site it signs in with GitHub and saves changes as commits to the repo,
// so every post is just a file in Git.
export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: { owner: 'harini08k', name: 'meetharini' } }
    : { kind: 'local' },

  ui: { brand: { name: 'meetharini.com' } },

  collections: {
    scrapbook: collection({
      label: 'Scrapbook entries',
      slugField: 'title',
      path: 'src/content/scrapbook/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        type: fields.select({
          label: 'What is it?',
          description: 'Post = a written page. Moment = a Polaroid. Log = notebook page with numbers. Travel = postcard. Thought = sticky note.',
          options: [
            { label: 'Post', value: 'post' },
            { label: 'Moment (Polaroid)', value: 'moment' },
            { label: 'Log (notebook)', value: 'log' },
            { label: 'Travel (postcard)', value: 'travel' },
            { label: 'Thought (sticky note)', value: 'thought' },
          ],
          defaultValue: 'moment',
        }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        tags: fields.multiselect({
          label: 'Shows up under',
          options: [
            { label: 'Tech', value: 'tech' },
            { label: 'Life', value: 'life' },
            { label: 'Travel', value: 'travel' },
            { label: 'Runs', value: 'runs' },
            { label: 'Thoughts', value: 'thoughts' },
          ],
          defaultValue: ['life'],
        }),
        caption: fields.text({ label: 'One-line hook or caption', multiline: true }),
        place: fields.text({ label: 'Place (optional)' }),
        showDay: fields.checkbox({ label: 'Show the day on the card', description: 'Untick if you only know the month.', defaultValue: true }),
        images: fields.array(
          fields.object({
            src: fields.image({
              label: 'Photo',
              directory: 'src/assets/scrapbook',
              publicPath: '../../assets/scrapbook/',
            }),
            alt: fields.text({ label: 'What is in the photo?', validation: { isRequired: true } }),
            id: fields.text({ label: 'Placeholder label (ignore)' }),
          }),
          { label: 'Photos', itemLabel: (p) => p.fields.alt.value || 'Photo' }
        ),
        stats: fields.array(
          fields.object({ label: fields.text({ label: 'Label' }), value: fields.text({ label: 'Number' }) }),
          { label: 'Numbers (logs)', itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}` }
        ),
        findings: fields.array(fields.text({ label: 'Finding' }), { label: 'What I found (logs)', itemLabel: (p) => p.value }),
        link: fields.url({ label: 'Link (optional)' }),
        linkLabel: fields.text({ label: 'Link text' }),
        content: fields.mdx({ label: 'Full post (optional)' }),
      },
    }),
  },

  singletons: {
    now: singleton({
      label: 'Now box',
      path: 'src/data/now',
      format: 'json',
      schema: {
        updated: fields.date({ label: 'Updated on', validation: { isRequired: true } }),
        building: fields.text({ label: 'Building', multiline: true }),
        alsoBuilding: fields.text({ label: 'Also building', multiline: true }),
        learning: fields.text({ label: 'Learning this month', multiline: true }),
        lookingFor: fields.text({ label: 'Looking for', multiline: true }),
        watching: fields.text({ label: 'Watching or reading (optional)', multiline: true }),
      },
    }),
  },
});
