import * as Types from '@/types'

export const useVoteStore = defineStore('vote', () => {
  // 候選人
  const candidateList = [
    {
      no: 1,
      name: '柯文哲',
      partyId: 1,
      partyColor: '#9AE2E9',
      partyName: '台灣民眾黨',
      partyShortName: '眾',
    },
    {
      no: 2,
      name: '賴清德',
      partyId: 2,
      partyColor: '#93E0C0',
      partyName: '民主進步黨',
      partyShortName: '民',
    },
    {
      no: 3,
      name: '侯友宜',
      partyId: 3,
      partyColor: '#84AAE2',
      partyName: '中國國民黨',
      partyShortName: '中',
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
    const { data, error } = (await useFetch('/api/totalVote')) as {
      data: Ref<Types.ApiAllVote[]>
      error: Ref<Types.ApiFetchError>
    }
    if (!data.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    totalVotes.value = apiAdapter.getTotalVotes(data.value[0])
  }

  /**
   * 取得各縣市得票數
   */
  const getAllCityVotes = async () => {
    if (allCityVotes.value) return
    const { data, error } = (await useFetch('/api/allCityVote')) as {
      data: Ref<Types.ApiAllCityVote[]>
      error: Ref<Types.ApiFetchError>
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
    const { data, error } = (await useFetch(`/api/cityVote/${city}`)) as {
      data: Ref<Types.ApiCityVote[]>
      error: Ref<Types.ApiFetchError>
    }
    if (!data.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    cityVotes.value = apiAdapter.getCityVotes(data.value[0])
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
