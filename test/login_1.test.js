const { test,expect  } = require('@playwright/test');
const { chromium } = require('playwright');

test.describe('Spenmo App - Basic', () => {

  // test.beforeEach(async () => {
  //   console.log('Before test')
  // });

  test('Login Test', async () => {
    // Navigate to the url we want to test
    const browser = await chromium.launch({
        headless: false,
        slowMo: 40
    })
    var page = await browser.newPage()
    await page.goto('https://dbv1.qa.spenmo.com/');

    await page.waitForSelector('#login_email');
    await page.type('#login_email','rohit@sc.com');
    await page.type('#login_password','spenmo@123');
    await page.waitForTimeout(2000);
    await page.click('#loginBtn');
    await page.waitForTimeout(4000);

    // Clicking the tranactions tab 
     await page.click('h1:has-text("Transactions")');
     await page.waitForTimeout(3000);



     //print the number if count is less then 100
    let countTrs = await page.$$('div > div.ant-table-wrapper > div > div > div > div > div > table > tbody > tr');

     if(countTrs.length !==100){

    console.log('Transaction entries is '+ countTrs.length)
 
   }

  //  const expectedDebit = await page.getAttribute('td:nth-child(9)', 'title');

  //  console.log('value'+ expectedDebit);

   //expect(debit).toBe('10');

   await page.click('div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)')
   
   await page.waitForTimeout(10000);

// validation for Debit amount
   let el = await page.$('div:nth-child(2) > div > h4')

   const debitAmountValue =await page.evaluate(el => el.textContent,el )

   console.log('actualValue '+ debitAmountValue);
   
   expect(debitAmountValue).toBe('SGD 10');

// Validation for Card number 

   let cardElement = await page.$('div > div:nth-child(6) > div:nth-child(2) > p');

   const cardNum =await page.evaluate(cardElement => cardElement.textContent,cardElement )

   console.log('actualValue '+ cardNum);
   
   expect(cardNum).toBe('5893');


  });


});