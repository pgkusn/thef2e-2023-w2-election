export interface FetchError {
  statusCode: number
  statusMessage: string
}
export interface ApiCity {
  CityID: string
  CityName: string
  CityCode: string
  City: string
  CountyID: string
  Version: string
}
export interface ApiAllVote {
  candidate_1: string
  candidate_2: string
  candidate_3: string
  valid_votes: string
  invalid_votes: string
  votes: string
  rate: string
}
export interface ApiAllCityVote {
  city_code: string
  city_name: string
  candidate_1: string
  candidate_2: string
  candidate_3: string
  valid_votes: string
  invalid_votes: string
  votes: string
  rate: string
}
export interface ApiCityVote {
  city_code: string
  city_name: string
  candidate_1: string
  candidate_2: string
  candidate_3: string
  valid_votes: string
  invalid_votes: string
  votes: string
  rate: string
  dist: {
    dist_name: string
    candidate_1: string
    candidate_2: string
    candidate_3: string
    valid_votes: string
    invalid_votes: string
    votes: string
    rate: string
  }[]
}
export interface City {
  name: string
  value: string
}
export interface TotalVotes {
  validVotes: number
  invalidVotes: number
  votes: number
  rate: number
  candidate: number[]
}
export interface AllCityVotes {
  cityCode: string
  cityName: string
  validVotes: number
  invalidVotes: number
  votes: number
  rate: number
  candidate: number[]
}
export interface CityVotes {
  cityCode: string
  cityName: string
  validVotes: number
  invalidVotes: number
  votes: number
  rate: number
  candidate: number[]
  dist: {
    distName: string
    validVotes: number
    invalidVotes: number
    votes: number
    rate: number
    candidate: number[]
  }[]
}
export interface CityGroup {
  [key: string]: {
    cityCode: string
    cityName: string
    validVotes: number
    invalidVotes: number
    votes: number
    rate: number
    candidate: number[]
  }
}
export interface MapData {
  [key: string]: {
    city: string
    votes: number
    partyName: string
    partyColor: string
  }
}
export interface Card {
  code?: string
  name: string
  rate: string
  candidate: {
    partyId: number
    partyName: string
    partyColor: string
    name: string
    percent: number
    isWinner: boolean
    votes: number
  }[]
}
