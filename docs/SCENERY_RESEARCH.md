# Scenic homepage review and external artwork research

**Decision:** 21 November 2026. **Status:** evaluated and retained the current illustrated landscape. This is a research record, not a request to generate or download imagery.

## Owner's direction

Remove the visible welcome headline, explanatory sentence and Explore/Read/Watch/Discover motto. Scale the four media tiles back from the previous near-full-width posters, while keeping the scene and original approved detailed portraits. Improve the page **in React/CSS**, not by presenting an image mock-up.

## External candidates evaluated

The search looked for openly reusable photographs and illustrations with **sakura, Mount Fuji, pink sunset and panoramic landscape**, paying attention to licensing and fit with the existing anime-inspired portraits:

| Candidate | Reference and licensing | Design evaluation |
| --- | --- | --- |
| Fantasy Japan mountains and cherry blossoms | [Pixabay 7455353](https://pixabay.com/illustrations/fantasy-japan-mountains-7455353/), Pixabay Content License | High detail and landscape orientation, but bright cyan/blue water and side framing clash with the original warm sunset palette |
| Japanese pagoda and cherry blossoms at dusk | [Pixabay 8391385](https://pixabay.com/illustrations/sakura-spring-japan-temple-pond-8391385/), Pixabay Content License | Lovely painterly pink sunset; prominent pagoda and dark shoreline would compete with the cards and reposition the Fuji silhouette |
| Flat Mount Fuji lake and blossom design | [Pixabay 161552](https://pixabay.com/vectors/asia-cherry-blossom-fujii-japan-161552/), Pixabay Content License | Light and lightweight as vector art, but too flat/dark for the existing detailed manga/anime panels |
| Photographic Fuji framed by cherry blossoms | [Unsplash by Gaku Suyama](https://unsplash.com/photos/mount-fuji-framed-by-cherry-blossoms-and-a-stream-Z-oCTue0J3M), Unsplash licence | Useful photographic option, but a sudden switch from painterly illustrations to photography reduces visual coherence |
| Mount Fuji cherry blossom photo | [Pexels 33368123](https://www.pexels.com/photo/cherry-blossoms-framing-mount-fuji-in-spring-33368123/) | Good photographic geography, but similarly inconsistent with the illustrated portraits |

Sources describe reuse terms; a candidate would require provenance, attribution/licence review where applicable, optimisation and visual regression tests **before** actually importing it.

## Decision and implementation

The existing **self-hosted, original `apps/hub/public/art/landscape.avif`** already has a matching warm sakura canopy, layered mountains and golden Fuji sunrise; it is more coherent with the exact four approved `*-art.webp` media panels than the discovered alternatives. No unrelated internet-hosted or externally requested image is added. The site retains its strict `img-src 'self' data:` policy, low background image transfer size, no external dependency and reproducible asset checks.

The code now makes the scenery more important by **removing all visible hero copy**, limiting the four desktop posters to a **medium-size centred gallery** and leaving generous panoramic margins. The themed lower fade remains gentle, with the responsive portrait/text/CTA rendering all real React/CSS. The invisible page H1 preserves semantic heading structure. The original exact WebP and AVIF images are unmodified.

## Acceptance checks

- Visible welcome heading, paragraph and motto are absent from the DOM.
- Screen readers still have one H1 (“Taiyou’s Personal Hub”) followed by the library H2 and card H3 headings.
- Four midsize portraits remain on one desktop screen with the footer, each approximately 230–310 CSS pixels wide across the normal tested desktop viewports.
- Poster art, links, focus handling, availability, theme persistence, phone/two-column reflow and original self-hosted assets remain intact.
- CI screenshot evidence validates **painted pixels**, not just loaded image elements.
- No new image generation, hotlinked media, licence uncertainty or external network requests.

If future research identifies a demonstrably better **licence-compatible panoramic painterly image**, introduce it with a separate reviewed PR containing source URL, author/licence, image digest, dimensions, optimised local asset and six-theme screenshot comparison. Never quietly replace approved imagery based only on a search thumbnail.
