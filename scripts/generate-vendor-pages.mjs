const base = 'https://github.com/albertus20001-design/llm-collector/blob/main/';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const yml = readFileSync('sources/index.yml', 'utf8');
const lines = yml.split(/\r?\n/);
const vendors = {};
let vendor = null;
let current = null;
let inSources = false;
for (const raw of lines) {
  const line = raw.trimEnd();
  let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
  if (m) {
    vendor = m[1];
    current = null;
    inSources = false;
    vendors[vendor] = vendors[vendor] || [];
    continue;
  }
  m = line.match(/^\s{4}sources:\s*$/); if (m) { inSources = true; continue; }
  m = line.match(/^\s{6}-\s+name:\s*(\S+)\s*$/);
  if (m && inSources && vendor) {
    current = { name: m[1], outputPath: `data/${vendor}/${m[1]}.md` };
    vendors[vendor].push(current);
    continue;
  }
  m = line.match(/^\s{8}outputPath:\s*(\S+)\s*$/);
  if (m && current) { current.outputPath = m[1]; continue; }
}

for (const [v, sources] of Object.entries(vendors)) {
  const links = sources.map(({ name, outputPath }) => `- [${name}](${base}${outputPath})`).join('\n');
  const md = `# ${v}\n\nSource snapshots for ${v}.\n\n${links}\n`;
  for (const file of [`vendors/${v}.mdx`, `docs/vendors/${v}.md`]) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, md);
    console.log(`updated ${file}`);
  }
}
