# Illustrated Hub homepage (20 November 2026)

## Visual reference
The five owner-supplied images show a warm sunrise and sakura welcome panel with four distinct media cards in one desktop row: Novel Library (amber), Manga Library (jade), Anime Library (plum) and Movies & TV Library (cinema red). Two tablet columns and one mobile column are intentional. This is HTML/CSS, not a screenshot substituted for a webpage.

## Required image import
A separate prepared ZIP (Taiyou_Hub_Illustrated_Cards_Assets.zip) contains four owner-supplied illustrations cropped to their top artwork. Place them in:
- apps/hub/public/art/novels.avif (SHA-256 10ec9db58439c6b43a829f50cbbef7184730a21b59b987bacf9b772a8c67613e)
- apps/hub/public/art/manga.avif (SHA-256 5ac1c476c530e9e7f08967e1a0ff9db5a29191f74e5e30e3c16a9f00ecbd5c4f)
- apps/hub/public/art/anime.avif (SHA-256 19ffe64f326fffbb3ca6569d2bfb0dc29045b5ea8147d40b765a7c204d2ba6b8)
- apps/hub/public/art/movies-tv.avif (SHA-256 9998599afe35b60d839efca75c239f52fd109988a9a747617deb406d2e2bd1e1)

The scene illustrations have no embedded status, titles or actions. Those are accessible HTML at every zoom level. The self-hosted decorative SVG is at apps/hub/public/art/hub-landscape.svg.

## Behaviour and release gates
- Six themes remain available. Sepia is now the default for first visits, matching the owner-approved mock-up. Previously stored themes still win.
- Novel and Manga remain real HTTPS links, with referrer suppression. Anime and Movies & TV remain non-interactive In preparation tiles.
- All artwork must load, and keyboard, 200% zoom, 320/390/768/1280 breakpoints, automated WCAG A/AA and actual screen-reader/visual checks are release gates.
- The draft PR must not merge until the exact image files exist and CI is green.
- The Sun text glyph is a temporary placeholder. Draft PR #12 separately installs the four exact owner-approved logo/favicon binaries. Do not substitute a fabricated approximation and resolve any overlap before merging.

No shared authentication, data, private catalogue or sibling-repository changes.
