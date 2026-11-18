# CI and Build Validation, 18 November 2026

## Outcome and history
Earlier Actions runs failed before a runner executed a single step. They were **not** failed TypeScript tests. The owner subsequently changed **Shared Core** to a public GitHub repository, after which the runner successfully started. The specific former account-level scheduling cause was not independently confirmed.

## Real executed verification
1. [Run 44279776833, attempt 2](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44279776833) passed at `92ab67838f05a7a91b4511946ccb2df76aa51027`: Node 22 install, TypeScript, 20 unit tests, Vite production build.
2. [Temporary lockfile bootstrap](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44312830330) passed and the GitHub Actions bot committed the generated workspace `package-lock.json`. A clean `npm ci`, typecheck, unit tests and build passed on the runner. The temporary workflow was then removed.
3. [Run 44313286935](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44313286935) passed at `68e55bfa22510733bed208e9fedeeb7038deefe4`: Ubuntu and Windows locked-install/typecheck/20 unit tests/build, plus 7 Chromium keyboard/responsive smoke tests.
4. [Temporary accessibility dependency lockfile bootstrap](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44314221124) passed, including clean install, typecheck, unit tests and build. The bot committed a refreshed lockfile for `@axe-core/playwright` on the Hub branch. The temporary workflow is removed in the next commit.
5. [Hub PR #2 final check 44314748251](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44314748251) passed at `be4234ffb24662d681a5d0e9abd71e844469db48`: Ubuntu and Windows locked installs, typecheck, 20 unit tests each, build, production npm audit (0 vulnerabilities), and 11 Chromium browser tests including 4 automated axe WCAG A/AA checks. A four-screenshot visual-review artifact was captured and reviewed.
6. [Post-merge master run 44315334038](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44315334038) succeeded for all three jobs at master SHA `62120926fca93d0f9be5b61d8d9c05d9bfda36fb`.
7. [Cross-browser PR #5 run 44316165382](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44316165382) passed at `c5d746070609f28f9975d4a68d9b8855e9bcd667`: five green jobs, 13 browser tests each on Chromium, Firefox and WebKit (39 total), Ubuntu/Windows unit/type/build and production audit. The new tests verify no external Hub catalogue/media requests, network-stubbed Novel Library navigation, and the absence of a referrer. Four screenshots per browser were generated. This is PR evidence, not proof of deployment or merge.

## Current scope
- Shared Core and Hub source public; `@taiyou/contracts@0.0.0` and `@taiyou/ui@0.0.0` remain experimental, not published or adopted by sibling apps.
- [RFC PR #3](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/3) merged at `c2fde47c1ad577c06540e40e1bf4175c6c8a77ae`, following a green workflow.
- [Hub PR #2](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/2) **merged** at `62120926fca93d0f9be5b61d8d9c05d9bfda36fb`, including the accessible gateway and all quality gates.
- There is **no Hub deployment, login server, shared search or private catalogue** in this repository. Passing CI does not publish a website.
- [Former runner-blocker issue #4](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/4) is closed following green final and master runs. The earlier root cause remains unconfirmed.

## Untested/manual release gates
Manual screen-reader/200% zoom testing, Firefox and Safari, deployment CSP/frame/referrer response headers, domain-ownership review, production hostname/staging, independent-app resilience verification and actual visual acceptance remain outstanding. No cross-repository package adoption is approved.
