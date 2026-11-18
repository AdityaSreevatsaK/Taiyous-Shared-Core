# Shared Core Development, Build and Release Runbook

## Workspace setup
Node.js 22+, npm and Git are required. This is a private three-workspace repository: `@taiyou/contracts`, `@taiyou/ui` and `@taiyou/hub`. No paid cloud service or secret is required.

```bash
npm install --no-audit --no-fund
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
npm run dev
```

The root `test` and `test:browser` scripts build the local libraries first so standalone test invocations do not depend on stale `dist` files. The Vite dev server is local, usually at http://127.0.0.1:5173.

## Reproducible dependencies and blocked Actions
The initial scaffold did not commit a workspace `package-lock.json`. Generate the lockfile with a **real** Node 22 npm install from a trusted network, review it, commit it, and switch `.github/workflows/ci.yml` to `npm ci` with lockfile-backed caching. Never hand-craft a lockfile or claim CI is deterministic without it.

Initial GitHub Actions runs failed before a runner executed any steps. The observed job has an empty steps array; job logs are unavailable. Account-level Actions runner/billing/usage settings may require owner access. Once jobs can start, rerun and record job URLs and exact commit SHA. Do not disable required security gates as a workaround.

## Hub destination ownership
`.env.example` lists **public** `VITE_*` destinations only. Never store secrets. The Novel Library URL is the only verified default. For an optional module: confirm a working HTTPS deployment belongs to the owner, check the destination with a normal browser, and only then set its `VITE_*` value. URL parsing rejects credentials, local hosts, non-HTTPS, query parameters and fragments; this is **not proof of site ownership**. Invalid/missing links render planned tiles.

## PR and release boundaries
Feature branches from `master`; keep changes and reviews focused. Independent media repositories do not import this source automatically. No deployment, GitHub visibility changes, package publishing, live media access or SSO without separate owner approval. Future Cloudflare Pages release requires a domain choice, CSP/header review, screenshot/keyboard acceptance, `apps/hub/dist` output, manual production approval and a rollback.

## Troubleshooting
After installing, verify `packages/contracts/dist/index.js` and `packages/ui/dist/index.js` exist. Running `npm test` from the root builds these automatically. If GitHub Actions still fails with no executed steps, investigate account/runner scheduling instead of treating it as a TypeScript failure. Revert a problematic PR as a code rollback; publishing and app deployment are independent.
