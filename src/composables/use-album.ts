import { computed } from 'vue'
import { usePagination } from './use-pagination'
import { createGlobalState, useLocalStorage } from '@vueuse/core'

export const useAlbum = createGlobalState(() => {
  const album = useLocalStorage<number[]>('album', [])
  const { pagination } = usePagination()

  function clearAlbum() {
    const confirm = window.confirm('Сбросить альбом?')
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

  const albumItems = computed(() => {
    return Array.from({ length: pagination.perPage }, (_, i) => {
      return (pagination.page - 1) * pagination.perPage + i + 1
    })
  })

  return {
    album,
    albumItems,
    clearAlbum,
    hasAlbumItem,
    toggleAlbumItem,
  }
})
