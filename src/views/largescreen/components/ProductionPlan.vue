<!--
 * @Author: 周冰洁
 * TO DO... 计算 比例, width percent
-->
<template>
  <div class="production-plan">
    <div class="left">
      <ul class="plan-list">
        <li v-for="item in planList">
          <p class="plan-info">
            <span>{{ item.name }}</span>
            <span v-countUp="{ number: data[item.key] }">{{ data[item.key] }}</span>
            <span>万吨</span>
          </p>
          <p class="plan-progress" :style="{ with: `${100}%` }"></p>
        </li>
      </ul>
    </div>
    <div class="right">
      <pie-complex-chart ref="right" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PieComplexChart from './Charts/PieComplexChart';
export default {
  components: {
    PieComplexChart,
  },
  computed: {
    ...mapState({
      dataScene: state => state.settings.largeScreenScene,
      isMonitorMode: state => state.settings.isMonitorModeScreen,
    }),
    isDatePlan() {
      if (this.dataScene === 'inner' && !this.isMonitorMode) {
        return true
      }
      return false
    },
    planList() {
      if (!this.isDatePlan) {
        return [
          {
            name: '月度计划',
            key: 'monthPlan'
          },
          {
            name: '月度实际',
            key: 'monthActual'
          },
          {
            name: '年度计划',
            key: 'yearPlan'
          },
          {
            name: '年度实际',
            key: 'yearActual'
          },
        ]
      } else {
        return [
          {
            name: '当日计划',
            key: 'dayPlan'
          },
          {
            name: '当日实际',
            key: 'dayActual'
          },
        ]
      }
    },
    title() {
      if (this.isDatePlan) {
        return '当日计划完成度';
      } else {
        return '月计划完成度';
      }
    }
  },
  props: {
  },
  data() {
    return {
      data: {},
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    initChart(data = {}) {
      this.data = data;
      const datePercent = Math.round(data.dayActual / data.dayPlan * 100);
      const monthPercent = Math.round(data.monthActual / data.monthPlan * 100);
      // console.log('this.data', this.data, datePercent, monthPercent);
      this.$refs.right.initChart({
        value: this.isDatePlan ? datePercent : monthPercent,
        title: this.title,
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.production-plan {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    width: 65%;
    height: 100%;
  }

  .right {
    width: 35%;
    height: 100%;
  }

  .plan-list {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    list-style: none;
    height: 100%;
    padding: 0;
    margin: 0;

    li {
      padding: 5px;

      .plan-info {
        margin-top: 0;
        color: var(--primary-color);

        span {
          &:nth-child(1) {
            color: #fff;
            display: inline-block;
            min-width: 75px;
          }
        }
      }

      .plan-progress {
        margin: 5px 0;
        height: 8px;
        border-radius: 4px;
        background-color: var(--progress-bg-color);
        transition: width 2s ease;
      }
    }
  }
}
</style>
