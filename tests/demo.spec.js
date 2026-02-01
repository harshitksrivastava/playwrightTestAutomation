// flipkart-search-popularity.js
// Usage:
// 1) npm init -y
// 2) npm i -D playwright
// 3) node flipkart-search-popularity.js

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // set true if you want headless
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  // Global timeout for waits (ms)
  const WAIT = 10000;

  try {
    // 1) Go to Flipkart
    await page.goto('https://www.flipkart.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 2) Close login popup if it appears (Flipkart often shows a login modal)
    // We'll try common selectors then fall back to pressing Escape.
    try {
      await page.locator('button._2KpZ6l._2doB4z').click({ timeout: 2000 }); // "✕" close button
    } catch (e) {
      // fallback: hit Escape in case modal is open
      try { await page.keyboard.press('Escape'); } catch (err) { /* ignore */ }
    }

    // 3) Accept cookie banner if present (optional)
    try {
      await page.locator('button:has-text("Accept")').click({ timeout: 2000 });
    } catch (e) { /* ignore if not present */ }

    // 4) Type search query and submit
    const searchInput = page.locator('input[name="q"]');
    await searchInput.waitFor({ state: 'visible', timeout: WAIT });
    await searchInput.fill('washing machine');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: WAIT }),
      page.keyboard.press('Enter'),
    ]);

    // 5) Wait for product results to appear
    // We'll use a flexible locator that checks a few common product-title selectors used on Flipkart.
    const productTitleLocator = page.locator(
      `xpath=(
        //div[contains(@class,"RG5Slk")] |
        //a[contains(@class,"s1Q9rs")] |
        //div[contains(@class,"_2WkVRV")]//following::a[1]
      )`
    ).first();

    // Wait for at least one product to show up
    await productTitleLocator.waitFor({ state: 'visible', timeout: WAIT });

    // Helper to get the first product title text robustly
    async function getFirstProductTitle() {
      // try different selectors in order
      const selectors = [
        'div._4rR01T',      // new Flipkart desktop product title
        'a.s1Q9rs',         // some listing title selector
        'div._2kHMtA div._4rR01T', // alternative path
        'div._2WkVRV + div a', // fallback- try to find the anchor near brand
      ];
      for (const sel of selectors) {
        try {
          const loc = page.locator(sel).first();
          if (await loc.count() > 0) {
            const txt = (await loc.textContent())?.trim();
            if (txt) return txt;
          }
        } catch (e) { /* ignore and continue */ }
      }
      // final fallback - any element with data-testid or generic card
      try {
        const anyTitle = await page.locator('xpath=//div[contains(@class,"_1AtVbE")]//a').first().textContent();
        return anyTitle ? anyTitle.trim() : '<unknown title>';
      } catch (e) {
        return '<unknown title>';
      }
    }

    const beforeTitle = await getFirstProductTitle();
    console.log('First product before sorting:', beforeTitle);

    // 6) Click "Popularity" in sort options
    // We'll try a few ways to reliably click the popularity sort:
    const popularitySelectors = [
      'text=Popularity',                         // simplest: exact text
      'xpath=//div[contains(., "Sort by")]/..//a[contains(., "Popularity")]', // contextual
      'xpath=//div[@role="list"]//a[contains(., "Popularity")]',
      'xpath=//span[text()="Popularity"]',
    ];

    let clicked = false;
    for (const sel of popularitySelectors) {
      try {
        const loc = page.locator(sel);
        if (await loc.count() > 0) {
          // use click + wait for network/DOM change
          await Promise.all([
            page.waitForResponse(response => response.status() === 200, { timeout: WAIT }).catch(() => {}), // optional
            loc.first().click({ timeout: 5000 }),
            page.waitForLoadState('domcontentloaded', { timeout: WAIT }).catch(() => {}),
          ]);
          clicked = true;
          break;
        }
      } catch (err) {
        // continue trying other selectors
      }
    }

    if (!clicked) {
      console.warn('Could not find a "Popularity" element by the attempted selectors. Trying a generic approach: opening sort dropdown (if present).');
      try {
        // Try clicking any sort dropdown and then clicking Popularity inside it
        const sortDropdown = page.locator('xpath=//div[contains(@class,"_10UF8M") or contains(@class,"_2iDkf8")]').first();
        if (await sortDropdown.count() > 0) {
          await sortDropdown.click();
          const pop = page.locator('text=Popularity').first();
          await pop.click();
          clicked = true;
        }
      } catch (e) { /* ignore */ }
    }

    if (!clicked) {
      console.error('Failed to click Popularity. The site markup may have changed—see the page and adjust selectors.');
    } else {
      // wait a little for results to update
      await page.waitForTimeout(1500);
    }

    // 7) Get first product after clicking popularity
    const afterTitle = await getFirstProductTitle();
    console.log('First product after sorting by Popularity:', afterTitle);

    // 8) Simple verification
    if (beforeTitle !== afterTitle) {
      console.log('Results changed after applying Popularity sort — good.');
    } else {
      console.log('First result did not change. That might be because Popularity produced same ordering or the click did not take effect.');
    }

  } catch (err) {
    console.error('Script failed:', err);
  } finally {
    await browser.close(); // uncomment to close when you want
  }
})();
