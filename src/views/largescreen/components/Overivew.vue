<template>
  <div class="overview-wrap">
    <!-- <div class="company-info">
      <div class="company-img">
        <img src="../imgs/company.png" alt="公司图片">
      </div>
      <div class="company-content">
        <h3>公司介绍</h3>
        <p>
          山东山水水泥集团有限公司（简称山水集团）是国家重点支
          持的12户全国性大型水泥企业之一。最近几年，按照“做大水
          泥主业”战略，山水集团立足山东，沿最具经济活力的胶济铁
          路“东进西扩、南北辐射”，现已形成以济南、淄博、潍坊、烟
          台为熟料基地，配套水泥粉磨企业遍布省内十几个地市的产业
          格局，生产规模位居全国同行业前列。
        </p>
      </div>
    </div> -->
    <div class="map-wrap">
      <map-chart ref="map" @regionChange="toggleRegion" />
      <span class="mode-toggle-btn" @click="toggleMap">
        <i class="el-icon-sort"></i>
        {{ isMixMap ? '建材商店' : '商混站' }}
      </span>
      <div class="right-company" v-show="isShowCompany" :style="{ maxWidth: isMixMap ? '220px' : '280px', }">
        <h4>客户名称</h4>
        <div class="total-area">
          <span style="margin-right: 5px;">该区域内总数量: </span>
          <span>{{ companyList.length || 0 }}</span>
        </div>
        <p v-for="(item, index) in companyList" :key="item.id">{{ item.name }}</p>
      </div>
      <div class="date-info-wrap">
        <div class="flex-wrap">
          <div class="data-item">
            <p class="title">总数量</p>
            <p class="value-wrap">
              <template v-for="item in countStrArr">
                <span v-if="item !== ','" class="hasBg" v-countUp="item">{{ item }}</span>
                <span v-else>{{ item }}</span>
              </template>
              <span class="unit">个</span>
            </p>
          </div>
          <div class="data-item">
            <p class="title">在线</p>
            <p>
              <template v-for="item in percentStrArr">
                <span v-if="item !== ','" class="hasBg" v-countUp="item">{{ item }}</span>
                <span v-else>{{ item }}</span>
              </template>
              <span class="unit">%</span>
            </p>
          </div>
        </div>
        <p class="yesterday-count">昨日公开平台覆盖数量：289</p>
        <p class="remark">
          <span class="map-icon"></span>
          <span>已上线数量</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import MapChart from './Charts/MapChart';
import { formatNumber } from '@/utils';
export default {
  components: {
    MapChart
  },
  data() {
    return {
      isMixMap: true,
      isShowCompany: false,
      companyList: [],
      mapData: [], // 地图全量数据
      // TO DELETE...
      count: 3600,
      percent: 99,

    }
  },
  mounted() {
  },
  computed: {
    countStrArr() {
      const value = formatNumber(this.count || 0, 0, true);
      return ('' + value).split('');
    },
    percentStrArr() {
      const value = formatNumber(this.percent || 0, 0, false);
      return ('' + value).split('');
    }
  },
  methods: {
    initChart(data = []) {
      this.mapData = data;
      this.$refs.map.initChart({
        isMixMap: this.isMixMap,
        mapData: data,
      })
    },
    // 切换地图视角
    toggleMap() {
      this.isMixMap = !this.isMixMap;
      this.$refs.map.toggleMap(this.isMixMap);
    },
    // 切换选中区域
    toggleRegion(data) {
      // console.log('toggleRegion', data)
      if (data) {
        //站点类型  1：商混站信息  2：建材商店信息
        const siteType = this.isMixMap ? '1' : '2';
        this.companyList = this.mapData.filter(item => item.ordinalArea == data.adCode && item.siteType === siteType);
        this.isShowCompany = true;
      } else {
        this.isShowCompany = false;
        this.companyList = [];
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.overview-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  $compantInfoHeight: 300px;

  .company-info {
    height: $compantInfoHeight;
    padding: 10px 10px 25px 10px;
    display: flex;
    align-items: center;

    .company-img {
      width: 45%;
      min-height: 240px;
      text-align: center;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .company-content {
      width: 55%;
      padding-left: 15px;
      color: #fff;

      h3 {
        font-size: 20px;
        font-weight: 600;
      }

      p {
        font-size: 15px;
        line-height: 32px;
        margin: 0;
      }
    }
  }

  .map-wrap {
    width: 100%;
    height: calc(100% - #{$compantInfoHeight});
    position: relative;

    .mode-toggle-btn {
      position: absolute;
      right: 12px;
      top: 20px;
      color: var(--primary-color);
      width: 110px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      font-size: var(--base-font-size);
      background: var(--toggle-mode-btn-bg-color);
      border: 1px solid var(--toggle-mode-btn-border-color);
      border-radius: 3px;

      i {
        transform: rotate(90deg);
        margin-right: 3px;
      }
    }

    .date-info-wrap {
      position: absolute;
      left: 20px;
      top: 0;
      color: #fff;
      font-size: var(--base-font-size);

      p {
        margin: 5px 0;
      }

      .flex-wrap {
        max-width: 280px;
        display: flex;
        flex-wrap: wrap;

        .data-item {
          margin-right: 10px;

          .title {
            line-height: 26px;
          }

          .unit {
            font-size: 13px;
            display: inline-block;
            vertical-align: bottom;
          }

          .hasBg {
            display: inline-block;
            width: 30px;
            line-height: 38px;
            font-size: 28px;
            text-align: center;
            margin: 0 3px;
            background: linear-gradient(-75deg, #014666, #013366);
          }
        }
      }



      .yesterday-count {
        font-size: 14px;
        line-height: 20px;
        margin-top: 15px;
      }

      .remark {
        font-size: 13px;
        line-height: 16px;

        .map-icon {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 16px;
          background: url('../imgs/map-location.png') no-repeat center;
          background-size: contain;
        }
      }
    }

    .right-company {
      position: absolute;
      right: 20px;
      top: 60px;
      min-width: 100px;
      max-height: calc(100% - 80px);
      overflow: auto;

      &::-webkit-scrollbar-track-piece {
        // background: #f5f5f5;
        background: var(--scrollbar-bg-color);
      }

      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-color);
        border-radius: 6px;
      }

      .total-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        margin: 10px 5px;
      }

      h4 {
        font-size: 20px;
        color: var(--primary-color);
        margin: 10px 5px;
      }

      p {
        font-size: 16px;
        line-height: 22px;
        margin: 3px 5px;
        color: #FFFFFF;
      }

    }
  }
}
</style>
