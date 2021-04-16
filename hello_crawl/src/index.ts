import puppeteer from "puppeteer";

type shopinfoDictType = {
    shopname: string,
    addressNumber: string,
    address: string,
    tel: string,
    businessHour: string
};

const regex = /[0-9\-]+/;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--lang=ja"]
    });

    const page = await browser.newPage();
    await page.goto("http://www.yamada-store.com/shopinfo/index.html");
    const shopinfoElementList = await page.$$("div.address-box div.address");

    for (let elm of shopinfoElementList) {
        const shopname = await (await (await elm.$("h3"))?.getProperty("textContent"))?.jsonValue() as string;
        const addresses = await (await (await elm.$("p"))?.getProperty("textContent"))?.jsonValue() as string;
        const tel = await (await (await elm.$("li:nth-child(1)"))?.getProperty("textContent"))?.jsonValue() as string;
        const businessHour = await (await (await elm.$("li:nth-child(2)"))?.getProperty("textContent"))?.jsonValue() as string;
        const address = addresses.split("　");
        const dict: shopinfoDictType = {
            shopname: shopname,
            addressNumber: address[0].match(regex)?.pop()!,
            address: address[1],
            tel: tel.match(regex)?.pop()!,
            businessHour: businessHour.match(/[0-9：～]+/)?.pop()!
        };
        console.log(dict);
    }
  
    await browser.close();
})();