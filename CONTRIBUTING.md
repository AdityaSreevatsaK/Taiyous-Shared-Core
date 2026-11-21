# Contributing and AI Agent Collaboration

## Project scope
This repository owns npm workspaces, contract types, UI component and hub. Refer to `AGENTS.md` and all `docs/*.md` before editing. Other Taiyou repositories have independent owners and release processes.

## Starting a task
1. Run `git status --short --branch`; inspect all local changes and never overwrite another agent's work.
2. Fetch/prune refs and inspect the latest `master` SHA, recent commits, open PRs/issues, active branches, workflow runs and deployed `/release.json`.
3. Read `README.md`, `AGENTS.md`, the AI playbook, project history, codebase reference, decisions, roadmap and relevant design/architecture/security/testing documents.
4. Inspect the actual source, tests, assets and build output; classify work as implemented, partial, approved prototype, planned/deferred or superseded. Do not trust historical summaries without source evidence.
5. Reproduce the real issue, write precise acceptance criteria, estimate data/privacy/performance effects and identify affected users.
4. Create a short-lived branch from latest master. Keep the diff focused.
5. Implement with unit tests and appropriate browser/integration evidence; update docs as source contracts evolve.
6. Open a PR explaining problem, approach, tests, compatibility, security impact and rollback. Never claim unrun tests passed.
7. Merge only when acceptable under current owner policy and after correctly assessing CI outcomes. Record actual merge SHA and deployment separately.

## Local validation
Node 22+, run `npm ci`, `npm run typecheck`, `npm test`, `npm run build` and `node scripts/verify-hub-static.mjs`. The workspace lockfile is committed; update it only in reviewed dependency changes.

## Security and data
No private media, real personal records, credentials, OAuth tokens or owner passphrases in Git, log files, PR descriptions, screenshots or client-exposed environment variables. Don't bypass access restrictions. Destructive data operations require explicit owner approval and verified backup/revision protection.

## User experience
Mobile-first responsive layouts; correct keyboard focus, screen reader labels, legible contrast, meaningful empty/offline/error states and no fake functional controls. Preserve existing working application semantics. Benchmark potential bundle/network regressions.

## Cross-repo changes
Propose interfaces to the owning repo instead of editing sibling repos. Shared Core packages are currently experimental and not published. Keep all applications usable if the Personal Hub is offline.

## Reporting
Always distinguish scaffold from implemented product, unverified from tested, committed from merged, merged from deployed, and manual settings from programmatically applied settings. Include exact PR/workflow links and unaddressed issues.
