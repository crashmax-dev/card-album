// @ts-check

import { Builder, Browser } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
import { config } from './config.js'

export async function parseCards(collectionName) {
  const options = new chrome.Options()
  const driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build()

  try {
    const url = config.collectionBaseUrl + collectionName
    await driver.get(url)

    const collectionData = await driver.executeScript(() => {
      const img = document.querySelector("#content img[src*=\"/i/album\"]")
      const id = img?.getAttribute('src')?.split('/').at(-1)?.split('.')[0] || '0'
      const name =  img?.getAttribute('alt') || 'Unknown'

      return {
        id: Number(id),
        name,
      }
    })

    const table = await driver.findElement({ className: 'cardlist_table' })
    const rows = await table.findElements({ tagName: 'tr' })
    const cards = []

    for (const row of rows) {
      const cells = await row.findElements({ tagName: 'td' })
      const parsedRow = []
      for (const cell of cells) {
        const text = await cell.getText()
        parsedRow.push(text)
      }
      cards.push(parsedRow)
    }

    return {
      ...collectionData,
      cards: cards.slice(2)
    }
  } catch (err) {
    console.error(err)
  } finally {
    await driver.quit()
  }
}
