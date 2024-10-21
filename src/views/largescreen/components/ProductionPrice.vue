<template>
  <div class="production-price">
    <bar-chart ref="barChart" />
  </div>
</template>

<script>
import BarChart from './Charts/BarChart';
export default {
  name: 'ProductionPrice',
  components: {
    BarChart,
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    })
  },
  methods: {
    initChart() {
      this.$refs.barChart.initChart({
        name: '销售',
        xData: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        yData: [310, 220, 135, 225, 279, 500],
        other: {
          yAxisName: '单位：万元',
          yAxisLine: {
            show: false,
          },
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#93FF8D'
              }, {
                offset: 1, color: '#2FDADE'
              }],
              global: false
            }
          ],
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.production-price {
  width: 100%;
  height: 100%;
}
</style>
