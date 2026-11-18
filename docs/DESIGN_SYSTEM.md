# Design Language, Themes and Accessibility

## Vision
A cohesive visual family across all Taiyou applications without identical layouts. Novel reading needs calm typography; Manga needs full-width immersive images; Anime needs episodic progress; Movies & TV needs flexible media detail views. Reuse tokens, spacing and stateless components, not whole pages.

## Initial tokens (scaffold)
Hub CSS uses deep navy background (#101b2b), panels (#192b40), light body text and warm gold accents. This is a starting palette, not a locked design system. Future themes should use semantic variables such as `--surface`, `--surface-raised`, `--text`, `--text-muted`, `--focus`, and `--accent`. Avoid global element resets in a published UI package.

## Shared component contract
Every exported component requires a documented prop type, semantic purpose, focus/keyboard rules, high contrast, responsive behaviour, CSS isolation and story/test examples. `MediaHubCard` is presentational; it cannot open dead links or fetch data on render. Add optional theme slots rather than coupling components to one media's routes.

## Mobile and usability
Validate 320/375/390px devices, tablet 768px and desktop 1280/1440px. No overlapping icons, offscreen dropdowns, inaccessible modal Close controls or fake dual-selected tabs. Keep touch targets 40–44 CSS px, keyboard focus visible and icons labelled when they perform actions. Use colour plus text/status for meaningful states.

## Motion and media
Support `prefers-reduced-motion`, lazy-cover loading, small bundles and no autoplay. Respect real cover art provenance; do not fabricate covers while claiming originals. No giant ornamental background assets downloaded on every route change.

## Adoption test
Before changing a shared token or component, demonstrate at least two consuming layouts and check that their UI remains distinct, accessible and fast.
