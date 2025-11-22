import {test, expect} from '@playwright/test'

test.describe('Handling multiple tabs and windows', () =>{

    test('handling new tab opening with browser context', async({browser})=>{
        const context = await browser.newContext();
        const newPage = await context.newPage();
        await newPage.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    })

    test('Real time example of handling multiple tabs', async({browser}) =>{
        // const context = await browser.newContext();
        // const page = await context.newPage();
        // await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

        // const [newPage] = await Promise.all([
        //     context.waitForEvent('page'),
        //     page.getByRole('button',{name:'New Tab'}).click()
        // ]);

        // expect(newPage.url()).toContain('pavantestingtools');

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://playground.bondaracademy.com/pages/modal-overlays/window');

        // we capture the newtab opened here and create a 'newPage' to access that tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByRole('button',{name:'Open homepage in a new tab'}).click()
        ]);

        // we perform using that newPage fixture that we created for the new tab.
        await page.waitForTimeout(2000);
        await expect(newPage.locator("nb-user[class='size-medium shape-round context-menu-host ng-star-inserted'] div[class='user-name ng-star-inserted']")).toContainText('Nick Jones');
        newPage.close();

        page.close();
    })
})

