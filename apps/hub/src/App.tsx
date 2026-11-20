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
        {/* The final approved Sun logo is integrated in its dedicated branding PR. */}
        <span className="hub-brand-mark" aria-hidden="true">☼</span>
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
    <main>
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
