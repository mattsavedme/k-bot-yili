const puppeteer = require("puppeteer");

let browser;
let page;

const initBrowser = async () => {
  browser = await puppeteer.launch({ headless: "shell" });
  page = await browser.newPage();
};

const prefix = "易理";

async function queryEnName(symbol) {
  if (!browser) {
    await initBrowser();
  }
  await page.goto(`https://www.buyiju.com/cm/enname/`);

  await page.type("form[name='buyiju'] input[name='czsm']", symbol);
  await page.click("form[name='buyiju'] input[type='submit']");

  await page.waitForSelector(".content");
  const matchingText = await page.evaluate((text) => {
    const elements = Array.from(document.querySelectorAll(".content p"));
    return elements
      .filter((el) => el.textContent.includes(text))
      .map((el) => el.textContent);
  }, prefix);

  return `${matchingText[0]}`
    .replace(prefix, "")
    .replace(/\s+/g, "")
    .replace(/[()]/g, "")
    .replace(/:/g, "")
    .replace(/：/g, "")
    .replace(/。/g, "");
}

module.exports = { queryEnName };
