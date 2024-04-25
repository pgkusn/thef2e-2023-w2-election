import cityModel from '@/server/models/city.model'

export default defineEventHandler(async event => {
  return await cityModel.find()
})
