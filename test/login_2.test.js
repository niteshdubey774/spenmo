const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test.describe('Spenmo App - Basic', () => {

    test.beforeEach(async () => {
        console.log('Cash Reimbursement ')
    });

    test('Login Test', async () => {
        // Navigate to the url we want to test
        const browser = await chromium.launch({
            headless: false,
            slowMo: 40
        })
        var page = await browser.newPage()
        await page.goto('https://dbv1.qa.spenmo.com/');

        await page.waitForSelector('#login_email');
        await page.type('#login_email', 'rohit@sc.com');
        await page.type('#login_password', 'spenmo@123');
        await page.waitForTimeout(2000);
        await page.click('#loginBtn');
        await page.waitForTimeout(4000);



        // Clicking the tranactions tab 
        await page.click('h1:has-text("Cash Reimbursement")');
        await page.waitForTimeout(3000);

        await page.fill('input[id=merchant]', 'XYZ');

        await page.click('text=CategoryAdd Category >> input[role="combobox"]');
        // Click text=Refund
        await page.click('text=Refund');

        await page.fill('[placeholder="Enter amount"]', '20');

        // Click text=AmountSGDExpense Date
        await page.click('text=AmountSGDExpense Date');
        // Click tbody >> text=20
        await page.click('tbody >> text=20');


        // Click textarea
        await page.click('textarea');
        // Fill textarea
        await page.fill('textarea', 'request for refund');
        await page.waitForTimeout(200);
        await page.click('span[role="button"]:has-text("We accept JPG, PNG, GIF and PDF files.")', 'Bill_receipts.jpg');


        await page.click('[data-testid="button"]');

        await page.click('div[role="tablist"] >> :nth-match(div:has-text("Sent Requests"), 3)');
        await page.click('td:has-text("SGD COMPANY")');

        // verify the Amonut 

        let el = await page.$('div:nth-child(2) > div > h4')

        const debitAmountValue = await page.evaluate(el => el.textContent, el)

        console.log('actualValue ' + debitAmountValue);

        expect(debitAmountValue).toBe('SGD 20');



        // verify requested by
        let nameElement = await page.$('div.reimburse-details__request-details > div:nth-child(1) > p');

        const name = await page.evaluate(nameElement => nameElement.textContent, nameElement)

        console.log('actualValue ' + name);

        expect(name).toBe('rohit sharma');


    });


});