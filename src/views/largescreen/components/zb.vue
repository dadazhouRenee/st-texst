<!--
 * @Author: 周冰洁
-->
<template>
  <div class="container">
    <div class="col-item" v-for="item in menuList" :key="item.key">
      <!-- <div :class="['col-icon', item.icon]">
      </div> -->
      <div class="col-content">
        <div class="col-num-wrap">
          <span class="col-num" v-countUp="{ number: data[item.key] || 0 }"></span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <p class="col-title">{{ item.name }}</p>
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
          name: "工伤亡人事故",
          icon: "date-count-icon",
          key: "gswrsg",
          unit: '起',
        },
        {
          name: "停产事件",
          icon: "month-count-icon",
          key: "tcsj",
          unit: '起',
        },
        {
          name: "国家级约谈事件",
          icon: "yesterday-count-icon",
          key: "gjjytsj",
          unit: '起',
        },
        {
          name: "总经济损失",
          icon: "yesterday-count-icon",
          key: "zjjss",
          unit: '元',
        },
      ],
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
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
      .col-num-wrap {
        margin-bottom: 18px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }

      .col-num {
        font-size: 38px;
        line-height: 38px;
        color: transparent;
        background-image: linear-gradient(to bottom, #1BC0FD, #1EEAF1);
        background-clip: text;
      }
      .unit {
        font-size: 14px;
        color: #fff;
        margin-left: 5px;
      }
    }
  }
}
</style>
