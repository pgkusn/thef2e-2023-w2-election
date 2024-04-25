import mongoose from 'mongoose'

const totalVoteSchema = new mongoose.Schema({
  candidate_1: String,
  candidate_2: String,
  candidate_3: String,
  valid_votes: String,
  invalid_votes: String,
  votes: String,
  rate: String,
})

const TotalVote = mongoose.model('Total_vote', totalVoteSchema)

export default TotalVote
