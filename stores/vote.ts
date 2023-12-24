import * as Types from '@/types'

export const useVoteStore = defineStore('vote', () => {
  // 候選人
  const candidateList = [
    {
      no: 1,
      name: '雅娜',
      partyId: 1,
      partyColor: '#FBD189',
      partyName: '金色曠野同盟',
      partyShortName: '野',
    },
    {
      no: 2,
      name: '喬治',
      partyId: 2,
      partyColor: '#97C6ED',
      partyName: '蔚藍海岸陣線',
      partyShortName: '海',
    },
    {
      no: 3,
      name: '賽門',
      partyId: 3,
      partyColor: '#B8D8BA',
      partyName: '鬱蔥雨林聯盟',
      partyShortName: '林',
    },
  ]
  // 總得票數
  const totalVotes = ref<Types.TotalVotes>()
  // 各縣市得票數
  const allCityVotes = ref<Types.AllCityVotes[]>()
  // 單一縣市與行政區得票數
  const cityVotes = ref<Types.CityVotes>()

  /**
   * 取得總得票數
   */
  const getTotalVotes = async () => {
    if (totalVotes.value) return
    const { data, error } = (await useFetch('/api/votes/all')) as {
      data: Ref<Types.ApiAllVote>
      error: Ref<Types.FetchError>
    }
    if (!data.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    totalVotes.value = apiAdapter.getTotalVotes(data.value)
  }
  /**
   * 取得各縣市得票數
   */
  const getAllCityVotes = async () => {
    if (allCityVotes.value) return
    const { data, error } = (await useFetch('/api/votes/city')) as {
      data: Ref<Types.ApiAllCityVote[]>
      error: Ref<Types.FetchError>
    }
    if (!data.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    allCityVotes.value = apiAdapter.getAllCityVotes(data.value)
  }
  /**
   * 取得單一縣市與行政區得票數
   * @param {string} city 縣市代碼
   */
  const getCityVotes = async (city: string) => {
    const { data, error } = (await useFetch(`/api/votes/${city}`)) as {
      data: Ref<Types.ApiCityVote>
      error: Ref<Types.FetchError>
    }
    if (!data.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    cityVotes.value = apiAdapter.getCityVotes(data.value)
  }

  return {
    candidateList,
    allCityVotes,
    cityVotes,
    totalVotes,
    getTotalVotes,
    getAllCityVotes,
    getCityVotes,
  }
})
