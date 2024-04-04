<script lang="ts" setup>
import { keyBy } from 'lodash-es'
import * as Types from '@/types'

const voteStore = useVoteStore()

await Promise.all([voteStore.getTotalVotes(), voteStore.getAllCityVotes()])

const { totalVotes, allCityVotes } = storeToRefs(voteStore) as {
  totalVotes: Ref<Types.TotalVotes>
  allCityVotes: Ref<Types.AllCityVotes[]>
}

const mapData = computed(() => {
  const groupByCity = keyBy(allCityVotes.value, 'cityCode') as unknown as Types.CityGroup
  return Object.entries(groupByCity).reduce((acc: Types.MapData, [key, value]) => {
    const winner = value.candidate.findIndex(c => c === Math.max(...value.candidate))
    acc[key] = {
      city: value.cityName,
      votes: Math.max(...value.candidate),
      partyName: voteStore.candidateList[winner].partyName,
      partyColor: voteStore.candidateList[winner].partyColor,
    }
    return acc
  }, {})
})
const pieChartData = computed(() => {
  return voteStore.candidateList.map((candidate, index) => ({
    color: candidate.partyColor,
    value: totalVotes.value.candidate[index],
  }))
})
const listData = computed(() => {
  return totalVotes.value.candidate.map((vote, index) => ({
    no: voteStore.candidateList[index].no,
    partyId: voteStore.candidateList[index].partyId,
    name: voteStore.candidateList[index].name,
    vote: vote.toLocaleString(),
    rate: rateFormat((vote / totalVotes.value.validVotes) * 100),
  }))
})
</script>

<template>
  <section class="hidden md:block">
    <h1>
      <div class="i-bi-geo-alt-fill"></div>
      開票地圖
    </h1>
    <div class="max-w127.5 mx-auto py8">
      <TaiwanMap :data="mapData" />
    </div>
  </section>

  <section>
    <h1>
      <div class="i-bi-rss"></div>
      選票即時報
    </h1>
    <div class="py8">
      <div class="mb8 md:hidden">
        <PieChart :data="pieChartData" />
        <ul class="flex justify-center items-center gap-x2 mt2">
          <li
            v-for="candidate in voteStore.candidateList"
            class="text-#4F4F4F text-3 flex items-center gap-x2 before:(content-empty w5 h2)"
            :class="`before:bg-party-${candidate.partyId}`"
          >
            {{ candidate.partyName }}
          </li>
        </ul>
      </div>

      <IndexVoteList :data="listData" />

      <NuxtLink to="/city" v-slot="{ navigate }" class="mt8">
        <button
          class="text-theme-primary font-600 border border-theme-primary rounded-1.5 w-full h10 md:hidden"
          @click="navigate"
        >
          查看縣市選情版圖 》
        </button>
      </NuxtLink>
    </div>
  </section>
</template>
