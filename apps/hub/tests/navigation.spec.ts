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
