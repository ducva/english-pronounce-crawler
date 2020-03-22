const puppeteer = require('puppeteer');
const helpers = require('./helpers');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const vowelLinks = await helpers.getAllPronounceLinks(browser)
  const filteredLinks = Array.from(vowelLinks).filter(a => a !== null)
  fs.writeFile("newsitems.json", JSON.stringify(filteredLinks), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("created!");
    }
  });
  await browser.close();
})();


