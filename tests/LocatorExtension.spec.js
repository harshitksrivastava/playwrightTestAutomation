const {test, expect} = require('@playwright/test');

test.describe('Locator Extension',()=>{

    test('Locator Extension test 1 ', async({page})=>{
        await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
        await page.click('a[title="Forms"]');
        await page.click('a[title="Form Layouts"]');

        // await expect(page.locator('nb-radio:nth-child(2) label:nth-child(1) span:nth-child(3)')).toBeVisible();
        await page.waitForSelector('nb-radio:nth-child(2) label:nth-child(1) span:nth-child(3)', { state: 'visible' });
        await page.locator('nb-radio:nth-child(2) label:nth-child(1) span:nth-child(3)').check();

        await page.waitForTimeout(5000);
    })
})