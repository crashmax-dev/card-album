// @ts-check

import { LASTSTICKER_URL } from './config.js'

/**
 * Get card image
 * @param {number} collectionId
 * @param {number} cardNumber
 * @returns {string}
 */
export function getCardImage(collectionId, cardNumber) {
  return `${LASTSTICKER_URL}/i/cards/${collectionId}/${cardNumber}.jpg`
}

/**
 * Get collection cover
 * @param {number} collectionId
 * @returns {string}
 */
export function getCollectionCover(collectionId) {
  return `${LASTSTICKER_URL}/i/album/${collectionId}.jpg`
}
