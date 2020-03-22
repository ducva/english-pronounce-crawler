const puppeteer = require('puppeteer')

async function getAllPronounceLinks(browser) {
  const page = await browser.newPage();
  await page.goto('https://pronuncian.com/sounds');
  return (results = await page.evaluate(() => {
    const allVowels = document.querySelectorAll("div.sqs-block-content > ul > li")
    return Array.from(allVowels)
      .map(link => {
        if (!link.querySelector("strong")) {
          return null
        }
        const id = link.querySelector('strong').innerText
        const name = link.innerText.split("/")[0].trim()
        let res = {
          name,
          id,
          link: link.querySelector('a:nth-of-type(1)')['href']
        };
        return res;

      });
  }));
}

async function getAudioLink(browser, link) {
  const page = await browser.newPage();
  await page.goto(link);
  return (results = await page.evaluate(() => {
    const audioLink = document.querySelector("div.sqs-audio-embed")
    return audioLink.getAttribute('data-url')
  }));
}
module.exports = {
  getAllPronounceLinks,
  getAudioLink
}