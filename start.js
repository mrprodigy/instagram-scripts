const { Console } = require('console');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const dotenv =require('dotenv');

dotenv.config({path: "./config.env"});

async function get84following(page) {
    //go to profile
    await page.waitForSelector('span.qNELH > img:nth-child(1)');
    await page.click('span.qNELH > img:nth-child(1)');

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    //Go to following list
    await page.waitForSelector('li.Y8-fY:nth-child(3) > a:nth-child(1) > span:nth-child(1)');
    await page.click('li.Y8-fY:nth-child(3) > a:nth-child(1) > span:nth-child(1)');

    //get names
    let body = await page.evaluate(() => document.body.innerHTML);
    console.log('ok');
    const $ = cheerio.load(body);
    console.log('ok');

    $('li > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1) > a:nth-child(1)', body).each(function () {
        let name = $(this).text();
        console.log(name);
    })
}
async function getAllFollowing(page) {
    var bitches = [];

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

    // // following 
    await page.waitForSelector('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(4) > a');
    await page.click('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(4) > a');



    // show more...
    var bool = true;
    while (bool) {
        try {
            await page.waitForSelector('#react-root > section > main > div > article > main > button');
            // delete throw
            // throw 'Intentional error.';
            await page.click('#react-root > section > main > div > article > main > button');    
        } catch (error) {
            console.error(error.message);
            // stops in case of error
            bool=false;
                        // push all bitches
                        let body = await page.evaluate(() => document.body.innerHTML);
                        const $ = cheerio.load(body);
                        $('#react-root > section > main > div > article > main > section > div', body).each(function () {
                            let name = $(this).text();
                            console.log("bitch: ", name);
                            bitches.push(name);
                        })
                        console.log(bitches);

        }
     page.evaluate(_ => {
            window.scrollBy(0, 50);
        });
        let body = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(body);
        let bitchesShown = $('#react-root > section > main > div > article > main > section > div', body).length;
        console.log(bitchesShown);
        if (bitchesShown >= bitchCount) {
            console.log('done.')
            // push all bitches
            $('#react-root > section > main > div > article > main > section > div', body).each(function () {
                let name = $(this).text();
                console.log("bitch: ", name);
                bitches.push(name);
        
            })
            // stops if all are shown
            bool = false;
        }
    }
    return bitches;

}


async function login(page, usr, pass){
    await page.goto('https://www.instagram.com/');

    //LOGIN
    await page.waitForSelector('div.-MzZI:nth-child(1) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
    await page.type('div.-MzZI:nth-child(1) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', usr);

    await page.waitForSelector('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
    await page.type('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', pass);

    await page.waitForSelector('.L3NKy > div:nth-child(1)');
    await page.click('.L3NKy > div:nth-child(1)');
}
async function check_following(browser){
    //check how many bitches be following
    const page2 = await browser.newPage();
    await page2.goto('https://www.instagram.com/'+process.env.NAME);
    let body = await page2.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);

    $('#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span', body).each(function () {
        bitchCount = $(this).text();
        console.log("bitch count 1: ", bitchCount);
        page2.close();
        
    })
}
async function start(usr, pass) {
    const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox",
    "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    
    login(page, usr, pass);
    check_following(browser)
    //check:
    console.log("bitch count 2: ", bitchCount);

    var bitches = await getAllFollowing(page);

    for (let index = 0; index < bitches.length; index++) {
        const element = bitches[index];
        console.log(element);
        const page3 = await browser.newPage();
        await page3.goto('https://www.instagram.com/'+element);
        let body = await page3.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(body);
        let her_fans= $('#react-root > section > main > div > header > section > ul > li:nth-child(2) > span > span', body).text();        ;
        let her_idols= $('#react-root > section > main > div > header > section > ul > li:nth-child(3) > span > span', body).text();        ;
        console.log(element,': Idols-', her_idols, '   ,Fans:',her_fans)
        await page3.waitFor(10000);
        await page3.close();
        her_fans=Number(her_fans.replace(/,/g, ''));
        her_idols=Number(her_idols.replace(/,/g, ''));

        console.log(her_fans+220);

        if (her_fans+220<her_idols) {
            fanBitches.push(element);
            console.log("fan: ", element)
        }
        
    }
    // (await bitches).forEach(async function(element) {
    //     console.log(element);
    //     const page3 = await browser.newPage();
    //     await page3.goto('https://www.instagram.com/'+element);
    //     let body = await page3.evaluate(() => document.body.innerHTML);
    //     const $ = cheerio.load(body);
    //     const her_fans=$('li.Y8-fY:nth-child(2) > a:nth-child(1) > span:nth-child(1)', body).text();        ;
    //     const her_idols=$('li.Y8-fY:nth-child(3) > a:nth-child(1) > span:nth-child(1)', body).text();        ;
    //     console.log(element,': Idols-', her_idols, '   ,Fans:',her_fans)
    //     await page3.waitFor(10000);
    //     await page3.close();
    //     if (Number(her_fans)+200<Number(her_idols)) {
    //         fanBitches.push(element);
    //     }
        
    // });

    console.log("Fan Bitches: ", fanBitches,"END")
    // await browser.close();
}

var bitchCount = 0;
var fanBitches=[];
start(process.env.NAME, process.env.PASS);