<template>
  <div class="energy-consume-analysis">
    <div class="left">
      <pie-complex-chart ref="left" />
    </div>
    <div class="right">
      <bar-chart ref="barChart" />
    </div>
  </div>
</template>

<script>
import PieComplexChart from './Charts/PieComplexChart';
import BarChart from './Charts/BarChart.vue';

export default {
  components: {
    PieComplexChart,
    BarChart,
  },
  props: {
  },
  data() {
    return {
    }
  },
  beforeDestroy() {
  },
  methods: {
    /**
     * percent: number
     * data: {
     * xData: [],
     * yData: [],
     * }
     *
     */
    initChart(data = {}) {
      const { percent = 0, data: { xData = [], yData = [] } } = data;
      // console.log('水泥综合能耗', data)
      this.$refs.left.initChart({
        value: percent,
        title: '水泥综合能耗',
      });
      this.$refs.barChart.initChart({
        name: '水泥消电耗',
        // xData: ['1#号', '2#号', '3#号', '4#号'],
        // yData: [10, 20, 35, 25],
        xData,
        yData,
        other: {
          grid: {
            top: 60,
          },
          title: '水泥消电耗（kwh/t）',
          show: true, // 是否展示 默认为true,
          yAxisLine: {
            show: true,
          },
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#00FFF6'
              }, {
                offset: 1, color: '#1046F6'
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
.energy-consume-analysis {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    width: 35%;
    height: 100%;
  }

  .right {
    width: 65%;
    height: 100%;
  }
}
</style>
