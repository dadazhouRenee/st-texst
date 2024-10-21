<!--
 * @Author: 周冰洁
-->
<template>
  <div :class="`pie-chart ${className}`" />
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
    /* 数据格式 data = { seriesData: [], other: {} } other可以不传 */
    /*
      seriesData: [{ value: 100, name: 'xxxx'}, ....]
      other: {
        legend: {
          show: true,
        },
        color: ['#EF752D', '#FF414A', '#19AEF1', '#2FDADE', '#7006D9']
      }
    */
    initChart(data = {}) {
      // console.log('initChart----', data)
      if (!this.chart) {
        this.chart = echarts.init(this.$el);
      }
      this.chartData = objectMerge({
        seriesData: [],
        other: {
          titlePosition: ['25%'],
          legend: {
            show: true,
          },
          radius: ['50%', '75%'],
          center: ['25%', '50%'],
          color: ['#EF752D', '#FF414A', '#19AEF1', '#2FDADE', '#7006D9'],
        }
      }, data);

      this.drawChart();
    },
    drawChart() {
      const data = this.chartData;
      const seriesData = data.seriesData.map((item, index) => {
        return {
          ...item,
          itemStyle: {
            color: data.other.color[index],
          }
        }
      });
      const total = data.total || data.seriesData?.reduce((prv, item) => prv + item.value, 0);
      const leftPiont = parseFloat(data.other.center[0]) || 50;
      const rightPoint = parseFloat(data.other.center[1]) || 50;

      const titlePosition = leftPiont - 2 + '%';

      const option = {
        title: [
          {
            text: total,
            top: '38%',
            left: titlePosition,
            textAlign: 'center',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 20,
              lineHeight: 25,
            },
          },
          {
            text: '总数',
            top: '55%',
            left: titlePosition,
            textAlign: 'center',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 13,
            },
          }
        ],
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: function (val) {
            return val.name
          }
        },
        color: data.other.color,
        legend: {
          ...(data.other?.legend || {}),
          orient: 'vertical',
          left: rightPoint + '%',
          top: 'middle',
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 20,
          icon: 'rect',
          formatter: function (name) {	// 添加
            let total = 0
            let target
            let richName = 'a';

            for (let i = 0; i < seriesData.length; i++) {
              total += seriesData[i].value
              if (seriesData[i].name === name) {
                target = seriesData[i].value
                richName = 'a' + i;
              }
            }
            const percent = ((target / total) * 100).toFixed(2);
            var arr = [
              `{${richName}|` + name + '}',
              '{b|' + `${isNaN(percent) ? 0 : percent}` + '%}',
              '{c|' + `${target}台` + '}'
            ]
            // console.log('arr', arr.join('  '));
            return arr.join('  ')
          },
          textStyle: {
            fontSize: 14,
            color: '#fff',
            fontWeight: 400,
            // padding: [8, 0, 0, 0],
            rich: {
              a: {
                fontSize: 14,
                lineHeight: 18,
                padding: [0, 0, 0, 5],
                width: 45,
              },
              a0: {
                fontSize: 14,
                lineHeight: 18,
                padding: [0, 0, 0, 5],
                width: 45,
                color: data.other.color[0],
              },
              a1: {
                fontSize: 14,
                lineHeight: 18,
                padding: [0, 0, 0, 5],
                width: 45,
                color: data.other.color[1],
              },
              a2: {
                fontSize: 14,
                lineHeight: 18,
                padding: [0, 0, 0, 5],
                width: 45,
                color: data.other.color[2],
              },
              a3: {
                fontSize: 14,
                lineHeight: 18,
                padding: [0, 0, 0, 5],
                width: 45,
                color: data.other.color[3],
              },
              a4: {
                fontSize: 14,
                lineHeight: 18,
                padding: [0, 0, 0, 5],
                width: 45,
                color: data.other.color[4],
              },
              b: {
                fontSize: 14,
                lineHeight: 18,
                width: 50,
                color: '#c1c1c1',
              },
              c: {
                fontSize: 18,
                lineHeight: 18,
                color: '#fff',
              }
            },
          },
        },
        series: [
          {
            name: '',
            type: 'pie',
            data: seriesData,
            radius: data.other.radius,
            center: data.other.center,
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
          }
        ]
      }
      this.chart.setOption(option)
    }
  },
};
</script>
<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
