<template>
  <div class="pagination">
    <button @click="prevPage" @wheel="prevPage">Назад</button>
    <select v-model="pagination.page">
      <template v-for="i in pagination.totalPages" :key="i">
        <option v-if="isOdd(i)" :value="i">
          {{ currentPage(i) }}
        </option>
      </template>
    </select>
    <button @click="nextPage" @wheel="nextPage">Вперед</button>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/use-pagination'

const { pagination, nextPage, prevPage } = usePagination()

function isOdd(num: number) {
  return num % 2 !== 0
}

function currentPage(num: number) {
  return (isOdd(num) ? num + 1 : num) / 2
}
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
</style>
