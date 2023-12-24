<script lang="ts" setup>
import * as Types from '@/types'

defineProps<{
  cities: Types.City[]
}>()

const route = useRoute()
const router = useRouter()

const currentCity = ref<string>('')

const search = () => {
  router.push(`/city/${currentCity.value}`)
}
const reset = () => {
  currentCity.value = ''
  router.push('/city')
}

watchEffect(() => {
  if (route.params.city) {
    currentCity.value = route.params.city as string
  }
})
</script>

<template>
  <form class="py8 flex flex-col gap2 md:flex-row" @submit.prevent="search" @reset.prevent="reset">
    <div class="relative w-full md:max-w60">
      <select
        v-model="currentCity"
        class="appearance-none w-full h10 pl4 pr12 border border-#DEE2E6 rounded-1.5"
      >
        <option value="" disabled>選擇縣市</option>
        <option v-for="city in cities" :value="city.value">{{ city.name }}</option>
      </select>
      <Icon name="SelectArrow" size="16px" class="absolute inset-y-0 right-4 my-auto" />
    </div>
    <button
      type="submit"
      class="h9.5 px4 rounded-1.5 bg-theme-primary text-white font-600 md:w-auto"
    >
      搜尋
    </button>
    <button
      type="reset"
      class="h9.5 px4 rounded-1.5 text-theme-primary font-600 border border-theme-primary md:w-auto"
    >
      清除搜尋
    </button>
  </form>
</template>
