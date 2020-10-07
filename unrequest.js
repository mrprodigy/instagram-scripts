const { Console } = require('console');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const dotenv =require('dotenv');

dotenv.config({path: "./config.env"});

async function start(usr, pass) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    var bitches = [];

    await page.goto('https://www.instagram.com/');

    //LOGIN
    await page.waitForSelector('div.-MzZI:nth-child(1) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
    await page.type('div.-MzZI:nth-child(1) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', usr);

    await page.waitForSelector('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
    await page.type('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', pass);

    await page.waitForSelector('.L3NKy > div:nth-child(1)');
    await page.click('.L3NKy > div:nth-child(1)');
    
    // goto settings
    await page.waitForSelector('span.qNELH > img:nth-child(1)');
    await page.click('span.qNELH > img:nth-child(1)');

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // privacy
    await page.waitForSelector('#react-root > section > main > div > ul > li:nth-child(7) > a');
    await page.click('#react-root > section > main > div > ul > li:nth-child(7) > a');

    // data
    await page.waitForSelector('#react-root > section > main > div > article > main > section:nth-child(6) > a');
    await page.click('#react-root > section > main > div > article > main > section:nth-child(6) > a');

 
    // requested
    await page.waitForSelector('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(2) > a');
    await page.click('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(2) > a');

    // show more...
    var bool = true;
    while (bool) {
        try {
            await page.waitForSelector('#react-root > section > main > div > article > main > button');
            // delete throw
            // throw 'Intentional error.';
            await page.click('#react-root > section > main > div > article > main > button');    
        } catch (error) {
            console.error(error);
            // stops in case of error
            bool=false;
                        // push all bitches
                        let body = await page.evaluate(() => document.body.innerHTML);
                        const $ = cheerio.load(body);
                        $('#react-root > section > main > div > article > main > section > div', body).each(function () {
                            let name = $(this).text();
                            console.log(name);
                            bitches.push(name);
                        })
        }
     page.evaluate(_ => {
            window.scrollBy(0, 70);
        });
        let body = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(body);
        let bitchesShown = $('#react-root > section > main > div > article > main > section > div', body).length;
        console.log("Reached: ",bitchesShown);

    }

    for (let index = 0; index < bitches.length; index++) {
        const element = bitches[index];
        const page3 = await browser.newPage();
        await page3.goto('https://www.instagram.com/'+element);
        // click unfollow
        await page3.waitForSelector('#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div > div > button');
        await page3.click('#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div > div > button');
        
        // if pops click unfollow
        try {
            await page3.waitForSelector('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.-Cab_');
            await page3.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.-Cab_');    
        } catch (error) {
            
        }

        await page3.waitFor(1000);
        await page3.close();
    }
    
    

}
start(process.env.NAME, process.env.PASS);




