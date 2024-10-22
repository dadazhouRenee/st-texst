<!--
 * @Author: 周冰洁
-->
<template>
  <div :class="`double-bar-chart ${className}`" />
</template>

<script>
import * as echarts from "echarts";
import { objectMerge } from '@/utils';
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    /* 数据格式 data = { xData: [], yData: [], other: {} } other可以不传 */
    /* other: {
      title: '条', 默认展示 条
      show: true, // 是否展示 默认为true,
      color: ['#3B95FFFF', '#3B95FFFF'] // 颜色（数组为多组颜色）
      legend: Boolean | Object, // 图例
      yAxisName: '', // y轴名称
      yAxisLine: { // y轴坐标轴
        show: false,
      },
    } */
    initChart(data = {}) {
      if (!this.chart) {
        this.chart = echarts.init(this.$el);
      }
      this.chartData = objectMerge({
        series: [],
        yData: [],
        other: {
          show: true,
          color: ['#03DEF6'],
        }
      }, data)
      this.drawChart();
    },
    drawChart() {
      const data = this.chartData;
      const option = {
        title: {
          show: !!data?.other?.title,
          text: `${data?.other?.title}`,
          textStyle: {
            color: '#ffffff',
            fontSize: 17,
            fontWeight: 400
          },
          // left: 30,
          // top: 20,
        },
        legend: {
          show: !!data?.other?.legend,
          selectedMode: false,
          top: '5%',
          right: 20,
          itemWidth: 13,
          itemHeight: 13,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            padding: [0, 0, 0, 5],
          },
          ...(data?.other?.legend || {})
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          // top: '25%',
          // // left: Math.max(...data.yData).toString().length * 10,
          // bottom: data?.other?.rotate > 0 ? 60 : 30,
          // right: 10,

          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          ...(data.other?.grid || {}),
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01],
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#EEEBE9',
              type: 'solid'
            },
            ...(data?.other?.xsplitLine || {}),
          },
          axisLine: {
            lineStyle: {
              color: '#EEEBE9'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
                color: '#0C2B57',
              }
          },
        },
        yAxis: {
          type: 'category',
          data: data.yData,
          nameTextStyle: {
            color: '#fff',
            fontSize: 12,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#EEEBE9',
              type: 'solid'
            },
            ...(data?.other?.ysplitLine || {}),
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            ...(data?.other?.yAxisLine || {}),
            lineStyle: {
              color: '#fff'
            }
          }
        },
        color: data?.other?.color,
        series: data?.series?.map(item => {
          return {
            name: item.name,
            data: item.data,
            type: 'bar',
            label: {
              show: true,
              distance: 5,
              position: 'insideRight', // 在柱子的顶部显示数字
              fontWeight: 'bold',
              // fontSize: 14,
              color: '#fff',
              formatter: (item) => {
                return item.value || ''
              }
            },
            barMaxWidth: 25,
            // barMinHeight: 3,
            animationDuration: function (idx) {
              // 越往后的数据时长越大
              return 1000 + idx * 50;
            },
          }
        }) || [],
      }
      this.chart.setOption(option)
    }
  },
};
</script>
<style lang="scss" scoped>
.double-bar-chart {
  width: 100%;
  height: 100%;
}
</style>
