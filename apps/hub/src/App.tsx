import { useEffect, useState } from 'react';
import { MediaHubCard } from '@taiyou/ui';
import type { MediaModule, ModuleKey } from '@taiyou/contracts';
import { modules } from './catalogue';
import { applyHubTheme, HUB_THEMES, isDarkHubTheme, readInitialHubTheme, type HubTheme } from './theme';
import './styles.css';

function MediaIllustration({ kind }: { kind: ModuleKey }) {
  // Original vector linework, decorative only; no third-party icon requests.
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'novels') return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <path d="M32 16c-9-5-17-5-25-2v36c8-3 16-3 25 2 9-5 17-5 25-2V14c-8-3-16-3-25 2Z" />
    <path d="M32 16v36M13 22c5-1 9 0 13 2M13 30c5-1 9 0 13 2M38 24c4-2 8-3 13-2M38 32c4-2 8-3 13-2" />
  </svg>;
  if (kind === 'manga') return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <rect x="10" y="7" width="44" height="50" rx="3"/><path d="M16 13h32v18H16zM16 37h14v14H16zM36 37h12v14H36z"/>
    <path d="m29 16-5 8 7-3-3 7 11-11-7 2 2-3M21 43l4 3m15-5 4 6"/>
  </svg>;
  if (kind === 'anime') return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <rect x="7" y="14" width="50" height="36" rx="5"/><path d="m27 24 14 8-14 8V24ZM15 8l6 6M49 8l-6 6M16 56h32M32 50v6"/>
    <path d="M13 32h4M47 32h4" />
  </svg>;
  return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    <rect x="9" y="12" width="46" height="40" rx="4"/><path d="M19 12v40M45 12v40M9 24h46M9 40h46"/>
    <path d="M13 17h2M13 31h2M13 45h2M49 17h2M49 31h2M49 45h2"/>
    <path d="m28 28 10 4-10 4v-8Z"/>
  </svg>;
}

export default function App({ entries = modules }: { entries?: readonly MediaModule[] }) {
  const [theme, setTheme] = useState<HubTheme>(readInitialHubTheme);
  const available = entries.filter(module => module.availability === 'available').length;
  const logoSrc = `/branding/logos/logo-${isDarkHubTheme(theme) ? 'dark' : 'light'}.png`;
  useEffect(() => { applyHubTheme(theme); }, [theme]);

  return <>
    <a className="hub-skip-link" href="#libraries">Skip to libraries</a>
    <main className="hub-shell">
      <header className="hub-masthead" aria-label="Taiyou's Personal Hub">
        <a className="hub-brand" href="/" aria-label="Taiyou / Personal Hub, Home">
          <img className="hub-brand-logo" src={logoSrc} alt="" width={48} height={48} aria-hidden="true" />
          <span>TAIYOU <span className="hub-brand-sub">/ PERSONAL HUB</span></span>
        </a>
        <div className="hub-masthead-controls">
          <span className="hub-masthead-note">A place for every story</span>
          <label className="hub-theme-label" htmlFor="hub-theme">Theme</label>
          <select id="hub-theme" className="hub-theme-select" aria-label="Hub theme"
            value={theme} onChange={event => setTheme(event.target.value as HubTheme)}>
            {HUB_THEMES.map(name =>
              <option value={name} key={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>)}
          </select>
        </div>
      </header>
      <div className="hub-hero">
        <div className="hub-hero-copy">
          <p className="hub-eyebrow">YOUR WORLDS, ONE DOORWAY</p>
          <h1>Every story has <em>its own world.</em></h1>
          <p className="hub-intro">A quiet starting place for the stories you read,
            watch and return to. Choose a library to explore.</p>
        </div>
        <div className="hub-hero-art" aria-hidden="true">
          <img className="hub-hero-logo" src={logoSrc} alt="" width={240} height={240} />
        </div>
      </div>
      <section className="hub-libraries" id="libraries" aria-labelledby="hub-libraries-title">
        <div className="hub-section-heading">
          <div>
            <p className="hub-eyebrow">THE COLLECTION</p>
            <h2 id="hub-libraries-title">Choose your library</h2>
          </div>
          <p className="hub-section-count">{available} available · {entries.length - available} planned</p>
        </div>
        <ul className="hub-grid">
          {entries.map(module =>
            <li key={module.key} className={`hub-tile hub-tile--${module.key}`}>
              <MediaHubCard title={module.title} description={module.description}
                status={module.availability} href={module.href} icon={<MediaIllustration kind={module.key} />} />
            </li>)}
        </ul>
      </section>
      <footer className="hub-footer">
        <span>Created by Taiyou</span>
        <span>Independent libraries. No shared sign-in or media catalogue.</span>
      </footer>
    </main>
  </>;
}
