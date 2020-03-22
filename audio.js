const fs = require('fs')
const puppeteer = require('puppeteer')
const helpers = require('./helpers')
const links = JSON.parse(fs.readFileSync('./newsitems.json'));
console.log('links', links);
(async () => {
  const results = []
  for (const link of links) {
    const browser = await puppeteer.launch({ headless: true });
    const audioLink = await helpers.getAudioLink(browser, link.link)
    await browser.close();
    results.push({
      ...link,
      audioLink
    })
  }
  console.log(results)
  fs.writeFile("audio.json", JSON.stringify(results), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("created!");
    }
  });
})()