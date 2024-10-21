<!--
 * @Author: 周冰洁
-->
<template>
  <div class="table-wrap">
    <scroll-table-wrap :data="listData" ref="scrollTable" :footerHeight="10">
      <template v-slot:table>
        <el-table class="base-table" :data="listData" style="width: 100%;">
          <el-table-column label="排名" type="index" min-width="80px"></el-table-column>
          <el-table-column label="名称" prop="name" min-width="160px"></el-table-column>
          <el-table-column label="分数" prop="value" min-width="80px">
          </el-table-column>
        </el-table>
      </template>
    </scroll-table-wrap>
    <!-- <el-table class="base-table" :data="listData" style="width: 100%;">
          <el-table-column label="排名" type="index" min-width="80px"></el-table-column>
          <el-table-column label="名称" prop="name" min-width="160px"></el-table-column>
          <el-table-column label="分数" prop="value" min-width="80px">
          </el-table-column>
        </el-table> -->
  </div>
</template>

<script>
import ScrollTableWrap from "./ScrollTableWrap.vue";
export default {
  name: 'Rank',
  components: {
    'scroll-table-wrap': ScrollTableWrap,
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  }
}
</script>
<style lang="scss">
// table自定义覆盖样式
.base-table {
  $bgColor: #001233;
  $borderColor: #0C2B57;
  $thColor: #649EB9;
  $thBg: rgba(9, 65, 138, 0.24);
  $tdBg: rgba(9, 65, 138, 0);
  $tdBgStripe: rgba(9, 65, 138, 0.08);
  $tdBgHover: rgba(9, 65, 138, 0.44);
  ;

  &.el-table {
    background-color: $bgColor;
    color: #fff;

    td, th.is-leaf {
      border-bottom-color:  $borderColor;
    }
    .el-table__empty-text {
      color: #fff;
    }

    &::before,
    &.el-table--group::after,
    &.el-table--border::after {
      background-color: $borderColor;
    }

    // ------------------ 边框 ------------------
    &.el-table--border {
      border-right: none;
      border-bottom: none;
    }

    &.el-table--border,
    &.el-table--group {
      border: 1px solid $borderColor;
    }

    &.el-table--border {
      border-right: none;
      border-bottom: none;

      .el-table__cell {
        border-right: 1px solid $borderColor;
      }

      th.el-table__cell.gutter:last-of-type {
        border-bottom: 1px solid $borderColor;
      }
    }

    td.el-table__cell,
    th.el-table__cell.is-leaf {
      border-bottom: 1px solid $borderColor;
    }

    // ------------------ 边框 ------------------

    tr {
      background-color: $tdBg;
    }

    thead {
      color: $thColor;
    }

    .el-table__header-wrapper {
      tr {
        background-color: $thBg;
      }

      th {
        color: $thColor;
        background-color: $thBg;
      }
    }

    &.el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: $tdBgStripe;
    }

    // 悬浮背景色
    &.el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: $tdBgHover;
    }

    // 滚动条
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background-color: rgb(33, 35, 41);
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 3, 19, 1);
      border-radius: 4px;
    }
  }

}
</style>
<style lang="scss" scoped>

.table-wrap {
  height: 200px;

  .base-table {
    width: 100%;
    height: 100%;

    ::v-deep {
      td.el-table__cell {
        color: #649EB9;
      }
    }
  }
}
</style>
