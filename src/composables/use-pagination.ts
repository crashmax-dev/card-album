import { computed, reactive } from 'vue'
import { createGlobalState, useMagicKeys } from '@vueuse/core'

export const usePagination = createGlobalState(() => {
  const pagination = reactive({
    page: 1,
    totalPages: 40,
    perPage: 9,
  })

  function setTotalPages(totalPages: number) {
    pagination.totalPages = totalPages
  }

  function setPerPage(perPage: number) {
    pagination.perPage = perPage
  }

  function prevPage() {
    if (pagination.page === 1) return
    pagination.page -= 2
  }

  function nextPage() {
    if (pagination.page >= pagination.totalPages - 2) return
    pagination.page += 2
  }

  useMagicKeys({
    onEventFired(event) {
      if (event.type === 'keyup') return
      if (event.key === 'ArrowLeft') {
        prevPage()
      } else if (event.key === 'ArrowRight') {
        nextPage()
      }
    }
  })

  const totalItems = computed(() => pagination.perPage * pagination.totalPages)

  return {
    totalItems,
    pagination,
    prevPage,
    nextPage,
    setPerPage,
    setTotalPages,
  }
})
