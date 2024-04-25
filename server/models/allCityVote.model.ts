import mongoose from 'mongoose'

const allCityVoteSchema = new mongoose.Schema({
  city_code: String,
  city_name: String,
  candidate_1: String,
  candidate_2: String,
  candidate_3: String,
  valid_votes: String,
  invalid_votes: String,
  votes: String,
  rate: String,
})

const AllCityVote = mongoose.model('All_city_vote', allCityVoteSchema)

export default AllCityVote
