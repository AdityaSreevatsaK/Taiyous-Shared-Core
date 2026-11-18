# Reuse Audit: Existing Novel Library vs Future Apps

**Source inspected:** [Taiyous-Personal-Library](https://github.com/AdityaSreevatsaK/Taiyous-Personal-Library), current repository at planning time. The live app is React + TypeScript + Vite, EPUB.js, IndexedDB, Cloudflare Pages Functions and a private Hugging Face dataset; `master` drives controlled manual deployments. Reinspect before extraction.

| Candidate | Reuse potential | Current coupling / required extraction |
| --- | --- | --- |
| Semantic colours, typography and CSS design tokens | High | Move reusable tokens only, avoid global selectors and novel-specific imagery |
| Cards, badges, navigation and dialogs | High | Separate stateless presentation from novel routes and Cloudflare/HF actions |
| Search/filter/sort primitives | High | Input-schema-independent pure helpers, no inherited novel-only status names |
| Ratings 1–10, tags and empty-state conventions | High | Rating definitions as shared metadata; retain per-app authorisation and persistence |
| Nested collections UI | Medium to high | Separate UI from `BookCollection`, novel book ID format and HF collections.json |
| User-specific progress and analytics | Low initially | EPUB chapter/scroll differs fundamentally from manga page and episode states |
| OAuth/session/owner mode | **Do not copy** | Same-origin private HF logic; re-design per-app security before reuse |
| IndexedDB/offline cache | Medium | Abstract asset cache/storage limits while retaining format-specific integrity |
| EPUB parser, chapter navigation and cover retrieval | Novel-only | Keep inside Novel Library |
| Cloud provider adapter and revision-safe writes | Medium conceptually | Define ports and conflict algorithm before any shared provider module; do not copy credentials |

## Recommended extraction sequence
1. Take a screenshot/component inventory for Novel, Manga and Hub.
2. Identify two real repeated components and specify prop/ARIA APIs.
3. Add independent tests to `@taiyou/ui` plus consumer visual tests.
4. Build a versioned release, not a same-repo relative source import.
5. Create one consumer PR at a time; no changes to the Novel Library until its owning session approves.
6. Measure bundle cost and rollback plan; stop extraction if abstraction makes components harder to maintain.

## Anti-patterns
Huge 'core' component importing media-specific progress, a shared mandatory API server, direct imports from private HF dataset files, synchronised deployments, global CSS resets applied to other apps, and invented cross-site OAuth.

## Immediate state
`MediaHubCard` is the sole reusable UI component. It is not yet consumed by the four independent apps. Future reusable abstractions are **proposals**, not completed migrations.
