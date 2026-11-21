import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MediaHubCard } from '@taiyou/ui';
import App from './App';
import { createHubModules } from './catalogue';

describe('code-rendered cinematic Hub', () => {
  it('builds four large editorial cards with accessible, real HTML content', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('Welcome to Taiyou');
    expect(html).toContain('href="#libraries"');
    expect(html).toContain('id="libraries"');
    expect(html).toContain('aria-label="Hub theme"');
    expect(html).toContain('/branding/hub-sun-logo.svg');
    expect(html).toContain('/branding/header-sakura.svg');
    expect((html.match(/hub-card-immersive/g) ?? [])).toHaveLength(4);
    for (const title of ['Novel Library','Manga Library','Anime Library','Movies &amp; TV Library']) {
      expect(html).toContain(title);
    }
    for (const file of ['novels-art.webp','manga-art.webp','anime-art.webp','movies-tv-art.webp']) {
      expect(html).toContain('/art/' + file);
    }
    expect((html.match(/class="hub-card-image hub-card-image-illustration"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="hub-card-title hub-card-label"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="hub-card-editorial"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="hub-card-description"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="hub-card-state"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="hub-media-glyph"/g) ?? [])).toHaveLength(4);
    expect(html).toContain('Explore Novels');
    expect(html).toContain('Explore Manga');
    expect(html).not.toContain('hub-card-image-only');
  });

  it('keeps only Novel and Manga interactive, without fake planned links', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('href="https://taiyous-personal-library.pages.dev/"');
    expect(html).toContain('href="https://taiyous-manga-library.pages.dev/"');
    expect((html.match(/class="hub-card hub-card-available hub-card-immersive"/g) ?? [])).toHaveLength(2);
    expect((html.match(/class="hub-card hub-card-planned hub-card-immersive"/g) ?? [])).toHaveLength(2);
    expect((html.match(/<article class="hub-card hub-card-planned/g) ?? [])).toHaveLength(2);
    expect((html.match(/>In preparation<\/span>/g) ?? [])).toHaveLength(2);
    expect((html.match(/>Coming soon<\/span>/g) ?? [])).toHaveLength(2);
    expect((html.match(/>Novel Library<\/h3>/g) ?? [])).toHaveLength(1);
    expect((html.match(/>Manga Library<\/h3>/g) ?? [])).toHaveLength(1);
    expect((html.match(/>Anime Library<\/h3>/g) ?? [])).toHaveLength(1);
    expect((html.match(/>Movies &amp; TV Library<\/h3>/g) ?? [])).toHaveLength(1);
    expect(html.toLowerCase()).toContain('referrerpolicy="no-referrer"');
  });

  it('preserves the older portrait-only variant for future consumers', () => {
    const html = renderToStaticMarkup(<MediaHubCard
      title="Novel Library" description="A reader" status="planned"
      artworkSrc="/art/novels-art.webp" imageOnly />);
    expect(html).toContain('hub-card-image-only');
    expect(html).toContain('hub-card-label');
    expect(html).not.toContain('hub-card-editorial');
  });

  it('never makes an unsafe or absent destination clickable', () => {
    for (const href of [undefined,'javascript:alert(1)','http://example.org']) {
      const html = renderToStaticMarkup(<MediaHubCard
        title="Manga Library" description="Planned" status="available"
        artworkSrc="/art/manga-art.webp" immersive href={href} />);
      expect(html).not.toContain('<a ');
      expect(html).toContain('In preparation');
      expect(html).toContain('Coming soon');
    }
  });
});
