import { readFileSync } from 'node:fs';

const text = readFileSync('sources/index.yml', 'utf8');
const lines = text.split(/\r?\n/);
let vendors = 0;
let currentVendor = null;
let current = null;
let seen = new Set();

for (const raw of lines) {
  const line = raw.trimEnd();
  if (!line || line === 'vendors:') continue;
  let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
  if (m) { currentVendor = m[1]; vendors++; continue; }
  m = line.match(/^\s{4}-\s+name:\s*(\S+)\s*$/);
  if (m) { current = { name: m[1], enabled: true }; continue; }
  m = line.match(/^\s{6}url:\s*(\S+)\s*$/);
  if (m) continue;
  m = line.match(/^\s{6}enabled:\s*(true|false)\s*$/);
  if (m && current) { current.enabled = m[1] === 'true'; continue; }
  m = line.match(/^\s{6}priority:\s*(\d+)\s*$/);
  if (m) continue;
  m = line.match(/^\s{6}tags:\s*\[(.*)\]\s*$/);
  if (m) continue;
  m = line.match(/^\s{6}notes:\s*(.+)$/);
  if (m) continue;
  m = line.match(/^\s{6}rejectPatterns:\s*$/);
  if (m) continue;
  m = line.match(/^\s{8}-\s*(.+)\s*$/);
  if (m) continue;
}
if (vendors === 0) throw new Error('No vendors found');
console.log(`validated ${vendors} vendors`);
