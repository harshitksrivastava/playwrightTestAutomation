import {test,expect} from '@playwright/test';

test.describe('Assertions suite', ()=>{

    test('Page Assertions', async({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

        await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');

        await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    })
})