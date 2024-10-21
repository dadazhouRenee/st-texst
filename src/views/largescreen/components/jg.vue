<!--
 * @Author: 周冰洁
-->
<template>
  <div class="chart-wrap">
    <double-bar-chart ref="doubleBarChart" />
  </div>
</template>

<script>
import DoubleChart from './Charts/DoubleChart.vue';
export default {
  name: 'wg',
  components: {
    'double-bar-chart': DoubleChart,
  },
  data() {
    return {
    }
  },
  beforeDestroy() {
  },
  methods: {
    /**
     * data: {
     * series: [],
     * yData: [],
     * }
     *
     */
    initChart(data = {}) {
      const { data: { series = [], yData = [] } } = data;
      console.log('监管', data)
      this.$refs.doubleBarChart.initChart({
          name: '监管',
          series,
          yData,
          other: {
            grid: {
              top: 20,
            },
            title: '',
            legend: {
              show: true,
              top: 'top',
              left: 'right',
              itemWidth: 20,
              itemHeight: 14,
            },
            show: false, // 是否展示 默认为true,
            yAxisName: '数量',
            yAxisLine: {
              show: true,
            },
            xsplitLine: {
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
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#1046F6'
                }, {
                  offset: 1, color: '#00FFF6'
                }],
                global: false
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#34a476'
                }, {
                  offset: 1, color: '#6acca3'
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
