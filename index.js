const fetch = require('node-fetch');
const cheerio = require('cheerio');


(async () => {
  // const res = await fetch('https://www.investing.com/equities/tesla-motors')
  const res = await fetch('https://www.investing.com/equities/apple-computer-inc')
  const text = await res.text()
  const found = text.includes('826.16')
  // console.log({found})
  const $ = cheerio.load(text)

  const price = $('#quotes_summary_current_data span').first().text()
  console.log({price})
})()