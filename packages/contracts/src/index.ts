/** Experimental cross-media contracts, v0.0.0. They do NOT replace the live
 * novel catalogue, collections, OAuth session or progress schema. */
export type MediaKind = 'novel' | 'manga' | 'anime' | 'movie' | 'tv';
export type ModuleKey = 'novels' | 'manga' | 'anime' | 'movies-tv';
export type ModuleAvailability = 'available' | 'planned';

/** Identifiers are unique only within a kind and namespace. */
export interface MediaIdentity {
  kind: MediaKind;
  namespace: string;
  localId: string;
}
export interface PersonalMediaMetadata {
  /** Personal 1–10 rating; undefined means unrated, not zero. */
  rating?: number;
  tags: string[];
  notes?: string;
  updatedAt: string;
}
export interface MediaModule {
  key: ModuleKey;
  title: string;
  description: string;
  /** An absent URL means planned; never render a dead external link. */
  href?: string;
  availability: ModuleAvailability;
}
const SAFE_PART = /^[a-z0-9][a-z0-9._-]{0,119}$/i;
export function mediaKey(identity: MediaIdentity): string {
  if (!SAFE_PART.test(identity.namespace) || !SAFE_PART.test(identity.localId)) {
    throw new Error('Media identifiers must be nonempty URL-safe segments.');
  }
  return identity.kind + ':' + identity.namespace + ':' + identity.localId;
}
export function validPersonalRating(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 10;
}
