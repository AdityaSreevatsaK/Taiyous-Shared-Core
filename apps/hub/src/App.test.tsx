import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MediaHubCard } from '@taiyou/ui';
import App from './App';
import { createHubModules } from './catalogue';

describe('accessible Hub markup', () => {
  it('renders four named library tiles and a working skip link', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('href="#libraries"');
    expect(html).toContain('id="libraries"');
    expect((html.match(/class="hub-card hub-card-/g) ?? [])).toHaveLength(4);
    for (const title of ['Novels', 'Manga', 'Anime', 'Movies &amp; TV']) {
      expect(html).toContain(title);
    }
  });

  it('renders only a live link for the default Novels destination', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('href="https://taiyous-personal-library.pages.dev/"');
    expect((html.match(/class="hub-card hub-card-available"/g) ?? [])).toHaveLength(1);
    expect((html.match(/class="hub-card hub-card-planned"/g) ?? [])).toHaveLength(3);
    expect(html.toLowerCase()).toContain('referrerpolicy="no-referrer"');
    expect(html).toContain('Coming later');
  });

  it('never makes an unsafe or missing URL clickable', () => {
    for (const href of [undefined, 'javascript:alert(1)', 'http://example.org']) {
      const html = renderToStaticMarkup(<MediaHubCard
        title="Manga" description="Planned" status="available" href={href} />);
      expect(html).not.toContain('<a ');
      expect(html).toContain('Coming later');
    }
  });
});
