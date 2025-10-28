const {test,expect} = require ('@playwright/test');
const { table } = require('console');

test.describe('Locators Strategy Suite', ()=>{


test('Locator Test getByAltText', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    await expect(page.getByAltText('logo image')).toBeVisible();

    // can not use toBeVisible directly with locator object
    await page.getByAltText('logo image').isVisible();    
    await page.close();
});

test('Locator Test getByPlaceholder', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    var fullName = await page.getByPlaceholder('Enter your full name');
    await fullName.fill('Harshit Srivastava');

    // verification that entered is in the desired field
    await expect(fullName).toHaveValue('Harshit Srivastava');

    await page.close();
});

test('Locator Test getByRole', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    
    await page.getByRole('button', {name: 'Primary Action'}).click();
})


test('Locator Test getByText', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    const profileName = page.getByText('John Doe');
    await expect(profileName).toBeVisible();
    
})

test('Locator Test getByLabel', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    await page.getByLabel('Email address').fill('abc');
    await page.getByLabel('Password').fill('xyz');
    
})
test('Locator Test getByTitle', async({page}) =>{   
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    await expect(page.getByTitle('Home page link')).toBeVisible();
    
})
test('Locator Test getByTestId', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    await expect(page.getByTestId('user-profile-card')).toBeVisible();
})


test.only('Locator testing with filtering and chaining', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    // clicks the edit profile button inside the same dic as text John Doe
    await page.getByRole('button').filter({hasText: 'Edit Profile'}).click();

    // getting table headings
    const tableHeadings = await page.locator('table[name="BookTable"] tbody:nth-child(1) > tr:nth-child(1) >th');

    expect(await tableHeadings.count()).toBe(4);

    await expect (tableHeadings.nth(0)).toHaveText('BookName');
    await expect (tableHeadings.nth(1)).toHaveText('Author');
    await expect (tableHeadings.nth(2)).toHaveText('Subject');
    await expect(tableHeadings.nth(3)).toHaveText('Price');
    
    const rows = page.locator('table[name="BookTable"] tbody:nth-child(1) > tr');

    // .filters hasText combines the whole row and then checks, even the partial match are returned.
    const matchedData = rows.filter({
        has: page.locator('td'),
        hasText: 'JavaScript',
    })

        await expect.poll(async()=> await matchedData.count()).toBeGreaterThan(1);
    //    await expect(matchedData.count()).toBe(1); 
})


});
