<template>
  <div class="production-analysis">
    <bar-chart ref="barChart" />
  </div>
</template>

<script>
const LinearColor = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0, color: '#039EE6'
  }, {
    offset: 1, color: '#7006D9'
  }],
  global: false
}
import BarChart from './Charts/BarChart';
export default {
  name: 'ProductionAnalysis',
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
        name: '产量',
        xData: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        yData: [340, 209, 160, 225, 279, 300],
        other: {
          legend: {
            data: [
              {
                name: '产量',
                itemStyle: {
                  color: LinearColor,
                },
              }
            ]
          },
          yAxisName: '单位：万吨',
          yAxisLine: {
            show: false,
          },
          color: [LinearColor],
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.production-analysis {
  width: 100%;
  height: 100%;
}
</style>
