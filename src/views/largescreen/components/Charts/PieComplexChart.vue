<template>
  <div :class="`pie-complex-chart ${className}`" />
</template>

<script>
import * as echarts from "echarts";
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
      title: '',
    };
  },
  mounted() {
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(data = {}) {
      if (!this.chart) {
        this.chart = echarts.init(this.$el);
      }
      // 百分比 number
      const value = data?.value || 0;

      this.title = data?.title || '';

      // 标题
      const title = this.title?.length > 4 ? this.title.slice(0, 4) + '\n' + this.title.slice(4) : this.title;

      let lastIcon = {}
      if (value && value !== 100) {
        lastIcon = {
          value: 0,
          label: {
            distance: 0,
            position: 'inner',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderRadius: 4,
            padding: 3,
            borderWidth: 4,
            borderColor: 'rgba(255, 255, 255, 0.4)'
          }
        }
      }

      const option = {
        title: [
          {
            text: value.toString() + '%',
            x: 'center',
            top: title ? '32%' : '45%',
            textStyle: {
              color: '#00C4FF',
              fontSize: 18,
              lineHeight: 24,
            },
          },
          {
            text: title,
            x: 'center',
            top: '45%',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 16,
              lineHeight: 22,
            },
          }
        ],
        tooltip: {
          show: false,
        },
        angleAxis: {
          max: 100,
          // 隐藏刻度线
          show: false,
          startAngle: 90
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
        },
        polar: {
          center: ['50%', '50%'], //中心点位置
          radius: '165%', //图形大小
        },
        tooltip: {
          show: false,
        },
        series: [
          {
            type: 'bar',
            name: '外圈',
            data: [100],
            showBackground: false,
            roundCap: false,
            coordinateSystem: 'polar',
            silent: true,
            barWidth: 2,
            color: '#41B8D3',
            z: 1,
          },
          {
            type: 'pie',
            radius: ['58%', '70%'],
            hoverAnimation: false,
            startAngle: 90,
            endAngle: 0,
            z: 2,
            silent: true,
            data: [
              {
                name: '',
                value: value,
                animationDuration: 1000,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#1046F6'
                      }, {
                        offset: 1, color: '#00FFF6'
                      }],
                      global: false
                    }
                  }
                },
              },
              // 画中间的图标
              // lastIcon,
              // 透明填充
              {
                name: '',
                value: 100 - value,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: 'rgba(255,255,255,0)',
                },
              },
            ],

          },
        ]
      }
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.pie-complex-chart {
  width: 100%;
  height: 100%;
}
</style>
