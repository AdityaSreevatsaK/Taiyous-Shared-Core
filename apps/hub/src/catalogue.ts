import type { MediaModule, ModuleKey } from '@taiyou/contracts';

/**
 * Navigation destinations are public URLs, never OAuth callbacks or private API
 * routes. Ownership/deployment verification is an explicit release gate.
 */
export function publicHttpsDestination(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  if (!candidate) return undefined;
  try {
    const url = new URL(candidate);
    const hostname = url.hostname.toLowerCase();
    // Require a public-looking DNS hostname, not credentials, IP literals or
    // local hosts. Never forward query parameters or fragments from config.
    if (url.protocol !== 'https:' || url.username || url.password ||
      url.port || url.search || url.hash ||
      !/^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(hostname) ||
      hostname === 'localhost' || hostname.endsWith('.localhost') ||
      /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export interface HubDestinations {
  novels?: string;
  manga?: string;
  anime?: string;
  moviesTv?: string;
}

const KNOWN_NOVELS_URL = 'https://taiyous-personal-library.pages.dev/';

function moduleOf(
  key: ModuleKey, title: string, description: string, destination?: string,
): MediaModule {
  const href = publicHttpsDestination(destination);
  return { key, title, description, href, availability: href ? 'available' : 'planned' };
}

/** Deterministic registry so tests can exercise valid, absent and unsafe URLs. */
export function createHubModules(destinations: HubDestinations = {}): MediaModule[] {
  return [
    moduleOf('novels', 'Novels',
      'Stories worth staying up for. Continue into your personal EPUB library.',
      publicHttpsDestination(destinations.novels) ?? KNOWN_NOVELS_URL),
    moduleOf('manga', 'Manga',
      'Illustrated worlds, chapter by chapter.', destinations.manga),
    moduleOf('anime', 'Anime',
      'Series, seasons and episodes, all in one place.', destinations.anime),
    moduleOf('movies-tv', 'Movies & TV',
      'Keep track of the films and shows you love.', destinations.moviesTv),
  ];
}

/** VITE_* values are public. An owner must verify each HTTPS deployment first. */
export const modules = createHubModules({
  novels: import.meta.env.VITE_NOVELS_URL,
  manga: import.meta.env.VITE_MANGA_URL,
  anime: import.meta.env.VITE_ANIME_URL,
  moviesTv: import.meta.env.VITE_MOVIES_TV_URL,
});
