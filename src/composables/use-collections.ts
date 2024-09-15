import { watch } from 'vue'
import { createGlobalState, useAsyncState, useLocalStorage } from '@vueuse/core'

export interface Card {
  id: number
  name: string
  type: string
  rarity: string
}

export interface Collection {
  id: number
  name: string
  cards: Card[]
}

const availableCollections: Record<string, string> = {
  'empty': 'Без коллекции',
  'eaglemoss_transformers_prime': 'Трансформеры',

  'deagostini_beyblade_cards': 'Beyblade',
  'deagostini_scooby_doo_cards': 'Скуби-Ду (2012)',

  'supergonki': 'Супергонки',
  'supergonki-2': 'Супергонки (2 серия)',
  'ge_fabbri_supergonki_promo': 'Супергонки (промо)',

  'marvel_spiderman_cards': 'Человек-Паук',
  'marvel_spiderman_cards_2': 'Человек-Паук (2 серия)',
  'marvel_spiderman_cards_3': 'Человек-Паук (3 серия)',

  'turtleninja_cards': 'Черепашки-ниндзя. Боевая четверка.',
  'turtleninja_cards-2': 'Черепашки-ниндзя. Воины тени.',
  'turtleninja_cards-3': 'Черепашки-ниндзя. Братья по оружию.',
}

export const useCollections = createGlobalState(() => {
  const activeCollection = useLocalStorage('album-collection', 'empty')

  const { state: collection, isLoading, execute } = useAsyncState<Collection | null>(async () => {
    if (activeCollection.value === 'empty') return null
    const req = await fetch(`collections/${activeCollection.value}.json`)
    return await req.json()
  }, null, { resetOnExecute: false })

  watch(activeCollection, () => execute())

  return {
    isLoading,
    collection,
    activeCollection,
    availableCollections,
  }
})
