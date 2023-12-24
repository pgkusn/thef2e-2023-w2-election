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
const barChartData = computed(() => {
  return allCityVotes.value.map(item => {
    return {
      name: item.cityName,
      candidate: item.candidate.map((votes, index) => ({
        partyColor: voteStore.candidateList[index].partyColor,
        votes,
      })),
    }
  })
})
const cardData = computed(() => {
  return allCityVotes.value.map(item => {
    const maxVotes = Math.max(...item.candidate)
    return {
      code: item.cityCode,
      name: item.cityName,
      rate: rateFormat(item.rate),
      candidate: item.candidate.map((votes, index) => ({
        partyId: voteStore.candidateList[index].partyId,
        partyName: voteStore.candidateList[index].partyShortName,
        partyColor: voteStore.candidateList[index].partyColor,
        name: voteStore.candidateList[index].name,
        percent: index === 0 ? 0 : rateFormat((votes / item.votes) * 100),
        isWinner: votes === maxVotes,
        votes,
      })),
    }
  })
})
</script>

<template>
  <section class="hidden relative md:block">
    <h1>
      <Icon name="VoteStamp" size="24px" />
      全台選民的票投給誰？
    </h1>
    <p class="text-3 text-#ADB5BD leading-4 mt2 ml8">※資料來源：中選會</p>
    <div class="max-w127.5 mx-auto py8">
      <TaiwanMap :data="mapData" />
    </div>
    <ul class="font-700 absolute top-21.5">
      <li class="mb4">開票率：100%</li>
      <li>投票數：{{ totalVotes.votes.toLocaleString() }} 票</li>
      <li>投票率：{{ rateFormat(totalVotes.rate) }}</li>
      <li class="mb4">有效票：{{ totalVotes.validVotes.toLocaleString() }} 票</li>
      <li>無效票：{{ totalVotes.invalidVotes.toLocaleString() }} 票</li>
    </ul>
  </section>

  <section>
    <h1>
      <Icon name="VoteStamp" size="24px" />
      縣市戰況
    </h1>
    <p class="text-3 text-#ADB5BD leading-4 mt2 ml8">※資料來源：中選會</p>

    <div class="hidden overflow-auto mt8 pb6.5 md:block">
      <CityBarChart :data="barChartData" />
      <ul class="flex items-center gap2 mt9 ml15">
        <li
          v-for="candidate in voteStore.candidateList"
          class="text-#4F4F4F text-3 flex items-center gap-x2 before:(content-empty w5 h2)"
          :class="`before:bg-party-${candidate.partyId}`"
        >
          {{ candidate.partyName }}
        </li>
      </ul>
    </div>

    <div class="flex flex-wrap gap8 py8 md:gap7">
      <CityCard v-for="data in cardData" :data="data" />
    </div>
  </section>
</template>
