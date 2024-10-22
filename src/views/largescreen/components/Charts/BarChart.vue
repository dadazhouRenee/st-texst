<!--
 * @Author: 周冰洁
-->
<template>
  <div :class="`bar-chart ${className}`" />
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
        xData: [],
        yData: [],
        other: {
          show: true,
          color: ['#03DEF6'],
          rotate: 0
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
          left: 30,
          top: 20,
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
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '25%',
          // left: Math.max(...data.yData).toString().length * 10,
          // bottom: data?.other?.rotate > 0 ? 40 : 30,
          bottom: 40,
          right: 10,
          ...(data.other?.grid || {}),
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: 12,
              lineHeight: 14,
              color: '#fff'
            },
            rotate: data.other.rotate,
            formatter: function (value) {
              // const middle = Math.floor(value.length / 2)
              if (value.length > 3) {
                value = value.replace(/(.{4})/g, '$1\n')
                return value
              } else {
                return value
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#EEEBE9'
            }
          },
          axisTick: {
            show: false,
          },
          data: data.xData
        },
        yAxis: {
          name: data?.other?.yAxisName || '',
          nameTextStyle: {
            color: '#fff',
            fontSize: 12,
          },
          type: 'value',
          // min: parseInt(Math.min(...data.yData) * 0.999 / 1000) * 1000,
          min: 0,
          // splitNumber: 5,
          splitLine: {
            show: true,
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
        series: [
          {
            name: data?.name || '',
            data: data.yData,
            type: 'bar',
            barMaxWidth: 25,
            // barMinHeight: 3,
            animationDuration: function (idx) {
              // 越往后的数据时长越大
              return 1000 + idx * 50;
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (data.other.color.length > 1) {
                    return data.other.color[params.dataIndex]
                  } else {
                    return data.other.color[0]
                  }
                }
              }
            }
          }]
      }
      this.chart.setOption(option)
    }
  },
};
</script>
<style lang="scss" scoped>
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>
