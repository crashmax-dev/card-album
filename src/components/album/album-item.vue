<template>
  <div :class="['album-item', { 'album-item-active': active }]">
    <img
      v-if="!isError && cardImage"
      :src="cardImage"
      :class="['album-image', { 'album-image-active': active }]"
      @error="onError"
    >
    <span class="album-text">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useCollections } from '@/composables/use-collections';
import { ref } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  id: number
  active: boolean
}>()

const { collection } = useCollections()
const cardImage = computed(() => {
  if (!collection.value) return

  const card = collection.value.cards[props.id - 1]
  if (!card) return

  return `https://www.laststicker.ru/i/cards/${collection.value.id}/${card.id}.jpg`
})

const isError = ref(false)
function onError(event: Event) {
  isError.value = true
  console.error(event)
}
</script>

<style scoped>
.album-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: var(--background-button);
  width: 150px;
  height: 200px;
  cursor: pointer;
  transition: all .5s;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.album-item-active {
  background-color: var(--main-color);
}

.album-item:hover {
  border-color: var(--main-color);
}

.album-image {
  position: absolute;
  height: inherit;
  width: inherit;
  object-fit: cover;
  transition: all .5s;
  pointer-events: none;
}

.album-image-active {
  opacity: 0.3;
}

.album-text {
  position: absolute;
  -webkit-text-fill-color: var(--main-color);
  -webkit-text-stroke: 2px;
  font-size: 5rem;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
}
</style>
