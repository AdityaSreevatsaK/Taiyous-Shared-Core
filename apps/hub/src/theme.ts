export const HUB_THEMES = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'] as const;
export type HubTheme = typeof HUB_THEMES[number];
export const THEME_STORAGE_KEY = 'taiyou-hub-theme';

export function parseHubTheme(value: unknown): HubTheme {
  return typeof value === 'string' && HUB_THEMES.some(theme => theme === value)
    ? value as HubTheme
    : 'midnight';
}

export function isDarkHubTheme(theme: HubTheme): boolean {
  return theme === 'midnight' || theme === 'charcoal' || theme === 'plum';
}

export function readInitialHubTheme(): HubTheme {
  // The external, CSP-compatible bootstrap script already set this before React loaded.
  return typeof document === 'undefined'
    ? 'midnight'
    : parseHubTheme(document.documentElement.dataset.theme);
}

export const THEME_COLOURS: Record<HubTheme, string> = {
  midnight: '#0d1927',
  charcoal: '#17191e',
  plum: '#22182e',
  sepia: '#f3e8d5',
  paper: '#f8f7f3',
  ocean: '#e6f3f8',
};

export function applyHubTheme(theme: HubTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOURS[theme]);
  // A browser-native select needs no extra popover controls or Escape handling.
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be disabled or unavailable. Theme changes must still work.
  }
}
