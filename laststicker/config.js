// @ts-check

import path from 'node:path'

export const LASTSTICKER_URL = 'https://www.laststicker.ru'

export const config = {
  collectionBaseUrl: `${LASTSTICKER_URL}/cards/`,
  collectionsOutputPath: path.resolve('public', 'collections'),
  collections: [
    'eaglemoss_transformers_prime',

    'deagostini_beyblade_cards',
    'deagostini_scooby_doo_cards',

    'supergonki',
    'supergonki-2',
    'ge_fabbri_supergonki_promo',

    'marvel_spiderman_cards',
    'marvel_spiderman_cards_2',
    'marvel_spiderman_cards_3',

    'turtleninja_cards',
    'turtleninja_cards-2',
    'turtleninja_cards-3',
  ]
}
