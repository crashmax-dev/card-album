// @ts-check

import { Builder, Browser } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'

const URL = "https://www.laststicker.ru/cards/supergonki-2/"

const options = new chrome.Options()
const driver = new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeOptions(options)
  .build()

async function parse() {
  try {
    await driver.get(URL)
    const table = await driver.findElement({ className: 'cardlist_table' })
    const rows = await table.findElements({ tagName: 'tr' })

    const parsedRows = []

    for (const row of rows) {
      const cells = await row.findElements({ tagName: 'td' })
      const parsedRow = []
      for (const cell of cells) {
        const text = await cell.getText()
        parsedRow.push(text)
      }
      parsedRows.push(parsedRow)
    }

    console.log(parsedRows)
  } finally {
    await driver.quit()
  }
}

parse()
