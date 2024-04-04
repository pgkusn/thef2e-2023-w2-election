<script lang="ts" setup>
import * as Types from '@/types'

const voteStore = useVoteStore()
const route = useRoute()

await voteStore.getCityVotes(route.params.city as string)

const { cityVotes } = storeToRefs(voteStore) as {
  cityVotes: Ref<Types.CityVotes>
}

const pieChartData = computed(() => {
  return cityVotes.value.candidate.map((votes, index) => ({
    color: voteStore.candidateList[index].partyColor,
    value: votes,
  }))
})
const barChartData = computed(() => {
  return cityVotes.value.dist.map(item => {
    return {
      name: item.distName,
      candidate: item.candidate.map((votes, index) => ({
        partyColor: voteStore.candidateList[index].partyColor,
        votes,
      })),
    }
  })
})
const cardData = computed(() => {
  return cityVotes.value.dist.map(item => {
    const maxVotes = Math.max(...item.candidate)
    return {
      name: item.distName,
      rate: rateFormat(item.rate),
      candidate: item.candidate.map((votes, index) => ({
        partyId: voteStore.candidateList[index].partyId,
        partyName: voteStore.candidateList[index].partyShortName,
        partyColor: voteStore.candidateList[index].partyColor,
        name: voteStore.candidateList[index].name,
        percent: index === 0 ? '0%' : rateFormat((votes / item.votes) * 100),
        isWinner: votes === maxVotes,
        votes,
      })),
    }
  })
})
</script>

<template>
  <section>
    <h1>
      <Icon name="VoteStamp" size="24px" />
      {{ cityVotes.cityName }}選民的票投給誰？
    </h1>
    <p class="text-3 text-#ADB5BD leading-4 mt2 ml8">※資料來源：中選會</p>

    <div class="py8 flex flex-col gap-y8 md:(flex-row gap-x2)">
      <div
        class="flex flex-col items-center gap4 md:(flex-row gap2 flex-grow justify-center items-start)"
      >
        <div class="w-full max-w150">
          <PieChart :data="pieChartData" :innerRadius="0" />
        </div>
        <ul class="flex items-center gap2 md:flex-col flex-shrink-0 md:mt11">
          <li
            v-for="candidate in voteStore.candidateList"
            class="text-#4F4F4F text-3 flex items-center gap-x2 before:(content-empty w5 h2)"
            :class="`before:bg-party-${candidate.partyId}`"
          >
            {{ candidate.partyName }}
          </li>
        </ul>
      </div>

      <ul class="font-700 md:-order-1">
        <li class="mb4">開票率：100%</li>
        <li>投票數：{{ cityVotes.votes.toLocaleString() }} 票</li>
        <li>投票率：{{ rateFormat(cityVotes.rate) }}</li>
        <li class="mb4">有效票：{{ cityVotes.validVotes.toLocaleString() }} 票</li>
        <li>無效票：{{ cityVotes.invalidVotes.toLocaleString() }} 票</li>
      </ul>
    </div>
  </section>

  <section>
    <h1>
      <Icon name="VoteStamp" size="24px" />
      {{ cityVotes.cityName }}各區戰況
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
