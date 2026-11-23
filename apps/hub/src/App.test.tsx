import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import { createHubModules } from './catalogue';

describe('cinematic library world', () => {
  it('renders the approved fantasy architecture and four separately interactive HTML portals', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('Taiyou’s Personal Hub');
    expect(html).toContain('id="libraries"');
    expect(html).toContain('href="#libraries"');
    expect(html).toContain('class="environment-image"');
    expect(html).toContain('class="brand-symbol"');
    expect(html).toContain('aria-label="Hub theme"');
    expect(html).toContain('Amber Classic');
    for (const title of ['Novel', 'Manga', 'Anime', 'Movies &amp; TV']) {
      expect(html).toContain('<h3>' + title + '</h3>');
    }
    for (const file of ['reference-novel.webp','reference-manga.webp','reference-anime.webp','reference-movies-tv.webp']) {
      expect(html).toContain('/art/' + file);
    }
    expect((html.match(/class="portal-border"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="portal-mask"/g) ?? [])).toHaveLength(4);
    expect(html).not.toContain('MY MEDIA GATEWAY');
    expect(html).not.toContain('hub-sun-logo.svg');
    expect(html).not.toContain('novels-art.webp');
  });

  it('only allows Novel and Manga to navigate, with owner-verified HTTPS URLs', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('https://taiyous-personal-library.pages.dev/');
    expect(html).toContain('https://taiyous-manga-library.pages.dev/');
    expect((html.match(/<a class="portal-surface"/g) ?? [])).toHaveLength(2);
    expect((html.match(/<article class="portal-surface"/g) ?? [])).toHaveLength(2);
    expect((html.match(/referrer[Pp]olicy="no-referrer"/g) ?? [])).toHaveLength(4); // Portals + shortcuts
    expect(html).toContain('Planned');
    expect(html).toContain('Coming Soon');
  });

  it('never activates an unsafe destination, even when marked available', () => {
    const entries = createHubModules().map(module => module.key === 'manga'
      ? { ...module, href: 'javascript:alert(1)' } : module);
    const html = renderToStaticMarkup(<App entries={entries} />);
    expect((html.match(/<a class="portal-surface"/g) ?? [])).toHaveLength(1);
    expect((html.match(/<article class="portal-surface"/g) ?? [])).toHaveLength(3);
  });

  it('makes the reference search and library-shortcut icons genuine controls', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('aria-label="Search libraries"');
    expect(html).toContain('aria-label="Library shortcuts"');
    expect(html).toContain('id="search-panel"');
    expect(html).toContain('id="shortcut-panel"');
    expect(html).toContain('hidden=""');
  });
});