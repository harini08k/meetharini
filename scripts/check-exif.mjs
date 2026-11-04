// Photos from a phone carry the place they were taken. The site's own copies are always cleaned
// (Astro re-encodes them), but the original file sits in the repo, so this flags any that still
// have a location. `npm run strip-exif` cleans them in place.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import exifr from 'exifr';
import sharp from 'sharp';

const fix = process.argv.includes('--fix');
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);

function* walk(dir) {
  let names = [];
  try {
    names = readdirSync(dir);
  } catch {
    return;
  }
  for (const n of names) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (exts.has(extname(n).toLowerCase())) yield p;
  }
}

let flagged = 0;
for (const dir of ['src/assets', 'public']) {
  for (const file of walk(dir)) {
    const gps = await exifr.gps(readFileSync(file)).catch(() => null);
    if (!gps) continue;
    flagged++;
    if (fix) {
      const clean = await sharp(file).rotate().toBuffer(); // applies the orientation, drops all metadata
      writeFileSync(file, clean);
      console.log(`cleaned: ${file}`);
    } else {
      console.warn(`has a location: ${file}  (run: npm run strip-exif)`);
    }
  }
}
if (!flagged) console.log('exif: no photo carries a location.');
