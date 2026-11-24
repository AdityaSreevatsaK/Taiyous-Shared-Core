import { describe, expect, it } from 'vitest';
import { HUB_THEMES, isDarkHubTheme, parseHubTheme, THEME_COLOURS } from './theme';

describe('Hub theme contract', () => {
  it('keeps all six themes in the approved order', () => {
    expect(HUB_THEMES).toEqual(['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean']);
  });
  it('defaults to Sepia and rejects invalid storage', () => {
    for (const value of [null, '', false, {}, '__proto__', 'system', 'MIDNIGHT']) {
      expect(parseHubTheme(value)).toBe('sepia');
    }
    expect(parseHubTheme('midnight')).toBe('midnight');
  });
  it('uses the new warm dark Sepia treatment without changing theme identifiers', () => {
    expect(HUB_THEMES.filter(isDarkHubTheme)).toEqual(['midnight', 'charcoal', 'plum', 'sepia']);
    expect(THEME_COLOURS.sepia).toBe('#120c0a');
    expect(Object.keys(THEME_COLOURS)).toEqual([...HUB_THEMES]);
  });
});
