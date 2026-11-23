import { useEffect, useRef, useState } from 'react';
import type { MediaModule, ModuleKey } from '@taiyou/contracts';
import { modules, publicHttpsDestination } from './catalogue';
import { applyHubTheme, HUB_THEMES, readInitialHubTheme, type HubTheme } from './theme';
import './styles.css';

type PanelKey = 'novel' | 'manga' | 'anime' | 'movies';

const portalInfo: Record<ModuleKey, { title: string; key: PanelKey; image: string; description: string }> = {
  novels: {
    title: 'Novel', key: 'novel', image: '/art/reference-novel.webp',
    description: 'Enter your personal collection of novels and stories.',
  },
  manga: {
    title: 'Manga', key: 'manga', image: '/art/reference-manga.webp',
    description: 'Read manga from your independent library.',
  },
  anime: {
    title: 'Anime', key: 'anime', image: '/art/reference-anime.webp',
    description: 'An anime library is planned for the future.',
  },
  'movies-tv': {
    title: 'Movies & TV', key: 'movies', image: '/art/reference-movies-tv.webp',
    description: 'A film and television library is coming soon.',
  },
};

const portalMasks: Record<PanelKey, string> = {
  novel: 'M .24 .016 C .49 -.006 .74 .014 .946 .009 C 1.006 .007 1.01 .048 .996 .13 L .933 .768 C .919 .906 .828 .983 .632 .99 L .058 .997 C .006 1.001 .002 .976 .006 .895 L .087 .223 C .107 .107 .156 .037 .24 .016 Z',
  manga: 'M .18 .046 C .42 -.015 .71 .001 .935 .012 C 1.017 .019 1.006 .114 .998 .223 L .988 .763 C .988 .899 .916 .953 .789 .979 C .564 1.006 .34 .99 .081 .998 C -.002 1 .002 .948 .006 .845 L .074 .227 C .087 .133 .116 .062 .18 .046 Z',
  anime: 'M .17 .008 C .402 -.012 .722 -.003 .93 .013 C .996 .018 1.007 .073 .99 .18 L .931 .795 C .91 .919 .811 .981 .646 .991 L .085 .997 C -.005 1 .002 .955 .007 .863 L .059 .209 C .076 .104 .105 .031 .17 .008 Z',
  movies: 'M .185 .048 C .42 -.002 .743 -.006 .934 .014 C .996 .019 1.002 .078 .997 .17 L .999 .864 C .998 .942 .966 .989 .866 .991 L .07 .998 C .008 1.002 .003 .955 .009 .865 L .056 .209 C .071 .115 .114 .059 .185 .048 Z',
};

const portalBorders: Record<PanelKey, string> = {
  novel: 'M240 11 C490 -4 740 10 946 6 C1006 5 1010 34 996 91 L933 538 C919 634 828 688 632 693 L58 698 C6 701 2 683 6 627 L87 156 C107 75 156 26 240 11 Z',
  manga: 'M180 32 C420 -10 710 1 935 8 C1017 13 1006 80 998 156 L988 534 C988 629 916 667 789 685 C564 704 340 693 81 699 C-2 700 2 663 6 592 L74 159 C87 93 116 43 180 32 Z',
  anime: 'M170 6 C402 -8 722 -2 930 9 C996 13 1007 51 990 126 L931 556 C910 643 811 687 646 694 L85 698 C-5 700 2 668 7 604 L59 146 C76 73 105 22 170 6 Z',
  movies: 'M185 34 C420 -1 743 -4 934 10 C996 13 1002 55 997 119 L999 604 C998 660 966 692 866 694 L70 698 C8 701 3 668 9 606 L56 146 C71 81 114 41 185 34 Z',
};

function PortalDefinitions() {
  return <svg aria-hidden="true" className="svg-definitions" xmlns="http://www.w3.org/2000/svg" width="0" height="0">
    <defs>
      {Object.entries(portalMasks).map(([key, d]) =>
        <clipPath key={key} id={`${key}-clip`} clipPathUnits="objectBoundingBox"><path d={d} /></clipPath>)}
      <linearGradient id="portal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop stopColor="#40220f" />
        <stop offset=".16" stopColor="#eeb55e" />
        <stop offset=".4" stopColor="#ffdd8b" />
        <stop offset=".63" stopColor="#8e4c1b" />
        <stop offset=".86" stopColor="#ffd277" />
        <stop offset="1" stopColor="#8b491e" />
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
    <g fill="url(#sun-fill)" stroke="#ffda78" strokeWidth="1.2">
      <path d="M50 1 54 27 50 22 46 27Z M50 99 54 73 50 78 46 73Z M1 50 27 46 22 50 27 54Z M99 50 73 46 78 50 73 54Z" />
      <path d="M15 15 34 31 31 34 15 15ZM85 15 69 34 66 31ZM15 85 31 66 34 69ZM85 85 66 69 69 66Z" />
      <path d="M30 4 39 28 36 30ZM70 4 64 30 61 28ZM4 30 30 36 28 39ZM96 30 72 39 70 36ZM4 70 28 61 30 64ZM96 70 70 64 72 61ZM30 96 36 70 39 72ZM70 96 61 72 64 70Z" />
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
  const safeHref = module.availability === 'available' ? publicHttpsDestination(module.href) : undefined;
  const available = Boolean(safeHref);
  const contents = <>
    <div className="portal-mask" aria-hidden="true">
      <img className="portal-image" src={info.image} alt="" width="602" height="400" loading="eager" decoding="async" />
      <div className="portal-vignette" />
    </div>
    <svg className="portal-border" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
      <path d={portalBorders[info.key]} />
    </svg>
    <div className="portal-content">
      <h3>{info.title}</h3>
      <span className="ornament" aria-hidden="true" />
      {available
        ? <span className="action-pill">Enter Library <span aria-hidden="true">›</span></span>
        : <span className="status-pill"><span aria-hidden="true">{module.key === 'anime' ? '◷' : '▣'}</span>
            {module.key === 'anime' ? 'Planned' : 'Coming Soon'}</span>}
      <span className="visually-hidden">{info.description}</span>
    </div>
  </>;
  return <li className={`portal-item portal-${info.key}${dimmed ? ' portal-dimmed' : ''}`}>
    {available ? <a className="portal-surface" href={safeHref} rel="noopener noreferrer"
      referrerPolicy="no-referrer" aria-label={`${info.title}, enter library`}>{contents}</a>
      : <article className="portal-surface" aria-label={`${info.title}, planned`}>{contents}</article>}
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