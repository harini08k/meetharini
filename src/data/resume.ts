// All the résumé-layer copy lives here, so editing words never means touching layout code.
//
//   receipts     claim + proof for the Receipts section
//   moreProjects the expandable project cards (image = the IMG id of its screenshot)
//   experience   the two classified files; `redacted` alternates plain text and blacked-out words
//   now          built from now.json, which the editor writes
//   timeline     growth steps; `stack` feeds the skill list that lights up beside them
//   quickFacts / offTheClock   the About section

export const receipts = [
  {
    claim: 'I talk to users before I write code.',
    proof:
      'Before writing a line of BenchCall, I interviewed a friend who runs a weekly turf football game. His summary: “Organizing our weekly game feels like a second job.” That sentence became the product.',
    link: { label: 'Read the BenchCall story', href: '/projects/benchcall' },
  },
  {
    claim: 'I break my own systems on purpose.',
    proof:
      'BenchCall has 1,000+ automated tests, including the race where two people grab the last spot at the same moment. For ReachInbox, I killed the worker mid-wait to prove an email still sends once, on time.',
    link: { label: 'See the crash test', href: '/projects/reachinbox' },
  },
  {
    claim: 'I go straight to the source.',
    proof:
      "At FlutterCon Bangalore, I built Pixorama in a workshop run by Serverpod's creator. Ten months later, I placed 5th in Serverpod's own hackathon.",
    link: { label: 'Pixorama on GitHub', href: 'https://github.com/harini08k/pixorama' },
  },
  {
    claim: 'I learn things from the ground up.',
    proof:
      "I ran Serverpod's Starguide app on my machine just to understand how AI chat over documentation works, end to end. Then I wrote down everything that broke and how I fixed it.",
    link: {
      label: 'My Starguide notes',
      href: 'https://github.com/harini08k/serverpod_ai_chat/blob/main/HARINI_NOTES.md',
    },
  },
  {
    claim: 'I show up.',
    proof:
      'Boston Snowflake User Group, Snowflake User Group Chennai, FlutterCon Bangalore, tech conferences, and the **AWS Certified AI Practitioner (AIF-C01)** certification. That one adds the most to my career: it gave me the vocabulary of AI on the cloud (foundation models, RAG, agents, responsible AI) and the judgment to pick the right tool for each job. It is the difference between calling an AI API and designing the system around it.',
    link: { label: 'See them in the scrapbook', href: '/scrapbook/#tech' },
  },
];

export const moreProjects = [
  {
    name: 'Pixorama',
    line: "A shared pixel canvas where everyone draws at once, like Reddit's r/Place.",
    inside:
      "Built in a hands-on FlutterCon workshop led by Viktor Lidholt, the creator of Serverpod. One Serverpod endpoint holds the whole canvas, and every pixel change streams to every connected screen through Serverpod's Message Central. No database, and it reconnects on its own.",
    mine:
      'Started in the workshop, then made it mine. I built the WebSocket pub-sub sync that keeps many clients consistent at once, tracked down and fixed its race conditions, and tuned the Flutter UI to render smoothly under rapid-fire updates.',
    stack: ['Flutter', 'Dart', 'Serverpod', 'WebSockets'],
    image: 'IMG-06',
    href: 'https://github.com/harini08k/pixorama',
  },
  {
    name: 'Multimodal Agentic App',
    line: "Tell the app what's wrong by voice, by text or by circling it on a screenshot. The agent fixes it.",
    inside:
      "Your words and screenshot go to Gemini, which answers with function calls (tools) that update the app's UI or pull device info. It can also write a feedback report with action history and a priority tag. Imagen 3 generates profile pictures on the fly, and Gemini's Live API powers real-time, two-way voice conversations with the app.",
    mine:
      'My way into Flutter and Firebase AI. I followed a walkthrough of this app and built it end to end myself, to learn the stack properly.',
    stack: ['Flutter', 'Firebase AI Logic', 'Vertex AI', 'Gemini', 'Imagen 3'],
    image: 'IMG-07',
    href: 'https://github.com/harini08k/multimodal_agentic_app',
  },
  {
    name: 'Document Summarizer',
    line: 'Drop in a PDF, DOCX or TXT. Get the short version.',
    inside:
      'A Flutter app with a Flask backend and Gemini doing the summarizing. Preview the file first, choose how long the summary should be, sign in with Google and come back to your summary history any time.',
    mine: null,
    stack: ['Flutter', 'Flask', 'Gemini API', 'Firebase Auth', 'Firestore'],
    image: 'IMG-08',
    href: 'https://github.com/harini08k/summarizer_flutter_app',
  },
];

