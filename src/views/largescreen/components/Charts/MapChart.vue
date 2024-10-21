<!--
 * @Author: 周冰洁
-->
<template>
  <div :class="`map-chart ${className}`" />
</template>

<script>
import * as echarts from "echarts";
import { cloneDeep } from 'lodash';
import resize from "./mixins/resize";
import ShengyangGeo from './shenyang.json';
import FushunGeo from './fushun.json';
import Tieling from './tieling.json';
// import XifengGeo from './xifeng.json';
// import ChangTuGeo from './changtu.json';
// import KaiyuanGeo from './kaiyuan.json';
import pointImgSrc from '../../imgs/map-location.png';

const _ProvinceMapName = 'Shengyang';
const _ComposeProvinceMapName = 'Shengyang_Compose'

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
      if (!this.chart) {
        this.chart = echarts.init(this.$el);
      }
      if (!echarts.getMap(_ProvinceMapName)) {
        const _MoreGeo = cloneDeep(ShengyangGeo);
        _MoreGeo.features = _MoreGeo.features.concat(
          FushunGeo.features,
          Tieling.features,
        );
        echarts.registerMap(_ProvinceMapName, ShengyangGeo);
        echarts.registerMap(_ComposeProvinceMapName, _MoreGeo);
        this.regionAreas = _MoreGeo.features.map(item => {
          return {
            name: item.properties.name,
            adCode: item.properties.adcode,
            parentadCode: item.properties.parent.adcode,
          }
        });
        // console.log('this.regionAreas', this.regionAreas);
      }
      this.chartData = Object.assign({
        isMixMap: false,
        mapData: [],
      }, data)
      this.drawChart(this.chartData);
    },
    drawChart(data) {
      const { isMixMap, mapData } = data;

      const mapName = isMixMap === true ? _ComposeProvinceMapName : _ProvinceMapName;

      // 站点类型  1：商混站信息  2：建材商店信息
      const realMapData = mapData.filter(item => {
        return item.siteType === (isMixMap ? '1' : '2');
      })

      const option = {
        // grid: {
        //   left: isMixMap ? '15%' : '15%',
        //   right: '20%',
        // },
        title: {
          show: false
        },
        legend: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
        },
        toolbox: {
          show: false,
          //orient: 'vertical',
          left: 'right',
          top: 'top',
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        geo: {
          show: true,
          map: mapName,
          // roam: true,
          // scaleLimit: {
          //   min: 0.5,
          //   max: 2,
          // },
          left: isMixMap ? '12%' : '15%',
          right: '25%',
          layoutCenter: ['70%', '55%'],
          aspectScale: isMixMap ? 0.7 : 0.85,
          zoom: isMixMap ? 0.95 : 0.7,
          // !!!这个必须要设置（否则地图不能接受dispatch的geoSelect事件用代码触发选中高亮某个省份）
          selectedMode: "single", // single | multiple
          emphasis: {
            disabled: true, // 是否关闭高亮状态。
            emphasis: {
              show: true,
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          label: {
            normal: {
              color: 'rgba(255, 255, 255, 0.5)',
              formatter: (params) => {
                // console.log('params', params);
                return params.name
              },
              position: 'center',
              show: true
            },
          },
          itemStyle: {
            normal: {
              // color: 'rgba(29, 114, 174, 0.2)',
              areaColor: 'rgba(1, 51, 102, 1)',
              opacity: 0.4,
              borderColor: '#0B77CE',
              borderType: 'dotted',
              borderWidth: 2,
              shadowColor: 'rgba(255, 255, 255, 0.1)',
              shadowBlur: 1,
            },
            select: {
              areaColor: 'rgba(13, 132, 235, 1)',
              opacity: 0.8,
              borderWidth: 0,
              shadowColor: 'rgba(255, 255, 255, 0.2)',
              shadowBlur: 3,
              shadowOffsetX: -1,
              shadowOffsetY: -1,
            },
          },
          select: {
            label: {
              show: true,
              color: 'rgba(255, 255, 255, 0.9)',
            },
            itemStyle: {
              areaColor: 'rgba(13, 132, 235, 1)',
              opacity: 0.8,
              borderWidth: 0,
              shadowColor: 'rgba(255, 255, 255, 0.2)',
              shadowBlur: 3,
              shadowOffsetX: -1,
              shadowOffsetY: -1,
            }
          },
        },
        series: [
          // {
          //   type: 'map',
          //   map: mapName,
          //   // 默认情况下，map series 会自己生成内部专用的 geo 组件。用 geoIndex 指定一个 geo 组件，
          //   // 这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。
          //   // 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，
          //   // 而是采用 geo 中的相应属性。
          //   geoIndex: 0,
          //   data: []
          // },
          {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'image://' + pointImgSrc,
            symbolSize: [19, 20],
            data: realMapData,
            // data: convertData(data),
            tooltip: {
              padding: 0,
              borderWidth: 0,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              extraCssText: 'border: none; border-radius: 0;box-shadow: none;',
              formatter: (params) => {
                // console.log('params', params)
                // const detailHtml = isMixMap ?
                //   `<div class="detail-info">
                //     <div class="detail-info-item">
                //       地址：${params.data.address}
                //     </div>
                //     <div class="detail-info-item">
                //       商混站机组号：${params.data.unitModel}
                //     </div>
                //     <div class="detail-info-item">
                //       运距：${params.data.shippingDistance}
                //     </div>
                //   </div>` : '<div></div>';
                return `
                  <div class="scatter-tooltip-wrap">
                    <p class="name">${params.data.ordinal}、${params.name}</p>
                  </div>
                `
              }
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              }
            },
            itemStyle: {
              // normal: {
              //   color: '#05C3F9',
              //   shadowBlur: 10,
              //   shadowColor: '#05C3F9'
              // },
              // emphasis: {
              //   areaColor: '#1DE9B6',
              //   borderColor: '#fff',
              //   borderWidth: 1
              // }
            }
          }
        ],
      };
      this.chart.setOption(option);

      this.chart.on('click', (target) => { // 鼠标点击
        if (target.componentType === 'geo') {
          this.chart.dispatchAction({
            type: 'geoSelect',
            name: target.name,
          });
          // 联动右侧公司名称
          const targetArea = this.regionAreas.filter(item => item.name === target.name);
          console.log('鼠标点击地区-target', targetArea);
          const emitData = targetArea?.length ? {
            ...targetArea[0],
          } : void 0;
          this.$emit('regionChange', emitData)
        }
      })
    },
    toggleMap(isMixMap) {
      if (this.chart && this.chartData) {
        this.chart.clear();
        this.chartData.isMixMap = isMixMap;
        this.drawChart(this.chartData);
        // 清空右侧公司列表
        this.$emit('regionChange', null);
      }
    }
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
