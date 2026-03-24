import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const yml = readFileSync('sources/index.yml', 'utf8');
const lines = yml.split(/\r?\n/);
const vendors = {};
let vendor = null;
let inSources = false;
for (const raw of lines) {
  const line = raw.trimEnd();
  let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
  if (m) { vendor = m[1]; vendors[vendor] = vendors[vendor] || []; continue; }
  m = line.match(/^\s{4}sources:\s*$/); if (m) { inSources = true; continue; }
  m = line.match(/^\s{6}-\s+name:\s*(\S+)\s*$/); if (m && inSources && vendor) { vendors[vendor].push(m[1]); continue; }
}

for (const [v, sources] of Object.entries(vendors)) {
  const md = `# ${v}\n\nSource snapshots for ${v}.\n\n` + sources.map(s => `- [${s}](../../data/${v}/${s}.md)`).join('\n') + '\n';
  const file = `docs/vendors/${v}.md`;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, md);
  console.log(`updated ${file}`);
}
