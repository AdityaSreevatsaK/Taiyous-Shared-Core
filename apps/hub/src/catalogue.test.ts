import { describe, expect, it } from 'vitest';
import { createHubModules, publicHttpsDestination } from './catalogue';

describe('safe public navigation', () => {
  it('accepts owner-approved HTTPS destinations with ordinary paths', () => {
    expect(publicHttpsDestination(' https://reader.example.org/library ')).toBe(
      'https://reader.example.org/library',
    );
  });

  it.each([
    'http://reader.example.org/',
    'javascript:alert(1)',
    '//reader.example.org/',
    'https://user:password@reader.example.org/',
    'https://reader.example.org/?access_token=secret',
    'https://reader.example.org/#token',
    'https://localhost/',
    'https://127.0.0.1/',
    'https://[::1]/',
    'https://reader.example.org:8080/',
    'https://reader.example.org.evil.test/?secret=1',
    'not a URL',
  ])('rejects unsafe or non-public URL %s', candidate => {
    expect(publicHttpsDestination(candidate)).toBeUndefined();
  });

  it('falls back to the known Novel Library and keeps three modules planned', () => {
    const entries = createHubModules();
    expect(entries.map(entry => entry.key)).toEqual([
      'novels', 'manga', 'anime', 'movies-tv',
    ]);
    expect(entries[0]?.href).toBe('https://taiyous-personal-library.pages.dev/');
    expect(entries.map(entry => entry.availability)).toEqual([
      'available', 'planned', 'planned', 'planned',
    ]);
    expect(entries.slice(1).every(entry => entry.href === undefined)).toBe(true);
  });

  it('activates only destinations explicitly configured with safe URLs', () => {
    const entries = createHubModules({
      novels: 'http://unsafe.example.org',
      manga: 'https://manga.example.org/',
      anime: 'https://anime.example.org/?token=1',
      moviesTv: 'https://movies.example.org/',
    });
    expect(entries.map(entry => entry.availability)).toEqual([
      'available', 'available', 'planned', 'available',
    ]);
    expect(entries[0]?.href).toBe('https://taiyous-personal-library.pages.dev/');
    expect(entries[2]?.href).toBeUndefined();
    expect(entries[1]?.href).toBe('https://manga.example.org/');
  });
});
