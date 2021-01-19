const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');

// Stock tracker/scraper

// Sheet
// https://docs.google.com/spreadsheets/d/1fz1KCUkLiWRPZ2FThC-wlcZzjbEEE2EIPu8SGeCbwVA/edit#gid=0

// Timer editor: https://crontab.guru/#0_5_*_*_1-5

// GCP
// Timer: 0 5 * * * 
// https://console.cloud.google.com/cloudscheduler?project=returnz-tester-215418

// Function: 
// https://console.cloud.google.com/functions/details/us-central1/scrape-stocks?project=returnz-tester-215418

// Logs
// https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_function%22%0Aresource.labels.function_name%3D%22scrape-stocks%22%0Aresource.labels.region%3D%22us-central1%22?project=returnz-tester-215418

async function getPrice(url) {
  const res = await fetch(url)
  const text = await res.text()
  //const found = text.includes('826.16')
  // console.log({found})
  const $ = cheerio.load(text)

  const price = $('#quotes_summary_current_data span').first().text()

  return price
}

(async () => {
  const dayOfWeek = new Date().getDay()
  if (dayOfWeek == 0 || dayOfWeek == 6) return // Dont run on Sat or Sun

  const sheet = new Sheet()
  await sheet.load()
  const stocks = await sheet.getRows(0)

  const dayPrices = {}
  for(let stock of stocks) {
    const price = await getPrice(stock.url)
    dayPrices[stock.ticker] = price
  }
  dayPrices.date = new Date().toDateString()
  await sheet.addRows([dayPrices], 1)

  console.log({dayPrices})
})()