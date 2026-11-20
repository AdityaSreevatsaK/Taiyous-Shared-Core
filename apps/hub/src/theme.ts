export const HUB_THEMES = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'] as const;
export type HubTheme = typeof HUB_THEMES[number];
export const THEME_STORAGE_KEY = 'taiyou-hub-theme';

export function parseHubTheme(value: unknown): HubTheme {
  return typeof value === 'string' && HUB_THEMES.some(theme => theme === value)
    ? value as HubTheme
    : 'sepia';
}
export function isDarkHubTheme(theme: HubTheme): boolean {
  return theme === 'midnight' || theme === 'charcoal' || theme === 'plum';
}
export function readInitialHubTheme(): HubTheme {
  return typeof document === 'undefined'
    ? 'sepia'
    : parseHubTheme(document.documentElement.dataset.theme);
}
export const THEME_COLOURS: Record<HubTheme, string> = {
  midnight: '#121a2a', charcoal: '#1d1a22', plum: '#271a32',
  sepia: '#fbf0e4', paper: '#faf9f4', ocean: '#e8f5f7',
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
