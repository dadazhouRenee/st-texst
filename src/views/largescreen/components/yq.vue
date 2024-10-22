<!--
 * @Author: 周冰洁
-->
<template>
  <div class="col-col-container">
    <div class="col-item" :class="['bg-icon', item.icon]" v-for="item in menuList" :key="item.key">
      <!-- <div :class="['col-icon', item.icon]">
      </div> -->
      <div class="col-content">
        <p class="col-title">{{ item.name }}</p>
        <p class="col-num" v-countUp="{ number: data[item.key] || 0 }"></p>
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
          name: "正面舆情",
          icon: "zm",
          key: "zmyq",
        },
        {
          name: "负面舆情",
          icon: "fm",
          key: "fmyq",
        },
        {
          name: "外部访谈",
          icon: "ft",
          key: "wbft",
        },
      ],
    }
  }

}
</script>

<style lang="scss" scoped>
.col-col-container {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  color: var(--primary-color);

  .col-item {
    flex: 1;
    padding: 0 15px;
    display: flex;
    align-items: center;
    &.bg-icon {
      background-position: 75% center;
      background-repeat: no-repeat;
      background-size: contain;
      &.fm {
        background-image: url('../imgs/fm.png');
      }
      &.zm {
        background-image: url('../imgs/zm1.png');
      }
      &.ft {
        background-image: url('../imgs/ft.png');
      }
    }

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
      p {
        margin: 0;
      }

      .col-title {
        font-size: 18px;
        line-height: 20px;
        color: #fff;
        text-align: center;
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
    }
  }
}
</style>
