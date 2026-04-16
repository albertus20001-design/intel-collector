import { existsSync, readFileSync, readdirSync } from 'node:fs';

const text = readFileSync('sources/index.yml', 'utf8');
const lines = text.split(/\r?\n/);
let vendors = 0, groups = 0, sources = 0;
let inSources = false;
let currentVendor = null;
let currentSource = null;
const outputPaths = [];
const problems = [];
const badMarkers = [
  'ERROR_FETCHING_URL',
  'Author Not Found',
  '<title>403: Forbidden</title>',
  '403: Forbidden',
  'Just a moment...',
  'Enable JavaScript and cookies to continue',
  'Attention Required! | Cloudflare',
  'cf-challenge',
  '__cf_chl_tk'
];

for (const raw of lines) {
  const line = raw.trimEnd();
  if (!line || line === 'vendors:') continue;
  let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
  if (m) {
    vendors++;
    currentVendor = m[1];
    currentSource = null;
    inSources = false;
    continue;
  }
  m = line.match(/^\s{4}group:\s*(\S+)\s*$/);
  if (m) { groups++; continue; }
  m = line.match(/^\s{4}sources:\s*$/);
  if (m) { inSources = true; continue; }
  m = line.match(/^\s{6}-\s+name:\s*(\S+)\s*$/);
  if (m && inSources) {
    sources++;
    currentSource = { vendor: currentVendor, outputPath: `data/${currentVendor}/${m[1]}.md` };
    outputPaths.push(currentSource.outputPath);
    continue;
  }
  m = line.match(/^\s{8}outputPath:\s*(\S+)\s*$/);
  if (m && currentSource) {
    currentSource.outputPath = m[1];
    outputPaths[outputPaths.length - 1] = m[1];
    continue;
  }
}
if (vendors === 0 || sources === 0) throw new Error('No vendors or sources found');

const seen = new Set();
for (const path of outputPaths) {
  if (seen.has(path)) problems.push(`duplicate outputPath: ${path}`);
  seen.add(path);
  if (!existsSync(path)) {
    problems.push(`missing snapshot file: ${path}`);
    continue;
  }
  const body = readFileSync(path, 'utf8');
  if (badMarkers.some((marker) => body.includes(marker))) {
    problems.push(`bad snapshot content: ${path}`);
  }
}

for (const vendor of readdirSync('data', { withFileTypes: true })) {
  if (!vendor.isDirectory()) continue;
  for (const entry of readdirSync(`data/${vendor.name}`, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const path = `data/${vendor.name}/${entry.name}`;
    if (!seen.has(path)) problems.push(`orphan snapshot file: ${path}`);
  }
}

if (problems.length) {
  throw new Error(`Validation failed:\n- ${problems.join('\n- ')}`);
}

console.log(`validated ${vendors} vendors, ${groups} groups, ${sources} sources`);
