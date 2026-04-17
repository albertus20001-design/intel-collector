import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const base = 'https://github.com/albertus20001-design/llm-collector/blob/main/';

function parseSourcesYaml(yml) {
  const lines = yml.split(/\r?\n/);
  const vendors = {};
  let vendor = null;
  let current = null;
  let inSources = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
    if (m) { vendor = m[1]; vendors[vendor] = vendors[vendor] || { group: '', sources: [] }; continue; }
    m = line.match(/^\s{4}group:\s*(\S+)\s*$/); if (m && vendor) { vendors[vendor].group = m[1]; continue; }
    m = line.match(/^\s{4}sources:\s*$/); if (m) { inSources = true; continue; }
    m = line.match(/^\s{6}-\s+name:\s*(\S+)\s*$/); if (m && inSources && vendor) { current = { name: m[1] }; vendors[vendor].sources.push(current); continue; }
    m = line.match(/^\s{8}outputPath:\s*(\S+)\s*$/); if (m && current) { current.outputPath = m[1]; continue; }
  }
  return vendors;
}

const vendors = parseSourcesYaml(readFileSync('sources/index.yml', 'utf8'));
let md = `# Llm Collector Wiki\n\nGenerated from \`sources/index.yml\`.\n\nThis index points to the raw source snapshots stored under \`raw/\`.\n\n`;
for (const [vendor, info] of Object.entries(vendors)) {
  md += `## ${vendor} (${info.group || 'ungrouped'})\n\n`;
  for (const src of info.sources) {
    const file = src.outputPath || 'raw/' + vendor + '/' + src.name + '.md';
    md += `- [${src.name}](${base}${file})\n`;
  }
  md += '\n';
}
mkdirSync(dirname('wiki/index.md'), { recursive: true });
writeFileSync('wiki/index.md', md);
console.log('updated wiki/index.md');
