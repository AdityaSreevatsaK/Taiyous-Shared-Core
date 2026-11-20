import { useEffect, useState } from 'react';
import { MediaHubCard } from '@taiyou/ui';
import type { MediaModule, ModuleKey } from '@taiyou/contracts';
import { modules } from './catalogue';
import { applyHubTheme, HUB_THEMES, readInitialHubTheme, type HubTheme } from './theme';
import './styles.css';

const artwork: Record<ModuleKey, string> = {
  novels: '/art/novels.avif',
  manga: '/art/manga.avif',
  anime: '/art/anime.avif',
  'movies-tv': '/art/movies-tv.avif',
};

const cardCopy: Record<ModuleKey, { title: string; description: string }> = {
  novels: { title: 'Novel Library', description: 'A curated collection of novels across genres and worlds.' },
  manga: { title: 'Manga Library', description: 'A growing collection of manga series, from popular hits to hidden gems.' },
  anime: { title: 'Anime Library', description: 'A home for anime series and films, coming soon.' },
  'movies-tv': { title: 'Movies & TV Library', description: 'A collection of films and TV series to watch and enjoy, coming soon.' },
};

export default function App({ entries = modules }: { entries?: readonly MediaModule[] }) {
  const [theme, setTheme] = useState<HubTheme>(readInitialHubTheme);
  useEffect(() => { applyHubTheme(theme); }, [theme]);

  return <div className="hub-page">
    <a className="hub-skip-link" href="#libraries">Skip to libraries</a>
    <header className="hub-masthead" aria-label="Taiyou's Personal Hub">
      <a className="hub-brand" href="/">
        <span className="hub-brand-mark" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false"><g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M40 7v8M40 59v6M7 38h8M65 38h8M17 15l6 6M57 57l6 6M62 14l-6 7M17 60l6-6M26 9l3 7M53 9l-3 7M7 24l7 4M73 24l-7 4"/><path d="M18 46a23 23 0 1 1 44 0" strokeWidth="2.6"/><path d="M7 51c15 0 16-8 29-8 11 0 16 9 37 8M8 58c13-2 21 3 33 3 13 0 22-4 32-3"/><path d="M20 48l12-8 8 8 9-6 11 8"/></g><path fill="currentColor" d="M28 40a15 15 0 0 1 24 0Z" opacity=".85"/></svg></span>
        <span className="hub-brand-words">
          <strong>Taiyou’s Personal Hub</strong>
          <small>MY MEDIA GATEWAY</small>
        </span>
      </a>
      <span className="hub-header-florals" aria-hidden="true">✿ ❀ ✿</span>
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
      <section className="hub-hero" aria-labelledby="hub-welcome">
        <div className="hub-hero-copy">
          <h1 id="hub-welcome">Welcome to Taiyou’s Personal Hub!</h1>
          <p>Your cosy gateway to my world of novels, manga, anime, and films.</p>
          <span className="hub-hero-motto"><span aria-hidden="true">☀</span> Explore <span aria-hidden="true">•</span> Read <span aria-hidden="true">•</span> Watch <span aria-hidden="true">•</span> Discover</span>
        </div>
      </section>
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
                imageOnly
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
