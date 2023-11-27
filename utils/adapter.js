export const adapter = {
  getVotes(data) {
    const mapData = data.map(v => ({
      cityCode: v.city_code,
      cityName: v.city_name,
      validVotes: Number(v.valid_votes),
      invalidVotes: Number(v.invalid_votes),
      votes: Number(v.votes),
      rate: Number(v.rate),
      candidate: [Number(v.candidate_1), Number(v.candidate_2), Number(v.candidate_3)],
    }))
    return {
      country: mapData.find(v => v.cityCode === 'all'),
      city: mapData.filter(v => v.cityCode !== 'all'),
    }
  },
}
