# Design Language, Themes and Accessibility

## Intent
Share a coherent visual family without forcing identical layouts. The Hub is a lightweight editorial gateway; novels, manga, anime and films retain their own reading/viewing experiences. The Hub has no downloaded fonts, images or decorative network requests.

## Hub-only semantic tokens
The current Hub uses CSS variables in `apps/hub/src/styles.css`: `--background`, `--surface`, `--surface-raised`, `--text`, `--text-muted`, `--accent`, `--border` and `--focus`. These are scoped to the Hub bundle and **are not published as a shared cross-repo theme**. Card accent colours vary by media class but status is always conveyed in words, not colour alone. System sans-serif and a local serif heading avoid third-party font requests.

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
