export default defineEventHandler(async event => {
  // TODO: remove this
  console.log('get total votes')

  return {
    candidate_1: '608590',
    candidate_2: '5522119',
    candidate_3: '8170231',
    valid_votes: '14300940',
    invalid_votes: '163631',
    votes: '14464571',
    rate: '74.9029',
  }
})
