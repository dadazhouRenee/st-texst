<template>
  <div class="large-screen-wrap" :data-theme="theme">
    <scale-box isRadioX>
      <div class="container">
        <div class="navBar flex">
          <div class="mh-left">
            <span class="system-icon"></span>
          </div>
          <span class="system-name" @click="toConfig">智慧管理平台</span>
          <div class="mh-right">
            <span class="time">{{ time }}</span>
            <screenfull></screenfull>
          </div>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="base-col">
              <col-container title="省区排名">
                <Rank :listData="rank1"></Rank>
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="中心排名">
                <Rank :listData="rank2"></Rank>
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="隐患详情">
                <yh :data="yh"></yh>
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="培训情况">
                <px :data="px"></px>
              </col-container>
            </div>
          </div>
          <div class="content-middle">
            <div class="top-col">
              <col-container title="STO 指标监控">
                <zb :data="zb"></zb>
              </col-container>
            </div>
            <div class="bottom-col">
              <china-dt ref="chart3" />
            </div>
          </div>
          <div class="content-right">
            <div class="base-col">
              <col-container title="监管情况">
                <jg ref="chart2" />
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="违规详情">
                <wg ref="chart1" />
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="信息系统">
                <xxxt :data="xxxt"></xxxt>
              </col-container>
            </div>
            <div class="base-col">
              <col-container title="舆情监控">
                <yq :data="yq"></yq>
              </col-container>
            </div>
          </div>
        </div>
      </div>
    </scale-box>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatDate } from "@/utils";
import screenfull from "screenfull";
import ScaleBox from "@/components/ScaleBox";
import ScreenfullCom from "@/components/Screenfull";
import ColContainer from './components/ColContainer';
import Rank from './components/Rank.vue';
import yh from './components/yh.vue';
import px from './components/px.vue';
import yq from './components/yq.vue';
import zb from './components/zb.vue';
import xxxt from './components/xxxt.vue';
import wg from './components/wg.vue';
import jg from './components/jg.vue';
import dt from './components/dt.vue';
import testData from './data2';

export default {
  components: {
    ScaleBox,
    'screenfull': ScreenfullCom,
    ColContainer,
    Rank,
    yh,
    px,
    yq,
    xxxt,
    zb,
    wg,
    jg,
    "china-dt": dt,
  },
  computed: {
    ...mapState({
      dataScene: state => state.settings.largeScreenScene,
    }),
  },
  data() {
    return {
      theme: 'dark', // 主题
      time: formatDate(null, true),
      timer: null, // 日期定时器
      pollingInitData: null, // 大屏接口定时器
      rank1: [],
      rank2: [],
      yh: {},
      px: {},
      yq: {},
      xxxt: {},
      zb: {},
      wg: [],
      jg: [],
    }
  },
  mounted() {
    // TO DO...
    // this.startLoop();
    setTimeout(() => {
      this.initData(testData);
    }, 100)
  },
  beforeDestroy() {
    this.stopLoop();
  },
  methods: {
    initData(data) {
      const { rank1 = [], rank2 = [], yh = {}, px = {}, yq = {}, xxxt = {}, zb = {}, wg = [], jg = [] } = (data || {});
      console.log('initData====', data)
      this.rank1 = rank1;
      this.rank2 = rank2;
      this.yh = yh;
      this.px = px;
      this.yq = yq;
      this.xxxt = xxxt;
      this.zb = zb;
      this.$nextTick(() => {
        this.$refs.chart1.initChart({
          data: {
            xData: wg.map(item => item.name),
            yData: wg.map(item => item.value),
          }
        });
        this.$refs.chart2.initChart({
          data: {
            series: [
              {
                name: '中心',
                data: jg.map(item => item.zx),
              },
              {
                name: '网点',
                data: jg.map(item => item.wd),
              },
            ],
            yData: jg.map(item => item.name),
          }
        });
        console.log('this.$refs.chart3', this.$refs.chart3.initChart)
        this.$refs.chart3.initChart({
          data: {
            mapData: [],
          }
        });
      })
      // this.$nextTick(() => {
      //   console.log('chart1', this.$refs.chart1)
      //   this.$refs.chart1.initChart({
      //     data: {
      //       xData: wg.map(item => item.name),
      //       yData: wg.map(item => item.value),
      //     }
      //   });
      // });
    },
    // restData() {
    //   this.rank1 = [];
    //   this.rank2 = [];
    //   this.yh = {};
    //   this.px = {};
    //   this.yq = {};
    //   this.xxxt = {};
    // },
    startLoop() {
      this.timer = setInterval(() => {
        this.time = formatDate(null, true);
      }, 1000);
      // 大屏接口定时器
      this.pollingInitData = setInterval(() => {
        this.initData(testData);
      }, 2000);
    },
    stopLoop() {
      if (this.timer) clearInterval(this.timer);
      if (this.pollingInitData) clearInterval(this.pollingInitData);
    },
    toConfig() {
      this.$router.push('/config')
    }

  }
}
</script>

<style lang="scss" scoped>
$navHeight: 60px;
$white: #fff;
$base-font-size: 14px;
$middle-font-size: 16px;
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
  // background-image: url('./imgs/bg1.png');
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
  // background-image: url('./imgs/bg2.png');

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
  background-color: #101129;
  ;

  .container {
    width: 100%;
    height: 100%;
    padding: 18px 20px;
    padding-top: 5px;
    color: $white;

    .navBar {
      width: 100%;
      height: $navHeight;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $base-font-size;
      line-height: 1.5;

      .mh-left {
        display: flex;
        align-items: center;

        .system-icon {
          display: inline-block;
          width: 128px;
          height: 32px;
          background: url("./imgs/system-icon.png") no-repeat center;
          background-size: cover;
          margin-right: 8px;
        }

      }

      .system-name {
        margin: 0 10px;
        font-size: 26px;
        text-align: center;
        flex: 1;
        color: var(--primary-color);
      }

      .mh-right {
        display: flex;
        align-items: center;

        .time {
          color: var(--primary-color);
          margin-right: 20px;
        }

        .svg-icon {
          font-size: 22px;
          cursor: pointer;
        }
      }
    }

    .content {
      $gutter: 10px;
      $baseHeight: 252px;
      width: 100%;
      height: calc(100% - #{$navHeight});
      display: flex;

      .base-col {
        flex: 1;
        margin-bottom: 24px;
        height: 100%;
      }

      >div {
        height: 100%;
        display: flex;
        flex-direction: column;

        .base-col:last-child {
          margin-bottom: 0;
        }

      }

      .content-left,
      .content-right {
        width: 30%;
        .base-col {
          &:nth-child(1), &:nth-child(2) {
            flex: 1.5;
          }
        }
      }

      .content-middle {
        flex: 1;

        .top-col {
          margin-bottom: 15px;
          flex: 1;
        }

        .bottom-col {
          flex: 4;
        }
      }

      .content-middle,
      .content-right {
        margin-left: 20px;
      }



    }
  }
}
</style>
