export default defineEventHandler(async event => {
  return {
    city_code: 'cyi',
    city_name: '嘉義市',
    candidate_1: '39950',
    candidate_2: '68199',
    candidate_3: '49507',
    valid_votes: '157656',
    invalid_votes: '939',
    votes: '158595',
    rate: '72.90',
    dist: [
      {
        dist_name: '東區',
        candidate_1: '17487',
        candidate_2: '29901',
        candidate_3: '23575',
        valid_votes: '70963',
        invalid_votes: '433',
        votes: '71396',
        rate: '72.75',
      },
      {
        dist_name: '西區',
        candidate_1: '22463',
        candidate_2: '38298',
        candidate_3: '25932',
        valid_votes: '86693',
        invalid_votes: '506',
        votes: '87199',
        rate: '73.02',
      },
    ],
  }
})
