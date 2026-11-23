import { useEffect, useState } from 'react';
import type { MediaModule, ModuleKey } from '@taiyou/contracts';
import sunLight from '../../../docs/assets/sun-light.webp';
import sunDark from '../../../docs/assets/sun-dark.webp';
import { modules, publicHttpsDestination } from './catalogue';
import { applyHubTheme, HUB_THEMES, readInitialHubTheme, type HubTheme } from './theme';
import './styles.css';

const illustrations: Record<ModuleKey, string> = {
  novels: '/art/novels-art.webp',
  manga: '/art/manga-art.webp',
  anime: '/art/anime-art.webp',
  'movies-tv': '/art/movies-tv-art.webp',
};

const captions: Record<ModuleKey, { title: string; description: string }> = {
  novels: { title: 'Novel', description: 'Enter your personal novel library.' },
  manga: { title: 'Manga', description: 'Enter your personal manga library.' },
  anime: { title: 'Anime', description: 'The anime library is planned.' },
  'movies-tv': { title: 'Movies & TV', description: 'The movies and television library is coming soon.' },
};

function DestinationIcon({ kind }: { kind: ModuleKey }) {
  const base = { viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    'aria-hidden': true as const, className: 'destination-icon' };
  switch (kind) {
    case 'novels': return <svg {...base}>
      <path d="M16 7C12.5 4.5 8 4 4 5v21c4-1 8.5-.4 12 2 3.5-2.4 8-3 12-2V5c-4-1-8.5-.5-12 2Z" />
      <path d="M16 7v21M7 10c2-.4 4-.2 6 1m6 0c2-1.2 4-1.4 6-1" />
    </svg>;
    case 'manga': return <svg {...base}>
      <rect x="5" y="4" width="22" height="24" rx="2" />
      <path d="M8 7h16v10H8zM8 20h8v5H8zM19 20h5m-5 3h5M11 15l4-4 3 3 3-4" />
    </svg>;
    case 'anime': return <svg {...base}>
      <rect x="3" y="6" width="26" height="20" rx="4" />
      <path d="m13 11 9 5-9 5z" />
    </svg>;
    case 'movies-tv': return <svg {...base}>
      <rect x="4" y="9" width="24" height="17" rx="2" />
      <path d="m4 9 22-5 2 5M4 14h24M9 6l4 6M18 4l4 7" />
    </svg>;
  }
}

/** The entire artwork panel is one link; planned destinations are inert articles. */
function Destination({ module }: { module: MediaModule }) {
  const copy = captions[module.key];
  const href = module.availability === 'available'
    ? publicHttpsDestination(module.href) : undefined;
  const available = Boolean(href);
  const content = <>
    <img className="destination-art" src={illustrations[module.key]}
      alt="" width="1086" height="1448" decoding="async" loading="eager" />
    <span className="destination-scrim" aria-hidden="true" />
    <span className="destination-content">
      <span className="destination-heading"><DestinationIcon kind={module.key} />
        <h3>{copy.title}</h3>
      </span>
      <span className="destination-rule" aria-hidden="true" />
      <span className="destination-action">
        {available ? <>Enter library <span aria-hidden="true">↗</span></>
          : <><span aria-hidden="true">◷</span> {module.key === 'anime' ? 'Planned' : 'Coming soon'}</>}
      </span>
      <span className="hub-sr-only">{copy.description}</span>
    </span>
  </>;
  const className = 'destination destination--' + module.key +
    (available ? ' destination--available' : ' destination--planned');
  return available
    ? <a className={className} href={href}
        rel="noopener noreferrer" referrerPolicy="no-referrer">{content}</a>
    : <article className={className}>{content}</article>;
}

export default function App({ entries = modules }: { entries?: readonly MediaModule[] }) {
  const [theme, setTheme] = useState<HubTheme>(readInitialHubTheme);
  useEffect(() => { applyHubTheme(theme); }, [theme]);
  const brandImage = theme === 'paper' || theme === 'ocean' ? sunDark : sunLight;

  return <div className="hub-page">
    <a className="hub-skip-link" href="#libraries">Skip to libraries</a>
    <header className="hub-masthead" aria-label="Taiyou Hub">
      <a className="hub-brand" href="/" aria-label="Taiyou Hub, homepage">
        <img className="hub-brand-image" src={brandImage} alt="" width="88" height="88" />
        <span className="hub-brand-name">Taiyou Hub</span>
      </a>
      <div className="hub-masthead-controls">
        <label htmlFor="hub-theme" className="hub-theme-label">Theme</label>
        <div className="hub-theme-control">
          <span className="hub-theme-sun" aria-hidden="true">☼</span>
          <select id="hub-theme" className="hub-theme-select" aria-label="Hub theme"
            value={theme} onChange={event => setTheme(event.target.value as HubTheme)}>
            {HUB_THEMES.map(name => <option value={name} key={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </option>)}
          </select>
        </div>
      </div>
    </header>
    <main className="hub-main">
      <h1 className="hub-sr-only">Taiyou’s Personal Hub</h1>
      <div className="hub-observatory" aria-hidden="true">
        <span className="hub-observatory-light" />
        <span className="hub-observatory-edge" />
      </div>
      <section className="hub-libraries" id="libraries" aria-labelledby="hub-libraries-title">
        <h2 className="hub-sr-only" id="hub-libraries-title">Choose your library</h2>
        <ul className="hub-grid">
          {entries.map(module => <li className={'hub-tile hub-tile--' + module.key}
            key={module.key}><Destination module={module} /></li>)}
        </ul>
      </section>
    </main>
    <footer className="hub-footer"><span>Created by Taiyou</span></footer>
  </div>;
}
