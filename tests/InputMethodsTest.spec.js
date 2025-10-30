import { test, expect } from '@playwright/test';

test.describe('Handling Multiple types of Input', () => {


    test('Input element', async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');

        await page.locator("a[title='Forms']").click();     // open the forms menu
        await page.locator('a>span', { hasText: 'Form Layouts' }).click();

        // verify page has navigated to the forms page using regular expression
        await expect(page).toHaveURL(/.*pages\/forms\/layouts/);

        // input box inline form;
        const inputName = page.getByPlaceholder('Jane Doe', { exact: true });
        await inputName.fill('Demo User');
        await expect(inputName).toHaveValue('Demo User');

        //Email box in the Grid form;
        const inputEmailGrid = page.locator('[data-cy="inputEmail1"]');
        await inputEmailGrid.fill('DemoUser@abc.com');
        await expect(inputEmailGrid).toHaveValue('DemoUser@abc.com');
    });

    test('Radio Buttons', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        const radioMale = page.getByRole('radio', { name: 'Male', exact: true });
        await expect(radioMale).not.toBeChecked();
        await radioMale.check();                     // can also use .click() method for radio buttons
        await expect(radioMale).toBeChecked();

        const radioFemale = page.getByLabel('Female');
        await expect(radioFemale).not.toBeChecked();

        await page.waitForTimeout(3000);
    });

    test('CheckBoxes', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        // demonstrating different locator strategies
        const checkboxSunday = page.locator('#sunday');
        const checkboxFriday = page.getByRole('checkbox', { name: 'Friday' });

        await expect(checkboxSunday).not.toBeChecked();
        await checkboxSunday.check();               // check if the checkbox is not already checked
        await expect(checkboxSunday).toBeChecked();

        await expect(checkboxFriday).not.toBeChecked();
        await checkboxFriday.check();
        await expect(checkboxFriday).toBeChecked();

        await page.waitForTimeout(3000);
    })
})