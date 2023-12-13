export const useGlobalStore = defineStore('global', () => {
  const cities = ref(null)

  /**
   * 取得縣市列表
   */
  const getCities = async () => {
    if (cities.value) return
    const { data, error } = await useFetch('/api/cityList')
    if (!data.value) {
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
