// due to "esModuleInterop: true"
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import * as auth from './auth.json';
import * as targetLevel from './level.json';

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
    
    await Login(page);

    await page.waitForTimeout(2000);
    // move to download page
    await page.goto('https://funday.asia/mylesson/intro.asp');
    const lesson = await page.waitForSelector(".Tutor-icon");
    await lesson?.click();

  
    // setTimeout(async () => {
        // await browser.close();
    // }, 5000);
})();

async function Login(page: puppeteer.Page): Promise<void>{
    // click login button
    await page.evaluate(()=> (document.querySelector('#llogin') as any).click())
    // 等 id=Cemail 出現
    await page.waitForSelector("#Cemail")

    // 輸入帳號密碼
    await page.type("#Cemail", auth.account);
    await page.type("#Cpassword", auth.password);

    await page.click("#login2");
}

async function DownloadFile(page: puppeteer.Page, level: string = targetLevel.level): Promise<void>{
    console.log(level);
    // click level
    const element = await page.waitForSelector(level); // select the element
    await element?.click();

    const folderName = await page.$eval(".TitleF", item => {return item.innerHTML});
    // create folder
    mkdirSync(folderName);

    // let file = await page.content(".goFile");
    // file?._context
    // while(){
        
    // }
    // const value = await element?.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
    // click download button
    // element = await page.waitForSelector("錄影下載");
    // await element?.click();
    // element = await page.waitForSelector("教材下載");
    // await element?.click();
    // element = await page.waitForSelector("補充教材");
    // await element?.click();
    //切換分頁
}
