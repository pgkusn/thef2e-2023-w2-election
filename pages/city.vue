<script lang="ts" setup>
import * as Types from '@/types'

const globalStore = useGlobalStore()

await globalStore.getCities()

const { cities } = storeToRefs(globalStore) as {
  cities: Ref<Types.City[]>
}
</script>

<template>
  <section>
    <h1>
      <div class="i-bi-search"></div>
      大家的選票投給誰？
    </h1>
    <Search :cities="cities" />
  </section>
  <NuxtPage />
</template>
