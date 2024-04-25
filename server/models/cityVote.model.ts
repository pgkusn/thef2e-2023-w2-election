import mongoose from 'mongoose'

const districtSchema = new mongoose.Schema({
  dist_name: String,
  candidate_1: Number,
  candidate_2: Number,
  candidate_3: Number,
  valid_votes: Number,
  invalid_votes: Number,
  votes: Number,
  rate: Number,
})

const cityVoteSchema = new mongoose.Schema({
  city_code: String,
  city_name: String,
  candidate_1: String,
  candidate_2: String,
  candidate_3: String,
  valid_votes: String,
  invalid_votes: String,
  votes: String,
  rate: String,
  dist: [districtSchema],
})

const CityVote = mongoose.model('City_vote', cityVoteSchema)

export default CityVote
