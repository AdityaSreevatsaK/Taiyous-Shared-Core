import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { MediaModule, ModuleKey } from '@taiyou/contracts';
import { modules, publicHttpsDestination } from './catalogue';
import { applyHubTheme, HUB_THEMES, readInitialHubTheme, type HubTheme } from './theme';
import { DESKTOP_PORTALS, MOBILE_PORTAL_BORDERS, MOBILE_PORTAL_MASKS, desktopClipTransform, desktopPortalCSS, type PortalKey } from './portalGeometry';
import './styles.css';

const portalInfo: Record<ModuleKey, { title: string; key: PortalKey; image: string; description: string }> = {
  novels: {
    title: 'Novel', key: 'novel', image: '/art/cinematic-novel-1600.webp',
    description: 'Enter your personal collection of novels and stories.',
  },
  manga: {
    title: 'Manga', key: 'manga', image: '/art/cinematic-manga-1600.webp',
    description: 'Read manga from your independent library.',
  },
  anime: {
    title: 'Anime', key: 'anime', image: '/art/cinematic-anime-1600.webp',
    description: 'An anime library is planned for the future.',
  },
  'movies-tv': {
    title: 'Movies & TV', key: 'movies', image: '/art/cinematic-movies-tv-1600.webp',
    description: 'A film and television library is coming soon.',
  },
};

function PortalDefinitions() {
  return <svg aria-hidden="true" className="svg-definitions"
    xmlns="http://www.w3.org/2000/svg" width="0" height="0">
    <defs>
      {Object.entries(DESKTOP_PORTALS).map(([key, shape]) =>
        <clipPath key={key} id={`${key}-desktop-clip`} clipPathUnits="objectBoundingBox">
          <path d={shape.path} transform={desktopClipTransform(shape.bounds)} />
        </clipPath>)}
      {Object.entries(MOBILE_PORTAL_MASKS).map(([key, path]) =>
        <clipPath key={key} id={`${key}-mobile-clip`} clipPathUnits="objectBoundingBox">
          <path d={path} />
        </clipPath>)}
      <linearGradient id="portal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop stopColor="#533016" />
        <stop offset=".18" stopColor="#8c5c33" />
        <stop offset=".38" stopColor="#dfb375" />
        <stop offset=".63" stopColor="#5d351b" />
        <stop offset=".85" stopColor="#efc184" />
        <stop offset="1" stopColor="#8b532d" />
      </linearGradient>
      <linearGradient id="portal-glint" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop stopColor="#e5ab5b" stopOpacity="0" />
        <stop offset=".25" stopColor="#fff1cb" stopOpacity=".70" />
        <stop offset=".56" stopColor="#ffc87d" stopOpacity=".52" />
        <stop offset="1" stopColor="#e5ab5b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="sun-fill" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#fff6c4" />
        <stop offset=".28" stopColor="#ffd889" />
        <stop offset=".7" stopColor="#db862e" />
        <stop offset="1" stopColor="#8a4513" />
      </linearGradient>
    </defs>
  </svg>;
}

function SunSymbol() {
  return <svg className="brand-symbol" viewBox="0 0 100 100" role="img" aria-label="Taiyou Sun">
    <defs>
      <filter id="sun-bloom" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g fill="url(#sun-fill)" stroke="#ffd58d" strokeWidth=".44">
      {Array.from({ length: 24 }, (_, index) =>
        <path key={index}
          d={index % 2 === 0
            ? 'M50 1.5 52.6 29 50 25 47.4 29Z'
            : 'M50 9 51.7 29 50 25.9 48.3 29Z'}
          transform={`rotate(${index * 15} 50 50)`} />)}
    </g>
    <circle cx="50" cy="50" r="23" fill="url(#sun-fill)" stroke="#fff0b0" strokeWidth="2" filter="url(#sun-bloom)" />
    <circle cx="50" cy="50" r="19" fill="none" stroke="#d98e33" strokeWidth="1" />
  </svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <circle cx="14" cy="14" r="9" /><path d="m21 21 8 8" />
  </svg>;
}

function ShortcutsIcon() {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="16" cy="10" r="6" /><path d="M4 29v-3a12 12 0 0 1 24 0v3Z" />
  </svg>;
}


