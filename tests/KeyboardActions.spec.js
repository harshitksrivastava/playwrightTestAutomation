const {test,expect} = require('@playwright/test');

test('Keyboard Actions', async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('#name').fill('Harshit Srivastava');

    // select all text
    await page.locator('#name').press('Control+A');

    // copy the text
    // await page.locator('#name').press('Control+C');

    // await page.locator('#textarea').press('Control+V');
    await page.locator('#name').press('Tab');
    await page.waitForTimeout(5000);
})