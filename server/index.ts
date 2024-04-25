import mongoose from 'mongoose'

export default defineNitroPlugin(async nitroApp => {
  try {
    mongoose.set('strictQuery', true) // 嚴格模式
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('DB connection established')
  } catch (error) {
    console.error('DB connection failed', error)
  }
})
