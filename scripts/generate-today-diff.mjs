import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

function changedFiles() {
  try {
    const out = execFileSync('git', ['diff', '--name-only', '--', 'data'], { encoding: 'utf8' });
    return out.split(/\r?\n/).filter(Boolean);
  } catch {
    return [];
  }
}

function classify(name) {
  if (/pricing/i.test(name)) return '价格';
  if (/rate-limits?/i.test(name)) return '限流';
  if (/error/i.test(name)) return '错误';
  if (/model/i.test(name)) return '模型';
  if (/chat|responses?|introduction|messages|completions|api/i.test(name)) return '接口';
  return '其他';
}

function label(name) {
  const map = [
    [/pricing/i, '价格页'],
    [/api-introduction/i, 'API 总览'],
    [/api-messages/i, '消息接口'],
    [/api-completions/i, '补全接口'],
    [/api-chat/i, '聊天接口'],
    [/api-responses/i, 'Responses 接口'],
    [/api-models/i, '模型页'],
    [/api-errors/i, '错误码页'],
    [/api-error-codes/i, '错误码页'],
    [/api-rate-limits/i, '限流页'],
    [/api-structured-output/i, '结构化输出页'],
    [/api-overview/i, 'API 概览页'],
  ];
  for (const [re, text] of map) if (re.test(name)) return text;
  return name;
}

const files = changedFiles();
const vendors = new Map();
for (const file of files) {
  const m = file.match(/^data\/([^/]+)\//);
  if (!m) continue;
  const vendor = m[1];
  if (!vendors.has(vendor)) vendors.set(vendor, []);
  vendors.get(vendor).push(file.replace(`data/${vendor}/`, ''));
}

let md = '# Today Diff\n\n';
if (files.length === 0) {
  md += '今日无关键变化。\n';
} else {
  md += `今日有 ${files.length} 个数据文件变化。\n\n`;
  for (const [vendor, items] of vendors.entries()) {
    md += `## ${vendor}\n`;
    const groups = new Map();
    for (const item of items) {
      const bucket = classify(item);
      if (!groups.has(bucket)) groups.set(bucket, []);
      groups.get(bucket).push(item);
    }
    for (const [bucket, list] of groups.entries()) {
      md += `### ${bucket}\n`;
      for (const item of list) md += `- ${label(item)} (${item})\n`;
    }
    md += '\n';
  }
}
writeFileSync('TODAY_DIFF.md', md);
console.log('updated TODAY_DIFF.md');
