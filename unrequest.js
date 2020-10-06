const { Console } = require('console');
const puppeteer = require('puppeteer');
const dotenv =require('dotenv');

dotenv.config({path: "./config.env"});

async function start(usr, pass) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
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

    // // following
    // await page.waitForSelector('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(4) > a');
    // await page.click('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(4) > a');

    // requested
    await page.waitForSelector('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(2) > a');
    await page.click('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(2) > a');

    async function unfol() {
        let i=0;
        var unfollow="global";
        var final="global";
        var link=["link","link2"];
        var proWindow=[""]
        proWindow.length=0
        link.length=0;
        var ids = document.querySelectorAll(".-utLf");
        //wait 5000
        setTimeout(() => {
            for(i=0;i<ids.length;i++){
                link.push('https://www.instagram.com/'+ids[i].innerText);
                console.log(link[i]);
                proWindow[i]=window.open(link[i]);
            unfollow = proWindow[i].document.querySelector("button._8A5w5");
            unfollow.click();
            final = proWindow[i].document.querySelector(".aOOlW");
            final.click();
        }
                     }, 5000);


           
    }
    
    

}
start(process.env.NAME, process.env.PASS);




