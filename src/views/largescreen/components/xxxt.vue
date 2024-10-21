<!--
 * @Author: 周冰洁
-->
<template>
  <div class="container">
    <div class="col-item" v-for="item in menuList" :key="item.key">
      <!-- <div :class="['col-icon', item.icon]">
      </div> -->
      <div class="col-content">
        <p class="col-title">{{ item.name }}</p>
        <div class="num-wrap">
          <p class="col-num" v-countUp="{ number: data[item.key] || 0 }"></p>
          <p class="unit">{{ item.unit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'yh',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      menuList: [
        {
          name: "系统攻防",
          icon: "date-count-icon",
          key: "xtgf",
          unit: '次',
        },
        {
          name: "信息泄露",
          icon: "month-count-icon",
          key: "xxxl",
          unit: '条',
        },
      ],
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  color: var(--primary-color);

  .col-item {
    flex: 1;
    padding: 0 15px;
    display: flex;
    align-items: center;

    .col-icon {
      $width: 64px;
      $height: 68px;
      width: $width;
      height: 100%;
      min-height: $height;
      margin-right: 14px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: $width $height;
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

    .col-content {
      width: 100%;
      text-align: center;
      p {
        margin: 0;
      }

      .col-title {
        font-size: 18px;
        line-height: 20px;
        color: #fff;
      }

      .col-num {
        font-size: 38px;
        line-height: 38px;
        padding-top: 18px;
        color: transparent;
        background-image: linear-gradient(to bottom, #1BC0FD, #1EEAF1);
        background-clip: text;
        text-align: center;
        // width: 100%;
        // min-height: 100px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
      }
      .unit {
        color: #fff;
        margin-left: 10px;
      }
      .num-wrap {
        display: flex;
        align-items: flex-end;
        width: 100%;
        justify-content: center;

      }
    }
  }
}
</style>
