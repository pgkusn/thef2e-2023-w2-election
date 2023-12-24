import * as Types from '@/types'

export const apiAdapter = {
  getCities(data: Types.ApiCity[]) {
    return data.map(v => ({
      name: v.CityName,
      value: v.CityCode.toLowerCase(),
    }))
  },
  getTotalVotes(data: Types.ApiAllVote) {
    return {
      validVotes: Number(data.valid_votes),
      invalidVotes: Number(data.invalid_votes),
      votes: Number(data.votes),
      rate: Number(data.rate),
      candidate: [Number(data.candidate_1), Number(data.candidate_2), Number(data.candidate_3)],
    }
  },
  getAllCityVotes(data: Types.ApiAllCityVote[]) {
    return data.map(v => ({
      cityCode: v.city_code,
      cityName: v.city_name,
      validVotes: Number(v.valid_votes),
      invalidVotes: Number(v.invalid_votes),
      votes: Number(v.votes),
      rate: Number(v.rate),
      candidate: [Number(v.candidate_1), Number(v.candidate_2), Number(v.candidate_3)],
    }))
  },
  getCityVotes(data: Types.ApiCityVote) {
    return {
      cityCode: data.city_code,
      cityName: data.city_name,
      validVotes: Number(data.valid_votes),
      invalidVotes: Number(data.invalid_votes),
      votes: Number(data.votes),
      rate: Number(data.rate),
      candidate: [Number(data.candidate_1), Number(data.candidate_2), Number(data.candidate_3)],
      dist: data.dist.map(item => ({
        distName: item.dist_name,
        validVotes: Number(item.valid_votes),
        invalidVotes: Number(item.invalid_votes),
        votes: Number(item.votes),
        rate: Number(item.rate),
        candidate: [Number(item.candidate_1), Number(item.candidate_2), Number(item.candidate_3)],
      })),
    }
  },
}
