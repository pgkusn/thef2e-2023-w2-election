<script lang="ts" setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <ul>
    <li v-for="item in data">
      <ul class="flex justify-center items-center gap-x2 p2 md:(px12 py4 gap-x8)">
        <li class="hidden text-7 font-700 flex-shrink-0 md:block">{{ item.no }} 號</li>
        <li class="hidden w25 flex-shrink-0 md:block">
          <ClientOnly>
            <img :src="getImageUrl(`party_${item.no}.svg`)" alt="" />
          </ClientOnly>
        </li>
        <li class="p2.5 w30 flex-shrink-0">
          <ClientOnly>
            <img :src="getImageUrl(`candidate_${item.no}.png`)" alt="" />
          </ClientOnly>
          <p class="text-6 font-700 text-center mt4">{{ item.name }}</p>
        </li>
        <li class="text-5 font-700 text-nowrap flex-shrink-0 w50">
          <p>得票數：{{ item.vote }} 票</p>
          <p class="mt2">得票率：{{ item.rate }}</p>
        </li>
        <li class="hidden bg-#E9ECEF rounded-2 flex-grow h8 overflow-hidden 2xl:block">
          <div
            class="h-full text-3.5 font-800 text-white text-center leading-8 whitespace-nowrap px2"
            :class="`bg-party-${item.partyId}`"
            :style="{ width: `${item.rate}%` }"
          >
            {{ item.rate }}%
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
