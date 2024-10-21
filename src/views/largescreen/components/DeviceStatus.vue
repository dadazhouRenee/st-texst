<template>
  <div class="device-status">
    <pie-chart ref="pieChart" />
  </div>
</template>

<script>
import PieChart from './Charts/PieChart';
export default {
  name: 'DeviceStatus',
  components: {
    PieChart,
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    })
  },
  methods: {
    initChart(data = {},) {
      this.$refs.pieChart.initChart({
        name: '设备',
        total: data.total || 0,
        seriesData: [
          {
            name: '报警',
            value: data.numberOfAlarms || 0,
          },
          {
            name: '停机',
            value: data.numberOfShutdowns || 0,
          },
          {
            name: '正常',
            value: data.numberNormal || 0,
          },
        ],
        other: {
          color: [
            '#EF752D',
            '#FF414A',
            '#19AEF1',
            '#2FDADE',
            '#7006D9',
          ],
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.device-status {
  width: 100%;
  height: 100%;
}
</style>
