import { test, expect } from '@playwright/test';

test.describe('Handling Dropdowns with select tag', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    });

    test('handling using the label text', async ({ page }) => {

        // await page.goto('https://testautomationpractice.blogspot.com/');

        // country dropdown with single option selection
        const countryDropdown = page.locator('#country');
        await countryDropdown.selectOption({ label: 'Germany' });

        // verification of selection        
        await expect(countryDropdown).toHaveValue('germany');
    })

    test('handle using the visible text', async ({ page }) => {

        // await page.goto('https://testautomationpractice.blogspot.com/');

        // country dropdown with single option selection
        const countryDropdown = page.locator('#country');
        await countryDropdown.selectOption('India');

        await expect(countryDropdown).toHaveValue('india');
    })

    test('handle using the value attribute', async ({ page }) => {

        const countryDropdown = page.locator('#country');
        await countryDropdown.selectOption({ value: 'china' });

        await expect(countryDropdown).toHaveValue('china');
    })

    test('handle using the index', async ({ page }) => {
        const countryDropdown = page.locator('#country');
        await countryDropdown.selectOption({ index: 1 });

        await expect(countryDropdown).toHaveValue('canada');
    })

    test('handling directly with selectOptions', async ({ page }) => {
        await page.selectOption('#country', 'United States');
        await expect(page.locator('#country')).toHaveValue('usa');

    })

})

test.describe('Handling multi select dropdown', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    });

    test('handle multi select dropdown', async ({ page }) => {
        const multiSelectDropdown = page.locator('#colors');
        // await multiSelectDropdown.selectOption([{value:'red'},{value:'blue'},{value:'green'}]);
        await multiSelectDropdown.selectOption(['Blue', 'Red', 'Green']);

        // verification of selection
        const selectedOptions = await multiSelectDropdown.evaluate((element) => {
            return Array.from(element.selectedOptions).map(option => option.value);
        })
        // console.log('Selected options are: '+selectedOptions);

        // case insensitive and same order not required
        expect(selectedOptions).toEqual(expect.arrayContaining(['Blue', 'Red', 'Green'].map(item => item.toLowerCase())));

        // case sensitive and same order required
        // expect(selectedOptions).toEqual(['red','blue','green']);
    })
})


test.describe('Handling Bootstrap dropdown', () => {

    test('single selection bootstrap dropdown', async ({ page }) => {

        await page.goto('https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/');

        // click on the dropdown input box
        const dropdown = page.locator('input#justAnotherInputBox');
        await dropdown.click();

        const dropdownOptions = page.locator('//body/div[2]/div/div[3]//li/span[contains(text(),"choice")]');

        await dropdownOptions.nth(2).click();
        const selectedText = await page.locator('.comboTreeItemTitle.comboTreeItemHover').textContent();
        console.log(selectedText);
        console.log(await dropdown.inputValue());       // easy way to get the selected value for the bootsrap dropdown

        // verification
        expect(selectedText).toBe('choice 2 1');
        expect(await dropdown.inputValue()).toBe('choice 2 1');
    })

    test('multi select bootstrap dropdown', async ({ page }) => {
        await page.goto('https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/');

        // click on the dropdown input box
        const dropdown = page.locator('input#justAnInputBox');
        await dropdown.click();

        const dropdownOptions = page.locator('//body/div[2]/div/div[1]//li/span[contains(text(),"choice")]');

        // await dropdownOptions.nth(2).click();
        const optionlist = await dropdownOptions.all();
        for(let option of optionlist){
            let value = await option.textContent();
            if(value.includes('2'))
                await option.click();
        }

        await page.waitForTimeout(5000);
        // this only gives the last selected value and not the complete list of multiple selected values
        // const selectedText = await page.locator('.comboTreeItemTitle.comboTreeItemHover').textContent();
        // console.log(selectedText);
        console.log(await dropdown.inputValue());       // easy way to get the selected value for the bootsrap dropdown


        let selectedText = (await dropdown.inputValue()).split(',').map(item =>item.trim());
        // selectedText = selectedText.split(',').map(item =>item.trim());

        // verification
        expect(selectedText).toContain('choice 2 1');

        // this will not work as .toContain works for single value verification, by pass is using for loop
        // expect(selectedText).toContain(['choice 2 1','choice 2 2']);   
        
        
        expect(selectedText).toEqual(expect.arrayContaining(['choice 2 1','choice 2 2']));
    })
})

test.describe.only('Handling Auto suugested dropdowns', ()=>{
        test('handle auto suggested dropdowns and hidden items', async({page}) =>{

            await page.goto('https://demoqa.com/auto-complete');

            await page.locator('#autoCompleteMultipleInput').fill('r');

            await page.waitForSelector('.auto-complete__menu');

            const optionList = await page.$$('.auto-complete__menu div.auto-complete__option');

            for(let option of optionList){
                if((await option.textContent()).toLowerCase().includes('red')){
                    await option.click();
                    break;
            }
        }
    });
    })