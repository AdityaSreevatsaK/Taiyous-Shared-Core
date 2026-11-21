import { expect, test } from '@playwright/test';
import { captureVerifiedArtwork } from './visual-evidence';

for (const width of [320,390,768,1280]) {
  test('four cards, correct columns and no overflow at '+width+'px', async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    await expect(page.getByRole('heading',{name:'Choose your library'})).toBeAttached();
    await expect(page.locator('.hub-card')).toHaveCount(4);
    await expect(page.locator('a.hub-card')).toHaveCount(2);
    await expect(page.locator('article.hub-card')).toHaveCount(2);
    const rects=await page.locator('.hub-card').evaluateAll(nodes=>nodes.map(node=>{
      const r=node.getBoundingClientRect(); return {x:r.x,y:r.y};
    }));
    const columns=width>=1100?4:width>620?2:1;
    expect(new Set(rects.map(card=>Math.round(card.y))).size).toBe(4/columns);
    for(let i=0;i<rects.length;i+=columns){
      const row=rects.slice(i,i+columns);
      expect(row.every(card=>Math.abs(card.y-row[0]!.y)<1)).toBe(true);
      for(let j=1;j<row.length;j++) expect(row[j]!.x).toBeGreaterThan(row[j-1]!.x);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await captureVerifiedArtwork(page, test.info().outputPath('hub-'+width+'.png'));
  });
}
test('keyboard skips planned cards',async({page})=>{
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to libraries'})).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.hub-brand')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('combobox',{name:'Hub theme'})).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.hub-card').nth(0)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.hub-card').nth(1)).toBeFocused();
});
test('verified links contain no referrer',async({page})=>{
  await page.goto('/');
  await expect(page.locator('a.hub-card').nth(0)).toHaveAttribute('href','https://taiyous-personal-library.pages.dev/');
  await expect(page.locator('a.hub-card').nth(1)).toHaveAttribute('href','https://taiyous-manga-library.pages.dev/');
  for(const link of await page.locator('a.hub-card').all()) {
    await expect(link).toHaveAttribute('referrerpolicy','no-referrer');
  }
});
test('reduced motion retains navigation',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('a.hub-card')).toHaveCount(2);
});
test('no third party media requests',async({page})=>{
  const unexpected=new Set<string>();
  page.on('request',request=>{
    const origin=new URL(request.url()).origin;
    if(origin!=='http://127.0.0.1:5173')unexpected.add(origin);
  });
  await page.goto('/');
  await expect(page.locator('.hub-card')).toHaveCount(4);
  expect([...unexpected]).toEqual([]);
});
for(const [title,url] of [
  ['Novel','https://taiyous-personal-library.pages.dev/'],
  ['Manga','https://taiyous-manga-library.pages.dev/'],
] as const){
  test(title+' link navigates without referrer',async({page})=>{
    let referrer:string|undefined;
    await page.route(url+'**',async route=>{
      referrer=route.request().headers()['referer'];
      await route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html lang="en"><body>Test only</body></html>'});
    });
    await page.goto('/');
    await page.locator('a.hub-card').nth(title==='Novel'?0:1).click();
    await expect(page).toHaveURL(url);
    expect(referrer).toBeUndefined();
  });
}


/** Reference-image fidelity at normal desktop zoom: the artwork must not
 * swallow the sakura landscape, and the full page must remain on one screen. */
for (const { width, height } of [
  { width:1280, height:720 },
  { width:1366, height:768 },
  { width:1600, height:900 },
  { width:1920, height:768 },
  { width:1920, height:1080 },
]) {
  test('reference-layout desktop fit '+width+'x'+height,async({page})=>{
    await page.setViewportSize({width,height});
    await page.goto('/');
    const geometry=await page.evaluate(()=>{
      const card=document.querySelector('.hub-card')!.getBoundingClientRect();
      const masthead=document.querySelector('.hub-masthead')!.getBoundingClientRect();
      const footer=document.querySelector('.hub-footer')!.getBoundingClientRect();
      return {scrollWidth:document.documentElement.scrollWidth,
        scrollHeight:document.documentElement.scrollHeight,
        cardWidth:card.width,cardBottom:card.bottom,mastheadBottom:masthead.bottom,
        footerBottom:footer.bottom};
    });
    expect(geometry.scrollWidth).toBeLessThanOrEqual(width);
    expect(geometry.scrollHeight).toBeLessThanOrEqual(height);
    expect(geometry.cardWidth).toBeGreaterThanOrEqual(260);
    expect(geometry.cardBottom).toBeLessThanOrEqual(geometry.footerBottom);
    expect(geometry.cardBottom).toBeGreaterThan(geometry.mastheadBottom);
    await expect(page.locator('.hub-card-image-illustration')).toHaveCount(4);
    await expect(page.locator('.hub-card-label')).toHaveCount(4);
  });
}
test('simulated 200% zoom reflows to two columns without horizontal scrolling',async({page})=>{
  await page.setViewportSize({width:800,height:900});
  await page.goto('/');
  const dimensions=await page.evaluate(()=>({
    width:document.documentElement.scrollWidth,
    cards:[...document.querySelectorAll('.hub-card')].map(element=>element.getBoundingClientRect().toJSON()),
  }));
  expect(dimensions.width).toBeLessThanOrEqual(800);
  expect(Math.round(dimensions.cards[0]!.y)).toBe(Math.round(dimensions.cards[1]!.y));
  expect(dimensions.cards[2]!.y).toBeGreaterThan(dimensions.cards[0]!.y);
});


