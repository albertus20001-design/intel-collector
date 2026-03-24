import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

function fetchUrl(url) {
  try {
    return { ok: true, body: execFileSync('curl', ['-L', '--fail', '--silent', '--show-error', url], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }) };
  } catch (e) {
    return { ok: false, body: `ERROR_FETCHING_URL\n${String(e.stderr || e.message || e)}` };
  }
}

function isBadContent(body, patterns) {
  return patterns.some((p) => body.includes(p));
}

function parseSourcesYaml(yml) {
  const lines = yml.split(/\r?\n/);
  const items = [];
  let vendor = null;
  let current = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
    if (m) { vendor = m[1]; continue; }
    m = line.match(/^\s{4}-\s+name:\s*(\S+)\s*$/);
    if (m) { current = { vendor, name: m[1], enabled: true, priority: 99, tags: [], rejectPatterns: [] }; items.push(current); continue; }
    m = line.match(/^\s{6}url:\s*(\S+)\s*$/);
    if (m && current) { current.url = m[1]; continue; }
    m = line.match(/^\s{6}enabled:\s*(true|false)\s*$/);
    if (m && current) { current.enabled = m[1] === 'true'; continue; }
    m = line.match(/^\s{6}priority:\s*(\d+)\s*$/);
    if (m && current) { current.priority = Number(m[1]); continue; }
    m = line.match(/^\s{6}tags:\s*\[(.*)\]\s*$/);
    if (m && current) { current.tags = m[1].split(',').map(s => s.trim()).filter(Boolean); continue; }
    m = line.match(/^\s{6}notes:\s*(.+)$/);
    if (m && current) { current.notes = m[1]; continue; }
    m = line.match(/^\s{6}rejectPatterns:\s*$/);
    if (m && current) { current.rejectPatterns = []; continue; }
    m = line.match(/^\s{8}-\s*(.+)\s*$/);
    if (m && current) { current.rejectPatterns.push(m[1]); continue; }
  }
  return items.filter(x => x.vendor && x.name && x.url && x.enabled !== false).sort((a,b)=>(a.priority??99)-(b.priority??99));
}

const sources = parseSourcesYaml(readFileSync('sources/index.yml', 'utf8'));
const stamp = new Date().toISOString();
for (const src of sources) {
  const result = fetchUrl(src.url);
  const file = `data/${src.vendor}/${src.name}.md`;
  mkdirSync(dirname(file), { recursive: true });
  if ((!result.ok || isBadContent(result.body, src.rejectPatterns)) && existsSync(file)) {
    console.log(`skipped ${file} (fetch failed or rejected, keeping existing snapshot)`);
    continue;
  }
  const meta = [
    `Source: ${src.url}`,
    src.tags?.length ? `Tags: ${src.tags.join(', ')}` : null,
    src.notes ? `Notes: ${src.notes}` : null,
  ].filter(Boolean).join('\n');
  const out = `# ${src.vendor} ${src.name}\n\nGenerated at: ${stamp}\n\n${meta}\n\n${result.body.trimEnd()}\n`;
  writeFileSync(file, out);
  console.log(`updated ${file}`);
}
