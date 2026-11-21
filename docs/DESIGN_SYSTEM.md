# Design Language, Themes and Accessibility

## Intent
Share a coherent visual family without forcing identical layouts. The Hub is a lightweight editorial gateway; novels, manga, anime and films retain their own reading/viewing experiences. The Hub uses system fonts and no decorative requests to third-party origins. The four cards use original detailed, text-free, self-hosted WebP illustrations. Their only visible labels are centred HTML headings below each portrait. Novel and Manga use full illustration-and-title hyperlinks; planned cards are non-interactive with visually hidden status announcements. The sakura canopy, pastel sunrise and Mount Fuji-style mountains are one self-hosted high-resolution AVIF background extending behind the hero and cards. A small self-hosted seigaiha SVG decorates the footer. Dark and light themes retain the same artwork. See [Illustrated homepage](ILLUSTRATED_HOMEPAGE.md).

## Hub-only semantic tokens
The Hub supports **Midnight, Charcoal, Plum, Sepia, Paper and Ocean** (Sepia default for first visits), implemented as Hub-local theme palettes under `:root[data-theme]`. The Hub tokens include `--background`, `--surface`, `--text`, `--text-muted`, `--accent`, `--border`, `--focus`, `--masthead` and `--masthead-text`. These are scoped to the Hub bundle and **are not published as a shared cross-repo theme**. Card accent colours vary by media class but status is always conveyed in words, not colour alone. The selector is a native, keyboard-accessible control. An early self-hosted script in `apps/hub/public/theme-bootstrap.js` restores the preference before the React bundle, preserving the strict `script-src 'self'` policy; storage access failures fall back to Sepia. Theme selection never syncs across apps. System sans-serif and a local serif heading avoid third-party font requests.

## Current component boundary
`MediaHubCard` is a stateless React component. It renders an anchor only when marked available with a safe HTTPS destination; planned/invalid destinations render non-interactive articles. The artwork-only variant gives both states a visible heading below the picture, with status announced accessibly only for planned tiles; the legacy detailed variant retains its descriptive fallback. It has no data fetching, side effects, cookie access or ownership of media progress. Its `hub-card-*` CSS remains Hub-owned until a genuine second consumer justifies extracting styling.

## Accessible interaction
- A visible-on-focus Skip to libraries link precedes the content.
- Real links provide a visible focus outline and no referrer.
- Planned tiles cannot receive keyboard focus or trigger navigation.
- Heading order: page H1, section H2, library H3; cards are an unordered list.
- Breakpoints: 320, 390, 640, 768 and 1280 px are browser-test targets, alongside 1280×720, 1366×768, 1600×900 and 1920×1080 full desktop viewport tests. A normal desktop at 100% zoom shows all four full cards and the footer together; zoomed and mobile layouts reflow and scroll vertically with no horizontal overflow.
- Motion is decorative only and disabled on reduced-motion preference.
- The planned-card illustrations contain no badges or button artwork and the planned cards have no interactive controls. No autoplay assets or hover-only content.

## Before independent-app adoption
Require two real consumers, API/ARIA examples, CSS isolation, accessibility and visual tests, bundle-size comparison, pinned package distribution, compatibility and rollback. A shared dark palette is not a mandate for identical application design.

## Hub-specific sunrise branding
The owner subsequently approved a distinct Sun mark for this Hub rather than requiring the earlier raster identity. The Home link displays the original local `/branding/hub-sun-logo.svg` **via an image element**, and the favicon uses the standalone self-hosted `/branding/hub-sun.svg`. The previous approved two-logo pack is kept as archival reference in [Branding integration](BRANDING_INTEGRATION.md), but is not a Hub release blocker.

## Final portrait art identity (21 November 2026)

PR #19 had correct text placement but substituted simplified SVG illustrations for the detailed visual that had actually been shown to the owner. PR #20 fixed this with the original high-resolution four-panel generated art, exported as `novels-art.webp`, `manga-art.webp`, `anime-art.webp`, and `movies-tv-art.webp`. They remain text-free, with separate visible centred headings and noninteractive planned tiles. These exact bytes are protected by build SHA-256 checks. Do not replace them with new approximations. See [History](PROJECT_HISTORY.md) and [Codebase](CODEBASE_REFERENCE.md).
