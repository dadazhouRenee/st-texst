<!--
 * @Author: 周冰洁
-->
<template>
  <div ref="scrollWrap" class="scroll-table-wrap">
    <div v-if="!hideHeader" class="scroll-table-header">
      <slot name="table"></slot>
    </div>
    <vueSeamlessScroll ref="seamlessScroll" :data="data" :class-option="classOption" class="auto-scroll-table"
      :style="{ height: `calc(100% - ${footerHeight}px - ${thHeight}px)` }">
      <div :class="{ 'scroll-table-body': true, 'hide-footer': data.length >= classOption.limitMoveNum, }">
        <slot name="table"></slot>
        <!-- <div v-show="data.length >= classOption.limitMoveNum" class="split-line" :style="{ lineHeight: `${tdHeight}px` }">
          ----- END -----</div> -->
      </div>
    </vueSeamlessScroll>
    <!-- <div v-show="data.length >= classOption.limitMoveNum" class="bottom-shadow" :style="{ bottom: footerHeight + 'px' }">
    </div> -->
    <div class="scroll-table-footer" v-if="data.length >= classOption.limitMoveNum">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "ScrollTable",
  components: {
    vueSeamlessScroll,
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    tdHeight: {
      type: Number,
      default: 32,
    },
    thHeight: {
      type: Number,
      default: 32,
    },
    footerHeight: {
      type: Number,
      default: 0,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      classOption: {
        step: 0.4,
        waitTime: 4000,
        openWatch: true, // 开启数据实时监控刷新dom
        limitMoveNum: 5,
      },
    };
  },
  mounted() {
    this.setSrcollOptions();
    window.addEventListener("resize", this.resizeListen);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.resizeListen);
    });
  },
  methods: {
    setSrcollOptions() {
      const autoScroll = this.$refs.scrollWrap.clientHeight - this.thHeight - this.footerHeight;
      const limitMoveNum = Math.floor(autoScroll / this.tdHeight);
      this.classOption.limitMoveNum = limitMoveNum;
      // console.log("limitMoveNum", limitMoveNum);
    },
    resizeListen() {
      this.setSrcollOptions();
      // fix resize 表格错位问题
      this.$refs.seamlessScroll.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-table-wrap {
  height: 100%;
  overflow: hidden;
  position: relative;

  .split-line {
    color: #fff;
    text-align: center;
    border-bottom: 1.5px solid #dfe6ec;
  }
}

.bottom-shadow {
  width: 100%;
  height: 26px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.4));
  z-index: 10;
}

.auto-scroll-table {
  overflow: hidden;
}

.scroll-table-header {
  ::v-deep .el-table {

    .el-table__body-wrapper,
    .el-table__footer-wrapper {
      // 隐藏上面表格的tbody
      display: none;
      overflow: hidden;
    }

    th {
      padding: 6px 0;
    }
  }
}

.scroll-table-footer {
  ::v-deep .el-table {

    .el-table__body-wrapper,
    .el-table__header-wrapper {
      // 隐藏上面表格的tbody
      display: none;
      overflow: hidden;
    }

    td {
      padding: 6px 0;
    }
  }
}

.scroll-table-body {
  overflow: hidden;

  ::v-deep .el-table {

    .el-table__header-wrapper {
      // 隐藏上面表格的thead
      display: none;
    }

    td {
      padding: 6px 0;
    }
  }

  &.hide-footer {
    ::v-deep .el-table .el-table__footer-wrapper {
      // 隐藏上面表格的footer
      display: none;
    }
  }
}
</style>
