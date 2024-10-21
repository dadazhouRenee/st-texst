<!--
 * @Author: 周冰洁
-->
<template>
  <div class="large-screen-wrap" :data-theme="theme">
    <scale-box isRadioX>
      <div class="container">
        <div class="navBar flex">
          <div class="mh-left">
            <span class="system-icon"></span>
            <span class="system-name">智慧管理平台</span>
          </div>
          <div class="mh-right flex">
            <p class="employee-num">
              在岗人员：
              <span>{{ dutyPeople }}</span>
            </p>
            <!-- <span class="mode-toggle-btn" @click="toggleMode">
              <i class="el-icon-sort"></i>
              {{ isMonitorMode ? '管理' : '监控' }}模式
            </span> -->
            <screenfull></screenfull>
          </div>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="l-top">
              <col-container title="水泥数据监测">
                <left-top :data="data1" />
              </col-container>
            </div>
            <div class="base-col base-left">
              <col-container title="能耗分析">
                <energy-consume-analysis ref="chart1" />
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="设备状态">
                <device-status ref="chart2" />
              </col-container>
            </div>
            <div class="base-col base-left">
              <col-container title="生产计划">
                <production-plan ref="chart3" />
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="质量信息">
                <quality-info ref="chart4" />
              </col-container>
            </div>
            <div class="base-col base-left">
              <col-container title="生产分析">
                <production-analysis ref="chart5" />
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="销量分析">
                <production-price ref="chart6" />
              </col-container>
            </div>
          </div>
          <div class="content-right">
            <div class="r-full">
              <col-container title="数据概况">
                <overivew ref="overivew" />
              </col-container>
            </div>
          </div>
        </div>
      </div>
    </scale-box>
  </div>
</template>

<script>
const MockMapData = [
  {
    customerName: '和平区铁厦商混有限公司',
    // value: [123.389006, 41.746003],
    longitude: '123.389006',
    latitude: '41.746003',
    ordinalArea: 210102,
    id: 1,
    ordinal: 1,
    siteType: "1", //站点类型1：商混站信息  2：建材商店信息
    address: '和平区xxx路',
    unitModel: "180*3",
    shippingDistance: 46,
  },
  {
    customerName: '新民市商品混凝土有限公司1',
    longitude: '122.529868',
    latitude: '41.976508',
    address: '新民市振兴八街',
    ordinalArea: 210181,
    id: 2,
    ordinal: 2,
    siteType: "1", //站点类型1：商混站信息  2：建材商店信息
    unitModel: "180*3",
    shippingDistance: 46,
  },
  {
    customerName: '和平区铁厦建材商店1',
    // value: [123.389006, 41.746003],
    longitude: '123.389006',
    latitude: '41.746003',
    ordinalArea: 210102,
    id: 3,
    ordinal: 1,
    siteType: "2", //站点类型1：商混站信息  2：建材商店信息
    address: '和平区xxx路',
    unitModel: "180*3",
    shippingDistance: 46,
  },
  {
    customerName: '新民铁厦建材商店2',
    longitude: '122.529868',
    latitude: '41.976508',
    address: '新民市振兴八街',
    ordinalArea: 210181,
    id: 4,
    ordinal: 2,
    siteType: "2", //站点类型1：商混站信息  2：建材商店信息
    unitModel: "180*3",
    shippingDistance: 46,
  },
]
import { mapState, mapActions } from 'vuex';
import screenfull from "screenfull";
import ScaleBox from "@/components/ScaleBox";
import Screenfull from "@/components/Screenfull";
import ColContainer from './components/ColContainer';
import LeftTop from './components/LeftTop';
import EnergyConsumeAnalysis from './components/EnergyConsumeAnalysis';
import DeviceStatus from './components/DeviceStatus';
import ProductionPlan from './components/ProductionPlan';
import QualityInfo from './components/QualityInfo';
import ProductionPrice from './components/ProductionPrice';
import ProductionAnalysis from './components/ProductionAnalysis.vue';
import Overivew from './components/Overivew';
import testData from './data';

