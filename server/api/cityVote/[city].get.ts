import cityVoteModel from '@/server/models/cityVote.model'

export default defineEventHandler(async event => {
  return await cityVoteModel.find({ city_code: event.context.params?.city })
})
