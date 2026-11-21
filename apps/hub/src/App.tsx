import { useEffect, useState } from 'react';
import { MediaHubCard } from '@taiyou/ui';
import type { MediaModule, ModuleKey } from '@taiyou/contracts';
import { modules } from './catalogue';
import { applyHubTheme, HUB_THEMES, readInitialHubTheme, type HubTheme } from './theme';
import './styles.css';

const artwork: Record<ModuleKey, string> = {
  novels: '/art/novels-art.webp',
  manga: '/art/manga-art.webp',
  anime: '/art/anime-art.webp',
  'movies-tv': '/art/movies-tv-art.webp',
};

const cardCopy: Record<ModuleKey, { title: string; description: string }> = {
  novels: { title: 'Novel Library', description: 'A curated collection of novels across genres and worlds.' },
  manga: { title: 'Manga Library', description: 'A growing collection of manga series, from popular hits to hidden gems.' },
  anime: { title: 'Anime Library', description: 'A home for anime series and films.' },
  'movies-tv': { title: 'Movies & TV Library', description: 'A collection of films and TV series to watch and enjoy.' },
};

/** Lightweight, original inline vector linework. No remote icon library. */
function MediaGlyph({ kind }: { kind: ModuleKey }) {
  const shared = {
    className: 'hub-media-glyph', viewBox: '0 0 32 32',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.75,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };
  if (kind === 'novels') return <svg {...shared}>
    <path d="M16 7c-4.2-3-9-3.6-13-2v21c4.2-1.4 8.8-.6 13 2 4.2-2.6 8.8-3.4 13-2V5c-4-1.6-8.8-1-13 2Z" />
    <path d="M16 7v21M7 10c2-.4 4.3-.1 6 1M19 11c1.7-1.1 4-1.4 6-1" />
  </svg>;
  if (kind === 'manga') return <svg {...shared}>
    <path d="M6 4h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    <path d="M7 7h18v9H7zM7 19h8v6H7zM18 19h7M18 22h7M18 25h5" />
    <path d="m10 13 3-3 3 3 3-4 3 4" />
  </svg>;
  if (kind === 'anime') return <svg {...shared}>
    <rect x="3.5" y="5" width="25" height="22" rx="4" />
    <path d="m13 11 9 5-9 5z" />
  </svg>;
  return <svg {...shared}>
    <rect x="3" y="7" width="26" height="18" rx="2" />
    <path d="M10 7v18M22 7v18M3 13h7M3 19h7M22 13h7M22 19h7" />
  </svg>;
}

export default function App({ entries = modules }: { entries?: readonly MediaModule[] }) {
  const [theme, setTheme] = useState<HubTheme>(readInitialHubTheme);
  useEffect(() => { applyHubTheme(theme); }, [theme]);

  return <div className="hub-page">
    <a className="hub-skip-link" href="#libraries">Skip to libraries</a>
    <header className="hub-masthead" aria-label="Taiyou's Personal Hub">
      <a className="hub-brand" href="/">
        <span className="hub-brand-mark" aria-hidden="true"><img src="/branding/hub-sun-logo.svg" alt="" width="128" height="84" /></span>
        <span className="hub-brand-words">
          <strong>Taiyou’s Personal Hub</strong>
          <small>MY MEDIA GATEWAY</small>
        </span>
      </a>
      <span className="hub-header-florals" aria-hidden="true"><img src="/branding/header-sakura.svg" alt="" width="130" height="55" /></span>
      <div className="hub-masthead-controls">
        <label className="hub-theme-label" htmlFor="hub-theme">Theme</label>
        <select id="hub-theme" className="hub-theme-select" aria-label="Hub theme"
          value={theme} onChange={event => setTheme(event.target.value as HubTheme)}>
          {HUB_THEMES.map(name =>
            <option value={name} key={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>)}
        </select>
      </div>
    </header>
    <main className="hub-main">
      <h1 className="hub-sr-only">Taiyou’s Personal Hub</h1>
      <section className="hub-libraries" id="libraries" aria-labelledby="hub-libraries-title">
        <h2 id="hub-libraries-title" className="hub-sr-only">Choose your library</h2>
        <ul className="hub-grid">
          {entries.map(module => {
            const copy = cardCopy[module.key];
            return <li key={module.key} className={'hub-tile hub-tile--' + module.key}>
              <MediaHubCard
                title={copy.title}
                description={copy.description}
                artworkSrc={artwork[module.key]}
                icon={<MediaGlyph kind={module.key} />}
                immersive
                actionLabel={module.key === 'novels' ? 'Explore Novels' : 'Explore Manga'}
                status={module.availability}
                href={module.href}
              />
            </li>;
          })}
        </ul>
      </section>
    </main>
    <footer className="hub-footer"><span>Created by Taiyou</span></footer>
  </div>;
}
