<!--
 * @Author: 周冰洁
-->
<template>
  <div class="chart-wrap">
    <map-chart ref="chart" />
  </div>
</template>

<script>
import Chart from './Charts/China.vue';
export default {
  components: {
    'map-chart': Chart,
  },
  data() {
    return {
    }
  },
  beforeDestroy() {
  },
  methods: {
    /**
     * data: {
     * mapData: [],
     * }
     *
     */
    initChart(data = {}) {
      const { data: { mapData = [] } } = data;
      console.log('map', mapData)
      this.$refs.chart.initChart({
        mapData: mapData
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  width: 100%;
  height: 100%;
}
</style>
