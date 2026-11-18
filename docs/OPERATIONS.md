# Shared Core Development, Build and Release Runbook

## Workspaces
This GitHub repository is **public**; source packages `@taiyou/contracts@0.0.0` and `@taiyou/ui@0.0.0` are still private, unpublished npm workspaces. The Hub (`@taiyou/hub`) is a separate workspace, not a deployed product.

Requirements: Node.js 22+, npm 10+, Git. No cloud token, paid API or media assets required.

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
npm run dev
```

The root `test` and `test:browser` commands rebuild experimental local packages to avoid testing stale `dist`. Vite's local dev server defaults to http://127.0.0.1:5173.

## Reproducible installation and Actions
The first Actions runs failed without executing steps. **That historical runner issue is resolved after the owner made the repository public.** The lockfile was generated and committed by a temporary, branch-limited Node 22 workflow, which was then removed. Do not hand-edit or silently re-resolve `package-lock.json`; review npm dependency changes in focused PRs.

`.github/workflows/ci.yml` now requires:
- A clean `npm ci`, typecheck, unit tests and production build on Ubuntu and Windows.
- Production-only high/critical npm audit on Ubuntu.
- Chromium keyboard, responsive and automated WCAG A/AA checks, plus screenshot artifacts for visual review.
- Read-only GITHUB_TOKEN in ordinary CI; pinned official action commits; no auto-deploy, publishing or paid API calls.

Example verified Node 22 locked-install/quality/browser run: [44313286935](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44313286935), PR branch commit `68e55bfa22510733bed208e9fedeeb7038deefe4`. Later changes require their **own** green run. Follow [validation status](VALIDATION_STATUS_2026-11-18.md) for history.

## Public navigation destinations
`.env.example` lists **public-only** `VITE_*` URLs. The existing Novel Library is the sole verified default; other apps remain non-interactive until the owning agent confirms a real, owner-controlled HTTPS deployment. URL parsing rejects non-HTTPS, embedded credentials, local/IP hosts, alternate ports, queries and fragments. URL syntax alone does **not** verify site ownership. Do not put OAuth tokens, private media, reading history or credentials in frontend environment variables.

## Release controls
Never infer deployment from a passing build. The Hub has no live project/hostname, login server, shared database or synchronised data. Creating a Cloudflare Pages project requires owner approval, a reviewed access/privacy policy, verified custom domains, CSP/referrer/frame headers, manual visual/screen-reader testing, rollback and an independent release. No sibling-repository changes, force pushes, visibility changes or package publication are authorised here.

## Recovery
Revert affected commits/PRs and rerun the matrix; package version `0.0.0` has no external subscribers. When a runner fails before steps, investigate GitHub Actions entitlement/usage rather than treating it as an application failure. Once deployed (future only), restore the previous reviewed static build independently of all media apps.
