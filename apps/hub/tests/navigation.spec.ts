import { expect, test } from '@playwright/test';

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
    await page.screenshot({path:test.info().outputPath('hub-'+width+'.png'),fullPage:true});
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
      const hero=document.querySelector('.hub-hero')!.getBoundingClientRect();
      const footer=document.querySelector('.hub-footer')!.getBoundingClientRect();
      return {scrollWidth:document.documentElement.scrollWidth,
        scrollHeight:document.documentElement.scrollHeight,
        cardWidth:card.width,cardBottom:card.bottom,heroBottom:hero.bottom,
        footerBottom:footer.bottom};
    });
    expect(geometry.scrollWidth).toBeLessThanOrEqual(width);
    expect(geometry.scrollHeight).toBeLessThanOrEqual(height);
    expect(geometry.cardWidth).toBeLessThanOrEqual(width*0.22);
    expect(geometry.cardBottom).toBeLessThanOrEqual(geometry.footerBottom);
    expect(geometry.cardBottom).toBeGreaterThan(geometry.heroBottom);
    await expect(page.locator('.hub-card-image-complete')).toHaveCount(4);
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
