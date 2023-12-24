<script lang="ts" setup>
import * as Types from '@/types'

const props = defineProps<{
  data: Types.Card
}>()

const pieChartData = computed(() => {
  return props.data.candidate.map(candidate => ({
    color: candidate.partyColor,
    value: candidate.votes,
  }))
})
</script>

<template>
  <div class="border border-#DEE2E6 rounded-3 w-full overflow-hidden md:w85 2xl:w100">
    <div class="text-5 font-600 leading-none text-center bg-#E5E9EC py4">{{ data.name }}</div>

    <div class="p6 border-y border-#DEE2E6">
      <div>
        <div class="rounded-1 overflow-hidden flex h7.5 [&>div:first-child]:flex-grow md:hidden">
          <div
            v-for="item in data.candidate"
            :class="`bg-party-${item.partyId}`"
            :style="{ width: item.percent }"
          ></div>
        </div>
        <div class="hidden md:block px4">
          <PieChart :data="pieChartData" :innerRadius="85" />
        </div>
      </div>

      <p class="text-5 font-600 leading-none text-center my4">開票率：{{ data.rate }}</p>

      <ul>
        <li
          v-for="item in data.candidate"
          class="px4 py2 flex items-center gap-x2 border-b border-#DEE2E6 leading-none before:(content-[attr(data-party)] w5 h5 rounded-full leading-5 text-center text-3)"
          :class="`before:bg-party-${item.partyId}`"
          :data-party="item.partyName"
        >
          <p class="my4 text-5 font-600 text-center text-#525B76">{{ item.name }}</p>
          <Icon v-if="item.isWinner" name="VoteStamp" size="18px" />
          <span class="ml-auto text-#525B76">{{ item.votes.toLocaleString() }}</span>
        </li>
      </ul>
    </div>

    <div v-if="data.code" class="py4 text-center">
      <NuxtLink :to="`/city/${data.code}`" class="underline">查看詳細數據</NuxtLink>
    </div>
  </div>
</template>
