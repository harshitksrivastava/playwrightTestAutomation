const {test, expect} = require('@playwright/test');

test ( 'Drag And Drop', async ({page})=>{

    await page.goto('https://demo.automationtesting.in/Static.html');

    await page.locator("//img[@id='node']").dragTo(await page.locator('#droparea'));

    await page.waitForTimeout(5000);
    
    await page.close();
});     