function Portal({ module, dimmed }: { module: MediaModule; dimmed: boolean }) {
  const info = portalInfo[module.key];
  const shape = DESKTOP_PORTALS[info.key];
  const safeHref = module.availability === 'available' ? publicHttpsDestination(module.href) : undefined;
  const available = Boolean(safeHref);
  const contents = <>
    <div className="portal-mask" aria-hidden="true">
      <img className="portal-image" src={info.image}
        srcSet={info.image.replace('-1600.webp', '-900.webp') + ' 900w, ' + info.image + (info.key === 'movies' ? ' 1683w' : ' 1586w')}
        sizes="(max-width: 670px) 95vw, (max-width: 1100px) 47vw, 36vw"
        alt="" width={info.key === 'movies' ? 1683 : 1586}
        height={info.key === 'movies' ? 935 : 992} loading="eager" decoding="async" />
      <div className="portal-vignette" />
    </div>
    <div className="portal-content">
      <h3>{info.title}</h3>
      <span className="ornament" aria-hidden="true" />
      {available
        ? <span className="action-pill">Enter Library <span aria-hidden="true">›</span></span>
        : <span className="status-pill">
            {module.key === 'anime'
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 5v7l4 3" /></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  aria-hidden="true"><path d="M3 9h18v12H3zM3 9l17-5 1 5M3 13h18M7 7l3 5m5-7 3 6" /></svg>}
            {module.key === 'anime' ? 'Planned' : 'Coming Soon'}</span>}
      <span className="visually-hidden">{info.description}</span>
    </div>
  </>;
  // Deliberately outside the clipped link: every edge remains fully painted.
  // It uses the SAME path and rectangle as the mask and never receives pointer events.
  const rim = <div className="portal-rim" aria-hidden="true">
    <svg className="portal-border portal-border-desktop"
      viewBox={`${shape.bounds.x} ${shape.bounds.y} ${shape.bounds.width} ${shape.bounds.height}`}
      preserveAspectRatio="none" aria-hidden="true">
      <path data-desktop-boundary={info.key} d={shape.path} />
      <path className="portal-border-glint" d={shape.path} />
    </svg>
    <svg className="portal-border portal-border-mobile" viewBox="0 0 1000 700"
      preserveAspectRatio="none" aria-hidden="true">
      <path d={MOBILE_PORTAL_BORDERS[info.key]} />
    </svg>
  </div>;
  return <li className={`portal-item portal-${info.key}${dimmed ? ' portal-dimmed' : ''}`}
    style={desktopPortalCSS(shape.bounds) as CSSProperties}>
    {available ? <a className="portal-surface" href={safeHref} rel="noopener noreferrer"
      referrerPolicy="no-referrer">{contents}</a>
      : <article className="portal-surface">{contents}</article>}
    {rim}
  </li>;
}

export default function App({ entries = modules }: { entries?: readonly MediaModule[] }) {
  const [theme, setTheme] = useState<HubTheme>(readInitialHubTheme);
  const [menu, setMenu] = useState<'search' | 'shortcuts' | null>(null);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { applyHubTheme(theme); }, [theme]);
  useEffect(() => {
    if (menu === 'search') searchRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const matches = entries.filter(module => {
    const info = portalInfo[module.key];
    return (info.title + ' ' + info.description).toLowerCase().includes(query.trim().toLowerCase());
  }).length;
  const usable = entries.filter(module => module.availability === 'available'
    && publicHttpsDestination(module.href));

  return <div className="hub">
    <a className="skip-link" href="#libraries">Skip to libraries</a>
    <PortalDefinitions />
    <header className="masthead" aria-label="Taiyou Hub">
      <a className="brand" href="/" aria-label="Taiyou Hub home">
        <SunSymbol /><span className="brand-name">Taiyou Hub</span>
      </a>
      <div className="masthead-right">
        <label htmlFor="theme" className="theme-label">Theme</label>
        <div className="theme-pill"><span className="theme-sun" aria-hidden="true">☼</span>
          <select id="theme" aria-label="Hub theme" value={theme}
            onChange={event => setTheme(event.target.value as HubTheme)}>
            {HUB_THEMES.map(name => <option key={name} value={name}>
              {name === 'sepia' ? 'Amber Classic' : name.charAt(0).toUpperCase() + name.slice(1)}
            </option>)}
          </select>
        </div>
        <span className="header-separator" aria-hidden="true" />
        <button className="header-icon" type="button" aria-label="Search libraries"
          aria-expanded={menu === 'search'} aria-controls="search-panel"
          onClick={() => setMenu(menu === 'search' ? null : 'search')}><SearchIcon /></button>
        <button className="header-icon" type="button" aria-label="Library shortcuts"
          aria-expanded={menu === 'shortcuts'} aria-controls="shortcut-panel"
          onClick={() => setMenu(menu === 'shortcuts' ? null : 'shortcuts')}><ShortcutsIcon /></button>
      </div>
      <div className="header-panel" id="search-panel" hidden={menu !== 'search'}>
        <label htmlFor="library-search">Find a destination</label>
        <input id="library-search" ref={searchRef} type="search" value={query}
          onChange={event => setQuery(event.target.value)} placeholder="Novel, Manga, Anime…" autoComplete="off" />
        <p id="search-message" aria-live="polite">{query.trim()
          ? `${matches} matching destination${matches === 1 ? '' : 's'}.`
          : 'Choose a library below.'}</p>
      </div>
      <div className="header-panel shortcuts-panel" id="shortcut-panel" hidden={menu !== 'shortcuts'}>
        <strong>Your reading spaces</strong>
        {usable.map(module => <a href={module.href} key={module.key} rel="noopener noreferrer"
          referrerPolicy="no-referrer">{portalInfo[module.key].title} Library ↗</a>)}
        <small>Each library maintains its own account and progress.</small>
      </div>
    </header>
    <main className="world" id="libraries">
      <h1 className="visually-hidden">Taiyou’s Personal Hub</h1>
      <div className="environment" aria-hidden="true"><div className="environment-image" /><div className="environment-glow" /></div>
      <svg className="world-sweep" viewBox="0 0 1672 780" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="sweepG" x1="0" x2="1">
          <stop stopColor="#c27931" stopOpacity="0" />
          <stop offset=".4" stopColor="#fdd58a" stopOpacity=".8" />
          <stop offset=".7" stopColor="#eaa957" stopOpacity=".35" />
          <stop offset="1" stopColor="#f6b65f" stopOpacity="0" />
        </linearGradient></defs>
        <path d="M 510 120 Q 920 -15 1350 0" fill="none" stroke="url(#sweepG)" strokeWidth="2" />
      </svg>
      <section className="portal-stage" aria-labelledby="libraries-heading">
        <h2 id="libraries-heading" className="visually-hidden">Choose your library</h2>
        <ul className="portal-list">
          {entries.map(module => <Portal key={module.key} module={module}
            dimmed={Boolean(query.trim()) && !(portalInfo[module.key].title + ' ' + portalInfo[module.key].description).toLowerCase().includes(query.trim().toLowerCase())} />)}
        </ul>
      </section>
    </main>
  </div>;
}