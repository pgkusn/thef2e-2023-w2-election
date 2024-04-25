import allCityVoteModel from '@/server/models/allCityVote.model'

export default defineEventHandler(async event => {
  return await allCityVoteModel.find()
})
