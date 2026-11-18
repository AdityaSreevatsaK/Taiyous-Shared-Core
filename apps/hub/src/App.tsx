import { MediaHubCard } from '@taiyou/ui';
import { modules } from './catalogue';
import './styles.css';

const glyphs = ['✦', '◇', '◈', '▣'] as const;

export default function App() {
  const available = modules.filter(module => module.availability === 'available').length;
  return <>
    <a className="hub-skip-link" href="#libraries">Skip to libraries</a>
    <main className="hub-shell">
      <header className="hub-masthead" aria-label="Taiyou's Personal Hub">
        <div className="hub-brand"><span className="hub-brand-mark" aria-hidden="true">☼</span>
          <span>TAIYOU <span className="hub-brand-sub">/ PERSONAL HUB</span></span></div>
        <span className="hub-masthead-note">A place for every story</span>
      </header>
      <div className="hub-hero">
        <div className="hub-hero-copy">
          <p className="hub-eyebrow">YOUR WORLDS, ONE DOORWAY</p>
          <h1>Every story has <em>its own world.</em></h1>
          <p className="hub-intro">A quiet starting place for the stories you read,
            watch and return to. Choose a library to explore.</p>
        </div>
        <div className="hub-hero-art" aria-hidden="true">
          <div className="hub-orbit hub-orbit-outer"></div>
          <div className="hub-orbit hub-orbit-inner"></div>
          <span className="hub-orbit-sun">☼</span>
          <span className="hub-orbit-star hub-orbit-star-one">✦</span>
          <span className="hub-orbit-star hub-orbit-star-two">✧</span>
        </div>
      </div>
      <section className="hub-libraries" id="libraries" aria-labelledby="hub-libraries-title">
        <div className="hub-section-heading">
          <div>
            <p className="hub-eyebrow">THE COLLECTION</p>
            <h2 id="hub-libraries-title">Choose your library</h2>
          </div>
          <p className="hub-section-count">{available} available · {modules.length - available} planned</p>
        </div>
        <ul className="hub-grid">
          {modules.map((module, index) =>
            <li key={module.key} className={`hub-tile hub-tile--${module.key}`}>
              <MediaHubCard title={module.title} description={module.description}
                status={module.availability} href={module.href} icon={glyphs[index]} />
            </li>)}
        </ul>
      </section>
      <footer className="hub-footer">
        <span>Taiyou's Personal Hub</span>
        <span>Independent libraries. No shared sign-in or media catalogue.</span>
      </footer>
    </main>
  </>;
}
