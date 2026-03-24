import { readFileSync } from 'node:fs';

const text = readFileSync('sources/index.yml', 'utf8');
const lines = text.split(/\r?\n/);
let vendors = 0, groups = 0, sources = 0;
let inSources = false;

for (const raw of lines) {
  const line = raw.trimEnd();
  if (!line || line === 'vendors:') continue;
  let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
  if (m) { vendors++; inSources = false; continue; }
  m = line.match(/^\s{4}group:\s*(\S+)\s*$/);
  if (m) { groups++; continue; }
  m = line.match(/^\s{4}sources:\s*$/);
  if (m) { inSources = true; continue; }
  m = line.match(/^\s{6}-\s+name:\s*(\S+)\s*$/);
  if (m && inSources) { sources++; continue; }
}
if (vendors === 0 || sources === 0) throw new Error('No vendors or sources found');
console.log(`validated ${vendors} vendors, ${groups} groups, ${sources} sources`);
