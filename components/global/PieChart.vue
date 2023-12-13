<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { color: '#FBD189', value: 30 },
      { color: '#97C6ED', value: 30 },
      { color: '#B8D8BA', value: 40 },
    ],
  },
  innerRadius: {
    type: Number,
    default: 0,
  },
})

const { $d3 } = useNuxtApp()

const svgRef = ref(null)
let group = null

const initChart = () => {
  // 建立 svg
  const svg = $d3.select(svgRef.value)

  // 建立圓餅集合標籤 g
  group = svg.append('g').attr('class', 'slices').attr('transform', 'translate(200, 200)')
}
const drawChart = () => {
  // 建立圓餅建構函式
  const pieChartGenerator = $d3.pie().value(d => d.value)

  // 用 innerRadius 跟 outerRadius 取得圓餅內圈外圈的半徑
  const arc = $d3.arc().innerRadius(props.innerRadius).outerRadius(170)

  // 建立 pie 並綁定圓弧路徑
  group
    .selectAll('path')
    .data(pieChartGenerator(props.data))
    .join('path')
    .attr('d', arc)
    .attr('fill', d => d.data.color)
}

onMounted(() => {
  initChart()
  watchEffect(() => {
    drawChart()
  })
})
</script>

<template>
  <svg viewBox="0 0 400 400" ref="svgRef"></svg>
</template>
