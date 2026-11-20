import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MediaHubCard } from '@taiyou/ui';
import App from './App';
import { createHubModules } from './catalogue';

describe('accessible illustrated Hub', () => {
  it('shows four artwork cards, text labels and a keyboard accessible theme control', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('Welcome to Taiyou');
    expect(html).toContain('href="#libraries"');
    expect(html).toContain('id="libraries"');
    expect(html).toContain('aria-label="Hub theme"');
    expect((html.match(/class="hub-card hub-card-/g) ?? [])).toHaveLength(4);
    for (const title of ['Novel Library','Manga Library','Anime Library','Movies &amp; TV Library']) {
      expect(html).toContain(title);
    }
    for (const file of ['novels.avif','manga.avif','anime.avif','movies-tv.avif']) {
      expect(html).toContain('/art/' + file);
    }
    expect((html.match(/class="hub-card-image"/g) ?? [])).toHaveLength(4);
  });
  it('links Novel and Manga only, leaves two cards non-interactive', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('href="https://taiyous-personal-library.pages.dev/"');
    expect(html).toContain('href="https://taiyous-manga-library.pages.dev/"');
    expect((html.match(/class="hub-card hub-card-available"/g) ?? [])).toHaveLength(2);
    expect((html.match(/class="hub-card hub-card-planned"/g) ?? [])).toHaveLength(2);
    expect(html).toContain('In preparation');
    expect(html).toContain('Coming Soon');
    expect(html.toLowerCase()).toContain('referrerpolicy="no-referrer"');
  });
  it('never makes an unsafe or absent destination clickable', () => {
    for (const href of [undefined,'javascript:alert(1)','http://example.org']) {
      const html = renderToStaticMarkup(<MediaHubCard title="Manga Library" description="Planned" status="available" href={href} />);
      expect(html).not.toContain('<a ');
      expect(html).toContain('Coming Soon');
    }
  });
});
