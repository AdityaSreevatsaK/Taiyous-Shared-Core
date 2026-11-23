import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// Validate built static output, not a hypothetical deployed response.
const dist = new URL('../apps/hub/dist/', import.meta.url);
const [index, headers, assets] = await Promise.all([
  readFile(new URL('index.html', dist), 'utf8'),
  readFile(new URL('_headers', dist), 'utf8'),
  readdir(new URL('assets/', dist)),
]);
assert.equal(headers.split(/\r?\n/, 1)[0], '/*', 'Headers must apply to all static routes');
for (const header of [
  'Content-Security-Policy:', 'Referrer-Policy: no-referrer',
  'X-Content-Type-Options: nosniff', 'X-Frame-Options: DENY',
  'Permissions-Policy:', 'Cross-Origin-Resource-Policy: same-origin',
]) {
  assert.ok(headers.includes('  ' + header), 'Missing response header: ' + header);
}
const csp = headers.split('\n').find(line => line.startsWith('  Content-Security-Policy: '));
assert.ok(csp, 'Missing CSP');
for (const directive of [
  "default-src 'none'", "script-src 'self'", "style-src 'self'",
  "connect-src 'none'", "object-src 'none'", "frame-ancestors 'none'",
  "form-action 'none'", "base-uri 'none'",
]) {
  assert.ok(csp.includes(directive), 'Missing strict CSP directive: ' + directive);
}
assert.ok(assets.some(name => name.endsWith('.js')), 'No bundled JavaScript');
assert.match(index, /\/assets\/[^"'\s]+\.js/, 'HTML must reference bundled local JS');
assert.doesNotMatch(index, /<script\b(?![^>]*\bsrc=)/i, 'Inline script would violate CSP');
// In GitHub Actions and Cloudflare Pages the build must identify its exact source SHA.
const sha = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA;
if (sha) {
  assert.match(sha, /^[0-9a-f]{40}$/i, 'Invalid deployment SHA in build environment');
  const revision = JSON.parse(await readFile(new URL('release.json', dist), 'utf8'));
  assert.deepEqual(revision, { commit: sha.toLowerCase() }, 'Built release manifest must identify this exact commit');
}
assert.ok(headers.replaceAll('\r\n', '\n').includes('/release.json\n  Cache-Control: no-store'), 'Deployment marker must not be cached');
console.log('Verified built Hub assets, deployment revision and static security header policy.');

const { createHash } = await import('node:crypto');
const illustrationHashes = {
  'novels.avif': '954608525c6478e3a70024db85a9cb265bb43c5428ddcaa5144dde9123d3c93f',
  'manga.avif': 'adc208b8c9b4349ea8f238b6791fd60785fd99430ef9613fdcdd4bf6e70ab64f',
  'anime.avif': '085fa725f5d0e4b6a4dc65e85002d4011c93bcee1de6e39ecd4f63e325f277f8',
  'movies-tv.avif': '06064325fadf3f566f8b528a885c2a7c90ea2339b029ca0fabef0cec7351262b',
};
for (const [filename, expected] of Object.entries(illustrationHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected,
    'Unexpected card artwork contents: ' + filename);
}
const landscape = await readFile(new URL('art/landscape.avif', dist));
assert.equal(createHash('sha256').update(landscape).digest('hex'), '674811f513949bbc447cb095a847add286ea125438a3c6e5b04ad79301491854', 'Unexpected sakura landscape artwork');
assert.match(await readFile(new URL('art/waves.svg', dist), 'utf8'), /<svg/, 'Missing seigaiha decoration');
console.log('Verified four approved card illustrations and self-hosted hero artwork.');


for (const asset of ['branding/hub-sun.svg','branding/hub-sun-logo.svg','branding/header-sakura.svg']) {
  const svg=await readFile(new URL(asset,dist),'utf8');
  assert.match(svg,/<svg\b/, 'Missing original local SVG artwork: '+asset);
  assert.doesNotMatch(svg,/<script\b/i, 'Decorative SVG must not contain scripts: '+asset);
}
console.log('Verified vector sunrise logo, favicon and header blossoms.');


// Exact SHA-256 hashes tie the visible cards to the approved detailed artwork,
// preventing a simplified replacement from accidentally reaching production.
const detailedArtworkHashes = {
  'novels-art.webp': '2f426b4cd1203d69b64b4f991e1b60d6693d46928e3d18270dd24684c06aec11',
  'manga-art.webp': '8a41a4b7826642376b9ce50561c44d5ec2a9fb547a9093275b6f006dd79d46e3',
  'anime-art.webp': '53e2145d9c2dff1e6f1cc07eda1ca5e550c1db87cb13a2c99a45e13178196e1e',
  'movies-tv-art.webp': 'ed165c245817afee91d8eb5653a9ae07cdd5251db75d345ddd97cf7392f6d90b',
};
for (const [filename, expectedHash] of Object.entries(detailedArtworkHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', 'Expected a WebP RIFF image: ' + filename);
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', 'Expected a WebP image: ' + filename);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedHash,
    'Incorrect original detailed Hub artwork: ' + filename);
}
console.log('Verified the four exact high-resolution original media artworks.');

const observatory = await readFile(new URL('art/amber-observatory.svg', dist), 'utf8');
assert.match(observatory, /<svg[^>]*viewBox="0 0 900 1050"/, 'Missing original observatory illustration');
assert.doesNotMatch(observatory, /<(?:script|foreignObject)\\b/i, 'No executable or embedded foreign markup in illustration');
assert.match(index, /amber-observatory\\.svg/, 'Preload the local observatory background');
console.log('Verified original code-rendered observatory illustration and preload.');
