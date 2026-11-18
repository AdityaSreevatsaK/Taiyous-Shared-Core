import { MediaHubCard } from '@taiyou/ui';
import { modules } from './catalogue';
import './styles.css';
export default function App() {
  return <main className="hub-shell">
    <header className="hub-header">
      <span className="hub-sun" aria-hidden="true">☼</span>
      <div><p className="hub-eyebrow">TAIYOU'S PERSONAL HUB</p><h1>One library, many worlds.</h1>
        <p className="hub-intro">Your gateway to novels, manga, anime, movies and television.</p></div>
    </header>
    <section aria-label="Your libraries" className="hub-grid">
      {modules.map(module =>
        <MediaHubCard key={module.key} title={module.title} description={module.description}
          status={module.availability} href={module.href} icon={module.key === 'novels' ? '📚' :
            module.key === 'manga' ? '🗂️' : module.key === 'anime' ? '🎞️' : '📺'} />)}
    </section>
    <footer className="hub-footer">Taiyou's Personal Hub · Navigation only.
      No shared sign-in or media catalogue is enabled yet.</footer>
  </main>;
}
