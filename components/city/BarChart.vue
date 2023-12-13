<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        name: '臺北市',
        candidate: [
          { partyColor: '#FBD189', votes: 70769 },
          { partyColor: '#97C6ED', votes: 685830 },
          { partyColor: '#B8D8BA', votes: 875854 },
        ],
      },
    ],
  },
})

const { $d3 } = useNuxtApp()

const svgRef = ref(null)
const height = 300
const margin = 25
const yAxisWidth = 65
let yScale = null
let rectGroup = null

const initChart = () => {
  const svg = $d3.select(svgRef.value)
  svg.attr('width', 180 * props.data.length + yAxisWidth)
  svg.attr('height', height)

  yScale = $d3
    .scaleLinear()
    .domain([0, $d3.max(props.data, d => $d3.max(d.candidate, d => d.votes))])
    .range([height - margin, margin])
    .nice()

  // bar group
  const barGroup = svg.append('g').attr('transform', `translate(${yAxisWidth + 40}, 0)`)
  rectGroup = barGroup
    .selectAll('g')
    .data(props.data)
    .join('g')
    .attr('transform', (_, i) => `translate(${i * 180}, 0)`)

  // text
  const textGroup = svg
    .append('g')
    .attr('transform', `translate(${yAxisWidth + 80}, ${height - 10})`)
  textGroup
    .selectAll('text')
    .data(props.data)
    .join('text')
    .text(d => d.name)
    .attr('x', (_, i) => i * 180)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .attr('font-size', 10)
    .attr('fill', '#4F4F4F')

  // axis
  const yAxisGenerator = $d3.axisLeft(yScale).ticks(5)
  svg
    .append('g')
    .call(yAxisGenerator)
    .attr('transform', `translate(${yAxisWidth}, 0)`)
    .attr('font-size', 12)
    .attr('color', '#4F4F4F')
}
const drawChart = () => {
  // bar
  rectGroup
    .selectAll('rect')
    .data(d => d.candidate)
    .join('rect')
    .attr('x', (_, i) => i * 40)
    .attr('y', d => yScale(d.votes))
    .attr('width', 30)
    .attr('height', d => height - margin - yScale(d.votes))
    .attr('fill', d => d.partyColor)
}

onMounted(() => {
  initChart()
  watchEffect(() => {
    drawChart()
  })
})
</script>

<template>
  <svg ref="svgRef"></svg>
</template>
