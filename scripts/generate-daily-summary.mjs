import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const path = 'DAILY_SUMMARY.md';
const stamp = new Date().toISOString();
const body = existsSync(path) ? readFileSync(path, 'utf8') : '# Daily Summary\n\n';
const next = `# Daily Summary\n\n- ${stamp}: refreshed raw snapshots and wiki outputs.\n` + body.split(/\r?\n/).slice(2).join('\n') + '\n';
writeFileSync(path, next);
console.log('updated DAILY_SUMMARY.md');
