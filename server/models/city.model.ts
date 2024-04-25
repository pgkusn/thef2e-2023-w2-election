import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
  CityID: String,
  CityName: String,
  CityCode: String,
  City: String,
  CountyID: String,
  Version: String,
})

const City = mongoose.model('City', citySchema)

export default City
