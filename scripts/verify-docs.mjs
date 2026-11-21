import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Offline, dependency-free verification of documentation handover entry points
// and local Markdown link targets. Run in CI on every PR.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'README.md', 'AGENTS.md', 'CONTRIBUTING.md',
  'docs/PROJECT_HISTORY.md', 'docs/CODEBASE_REFERENCE.md',
  'docs/AI_AGENT_PLAYBOOK.md', 'docs/SESSION_HANDOVER_PROMPT.md',
  'docs/DECISIONS.md', 'docs/ROADMAP.md',
  'docs/ARCHITECTURE.md', 'docs/SECURITY.md', 'docs/OPERATIONS.md',
  'docs/TESTING.md', 'docs/INTEGRATION.md', 'docs/rfcs/README.md',
  'docs/FEATURED_VISUAL_OPTIONS.md',
  'docs/adr/ADR-015-photographic-split-layout-exploration.md',
];
for (const file of required) {
  await access(path.join(root, file));
}

async function markdownFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await markdownFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) output.push(full);
  }
  return output;
}

const files = [
  ...await markdownFiles(path.join(root, 'docs')),
  ...await markdownFiles(path.join(root, '.github')),
  ...(await readdir(root, { withFileTypes: true }))
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => path.join(root, entry.name)),
];
let checked = 0;
const missing = [];
const repoRootPrefix = root + path.sep;
for (const file of [...new Set(files)]) {
  let markdown = await readFile(file, 'utf8');
  // Fenced code is literal example content, not live document navigation.
  markdown = markdown.replace(/^\s*```[^\n]*\n[\s\S]*?^\s*```\s*$/gm, '');
  for (const match of markdown.matchAll(/!?\[[^\]\n]+\]\(([^)\n]+)\)/g)) {
    let href = match[1].trim().replace(/^<|>$/g, '').split(/\s+"/)[0];
    if (!href || /^(?:https?:|mailto:|data:|#|\/\/)/i.test(href)) continue;
    href = href.split('#')[0].split('?')[0];
    if (!href) continue;
    try { href = decodeURIComponent(href); }
    catch { missing.push(file + ': invalid URL escape in ' + href); continue; }
    const resolved = path.resolve(path.dirname(file), href);
    if (resolved !== root && !resolved.startsWith(repoRootPrefix)) {
      missing.push(path.relative(root, file) + ': link escapes repository: ' + href);
      continue;
    }
    try {
      await access(resolved);
      checked++;
    } catch {
      missing.push(path.relative(root, file) + ': missing local target ' + href);
    }
  }
}
assert.deepEqual(missing, [], 'Documentation links must resolve within the repository');
console.log('Verified ' + required.length + ' handover files and ' +
  checked + ' local Markdown links in ' + [...new Set(files)].length + ' docs.');


// Design-reference assets are documentation-only, but must remain intact and locally renderable.
const referenceAssets = {
  'docs/assets/golden-archive.webp': { maxBytes: 1_000_000 },
  'docs/assets/cinematic-passage.webp': { maxBytes: 500_000 },
  'docs/assets/sun-light.webp': { sha256: 'd292f5b3f8306925b93f1db4b7bee77324072a01' },
  'docs/assets/sun-dark.webp': { sha256: '565156eb5da784cdf1c4117a5d300b05dae71d35' },
};
for (const [relative, expected] of Object.entries(referenceAssets)) {
  const bytes = await readFile(path.join(root, relative));
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', 'Expected WebP RIFF header: ' + relative);
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', 'Expected WebP payload: ' + relative);
  if (expected.maxBytes) assert.ok(bytes.length <= expected.maxBytes, 'Reference asset exceeds size budget: ' + relative);
  if (expected.sha256) assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256,
    'Shared Sun logo must remain byte-identical to the sibling app asset: ' + relative);
}
console.log('Verified four local design-reference WebP assets and shared Sun logo digests.');
