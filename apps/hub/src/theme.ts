export const HUB_THEMES = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'] as const;
export type HubTheme = typeof HUB_THEMES[number];
export const THEME_STORAGE_KEY = 'taiyou-hub-theme';

export function parseHubTheme(value: unknown): HubTheme {
  return typeof value === 'string' && HUB_THEMES.some(theme => theme === value)
    ? value as HubTheme : 'sepia';
}
export function isDarkHubTheme(theme: HubTheme): boolean {
  return theme === 'midnight' || theme === 'charcoal' || theme === 'plum' || theme === 'sepia';
}
export function readInitialHubTheme(): HubTheme {
  return typeof document === 'undefined'
    ? 'sepia' : parseHubTheme(document.documentElement.dataset.theme);
}
/** Theme colours match the surrounding observatory canvas and early bootstrap. */
export const THEME_COLOURS: Record<HubTheme, string> = {
  midnight: '#0e1522', charcoal: '#141316', plum: '#1e1225',
  sepia: '#120c0a', paper: '#f5eadc', ocean: '#dcecf0',
};
export function applyHubTheme(theme: HubTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOURS[theme]);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme changes continue to work when storage is unavailable.
  }
}
