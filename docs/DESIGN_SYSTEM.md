# Design Language, Themes and Accessibility

## Intent
Share a coherent visual family without forcing identical layouts. The Hub is a lightweight editorial gateway; novels, manga, anime and films retain their own reading/viewing experiences. The Hub uses system fonts and has no decorative requests to third-party origins. The four card illustrations are original inline SVG linework, not licensed external media.

## Hub-only semantic tokens
The Hub supports **Midnight (default), Charcoal, Plum, Sepia, Paper and Ocean**, implemented as Hub-local theme palettes under `:root[data-theme]`. The existing CSS variables in `apps/hub/src/styles.css` are: `--background`, `--surface`, `--surface-raised`, `--text`, `--text-muted`, `--accent`, `--border` and `--focus`. These are scoped to the Hub bundle and **are not published as a shared cross-repo theme**. Card accent colours vary by media class but status is always conveyed in words, not colour alone. The selector is a native, keyboard-accessible control. An early self-hosted script in `apps/hub/public/theme-bootstrap.js` restores the preference before the React bundle, preserving the strict `script-src 'self'` policy; storage access failures fall back to Midnight. Theme selection never syncs across apps. System sans-serif and a local serif heading avoid third-party font requests.

## Current component boundary
`MediaHubCard` is a stateless React component. It renders an anchor only when marked available with a safe HTTPS destination; planned/invalid destinations render non-interactive articles. Both states have a heading, description and text status. It has no data fetching, side effects, cookie access or ownership of media progress. Its `hub-card-*` CSS remains Hub-owned until a genuine second consumer justifies extracting styling.

## Accessible interaction
- A visible-on-focus Skip to libraries link precedes the content.
- Real links provide a visible focus outline and no referrer.
- Planned tiles cannot receive keyboard focus or trigger navigation.
- Heading order: page H1, section H2, library H3; cards are an unordered list.
- Breakpoints: 320, 390, 768 and 1280 px are browser-test targets.
- Motion is decorative only and disabled on reduced-motion preference.
- No fake buttons, autoplay assets, hover-only content or hidden destination links.

## Before independent-app adoption
Require two real consumers, API/ARIA examples, CSS isolation, accessibility and visual tests, bundle-size comparison, pinned package distribution, compatibility and rollback. A shared dark palette is not a mandate for identical application design.

## Final Sun branding, not yet integrated
The owner supplied two approved transparent 1024×1024 PNGs: Antique Gold on dark surfaces and Sapphire/Antique Gold on light/sepia surfaces, plus paired ICO favicons. The files are **not in the repository as of this update**, so the existing glyph must be treated as a temporary placeholder. Once the exact assets are committed under `apps/hub/public/branding/`, use the Hub-selected theme to choose the dark or light variant; do not key it exclusively to OS preference. Preserve transparency, contain-fit and the full rays, and make the Home brand link accessible. Full path/verification guidance is in [Branding integration](BRANDING_INTEGRATION.md).
