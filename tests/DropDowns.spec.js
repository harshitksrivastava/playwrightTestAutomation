const {test,expect} = require('@playwright/test');

test('Dropdowns', async({page})=>{
    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");

    // right click on button using chaining
    await page.locator('.context-menu-one.btn.btn-neutral').click({button:'right'});

    await page.waitForTimeout(5000);
})      