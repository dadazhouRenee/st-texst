<!--
 * @Author: 周冰洁
-->
<template>
  <div :class="`map-chart ${className}`" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
import ChinGeo from './China.json';
import { ceil, max } from 'lodash';

const MapName = 'China';

// 随机函数
function randomValue() {
  return Math.round(Math.random() * 1000);
}
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
      regionAreas: [],
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
    initChart(data) {
      console.log('initChart ---map', data)
      if (!this.chart) {
        this.chart = echarts.init(this.$el);
      }
      if (!echarts.getMap(MapName)) {
        echarts.registerMap(MapName, ChinGeo)
      }
      this.chartData = Object.assign({
        mapData: [],
      }, data)
      this.drawChart(this.chartData);
    },
    drawChart(data) {
      const { mapData, } = data;

      const mapName = MapName;

      const maxV = max(mapData.map(item => item.value))
      const _mapData = mapData.map(item => {
        if (item.name.indexOf('省公司') !== -1 && item.name.indexOf('川藏') === -1) {
          return {
            ...item,
            name: item.name.replace('省公司', ''),
          }
        }
        if (item.name === '浙江大区') {
          return {
            ...item,
            name: '浙江',
          }
        }
        return item
      });
      console.log('_mapData', _mapData)
      const option = {
        visualMap: {
          min: 0,
          max: ceil(maxV, -1),
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],//取值范围的文字
          inRange: {
            color: ['#1046F6', '#00FFF6']//取值范围的颜色
            // color: ['#e0ff00', '#006e00']//取值范围的颜色
          },
          show: true, //图注
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        geo: {
          map: mapName,
          roam: false,//不开启缩放和平移
          zoom: 1.23,//视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: 10,
              color: '#fff'
            },
            emphasis: {
              fontSize: 14,
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#0f356a',
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329',//鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        tooltip: {
          formatter: function (params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + '：' + (params.value || 0)
          }//数据格式化
        },
        series: [
          {
            name: '安全水位色',
            type: 'map',
            geoIndex: 0,
            data: _mapData,
          }
        ]
      }
      this.chart.setOption(option);

      // this.chart.on('click', (target) => { // 鼠标点击
      //   if (target.componentType === 'geo') {
      //     this.chart.dispatchAction({
      //       type: 'geoSelect',
      //       name: target.name,
      //     });
      //     // 联动右侧公司名称
      //     const targetArea = this.regionAreas.filter(item => item.name === target.name);
      //     console.log('鼠标点击地区-target', targetArea);
      //     const emitData = targetArea?.length ? {
      //       ...targetArea[0],
      //     } : void 0;
      //     this.$emit('regionChange', emitData)
      //   }
      // })
    },
  },
};
</script>
<style lang="scss">
.scatter-tooltip-wrap {
  min-width: 200px;
  max-width: 280px;
  word-wrap: break-word;
  white-space: normal !important;
  background: var(--title-bg-color);
  border: 2px solid var(--title-border-color);
  color: var(--primary-color);
  border-radius: 0;

  .name {
    font-size: 16px;
    line-height: 22px;
    padding: 6px 10px;
    margin: 0;
  }

  .detail-info {
    background: var(--content-bg-color);
    border-top: 1px solid var(--content-border-color);
    padding: 0 10px;

    .detail-info-item {
      line-height: 20px;
      font-size: 14px;
      margin: 5px 0;
      background: rgba(41, 182, 208, 0.2);
      padding: 2px 10px;
    }
  }
}
</style>
<style lang="scss" scoped>
.map-chart {
  width: 100%;
  height: 100%;
}
</style>
