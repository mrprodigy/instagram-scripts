const { Console } = require('console');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;
const dotenv =require('dotenv');

dotenv.config({path: "./config.env"});
const top_posts = 15;
async function click(page ,selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}

async function getBitches(usr, pass) {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 200, height: 5000 })
        try {

        await page.goto('https://www.instagram.com/');
    
        //LOGIN
        await page.waitForSelector('div.-MzZI:nth-child(1) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
        await page.type('div.-MzZI:nth-child(1) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', usr);
    
        await page.waitForSelector('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
        await page.type('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', pass);
    
        await click(page,'.L3NKy > div:nth-child(1)');
    
        //home:
        await click(page,'#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(1) > div > a > svg');
    try {
             // not now!
             await click(page,'body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm');
       
    } catch (error) {
        
    }

        //like 15
        await page.waitForSelector(`#react-root > section > main > section > div > div:nth-child(2) > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg`);
        let body = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(body);
        let arr = $('#react-root > section > main > section > div > div:nth-child(2) > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg', body);
        while (arr.length < top_posts) {
            page.evaluate(_ => {
                window.scrollBy(0, 50);
            });
            body = await page.evaluate(() => document.body.innerHTML);
            const $ = cheerio.load(body);
            arr = $('#react-root > section > main > section > div > div:nth-child(2) > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg', body);
        }
        // $('#react-root > section > main > section > div > div:nth-child(2) > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg', body).each(async function (index, element) {
        //     let name = $(this).attr('aria-label');
        //     // let name = $(this)[index].attribs['aria-label'];
        //     console.log(name, index);
        //     if (name === 'Like') {
        //         index++;
        //         await page.waitForSelector(`#react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(${index}) > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg`)
        //         await page.click(`#react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(${index}) > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg`)
        //         index--;
        //         // await page.click('#react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(' + Number(index + 1) + ') > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg');
        //             console.log("liked", index , ` selector:  #react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(${index}) > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg`)
        //         }
        //     else {
        //         console.log("skipped", index)
        //     }
        // })
        let heart_list = $('#react-root > section > main > section > div > div:nth-child(2) > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg', body);
        for (let index = 0; index < heart_list.length; index++) {
            // let name = $(this).attr('aria-label');
            let name = heart_list[index].attribs['aria-label'];
            console.log(name, index);
            if (name === 'Like') {
                index++;
                await page.waitForSelector(`#react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(${index}) > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg`)
                await page.click(`#react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(${index}) > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg`)
                index--;
                // await page.click('#react-root > section > main > section > div > div:nth-child(2) > div > article:nth-child(' + Number(index + 1) + ') > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg');
                    console.log("liked", index)
                }
            else {
                console.log("skipped", index)
            }            
        }

        
        
    } catch (err) {
        console.error(err.message);
      } 
    finally{
        // await page.waitFor(10000);
        await browser.close();

    }
}

async function begin() {
    var job = new CronJob('*/1 * * * *', function() {
        var d = new Date();
        console.log(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' Execution');
        getBitches(process.env.NAME, process.env.PASS);
    }, null, true);
      job.start();
}
var d = new Date();
console.log(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' Execution');
getBitches(process.env.NAME, process.env.PASS);

//  begin();