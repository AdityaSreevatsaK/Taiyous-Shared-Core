import { describe, expect, it } from 'vitest';
import { mediaKey, validPersonalRating } from './index';
describe('experimental cross-media identifiers', () => {
  it('namespaces kinds and providers', () => {
    expect(mediaKey({ kind: 'anime', namespace: 'local', localId: '001' })).toBe('anime:local:001');
    expect(mediaKey({ kind: 'tv', namespace: 'local', localId: '001' })).toBe('tv:local:001');
  });
  it('rejects empty/unsafe identifiers and invalid personal ratings', () => {
    expect(() => mediaKey({ kind: 'manga', namespace: '../bad', localId: 'abc' })).toThrow();
    expect(validPersonalRating(10)).toBe(true);
    expect(validPersonalRating(0)).toBe(false);
    expect(validPersonalRating(5.5)).toBe(false);
  });
});
