<template>
  <div class="quality-info">
    <div class="left">
    </div>
    <div class="right">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th rowspan="2" width="95px">项目</th>
            <th rowspan="2" width="45px">比表面积</th>
            <th rowspan="2" width="65px">比表合格比</th>
            <th colspan="3" width="100px">3天抗压强度</th>
            <th colspan="3" width="100px">28天抗压强度</th>
            <th rowspan="2" width="80px">混合材料数量 </th>
          </tr>
          <tr>
            <th>平均</th>
            <th>最大</th>
            <th>最小</th>
            <th>平均</th>
            <th>最大</th>
            <th>最小</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="primary-color">1#水泥</td>
            <td>73.39</td>
            <td>35/56</td>
            <td class="more-padding">73.39</td>
            <td class="more-padding max">73.39</td>
            <td class="more-padding min">73.39</td>
            <td class="more-padding">73.39</td>
            <td class="more-padding max">73.39</td>
            <td class="more-padding min">73.39</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>2#水泥</td>
            <td>73.39</td>
            <td>35/56</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>3#水泥</td>
            <td>73.39</td>
            <td>35/56</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>4#水泥</td>
            <td>73.39</td>
            <td>35/56</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>73.39</td>
            <td>数量</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    })
  },
  beforeDestroy() {
  },
  methods: {
    initChart() {
      // this.$refs.barChart.initChart({
      //   name: '水泥消电耗',
      //   xData: ['1#号', '2#号', '3#号', '4#号'],
      //   yData: [10, 20, 35, 25],
      //   other: {
      //     title: '水泥消电耗（kwh/t）',
      //     show: true, // 是否展示 默认为true,
      //     yAxisLine: {
      //       show: true,
      //     },
      //     color: [
      //       {
      //         type: 'linear',
      //         x: 0,
      //         y: 0,
      //         x2: 0,
      //         y2: 1,
      //         colorStops: [{
      //           offset: 0, color: '#00FFF6'
      //         }, {
      //           offset: 1, color: '#1046F6'
      //         }],
      //         global: false
      //       }
      //     ],
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.quality-info {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    // width: 22%;
    height: 100%;
  }

  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;

    table {
      border: none;
      width: 100%;
      font-size: 12px;

      thead {
        background: rgba(1, 86, 152, 0.3);
        border: 1px solid #1C487A;
        padding: 5px 0;

        th {
          // font-size: 9px;
          transform: scale(0.7);
          color: rgba(255, 255, 255, 0.9);
          padding: 2px 0;
          line-height: 1.6;
        }
      }

      td {
        padding: 8px 0;
        text-align: center;
        vertical-align: middle;
        transform: scale(0.66);

        &.primary-color {
          color: var(--primary-color);
        }

        &.max {
          color: rgba(97, 255, 76, 1);
        }

        &.min {
          color: rgba(239, 117, 45, 1);
        }

        &.more-padding {
          padding-left: 1px;
          padding-right: 1px;
        }
      }
    }
  }
}
</style>
