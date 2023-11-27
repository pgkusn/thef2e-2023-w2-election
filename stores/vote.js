import { keyBy } from 'lodash-es'

export const useVoteStore = defineStore('vote', () => {
  const candidateList = [
    {
      no: 1,
      name: '雅娜',
      partyId: 1,
      partyColor: '#FBD189',
      partyName: '金色曠野同盟',
    },
    {
      no: 2,
      name: '喬治',
      partyId: 2,
      partyColor: '#97C6ED',
      partyName: '蔚藍海岸陣線',
    },
    {
      no: 3,
      name: '賽門',
      partyId: 3,
      partyColor: '#B8D8BA',
      partyName: '鬱蔥雨林聯盟',
    },
  ]
  const voteData = ref(null)
  const mapData = computed(() => {
    if (!voteData.value) return {}
    const groupByCity = keyBy(voteData.value.city, 'cityCode')
    return Object.entries(groupByCity).reduce((acc, [key, value]) => {
      const winner = value.candidate.findIndex(c => c === Math.max(...value.candidate))
      acc[key] = candidateList[winner].partyColor
      return acc
    }, {})
  })

  const getVotes = async () => {
    const { data, error } = await useFetch('/api/votes')
    if (!data.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    voteData.value = adapter.getVotes(data.value)
  }

  return {
    candidateList,
    voteData,
    mapData,
    getVotes,
  }
})
