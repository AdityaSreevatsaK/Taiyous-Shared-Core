# Shared Core Development, Build and Release Runbook

## Workspaces and prerequisites
Node.js 22+, npm, Git; Windows PowerShell and Linux supported. No paid cloud account or token is required for the scaffold. Workspaces: `@taiyou/contracts`, `@taiyou/ui`, `@taiyou/hub`. The contracts and UI libraries compile before the hub imports their `dist` output.

~~~powershell
git clone https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core.git
cd Taiyous-Shared-Core
npm install
npm run typecheck
npm test
npm run build
npm run dev
~~~

`npm run dev` builds libraries first, then starts Vite; change a shared package and rerun its build to refresh the current experimental hub. This is not HMR-connected workspace publishing.

## Lockfile and dependencies
An initial lockfile was not committed with scaffolding. `npm install` generates `package-lock.json` covering **all npm workspaces**. Commit it in the first dependency PR and switch CI from `npm install` to `npm ci` with lockfile-backed caching. Review dependency advisories before a real deployment. Avoid silent 'latest' upgrades.

## Quality checks
`npm run typecheck`: all workspaces. `npm test`: pure contract and module-registry tests. `npm run build`: TypeScript build for contracts/UI followed by Vite hub. UI/browser E2E is NOT yet present and must be added before production.

## Environment and deployment
`.env.example` contains only public optional URLs. Vite includes values of `VITE_*` variables in the browser; **never place secrets**. No automatic deployment is configured. To propose Cloudflare Pages: decide project name/domain, static output `apps/hub/dist`, build command `npm run build`, CSP/headers, custom-domain ownership, accessibility and manually gated production process. Owner approval required before creation or publishing.

## PR conventions
Feature branch from latest `master`, clear issue/ADR reference, tests, architecture impact and no implied changes to other repos. Changes to package APIs require a consumer-compatibility table, semver plan and manual migration/rollback. Never push directly to the Novel Library.

## Build failures
Check Node version, root workspace installation, `packages/contracts/dist/index.js` and `packages/ui/dist/index.js` after build. Package workspaces are private and unpublished; external repos cannot resolve them without an approved distribution process. Do not work around this by copying artifacts blindly.

## Recovery
Code: revert commit/PR and re-run checks. Hub deployment (future): redeploy last known-good build, validate HTTPS links, avoid changing media repo DNS. No catalogue data lives in the hub and it must never become a hidden source of truth.
