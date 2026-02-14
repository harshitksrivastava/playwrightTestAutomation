const {test,expect} = require('@playwright/test');

test('Home Page Test', async({page}) => {

    await page.goto('https://demoqa.com/');
    
    // Verify the title of the page
    let pageTitle = await page.title();
    console.log("Page Title is: " + pageTitle);
    await expect(page).toHaveTitle('demosite');

    await page.close();

});0o0