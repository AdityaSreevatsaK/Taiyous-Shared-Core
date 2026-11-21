# Scenic homepage review and external artwork research

**Earlier decision:** 21 November 2026. The original illustrated landscape was retained for the PR #23 release because it matched the approved portrait art. **Current status:** the owner subsequently approved exploring non-Japanese photographic feature visuals. A credited composite moodboard showing two licensed Pexels references is stored locally under `docs/assets/`; raw Pexels photos are not separately redistributed and none are used by the live Hub.

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

The existing **self-hosted, original `apps/hub/public/art/landscape.avif`** already has a matching warm sakura canopy, layered mountains and golden Fuji sunrise; it is more coherent with the exact four approved `*-art.webp` media panels than the discovered alternatives. No unrelated internet-hosted or externally requested image is added. The site retains its strict `img-src 'self' data:` policy, low background image transfer size, no external runtime dependency and reproducible asset checks. The two Pexels photographs are local documentation references only; they are not hotlinked or included in the Hub build.

The PR #23 production page makes the existing scenery more important by removing visible hero copy and limiting the four desktop posters to a medium-size centred gallery. This remains the deployed design. The later photographic split-layout exploration is documented separately below; it does not replace the production background until a coded prototype is reviewed.

## Acceptance checks

- Visible welcome heading, paragraph and motto are absent from the DOM.
- Screen readers still have one H1 (“Taiyou’s Personal Hub”) followed by the library H2 and card H3 headings.
- Four midsize portraits remain on one desktop screen with the footer, each approximately 230–310 CSS pixels wide across the normal tested desktop viewports.
- Poster art, links, focus handling, availability, theme persistence, phone/two-column reflow and original self-hosted assets remain intact.
- CI screenshot evidence validates **painted pixels**, not just loaded image elements.
- No new image generation, hotlinked media, licence uncertainty or external network requests.

If future research identifies a demonstrably better **licence-compatible panoramic painterly image**, introduce it with a separate reviewed PR containing source URL, author/licence, image digest, dimensions, optimised local asset and six-theme screenshot comparison. Never quietly replace approved imagery based only on a search thumbnail.


## Later direction: Golden Archive and Cinematic Passage (21 November 2026)

The owner clarified that the Japanese concept is optional and approved a new prototype exploration inspired by the video’s warm brown/pale-gold/glowing-gold palette. The two chosen photographic directions are now stored as optimised local WebP files:

- **Golden Archive:** Michael D Beckwith, [Pexels photo 36093623](https://www.pexels.com/photo/historic-library-room-with-rich-wooden-interiors-36093623/), source 8687 × 5791; local 2200 × 1467.
- **Cinematic Passage:** Sefa Demirtaş, [Pexels photo 34882758](https://www.pexels.com/photo/architectural-perspective-of-a-sunlit-corridor-34882758/), source 4160 × 6240; local 1467 × 2200.

Both source pages identify the photos as free under the [Pexels licence](https://www.pexels.com/license/), which permits website use and modification but prohibits standalone redistribution. The combined credited moodboard is the local reference; source links and photographer credits are in [Featured visual options](FEATURED_VISUAL_OPTIONS.md). They are design references, not production assets. The intended prototype places one featured photograph on the left and four compact media tiles on the right. No final photo, crop or design has been selected. Do not add a third-party runtime request; self-host any future production selection and preserve the current strict CSP.
