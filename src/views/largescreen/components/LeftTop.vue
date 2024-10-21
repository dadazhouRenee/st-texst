<template>
  <div class="left-top">
    <div class="outPut-item" v-for="item in outPutList" :key="item.key">
      <div :class="['outPut-icon', item.icon]">
      </div>
      <div class="outPut-info">
        <p class="outPut-num" v-countUp="{ number: data[item.key] }"></p>
        <p class="outPut-title">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftTop',
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      outPutList: [
        {
          name: "水泥产量（日产）",
          icon: "date-count-icon",
          key: "dailyProduction",
        },
        {
          name: "水泥产量（月产）",
          icon: "month-count-icon",
          key: "monthlyProduction",
        },
        {
          name: "水泥产量（昨日）",
          icon: "yesterday-count-icon",
          key: "cementInventoryYesterday",
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.left-top {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  color: var(--primary-color);

  .outPut-item {
    flex: 1;
    padding: 0 15px;
    display: flex;
    align-items: center;

    .outPut-icon {
      width: 84px;
      height: 100%;
      min-height: 88px;
      margin-right: 14px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 84px 88px;

      &.date-count-icon {
        background-image: url('../imgs/date-count-icon.png');
      }

      &.month-count-icon {
        background-image: url('../imgs/month-count-icon.png');
      }

      &.yesterday-count-icon {
        background-image: url('../imgs/yesterday-count-icon.png');
      }
    }

    .outPut-info {
      p {
        margin: 0;
      }

      .outPut-title {
        font-size: 17px;
        line-height: 20px;
        color: #fff;
      }

      .outPut-num {
        font-size: 38px;
        line-height: 38px;
        margin-bottom: 10px;
        color: transparent;
        background-image: linear-gradient(to bottom, #1BC0FD, #1EEAF1);
        background-clip: text;
      }
    }
  }
}</style>
