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

const presentation: Record<ModuleKey, { title: string; subtitle: string; action: string }> = {
  novels: { title: 'Novel Library', subtitle: 'Read and return to favourite stories', action: 'Explore Novels' },
  manga: { title: 'Manga Library', subtitle: 'Panels, pages, and adventures', action: 'Explore Manga' },
  anime: { title: 'Anime Library', subtitle: 'Series, films, and animated worlds', action: 'Coming Soon' },
  'movies-tv': { title: 'Movies & TV Library', subtitle: 'Cinema nights and favourite shows', action: 'Coming Soon' },
};

function MediaIllustration({ kind }: { kind: ModuleKey }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'novels') return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <path d="M32 16c-9-5-17-5-25-2v36c8-3 16-3 25 2 9-5 17-5 25-2V14c-8-3-16-3-25 2Z" />
    <path d="M32 16v36M13 22c5-1 9 0 13 2M38 24c4-2 8-3 13-2" />
  </svg>;
  if (kind === 'manga') return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <rect x="12" y="10" width="38" height="46" rx="2" /><path d="M17 17h28v16H17zM17 38h12v12H17zM33 38h12v12H33zM8 14v45h38" />
  </svg>;
  if (kind === 'anime') return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <rect x="7" y="13" width="50" height="38" rx="6"/><path d="m26 23 14 9-14 9V23Z" />
  </svg>;
  return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <rect x="8" y="14" width="48" height="36" rx="3"/><path d="M18 14v36M46 14v36M8 24h48M8 40h48M11 19h4M49 19h4M11 45h4M49 45h4" />
  </svg>;
}

export default function App({ entries = modules }: { entries?: readonly MediaModule[] }) {
  const [theme, setTheme] = useState<HubTheme>(readInitialHubTheme);
  useEffect(() => { applyHubTheme(theme); }, [theme]);

  return <div className="hub-page">
    <a className="hub-skip-link" href="#libraries">Skip to libraries</a>
    <header className="hub-masthead" aria-label="Taiyou's Personal Hub">
      <a className="hub-brand" href="/">
        {/* The exact approved Sun logo will replace the placeholder in the separate branding PR. */}
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
            const details = presentation[module.key];
            return <li key={module.key} className={'hub-tile hub-tile--' + module.key}>
              <MediaHubCard
                title={details.title}
                description={details.subtitle}
                actionLabel={details.action}
                artworkSrc={artwork[module.key]}
                status={module.availability}
                href={module.href}
                icon={<MediaIllustration kind={module.key} />}
              />
            </li>;
          })}
        </ul>
      </section>
    </main>
    <footer className="hub-footer"><span>Created by Taiyou</span></footer>
  </div>;
}
