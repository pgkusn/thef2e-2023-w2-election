import * as Types from '@/types'

export const useGlobalStore = defineStore('global', () => {
  const cities = ref<Types.City[]>()

  /**
   * 取得縣市列表
   */
  const getCities = async () => {
    if (cities.value) return
    const { data, error } = (await useFetch('/api/cityList')) as {
      data: Ref<Types.ApiCity[]>
      error: Ref<Types.FetchError>
    }
    if (!data.value) {
      console.dir(error.value)

      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    cities.value = apiAdapter.getCities(data.value)
  }

  return {
    cities,
    getCities,
  }
})
