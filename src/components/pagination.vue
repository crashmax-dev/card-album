<template>
  <div class="pagination">
    <button @click="prevPage">Назад</button>
    <select v-model="pagination.page">
      <option
        v-for="(i) in pagination.totalPages"
        :key="i"
        :value="i"
      >
        {{ currentPage(i) }} - {{ isOdd(i) ? 'лицевая' : 'задняя' }}
      </option>
    </select>
    <button @click="nextPage">Вперед</button>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '../composables/use-pagination'

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
