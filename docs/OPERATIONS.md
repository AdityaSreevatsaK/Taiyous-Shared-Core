# Shared Core Development, Build and Release Runbook

## Workspaces
This GitHub repository is **public**; source packages `@taiyou/contracts@0.0.0` and `@taiyou/ui@0.0.0` are still private, unpublished npm workspaces. The Hub (`@taiyou/hub`) is a separate workspace with Cloudflare Pages Git integration connected to `master`; independently verified public HTTP/security headers as of the 20 November 2026 smoke run; manual visual and screen-reader checks remain pending.

Requirements: Node.js 22+, npm 10+, Git. No cloud token, paid API or media assets required.

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm test
npm run build
node scripts/verify-hub-static.mjs
npx playwright install chromium firefox webkit
npm run test:browser
npm run dev
```

The root `test` and `test:browser` commands rebuild experimental local packages to avoid testing stale `dist`. Vite's local dev server defaults to http://127.0.0.1:5173.

## Reproducible installation and Actions
The first Actions runs failed without executing steps. **That historical runner issue is resolved after the owner made the repository public.** The lockfile was generated and committed by a temporary, branch-limited Node 22 workflow, which was then removed. Do not hand-edit or silently re-resolve `package-lock.json`; review npm dependency changes in focused PRs.

`.github/workflows/ci.yml` now requires:
- A clean `npm ci`, typecheck, unit tests and production build on Ubuntu and Windows.
- Production-only high/critical npm audit on Ubuntu.
- Playwright Chromium, Firefox and WebKit keyboard, responsive and automated WCAG A/AA checks, plus per-engine screenshot artifacts for visual review.
- Read-only GITHUB_TOKEN in ordinary CI; pinned official action commits; no auto-deploy, publishing or paid API calls.

Example verified Node 22 locked-install/quality/browser run: [44313286935](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44313286935), PR branch commit `68e55bfa22510733bed208e9fedeeb7038deefe4`. Cross-browser extension passed [run 44316165382](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44316165382) with 39 browser tests across three engines. Later changes require their **own** green run. Follow [validation status](VALIDATION_STATUS_2026-11-18.md) for history.

## Public navigation destinations
`.env.example` lists **public-only** `VITE_*` URLs. The existing Novel Library is the sole verified default; other apps remain non-interactive until the owning agent confirms a real, owner-controlled HTTPS deployment. URL parsing rejects non-HTTPS, embedded credentials, local/IP hosts, alternate ports, queries and fragments. URL syntax alone does **not** verify site ownership. Do not put OAuth tokens, private media, reading history or credentials in frontend environment variables.

## Staged-release policy
Cloudflare Pages now reports green deployment checks for the Hub on `master`. The configured project is `taiyous-shared-core`; the proposed hostname is `https://taiyous-shared-core.pages.dev/`. After each safe merge, inspect the matching Cloudflare status and [live GitHub-hosted HTTP/header smoke check](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44592153330). Then manually inspect visual layout, JS console, keyboard/screen-reader navigation and the independent Novel Library link from a real browser. If access to Cloudflare settings or the deployed URL is unavailable, report that limitation rather than asserting success. Vite copies `apps/hub/public/_headers` into the built static output. CI checks the built file and assets, but only HTTP inspection after a future staging deployment can establish that Cloudflare actually serves the intended headers. See [Hub deployment preparation](HUB_DEPLOYMENT_PREPARATION.md).

## Release controls
Never infer a working production page solely from a passing GitHub build or Cloudflare check. The Hub has no login server, shared database or synchronised media data. The existing owner-configured Pages project must still be checked for actual live access, CSP/referrer/frame headers, manual visual/screen-reader quality and rollback. Merging a safe, green PR is approved; changes to authentication, site privacy posture, domains, secrets or paid infrastructure are not blanket-approved. No sibling-repository changes, force pushes, visibility changes or package publication are authorised here.

## Recovery
Revert affected commits/PRs and rerun the matrix; package version `0.0.0` has no external subscribers. When a runner fails before steps, investigate GitHub Actions entitlement/usage rather than treating it as an application failure. On a deployed-site regression, restore a previous reviewed Pages deployment or revert the affected `master` commit and rerun checks, independently of all media apps.

## Approved artwork pending integration
See [Branding integration](BRANDING_INTEGRATION.md). The owner supplied the final original ZIP, but the exact logo and favicon binaries have not been committed. Do not point the deployed Hub at nonexistent assets or substitute older novel-reader branding.

## Proving the exact deployed revision
The Cloudflare Pages build publishes a minimal `/release.json` from the injected `CF_PAGES_COMMIT_SHA` (GitHub CI uses `GITHUB_SHA`). The independent live workflow supplies its triggering `master` commit as `EXPECTED_COMMIT_SHA` and refuses to accept a stale live build, while respecting bounded Cloudflare propagation retries. Review this marker and the public Pages hostname after each merge. It contains no credentials or media data.
