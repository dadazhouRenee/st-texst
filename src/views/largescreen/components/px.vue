<!--
 * @Author: 周冰洁
-->
<template>
  <div class="container">
    <div class="col-item" v-for="item in menuList" :key="item.key">
      <p class="label">{{ item.name }}</p>
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
      default: () => {},
    },
  },
  data() {
    return {
      menuList: [
        {
          name: "总培训",
          key: "zpx",
          unit: '场',
        },
        {
          name: "自有员工",
          key: "zyyg",
          unit: '人',
        },
        {
          name: "三方员工",
          key: "sfyy",
          unit: '人',
        },
      ],
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px 10px;
  color: var(--primary-color);
  .flex {
    display: flex;
  }

  .col-item {
    padding: 4px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    p {
        margin: 0;
    }
    .label {
      color: #fff;
      margin-right: 20px;
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
      font-size: 22px;
    }
    .unit {
      color: #fff;
      margin-left: 12px;
    }
  }
}
</style>
