import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // 明確指定 count 是 number 型別的 ref
  const count = ref<number>(0)

  // computed 會自動推斷型別，不一定要手動標註
  const doubleCount = computed(() => count.value * 2)

  // 函式型別也會自動推斷，這裡保持簡潔即可
  function increment(): void {
    count.value++
  }

  // 回傳值可讓 TypeScript 推斷 store 的類型
  return { count, doubleCount, increment }
})
