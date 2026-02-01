import {test, expect} from '@playwright/test';

test('Check Box', async({page})=>{

    await page.goto('https://demo.automationtesting.in/Register.html');

    // await page.locator('input[type="checkbox"]').check({force:true});

    // await page.locator('input[type="checkbox"]').uncheck({force:true});           
    // await page.locator('input[type="checkbox"]').check({force:true});

    // to check specific checkbox
    await page.locator('input[type="checkbox"][value="Movies"]').check({force:true});

    // to check multiple checkbox
    const allCheckBox = await page.locator('input[type="checkbox"]');
    console.log(await allCheckBox.count());

    for(let i=0; i< await allCheckBox.count(); i++){
        const checkboxValue = await allCheckBox.nth(i).getAttribute('value');
        if(checkboxValue === "Cricket" || checkboxValue === "Hockey"){
            await allCheckBox.nth(i).check({force:true});
        }
    }

    await page.waitForTimeout(5000);
});
