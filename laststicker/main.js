import path from 'node:path'
import { writeFile } from 'node:fs/promises'

import { config } from './config.js'
import { parseCards } from './parse-cards.js'

async function main() {
  for (const collectionName of config.collections) {
    const collection = await parseCards(collectionName)
    if (!collection) continue

    collection.cards = collection.cards.map((card) => {
      const [id, name, _, type, rarity] = card

      return {
        id: Number(id),
        name,
        type,
        rarity
      }
    })

    const collectionPath = path.join(config.collectionsOutputPath, `${collectionName}.json`)
    await writeFile(collectionPath, JSON.stringify(collection, null, 2))
  }
}

main()
