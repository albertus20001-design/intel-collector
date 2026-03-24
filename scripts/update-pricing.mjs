import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const sources = [
  {
    vendor: 'claude',
    name: 'pricing',
    url: 'https://platform.claude.com/docs/en/about-claude/pricing.md',
    rejectPatterns: ['App unavailable in region'],
  },
  {
    vendor: 'claude',
    name: 'api',
    url: 'https://docs.claude.com/en/api/messages',
    rejectPatterns: [],
  },
  {
    vendor: 'openai',
    name: 'pricing',
    url: 'https://developers.openai.com/api/docs/pricing.md',
    rejectPatterns: [],
  },
  {
    vendor: 'openai',
    name: 'api',
    url: 'https://platform.openai.com/docs/api-reference/introduction',
    rejectPatterns: [],
  },
];

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

const stamp = new Date().toISOString();
for (const src of sources) {
  const result = fetchUrl(src.url);
  const file = `data/${src.vendor}/${src.name}.md`;
  mkdirSync(dirname(file), { recursive: true });

  if ((!result.ok || isBadContent(result.body, src.rejectPatterns)) && existsSync(file)) {
    console.log(`skipped ${file} (fetch failed or rejected, keeping existing snapshot)`);
    continue;
  }

  const out = `# ${src.vendor} ${src.name}\n\nGenerated at: ${stamp}\n\nSource: ${src.url}\n\n${result.body.trimEnd()}\n`;
  writeFileSync(file, out);
  console.log(`updated ${file}`);
}
