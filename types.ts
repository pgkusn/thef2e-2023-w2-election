export interface ApiCity {
  CityID: string
  CityName: string
  CityCode: string
  City: string
  CountyID: string
  Version: string
}
export interface ApiAllVote {
  candidate_1: string // 1號候選人得票數
  candidate_2: string // 2號候選人得票數
  candidate_3: string // 3號候選人得票數
  valid_votes: string // 有效票數
  invalid_votes: string // 無效票數
  votes: string // 投票數
  rate: string // 投票率
}
interface ApiCityVoteDist {
  candidate_1: string // 1號候選人得票數
  candidate_2: string // 2號候選人得票數
  candidate_3: string // 3號候選人得票數
  valid_votes: string // 有效票數
  invalid_votes: string // 無效票數
  votes: string // 投票數
  rate: string // 投票率
  dist_name: string // 行政區名稱
}
export interface ApiAllCityVote {
  city_code: string // 縣市代碼
  city_name: string // 縣市名稱
  candidate_1: string // 1號候選人得票數
  candidate_2: string // 2號候選人得票數
  candidate_3: string // 3號候選人得票數
  valid_votes: string // 有效票數
  invalid_votes: string // 無效票數
  votes: string // 投票數
  rate: string // 投票率
}
export interface ApiCityVote {
  city_code: string // 縣市代碼
  city_name: string // 縣市名稱
  candidate_1: string // 1號候選人得票數
  candidate_2: string // 2號候選人得票數
  candidate_3: string // 3號候選人得票數
  valid_votes: string // 有效票數
  invalid_votes: string // 無效票數
  votes: string // 投票數
  rate: string // 投票率
  dist: ApiCityVoteDist[]
}
export interface ApiFetchError {
  statusCode: number
  statusMessage: string
}
export interface City {
  name: string
  value: string
}
export interface TotalVotes {
  validVotes: number // 有效票數
  invalidVotes: number // 無效票數
  votes: number // 投票數
  rate: number // 投票率
  candidate: number[] // 候選人得票數
}
export interface AllCityVotes {
  cityCode: string // 縣市代碼
  cityName: string // 縣市名稱
  validVotes: number // 有效票數
  invalidVotes: number // 無效票數
  votes: number // 投票數
  rate: number // 投票率
  candidate: number[] // 候選人得票數
}
export interface CityVotesDist {
  cityCode: string // 縣市代碼
  cityName: string // 縣市名稱
  validVotes: number // 有效票數
  invalidVotes: number // 無效票數
  votes: number // 投票數
  rate: number // 投票率
  candidate: number[] // 候選人得票數
  distName: string // 行政區名稱
}
export interface CityVotes {
  cityCode: string // 縣市代碼
  cityName: string // 縣市名稱
  validVotes: number // 有效票數
  invalidVotes: number // 無效票數
  votes: number // 投票數
  rate: number // 投票率
  candidate: number[] // 候選人得票數
  dist: CityVotesDist[]
}
export interface CityGroup {
  [key: string]: AllCityVotes
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
    percent: string
    isWinner: boolean
    votes: number
  }[]
}