export default {
  components: {
    ScaleBox,
    Screenfull,
    ColContainer,
    LeftTop,
    EnergyConsumeAnalysis,
    DeviceStatus,
    ProductionPlan,
    QualityInfo,
    ProductionPrice,
    ProductionAnalysis,
    Overivew,
  },
  computed: {
    ...mapState({
      dataScene: state => state.settings.largeScreenScene,
    }),
  },
  data() {
    return {
      isFullscreen: false, // 是否全屏
      theme: 'dark', // 主题
      monitorLayout: [
        {
          name: '视屏监控1',
          wrapClassName: 'r-top',
        },
        {
          name: '视屏监控2',
          wrapClassName: 'base-col base-left',
        },
        {
          name: '视屏监控3',
          wrapClassName: 'base-col',
        },
        {
          name: '视屏监控4',
          wrapClassName: 'base-col base-left',
        },
        {
          name: '视屏监控5',
          wrapClassName: 'base-col',
        },
      ],
      monitorUrlList: [],// 视频监控数据
      dutyPeople: 55, // 在岗人数
      data1: {}, // 水泥数据监测
      mapData: [], // 地图数据
      testData,
    }
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.handleScreenChange);
    }
    // if (!this.isFullscreen) {
    //   this.toggleFullScreen();
    // }

    // TO DO...
    setTimeout(() => {
      // this.initData(testData.data);
    })
  },
  beforeDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off("change", this.handleScreenChange);
    }
  },
  methods: {
    ...mapActions('settings', []),
    toggleFullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({ message: "你的浏览器不支持全屏", type: "warning" });
        return false;
      }
      screenfull.toggle();
    },
    handleScreenChange() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    initData(data) {
      const {
        cementMonitoringData = {}, // 水泥数据监测
        // 能耗分析
        energyConsumptionAnalysis: {
          cementEnergyConsumption,
          cementPowerConsumptionList = [],
        },
        // 设备状态
        equipmentStatus = {},
        // 生产计划
        productionPlan = {},
      } = data;
      this.data1 = cementMonitoringData;
      this.$nextTick(() => {
        console.log('this.$refs', this.$refs, this.$refs.chart1);
        this.$refs.chart1.initChart({
          percent: cementEnergyConsumption * 100,
          data: {
            xData: cementPowerConsumptionList.map(item => item.powerConsumption),
            yData: cementPowerConsumptionList.map(item => item.number),
          }
        });
        this.$refs.chart2.initChart(equipmentStatus);
        this.$refs.chart3.initChart(productionPlan);
        this.mapData = MockMapData.map(item => ({
          ...item,
          name: item.customerName,
          value: [item.longitude, item.latitude],
        })) || [];
        this.$refs.overivew.initChart(this.mapData);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
$navHeight: 85px;
$white: #fff;
$base-font-size: 15px;
$middle-font-size: 18px;
$large-font-size: 20px;

.large-screen-wrap {
  --base-font-size: $base-font-size;
  --middle-font-size: $middle-font-size;
  --large-font-size: $large-font-size;
}

.large-screen-wrap[data-theme='dark'] {
  --primary-color: #00E5FF;
  --bg-color: #011E2E;
  // 模式切换按钮
  --toggle-mode-btn-border-color: #00E5FF;
  --toggle-mode-btn-bg-color: #08304A;
  // 标题色
  --title-bg-color: #08304A;
  --title-border-color: #1C487A;
  --title-border-size: 1px;
  // 内容
  --content-bg-color: rgba(1, 51, 102, 0.3);
  --content-border-color: rgba(0, 118, 180, 0.3);

  --progress-bg-color: #41B8D3;

  // 滚动条
  --scrollbar-bg-color: rgba(8, 48, 74, 0.5);
  --scrollbar-thumb-color: rgba(7, 47, 78, 1);

  // 背景图片
  background-image: url('./imgs/bg1.png');
}

.large-screen-wrap[data-theme='light'] {
  --primary-color: #00E5FF;
  --bg-color: #005C9E;
  // 模式切换按钮
  --toggle-mode-btn-border-color: #0079FF;
  --toggle-mode-btn-bg-color: #005BAD;
  // 标题色
  --title-bg-color: #015698;
  --title-border-color: #0079FF;
  --title-border-size: 2px;
  // 内容
  --content-bg-color: rgba(1, 51, 102, 0.3);
  --content-border-color: rgba(0, 118, 180, 1);

  --progress-bg-color: #41B8D3;

  // 滚动条
  --scrollbar-bg-color: rgba(8, 48, 74, 0.5);
  --scrollbar-thumb-color: rgb(3, 81, 149);

  // 背景图片
  background-image: url('./imgs/bg2.png');

}

.flex {
  display: flex;

  &.space-between {
    justify-content: space-between;
    align-items: center;
  }
}

.large-screen-wrap {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;

  .container {
    width: 100%;
    height: 100%;
    padding: 18px 10px;
    color: $white;
    // background-color: var(--bg-color);

    .navBar {
      width: 100%;
      height: $navHeight;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $base-font-size;
      line-height: 1.5;
      padding: 15px 0;
      padding-bottom: 30px;

      .mh-left {
        display: flex;
        align-items: center;

        .system-icon {
          display: inline-block;
          width: 128px;
          height: 36px;
          background: url("./imgs/system-icon.png") no-repeat center;
          background-size: cover;
          margin-right: 8px;
        }

        .system-name {
          margin-left: 10px;
          font-size: 30px;
        }
      }

      .mh-right {
        align-items: center;

        .employee-num {
          font-size: $middle-font-size;

          span {
            color: #E9C853;
            display: inline-block;
            vertical-align: middle;
          }
        }

        .mode-toggle-btn {
          margin-left: 12px;
          color: var(--primary-color);
          width: 110px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          font-size: $base-font-size;
          background: var(--toggle-mode-btn-bg-color);
          border: 1px solid var(--toggle-mode-btn-border-color);
          border-radius: 3px;

          i {
            transform: rotate(90deg);
            margin-right: 3px;
          }
        }
      }
    }

    .content {
      $gutter: 10px;
      $smallHeight: 180px;
      $baseHeight: 252px;
      width: 100%;
      height: calc(100% - #{$navHeight});
      display: flex;

      .content-left,
      .content-right {
        flex: 1;
        height: 100%;
      }

      .content-right {
        margin-left: 15px;
      }

      .base-left {
        margin-right: $gutter;
      }

      .l-top {
        width: 100%;
        height: $smallHeight;
        margin-bottom: $gutter;
      }

      .base-col {
        width: calc(50% - #{$gutter / 2});
        display: inline-block;
        height: $baseHeight;
        margin-bottom: $gutter;
      }

      .r-full {
        width: 100%;
        height: $smallHeight + ($baseHeight + $gutter) * 3;
      }

      .r-top {
        width: 100%;
        height: $smallHeight + $baseHeight + $gutter;
        margin-bottom: $gutter;
      }
    }
  }
}
</style>
