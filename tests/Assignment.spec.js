import {test, expect} from '@playwright/test';

test.describe('Assignment Suite' , ()=>{

    test('Assignment 1', async({page}) =>{
        await page.goto('https://www.flipkart.com/');

        if(await page.locator("span[role='button']").isVisible()){
            await page.locator("span[role='button']").click();
        }

        const searchTerm = 'washing machine'

        await page.locator('input[placeholder="Search for Products, Brands and More"]').fill(searchTerm);
        await page.getByRole('button', {name: 'Search for Products, Brands and More'}).click();
    
        await page.waitForSelector('._Omnvo span');

        expect(page.url()).toContain('washing%20machine');
        // or 
        await expect(page.locator('._Omnvo span')).toHaveText(searchTerm);
        const resultCountLocator = page.locator('._Omnvo');
        
        // not the best way but works :)
        const resultCountSplit = await resultCountLocator.evaluate((element) =>{
            const fullText = element.textContent;
            return Number.parseInt(fullText.split(' ')[3]);
        })

        // extracting using the regular expression;
        const resultCountExtracted = await resultCountLocator.evaluate((element) =>{
            const fullText = element.textContent;
            let match = fullText.match(/\s+\d+\s+[–-]\s+(\d+)/);
            return Number.parseInt(match[1]);
        });

        // array result of 24 items
        // const initialResult = await page.$$('div jIjQ8S');

        // this will give locator object -> to convert use .all()
        // const resultList = page.locator('div jIjQ8S');

        const initialResultList = page.locator('div .jIjQ8S');

        expect(initialResultList).toHaveCount(resultCountExtracted);
        const initialResultText = await initialResultList.allTextContents();

        // click on 'Popularity' tab

    // await page.waitForLoadState('load');
    await Promise.all([
        page.waitForNavigation(),

        page.locator('.WNv7PR').filter({ hasText: 'Popularity' }).click({force: true}),
    ]);
        // page.getByText('Popularity').click();

        // await page.waitForTimeout(2000); 

        // this is workable but takes a lot more time;
        // await page.waitForLoadState('networkidle');

        // await page.locator(".dN-Hpt").waitFor({ state: 'hidden' });


        const popularityResultList = page.locator('div .jIjQ8S');
        const popularityResultText = await popularityResultList.allTextContents();

        // console.log('Initial Result Length: '+ initialResultText);
        // console.log('Popularity Result Length: '+ popularityResultText)

        expect(popularityResultText).not.toEqual(initialResultText);
        })

     test('Assignment 2', async({page}) =>{
        // await page.goto('https://www.amazon.in/');

       const navigationItems = page.locator('ul > .nav-li a');

       expect(navigationItems).toHaveCount(11);


        })
})