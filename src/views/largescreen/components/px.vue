<!--
 * @Author: 周冰洁
-->
<template>
  <div class="col-container">
    <div class="col-item" v-for="item in menuList" :key="item.key">
      <div class="col-left">
        <span :class="['col-icon', item.icon]"></span>
        <p class="label">{{ item.name }}</p>
      </div>
      <div class="flex">
        <p class="value" v-countUp="{ number: data[item.key] || 0 }">{{ item.name }}</p>
        <p class="unit">{{ item.unit }}</p>
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
      default: () => { },
    },
  },
  data() {
    return {
      menuList: [
        {
          name: "总培训",
          key: "zpx",
          unit: '场',
          icon: "px2",
        },
        {
          name: "自有员工",
          key: "zyyg",
          unit: '人',
          icon: "inner-person",
        },
        {
          name: "三方员工",
          key: "sfyy",
          unit: '人',
          icon: "outer-person",
        },
      ],
    }
  }

}
</script>

<style lang="scss" scoped>
.col-container {
  padding: 5px 10px;
  overflow: hidden;
  color: var(--primary-color);
  display: flex;

  .flex {
    display: flex;
  }

  .col-left {
    margin-bottom: 10px;
    text-align: center;
  }

  .col-item {
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    margin: 0 5px;
    flex: 1;

    p {
      margin: 0;
    }

    .col-icon {
      $width: 36px;
      $height: 36px;
      width: $width;
      // height: 100%;
      display: inline-block;
      min-height: $height;
      margin-bottom: 6px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: $width $height;

      &.px2 {
        background-image: url('../imgs/px2.png');
      }

      &.inner-person {
        background-image: url('../imgs/inner-person.png');
      }

      &.outer-person {
        background-image: url('../imgs/outer-person.png');
      }
    }

    .label {
      color: #fff;
    }

    .flex {
      flex: 1;
      display: flex;
      align-items: flex-end;
    }

    .value {
      color: transparent;
      background-image: linear-gradient(to bottom, #1BC0FD, #1EEAF1);
      background-clip: text;
      font-size: 24px;
    }

    .unit {
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>
