import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const sources = [
  {
    name: 'claude',
    url: 'https://platform.claude.com/docs/en/about-claude/pricing.md',
  },
  {
    name: 'openai',
    url: 'https://developers.openai.com/api/docs/pricing.md',
  },
];

function fetchUrl(url) {
  try {
    return execFileSync('curl', ['-L', '--fail', '--silent', '--show-error', url], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  } catch (e) {
    return `ERROR_FETCHING_URL\n${String(e.stderr || e.message || e)}`;
  }
}

const stamp = new Date().toISOString();
let out = `# Model Pricing Snapshot\n\nGenerated at: ${stamp}\n\n`;
for (const src of sources) {
  const body = fetchUrl(src.url);
  out += `## ${src.name}\n\nSource: ${src.url}\n\n\
\
\
`;
  out += body.trimEnd() + '\n\n';
}

const file = 'data/pricing-snapshot.md';
const prev = existsSync(file) ? readFileSync(file, 'utf8') : '';
writeFileSync(file, out);
console.log(prev === out ? 'unchanged' : 'updated');
