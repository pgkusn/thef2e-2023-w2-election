<script setup>
import { useVoteStore } from '@/stores/vote'

const voteStore = useVoteStore()
const { candidateList } = voteStore
const { voteData, mapData } = storeToRefs(voteStore)

const chartData = computed(() => {
  return candidateList.map((candidate, index) => ({
    color: candidate.partyColor,
    value: voteData.value.country.candidate[index],
  }))
})
const listData = computed(() => {
  return voteData.value.country.candidate.map((vote, index) => ({
    no: candidateList[index].no,
    partyId: candidateList[index].partyId,
    name: candidateList[index].name,
    vote: vote.toLocaleString(),
    rate: Math.round((vote / voteData.value.country.votes) * 100 * 10) / 10,
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
        <IndexPieChart :data="chartData" />
        <ul class="flex justify-center items-center gap-x2 mt2">
          <li
            v-for="candidate in candidateList"
            class="text-#4F4F4F text-3 flex items-center gap-x2 before:(content-empty w5 h2)"
            :class="`before:bg-party-${candidate.partyId}`"
          >
            {{ candidate.partyName }}
          </li>
        </ul>
      </div>
      <IndexVoteList :data="listData" />
    </div>
  </section>
</template>
