import totalVoteModel from '@/server/models/totalVote.model'

export default defineEventHandler(async event => {
  return await totalVoteModel.find()
})