export const experience = [
  {
    org: 'SpearStreamZ Technologies',
    role: 'Full Stack Developer Intern',
    when: 'Dec 2025 to Mar 2026',
    redacted: ['Trained on the stack behind an AI-powered', 'ERP', 'that pulls', 'every department', 'into one system.'],
    intro:
      'SpearStreamZ is building an AI-powered ERP that pulls disconnected departmental processes into a single system. I joined as a full stack intern.',
    rows: [
      ['What I did', 'Structured training in TypeScript and Vue.js, focused on component-based frontend architecture and state management.'],
      ['What I built', "A photo gallery in Vue 3 and TypeScript as my hands-on final build, with a card grid, hover states and an image preview popup. It's my small contribution toward their ERP."],
      ['What it taught me', 'How a real team structures components and state so a big app stays sane.'],
    ],
    footer: { text: 'The ERP stays private, but the gallery is public.', link: { label: 'See the gallery code', href: 'https://github.com/harini08k/photo_gallery' } },
  },
  {
    org: 'Mock Placement Portal',
    role: 'Team project, core frontend',
    when: 'Jan to Mar 2026',
    redacted: ['Built the frontend', '1,000+', 'students use to check their', 'mock aptitude and GD', 'results.'],
    intro: 'A web platform where 1,000+ students check their mock aptitude and group discussion (GD) results.',
    rows: [
      ['My part', 'I built the core frontend completely: Google sign-in, the results views, and a performance analytics dashboard with interactive charts.'],
      ['The fun bit', "One click turns a student's results into a downloadable PDF report."],
      ['Shipped with', 'Docker, so it deploys the same way every time.'],
      ['What it taught me', 'Real users find every edge case. Design for them before launch.'],
    ],
    footer: { text: 'Private repo, so no code here. Happy to walk you through it in an interview.', link: null },
  },
];

import nowData from './now.json';

// The "Now" box is edited in the editor (Now box) and saved to now.json.
export const now = {
  updated: new Date(nowData.updated + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
  rows: [
    ['Building', nowData.building],
    ['Also building', nowData.alsoBuilding],
    ['Learning', nowData.learning],
    ['Looking for', nowData.lookingFor],
    ['Watching or reading', nowData.watching],
  ].filter(([, v]) => v && v.trim()),
};

export const timeline = [
  { when: 'Sep 2025', what: 'To-do app', copy: "HTML, CSS, vanilla JS and localStorage. Everyone starts with a to-do app. I'm not above it.", learned: 'State is just data you have to remember to save.', stack: ['HTML', 'CSS', 'JavaScript'] },
  { when: 'Sep 2025', what: 'Feedback dashboard', copy: 'My first real backend: Node, Express and MongoDB, with full CRUD and filters.', learned: 'How a request travels from a form, through an API, into a database and back.', stack: ['Node', 'Express', 'MongoDB'] },
  { when: 'Oct 2025', what: 'Google Vertex AI certification', copy: "Google's Vertex AI certification. Mostly curiosity.", learned: null, stack: ['Vertex AI'] },
  { when: 'Late 2025', what: 'First AI apps', copy: 'A Flutter app that summarizes documents with Gemini. Then an agent that changes the app when you complain about it.', learned: 'Calling a model is the easy part. Designing the tools it can use is the real work.', stack: ['Flutter', 'Gemini', 'Firebase'] },
  { when: 'Dec 2025', what: 'FlutterCon and Pixorama', copy: "Built a real-time pixel canvas in a workshop with Serverpod's creator. Got hooked on real-time.", learned: 'Real-time is about agreement: every screen has to show the same truth, even when two people act at once.', stack: ['Serverpod', 'WebSockets'] },
  { when: 'Dec 2025 to Mar 2026', what: 'SpearStreamZ internship', copy: 'Structured training in TypeScript and Vue, finished with a photo gallery built toward their ERP.', learned: 'Small, typed, reusable components beat one giant file every time.', stack: ['TypeScript', 'Vue'] },
  { when: 'Jan to Mar 2026', what: 'Mock Placement Portal', copy: 'Built the core frontend of a results platform 1,000+ students use.', learned: 'Real users find every edge case. Design for them before launch.', stack: ['React', 'OAuth', 'Docker'] },
  { when: 'Jul 2026', what: 'AWS Certified AI Practitioner', copy: 'Passed the AIF-C01 exam on 4 July. Fun to study, and it changed how I think about AI on the cloud.', learned: 'The vocabulary of AI on the cloud: models, RAG, agents, and when to use which.', stack: ['AWS'] },
  { when: 'Aug 2026', what: 'ReachInbox Scheduler', copy: 'Delayed jobs, atomic rate limits and crash-proof sends. Backend got serious.', learned: 'Make the database the source of truth, then design for the crash before it happens.', stack: ['BullMQ', 'Redis', 'PostgreSQL', 'Next.js'] },
  { when: 'Oct 2026', what: 'BenchCall, 5th place', copy: 'Solo. 1,000+ tests. The last spot can never go to two people.', learned: 'Talk to the user first. And "it worked when I clicked it" isn\'t proof; tests are.', stack: ['Serverpod 4', 'PostgreSQL'] },
  { when: 'Now', what: 'Proctoring and this site', copy: 'Still going.', learned: null, stack: [] },
];

export const quickFacts = [
  'Based in Chennai',
  'Bachelor of Engineering in Computer Science at Sri Venkateswara College of Engineering (Anna University), class of 2028',
  'CGPA 8.23',
  '**AWS Certified AI Practitioner (AIF-C01)**, Jul 2026. It taught me the vocabulary of AI on the cloud: models, RAG, agents, and when to use which.',
  'Google Vertex AI certification (Oct 2025)',
  'Member, Snowflake User Group Chennai',
];

export const offTheClock = [
  "My perfect Sunday: late morning, a LeetCode problem, a really good chicken biriyani, pickleball with the family, an afternoon nap, a quick night run, and a movie if there's time. Romcoms only.",
  'I started running a few months ago for the Strava posts. Now I run at least twice a week because I actually love it.',
  "Give me a recipe I've never made and I'll nail it on the first try. Every time. Turns out following instructions precisely is a transferable skill.",
  'New York last year stole my heart. Next up: Paris and Seoul.',
];
