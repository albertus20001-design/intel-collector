import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const path = 'CHANGELOG.md';
const prev = existsSync(path) ? readFileSync(path, 'utf8') : '# Changelog\n\n';
const stamp = new Date().toISOString();
const next = `# Changelog\n\n- ${stamp}: refreshed source snapshots, index, and README.\n` + prev.split(/\r?\n/).slice(2).join('\n') + '\n';
writeFileSync(path, next);
console.log('updated CHANGELOG.md');
