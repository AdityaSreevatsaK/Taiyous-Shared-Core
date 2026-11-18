# Cross-Media Contract and Compatibility Policy

## v0 package boundary
Source: `packages/contracts/src/index.ts`; package: `@taiyou/contracts@0.0.0` (private, unpublished, experimental). Nothing in the existing Novel Library has migrated.

### Reference identity
```ts
type MediaKind = 'novel' | 'manga' | 'anime' | 'movie' | 'tv';
interface MediaIdentity {
  kind: MediaKind;
  namespace: string;
  localId: string;
}
mediaKey({ kind: 'anime', namespace: 'local', localId: '001' });
// -> "anime:local:001"
```
Namespacing prevents film/TV and cross-provider collisions. It does NOT validate that a media item exists, or authorise access. The URL-safe portion is currently ASCII letters/numbers plus ._- and has a 120-character cap. Future opaque identifiers/UUID migrations require an ADR and backwards compatibility tests. Do not use titles as keys.

### Personal metadata
```ts
interface PersonalMediaMetadata {
  rating?: number; // integer 1..10, undefined means unrated
  tags: string[];
  notes?: string;
  updatedAt: string; // ISO timestamp, not a conflict-resolution protocol
}
```
This is a **conceptual exchange shape**, not the existing novel's personal-data schema. String timestamps alone cannot guarantee conflict-free sync; real persistence must add a separate revision token, tombstones and explicit conflict policy.

### Hub availability
`MediaModule` has a stable module key, title, description, optional HTTPS href and state `available | planned`. Hub uses it as a navigation registry. An app without a live deployment MUST be planned. Do not encode private records in URLs.

## Domain contracts stay specialised
- Novels: EPUB/chapters/scroll progress, existing 24-char book IDs and private HF file paths remain Novel-owned.
- Manga: series/chapter/page, reading direction, image manifests and resume page are Manga-owned.
- Anime: seasons/episodes/specials, watched episode IDs and watchlist state are Anime-owned.
- Movies: watched work vs TV episode sets are discriminated and Movies-TV-owned.
Do not create a single 'progressPercent' database column and claim it faithfully represents all media.

## Contract evolution
1. Create a documented proposal and a minimum of two concrete consumer use cases.
2. State compatibility with existing novel schemas and private datasets.
3. Add runtime validators for any untrusted cross-origin JSON; TypeScript interfaces alone are insufficient.
4. Add positive, negative, version-mismatch and migration tests.
5. Publish a pinned version only with owner approval. No floating Git dependency or copying raw `src` from sibling repos.
6. Consumers update independently via PRs; record breaking changes, old/new adapters and rollback.

## Privacy/scope
Cross-repo references carry only opaque identifiers. They must not expose tags, reviews, progress, OAuth secrets, file paths or personal reading history. Any future API must verify auth and consent server-side.
