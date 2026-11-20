# Illustrated Hub homepage using complete owner-approved cards (20 November 2026)

## Design
Use the user's complete four illustrated tiles cropped from their approved homepage mock-up, including the original printed titles, captions, statuses, and simulated buttons. There are no duplicate visible HTML overlays. The **entire Novel and Manga tiles** are real HTTPS anchors; Anime and Movies & TV are non-interactive articles, accurately marked In preparation.

Text equivalents in visually-hidden real headings, descriptions and statuses support screen readers. Images are decorative to accessibility APIs. This bitmap-first approval is intentional; at extreme zoom, text may be less sharp than native HTML.

## Asset import
Use the generated `Taiyou_Hub_Full_Tiles_Ready.zip` archive (not the older partial-artwork ZIP), and restore these exact paths:
- apps/hub/public/art/novels.avif SHA-256 fffe541816cb11d83f2f5c7f68bc54bc5013b91870a5b6c2b75f769ab6c157e7
- apps/hub/public/art/manga.avif SHA-256 fa5880aa684abbca6bba733c7dce1cb7102653aee14e7309622c93bc7a1a7109
- apps/hub/public/art/anime.avif SHA-256 ebdb631f4d4ca024d0f451dd5f5a3d2ed3d8d73f7c66893c27523c170bad64c8
- apps/hub/public/art/movies-tv.avif SHA-256 57c526634ed15ba5bf6484dffeeee2496c51b38d8132205da500117a04ea8649

Run the checksum-verified Windows import helper in scripts/apply-illustrated-homepage.ps1 from the exact working branch if automatic binary transport is unavailable. The four card files are verified by scripts/verify-hub-static.mjs in CI.

## Preserved behaviour
- The six Hub themes are retained; Sepia is the default on first visit.
- Existing Novel/Manga HTTPS URLs are preserved with no referrer leakage.
- Four/two/one-column layout, keyboard operation, focus, reduced-motion preference, and three-browser WCAG A/AA checks are mandatory.
- A self-hosted sunrise/sakura SVG continues as hero artwork.
- The final approved Sun logo/favicons remain the responsibility of separate draft PR #12; do not substitute an approximation.
- No shared sign-in, storage, private media catalogue or changes to sibling repositories.
