import { describe, expect, it } from 'vitest';
import { HUB_THEMES, isDarkHubTheme, parseHubTheme, THEME_COLOURS } from './theme';

describe('Hub theme contract', () => {
  it('exposes the six approved themes in order', () => {
    expect(HUB_THEMES).toEqual([
      'midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean',
    ]);
  });

  it('rejects malformed or unsupported stored preferences', () => {
    for (const value of [null, '', false, {}, '__proto__', 'system', 'MIDNIGHT']) {
      expect(parseHubTheme(value)).toBe('midnight');
    }
    expect(parseHubTheme('sepia')).toBe('sepia');
  });

  it('keeps dark and light appearances explicit', () => {
    expect(HUB_THEMES.filter(isDarkHubTheme)).toEqual(['midnight', 'charcoal', 'plum']);
    expect(Object.keys(THEME_COLOURS)).toEqual([...HUB_THEMES]);
  });
});
