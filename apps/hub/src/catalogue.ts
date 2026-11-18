import type { MediaModule } from '@taiyou/contracts';
/** Browser-visible URLs only. No OAuth, private catalogue or credentials in the hub. */
const configured = (value: string | undefined): string | undefined => {
  const candidate = value?.trim();
  if (!candidate) return undefined;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === 'https:' ? parsed.toString() : undefined;
  } catch { return undefined; }
};
const novelUrl = configured(import.meta.env.VITE_NOVELS_URL) ??
  'https://taiyous-personal-library.pages.dev/';
const moduleOf = (key: MediaModule['key'], title: string, description: string,
  href?: string): MediaModule => ({
    key, title, description, href, availability: href ? 'available' : 'planned',
  });
export const modules: MediaModule[] = [
  moduleOf('novels', 'Novels', 'Read EPUB chapters and organise your personal novel library.', novelUrl),
  moduleOf('manga', 'Manga', 'Chapter and page tracking with a future image reader.', configured(import.meta.env.VITE_MANGA_URL)),
  moduleOf('anime', 'Anime', 'Series, watchlists and episode progress.', configured(import.meta.env.VITE_ANIME_URL)),
  moduleOf('movies-tv', 'Movies & TV', 'Films, television seasons and episodes.', configured(import.meta.env.VITE_MOVIES_TV_URL)),
];
