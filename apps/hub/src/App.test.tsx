import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MediaHubCard } from '@taiyou/ui';
import App from './App';
import { createHubModules } from './catalogue';

describe('amber observatory Hub', () => {
  it('renders a real accessible four-destination gateway, not a screenshot', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('<h1 class="hub-sr-only">Taiyou’s Personal Hub</h1>');
    expect(html).toContain('href="#libraries"');
    expect(html).toContain('id="libraries"');
    expect(html).toContain('aria-label="Hub theme"');
    expect(html).toContain('hub-observatory');
    expect(html).toContain('Taiyou Hub');
    expect(html).not.toContain('MY MEDIA GATEWAY');
    expect(html).not.toContain('hub-header-florals');
    for (const title of ['Novel', 'Manga', 'Anime', 'Movies &amp; TV']) {
      expect(html).toContain('<h3>' + title + '</h3>');
    }
    for (const file of ['novels-art.webp','manga-art.webp','anime-art.webp','movies-tv-art.webp']) {
      expect(html).toContain('/art/' + file);
    }
    expect((html.match(/class="destination-art"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="destination-heading"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="destination-icon"/g) ?? [])).toHaveLength(4);
  });

  it('keeps Novel and Manga interactive and future modules inert', () => {
    const html = renderToStaticMarkup(<App entries={createHubModules()} />);
    expect(html).toContain('href="https://taiyous-personal-library.pages.dev/"');
    expect(html).toContain('href="https://taiyous-manga-library.pages.dev/"');
    expect((html.match(/<a class="destination destination--/g) ?? [])).toHaveLength(2);
    expect((html.match(/<article class="destination destination--/g) ?? [])).toHaveLength(2);
    expect(html).toContain('Planned');
    expect(html).toContain('Coming soon');
    expect((html.match(/Enter library/g) ?? [])).toHaveLength(2);
    expect((html.match(/referrerPolicy="no-referrer"/g) ?? []).length).toBe(0); // React SSR lowercases the attribute.
    expect((html.match(/referrerpolicy="no-referrer"/g) ?? [])).toHaveLength(2);
  });

  it('rejects unsafe destinations rather than rendering active links', () => {
    const malformed = createHubModules().map(entry => entry.key === 'manga'
      ? { ...entry, href: 'javascript:alert(1)' } : entry);
    const html = renderToStaticMarkup(<App entries={malformed} />);
    expect((html.match(/<a class="destination destination--/g) ?? [])).toHaveLength(1);
    expect((html.match(/<article class="destination destination--/g) ?? [])).toHaveLength(3);
  });

  it('preserves the reusable stateless package variant for other consumers', () => {
    const html = renderToStaticMarkup(<MediaHubCard
      title="Novel Library" description="A reader" status="planned"
      artworkSrc="/art/novels-art.webp" imageOnly />);
    expect(html).toContain('hub-card-image-only');
  });
});
