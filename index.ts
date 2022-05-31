// due to "esModuleInterop: true"
import puppeteer from 'puppeteer';
import * as auth from './auth.json';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // await page.setExtraHTTPHeaders({
    //     'sec-ch-ua': '"Chromium";v="93", " Not;A Brand";v="99"',
    //     'sec-ch-ua-mobile': '?0',
    //     'sec-ch-ua-platform': '"Windows"',
    //     'upgrade-insecure-requests': '1',
    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.0 Safari/537.36'
    // })

    await page.goto('https://funday.asia');

    // Error: Node is either not clickable or not an HTMLElement
    // await page.click("#llogin");
    
    // click login button
    await page.evaluate(()=> (document.querySelector('#llogin') as any).click())

    // 等 id=Cemail 出現
    await page.waitForSelector("#Cemail")

    // 輸入帳號密碼
    await page.type("#Cemail", auth.account);
    await page.type("#Cpassword", auth.password);

    // await page.click("#login2");

    // await page.goto('https://funday.asia/mylesson/intro.asp');

    // await page.click(".Tutor-icon");
    // await page.screenshot({ path: 'example.png' });
  
    // setTimeout(async () => {
        // await browser.close();
    // }, 5000);
})();
