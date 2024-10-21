<!--
 * @Author: 周冰洁
-->
<template>
  <div class="chart-wrap">
    <bar-chart ref="barChart" />
  </div>
</template>

<script>
import BarChart from './Charts/BarChart.vue';
export default {
  name: 'wg',
  components: {
    BarChart,
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
      const { data: { xData = [], yData = [] } } = data;
      console.log('违规', data)
      this.$refs.barChart.initChart({
          name: '违规',
          // xData: ['1#号', '2#号', '3#号', '4#号'],
          // yData: [10, 20, 35, 25],
          xData,
          yData,
          other: {
            grid: {
              top: 10,
            },
            title: '',
            show: false, // 是否展示 默认为true,
            yAxisName: '数量',
            yAxisLine: {
              show: true,
            },
            ysplitLine: {
              show: true,
              lineStyle: {
                color: '#0C2B57',
                // color: '#EEEBE9',
                type: 'dashed'
              }
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
.chart-wrap {
  width: 100%;
  height: calc(100% - 12px);
}
</style>
