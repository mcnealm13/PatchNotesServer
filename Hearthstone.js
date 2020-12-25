const index = require('./index.js');
/*---------------------------------------------------------
function: Hearthstone
parameters: none
description: Scrape Hearthstone Patchnotes and return a results.
-----------------------------------------------------------*/
async function Hearthstone() {
  let driver = new index.driver.Builder().forBrowser('firefox').setFirefoxOptions(index.options).build();
  let title = '';
  let body = '';
  let link = '';
  let date = '';
  try {
    await driver.get("https://playhearthstone.com/en-us/news/patchnotes");
    let path = '//*[@id="NewsHome"]/div/div[2]/div[2]/a[1]';
    let page = await driver.findElement(index.By.xpath(path));
    link = await page.getAttribute("href");
    title = await driver.findElement(index.By.xpath(path + '/div[2]/h3')).getText();
    body = await driver.findElement(index.By.xpath(path + '/div[2]/div[1]/p')).getText();
    date = await driver.findElement(index.By.xpath(path + '/div[2]/div[2]/time')).getText();
   }
    finally {
     await driver.quit();
   }
    let payLoadNotification = {
	notification: {
	title: 'Hearthstone: ' + title,
	body: body
	}};
    let payLoadData = {
    data: {title: title,
    body: body,
    link: link,
	titledate: 'Hearthstone: ' + date
	}};
	return [payLoadData, payLoadNotification];
}


module.exports = {
 Hearthstone
}       
