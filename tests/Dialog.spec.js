import {test, expect} from '@playwright/test';

test.describe('Handling different dialogs and alerts', () =>{
    test.beforeEach(async({page}) =>{
        await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    })

    test('basic dialog with accept action', async({page}) =>{

        // await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');  shifted this to beforeEach

        // creating a custom handler for alert dialog

        page.on('dialog', async(dialog) =>{
            expect(dialog.type()).toBe('alert');

            expect(dialog.message()).toContain('I am an alert box!');

            await dialog.accept();
        })

        await page.getByRole('button', {name: 'Simple Alert'}).click();
    })

    test('confirm dialog with dismiss action', async({page}) =>{

        page.on('dialog', async(dialog) =>{

            expect(dialog.type()).toContain('confirm');

            expect(dialog.message()).toContain('Press a button!')

            await dialog.accept();
            //To dismiss the dialog:  await dialog.dismiss(); 
        })

        await page.getByRole('button', {name:'Confirmation Alert'}).click();
        await page.waitForTimeout(2000);    
    })

    test('prompt dialog with input text and accept action', async({page}) =>{
        // setting up the dialog handler
        page.on('dialog', async(dialog)=>{

            expect(dialog.type()).toContain('prompt');
            expect(dialog.message()).toContain('Please enter your name:');

            expect(dialog.defaultValue()).toContain('Harry Potter');
            await dialog.accept('Playwright Testing');
        })

        await page.getByRole('button', {name: 'Prompt Alert'}).click();

        await page.waitForTimeout(5000);
    })

})