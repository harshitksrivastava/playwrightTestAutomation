const{test,expect} = require('@playwright/test');

test('Multi Select', async({page})=>{

    await page.goto('https://demoblaze.com/');

const links = await page.locator('a');
console.log(await links.count());

const linkMultiple = await page.$$('a');

console.log(linkMultiple.length);

});
