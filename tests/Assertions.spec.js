import { test, expect } from '@playwright/test';

test.describe('Assertions suite', () => {

    test('Page Assertions', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
        await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');
        await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    })

    test.only('Locator Assertions', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

        // toBeVisible()
        const headerLocator = page.locator("h1[class='title'] a");
        await expect(headerLocator).toBeVisible();

        // toHaveText()
        await expect(headerLocator).toHaveText("Automation Testing Practice");
        
        // toHaveAttribute()
        await expect(headerLocator).toHaveAttribute('href','https://testautomationpractice.blogspot.com/');

        // toContainText()
        const buttonAlert = page.locator('#alertBtn');
        await expect(buttonAlert).toContainText('Alert');

        // toBeEnabled() and toHaveValue()
        const inputUsername = page.getByLabel('Username');
        await expect(inputUsername).toBeEnabled();
        inputUsername.fill('Test User 1');
        await expect(inputUsername).toHaveValue('Test User 1');

        // toBechecked() => first check the checkbox is not checked and then check it and verify it 
        const shippingChecbox = page.locator("input[value='express']");
        await expect(shippingChecbox).not.toBeChecked();
        await shippingChecbox.check();
        // await shippingChecbox.click();      we can use this on radio buttons as well
        await expect(shippingChecbox).toBeChecked();

        // toHaveCount()
        const navigationItems = page.locator("nav[role='navigation'] > ul> li");
        await expect(navigationItems).toHaveCount(3);
    })

    test.only('Soft Assertions', async({page}) =>{
        await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

        // toBeVisible()
        const headerLocator = page.locator("h1[class='title'] a");
        await expect.soft(headerLocator).not.toBeVisible();

        // toHaveText()
        await expect.soft(headerLocator).toHaveText("Automation Testing Practice");
    })
})