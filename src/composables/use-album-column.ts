import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { usePagination } from './use-pagination'

export const AlbumSize = {
  Three: 3,
  Two: 2,
} as const

export const AlbumOptions: { value: typeof AlbumSize[keyof typeof AlbumSize]; label: string }[] = [
  {
    value: AlbumSize.Three,
    label: '3x3',
  },
  {
    value: AlbumSize.Two,
    label: '2x2',
  },
]

export const useAlbumColumn = createGlobalState(() => {
  const { pagination } = usePagination()
  const albumColumns = useLocalStorage('album-columns', AlbumSize.Three)

  function updateAlbumColumns() {
    const isThreeColumns = albumColumns.value === AlbumSize.Three
    // 9 ячеек - 3x3, 4 ячейки - 2x2
    pagination.perPage = isThreeColumns ? 9 : 4
    pagination.page = 1
  }

  return {
    albumColumns,
    updateAlbumColumns,
  }
})
