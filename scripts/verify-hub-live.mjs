// Independent live deployment check. Uses only public HTTPS requests, no secrets.
const HUB_URL = process.env.HUB_PUBLIC_URL || 'https://taiyous-shared-core.pages.dev/';
const url = new URL(HUB_URL);
if (url.protocol !== 'https:' || url.username || url.password ||
  url.search || url.hash || url.port || url.pathname !== '/') {
  throw new Error('Live Hub URL must be a public HTTPS origin root');
}

const checks = [
  ['content-security-policy', ["default-src 'none'", "script-src 'self'", "connect-src 'none'", "frame-ancestors 'none'"]],
  ['referrer-policy', ['no-referrer']],
  ['x-content-type-options', ['nosniff']],
  ['x-frame-options', ['deny']],
  ['permissions-policy', ['camera=()', 'microphone=()', 'geolocation=()']],
  ['cross-origin-resource-policy', ['same-origin']],
];

async function get(path) {
  const resource = new URL(path, url);
  const response = await fetch(resource, {
    redirect: 'manual',
    signal: AbortSignal.timeout(12000),
    headers: { 'User-Agent': 'Taiyou-Shared-Core-Live-Smoke/1.0' },
  });
  if (response.status !== 200) {
    throw new Error(`${resource.pathname}: expected HTTP 200, received ${response.status}`);
  }
  return response;
}

async function verify() {
  const response = await get('/');
  for (const [name, required] of checks) {
    const value = (response.headers.get(name) || '').toLowerCase();
    for (const token of required) {
      if (!value.includes(token)) {
        throw new Error(`Missing ${name} directive: ${token}`);
      }
    }
  }
  const html = await response.text();
  if (!html.includes('id="root"') || !html.includes('/theme-bootstrap.js')) {
    throw new Error('Live Hub HTML is missing the React mount or early theme bootstrap');
  }
  const bootstrap = await get('/theme-bootstrap.js');
  const code = await bootstrap.text();
  if (!code.includes('taiyou-hub-theme') || !code.includes('document.documentElement.dataset.theme')) {
    throw new Error('Deployed theme bootstrap is missing the expected persisted-theme behaviour');
  }
  console.log(`Verified live Hub: ${url.origin}, HTTP 200, required security headers, React mount and six-theme bootstrap`);
}

let last;
for (let attempt = 1; attempt <= 8; attempt++) {
  try {
    await verify();
    process.exit(0);
  } catch (error) {
    last = error;
    console.error(`Attempt ${attempt}/8 failed: ${error instanceof Error ? error.message : String(error)}`);
    if (attempt < 8) await new Promise(resolve => setTimeout(resolve, 10000));
  }
}
throw last;