test('the responsive SVG sunrise logo and sakura ornament load locally', async({page}) => {
  await page.setViewportSize({width:1600,height:900});
  await page.goto('/');
  const logo=page.locator('.hub-brand-mark img');
  const sakura=page.locator('.hub-header-florals img');
  await expect(logo).toHaveAttribute('src','/branding/hub-sun-logo.svg');
  await expect(sakura).toHaveAttribute('src','/branding/header-sakura.svg');
  await expect.poll(()=>logo.evaluate(node=>(node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect.poll(()=>sakura.evaluate(node=>(node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const size=await logo.boundingBox();
  expect(size!.width).toBeGreaterThanOrEqual(90);
  const favicon=page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute('href','/branding/hub-sun.svg');
});


test('editorial cards render real HTML captions inside the four original portraits', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('/');
  await expect(page.locator('.hub-card-artwork img')).toHaveCount(4);
  await expect(page.locator('.hub-card-label')).toHaveText([
    'Novel Library', 'Manga Library', 'Anime Library', 'Movies & TV Library',
  ]);
  await expect(page.locator('.hub-card-editorial')).toHaveCount(4);
  await expect(page.locator('.hub-card-description')).toHaveCount(4);
  await expect(page.locator('.hub-card-state')).toHaveCount(4);
  await expect(page.locator('.hub-card-cta')).toHaveCount(4);
  await expect(page.locator('.hub-card-status')).toHaveCount(0);
  const tiles = await page.locator('.hub-card').evaluateAll(cards => cards.map(card => {
    const img = card.querySelector('img')!.getBoundingClientRect();
    const title = card.querySelector('h3')!.getBoundingClientRect();
    const action = card.querySelector('.hub-card-cta')!.getBoundingClientRect();
    return { imgTop: img.top, imgBottom: img.bottom, titleTop: title.top,
      titleBottom: title.bottom, actionBottom: action.bottom,
      imgWidth: img.width, imgHeight: img.height };
  }));
  for (const tile of tiles) {
    expect(tile.titleTop).toBeGreaterThan(tile.imgTop);
    expect(tile.titleBottom).toBeLessThan(tile.imgBottom);
    expect(tile.actionBottom).toBeLessThanOrEqual(tile.imgBottom);
    expect(Math.abs(tile.imgWidth / tile.imgHeight - 1086 / 1448)).toBeLessThan(0.025);
  }
  for (const image of await page.locator('.hub-card-image-illustration').all()) {
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThanOrEqual(1086);
  }
});
test('planned library cards have neither links nor misleading pointer cursors', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('article.hub-card')).toHaveCount(2);
  for (const card of await page.locator('article.hub-card').all()) {
    await expect(card).not.toHaveAttribute('href', /.+/);
    await expect(card.locator('.hub-card-state')).toContainText('In preparation');
    await expect(card.locator('.hub-card-cta-planned')).toHaveText('Coming soon');
    expect(await card.evaluate(element => getComputedStyle(element).cursor)).not.toBe('pointer');
  }
});


test('scenic gallery keeps midsize cards and original local background', async ({page}) => {
  await page.setViewportSize({width:1600,height:900});
  await page.goto('/');
  await expect(page.locator('.hub-card-immersive')).toHaveCount(4);
  const dimensions = await page.evaluate(() => {
    const first = document.querySelector('.hub-card')!.getBoundingClientRect();
    const last = [...document.querySelectorAll('.hub-card')].at(-1)!.getBoundingClientRect();
    const main = document.querySelector('.hub-main')!.getBoundingClientRect();
    const scene = getComputedStyle(document.querySelector('.hub-main')!, '::before');
    return {firstX:first.x,firstW:first.width,lastRight:last.right,mainH:main.height,
      background:scene.backgroundImage};
  });
  expect(dimensions.firstX).toBeGreaterThan(160);
  expect(dimensions.firstW).toBeGreaterThan(255);
  expect(dimensions.firstW).toBeLessThan(310);
  expect(dimensions.lastRight).toBeLessThan(1450);
  expect(dimensions.mainH).toBeGreaterThan(600);
  await expect(page.locator('.hub-hero')).toHaveCount(0);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Taiyou’s Personal Hub');
  await expect(page.getByText('Your cosy gateway')).toHaveCount(0);
  expect(dimensions.background).toContain('/art/landscape.avif');
  await expect(page.locator('.hub-card-cta:not(.hub-card-cta-planned)')).toHaveText([
    'Explore Novels →','Explore Manga →',
  ]);
  for (const theme of ['sepia','charcoal']) {
    await page.getByRole('combobox',{name:'Hub theme'}).selectOption(theme);
    await captureVerifiedArtwork(page, test.info().outputPath('hub-gallery-'+theme+'-1600.png'));
  }
});
