import { computed, watch } from 'vue'
import { usePagination } from './use-pagination'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { useCollections } from './use-collections'

export const useAlbum = createGlobalState(() => {
  const { activeCollection, availableCollections } = useCollections()
  const albums = useLocalStorage<{ [key: string]: number[] }>('albums', {})
  const { pagination, totalItems } = usePagination()

  const album = computed({
    get() {
      return albums.value[activeCollection.value] || []
    },
    set(value) {
      console.log(value)
      albums.value[activeCollection.value] = value
    },
  })

  watch(activeCollection, (collectionKey) => {
    if (collectionKey in albums.value) return
    albums.value[collectionKey] = []
  }, { immediate: true })

  function clearAlbum() {
    const confirm = window.confirm(`Очистить альбом с коллекцией "${availableCollections[activeCollection.value]}"?`)
    if (!confirm) return
    album.value = []
    pagination.page = 1
  }

  function hasAlbumItem(item: number) {
    return album.value.includes(item)
  }

  function toggleAlbumItem(item: number) {
    if (album.value.includes(item)) {
      album.value.splice(album.value.indexOf(item), 1)
    } else {
      album.value.push(item)
    }
  }

  const albumTotalItems = computed(() => {
    return Array.from({ length: totalItems.value }, (_, i) => i + 1)
  })

  const albumPages = computed<[number[], number[]]>(() => {
    const half = Math.ceil(pagination.perPage / 2)

    // first page
    // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (pagination.page === 1) {
      return [
        albumTotalItems.value.slice(0, half),
        []
      ]
    }

    // last page
    // [352, 353, 354, 355, 356, 357, 358, 359, 360]
    if (pagination.page === pagination.totalPages) {
      return [
        [],
        albumTotalItems.value.slice(albumTotalItems.value.length - pagination.perPage / 2)
      ]
    }

    // other pages
    const doublePageItems = albumTotalItems.value.slice(
      (pagination.page * pagination.perPage) - pagination.perPage - half,
      (pagination.page * pagination.perPage) - pagination.perPage + half,
    )

    return [
      doublePageItems.slice(0, half),
      doublePageItems.slice(half)
    ]
  })

  return {
    album,
    albumPages,
    clearAlbum,
    hasAlbumItem,
    toggleAlbumItem,
  }
})
