<!--
 * @Author: 周冰洁
-->
<template>
  <div class="container">
    <p>xslx 读取表格数据</p>
    <div class="operate">
      <!-- <el-button @click="addData">存储db数据</el-button> -->
      <el-button @click="readData">读取db数据</el-button>
      <!-- <el-button @click="test">远程excel</el-button> -->
      <el-upload style="margin-left: 10px;" action="#" :auto-upload="false" :on-change="onChange" :limit="1"
        :show-file-list="false" accept=".xls,.xlsx">
        <el-button type="primary">上传本地excel</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const xlsx = require("xlsx");
import { sum } from 'lodash';
export default {
  data() {
    return {
      url: "",
    };
  },
  methods: {
    addData() {
      this.$demoDataBase
        .setItem("测试demo", {
          aa: 1111,
          b: "2222",
        })
        .then((res) => {
          console.log("addData", res);
        });
    },
    readData() {
      this.$demoDataBase.getItem("shengtong").then((res) => {
        console.log("readData", res);
      });
    },
    async test() {
      if (!this.url) return;
      try {
        const response = await axios.get(this.url, { responseType: "arraybuffer" });
        const data = new Uint8Array(response.data);
        console.log("data", data);
      } catch (error) {
        this.$message({
          message: "远程excel请求报错！",
          type: "error",
        });
      }
    },
    async onChange(file) {
      /**
       * 1. 使用原生api去读取好的文件
       * */
      // console.log("原始上传的文件", file);
      // 读取文件不是立马能够读取到的，所以是异步的，使用Promise
      let dataBinary = await new Promise((resolve) => {
        // Web API构造函数FileReader，可实例化对象，去调用其身上方法，去读取解析文件信息
        let reader = new FileReader(); // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
        // console.log("实例化对象有各种方法", reader);
        reader.readAsBinaryString(file.raw); // 读取raw的File文件
        reader.onload = (ev) => {
          console.log("文件解析流程进度事件", ev);
          resolve(ev.target.result); // 将解析好的结果扔出去，以供使用
        };
        reader.onerror = (err) => {
          console.log("文件解析报错", err);
        };
      });
      console.log("读取出的流文件", dataBinary);

      /**
       * 2. 使用xlsx插件去解析已经读取好的二进制excel流文件
       * */

      let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: false });
      // excel中有很多的sheet，这里取了第一个sheet：workBook.SheetNames[0]
      // let firstWorkSheet = workBook.Sheets[workBook.SheetNames[0]];
      // // 分为第一行的数据，和第一行下方的数据
      // const header = this.getHeaderRow(firstWorkSheet);
      // console.log("读取的excel表头数据（第一行）", header);
      // const data = xlsx.utils.sheet_to_json(firstWorkSheet);
      // console.log("读取所有excel数据", data);

      // 隐患
      let yhSheet = workBook.Sheets[workBook.SheetNames[0]];
      const yhData = xlsx.utils.sheet_to_json(yhSheet).filter(item => !!item['省区'])
      const yh = {
        zyh: sum(yhData.map(item => item['查处隐患数'])),
        yzg: sum(yhData.map(item => item['已整改隐患数'])),
        wzg: sum(yhData.map(item => item['待整改隐患数'])),
      }
      console.log('yh', yh)
      console.log('========================================');
      // 违规类型
      let wgSheet = workBook.Sheets[workBook.SheetNames[2]];
      const wgHeader = this.getHeaderRow(wgSheet);
      const wgData = xlsx.utils.sheet_to_json(wgSheet);
      const xData = wgHeader.slice(3, -1);
      const wg = xData.map(name => {
        return {
          name,
          value: sum(wgData.map(item => item[name])),
        }
      })
      console.log('wgSheet', wgHeader, wgData, wg)
      console.log('========================================');
      // 培训
      let pxSheet = workBook.Sheets[workBook.SheetNames[3]];
      const pxData = xlsx.utils.sheet_to_json(pxSheet).filter(item => !!item['省区'])
      const px = {
        zpx: sum(pxData.map(item => item['培训场次'])),
        zyyg: sum(pxData.map(item => item['培训人数'])),
        sfyy: sum(pxData.map(item => item['临时/三方人员人数'])),
      }
      console.log('pxSheet', pxData, px)
      console.log('========================================');

      // 信息系统
      let xxxtSheet = workBook.Sheets[workBook.SheetNames[4]];
      const xxxtData = xlsx.utils.sheet_to_json(xxxtSheet)
      const xxxt = {
        xtgf: sum(xxxtData.map(item => item['防护次数'])),
        xxxl: sum(xxxtData.map(item => item['系统安全事件数'])),
      }
      console.log('xxxtSheet', xxxtData, xxxt);
      console.log('========================================');

      // 监管
      let jgSheet = workBook.Sheets[workBook.SheetNames[5]];
      const jgHeader = this.getHeaderRow(jgSheet);
      const jgData = xlsx.utils.sheet_to_json(jgSheet);
      const _zx  = jgData.find(item => item['组织'] == '中心')
      const _wd  = jgData.find(item => item['组织'] == '网点')
      const jg = [
        {
          name: '约谈',
          zx: _zx['约谈'],
          wd: _wd['约谈'],
        },
        {
          name: '整改',
          zx: _zx['整改'],
          wd: _wd['整改'],
        },
        {
          name: '处罚',
          zx: _zx['处罚'],
          wd: _wd['处罚'],
        },
      ]
      console.log('jgSheet', jgHeader, jgData, jg);
      console.log('========================================');

      // 舆情
      let yqSheet = workBook.Sheets[workBook.SheetNames[6]];
      const yqData = xlsx.utils.sheet_to_json(yqSheet);
      const yq = {
        zmyq: sum(yqData.map(item => item['正面舆情'])),
        fmyq: sum(yqData.map(item => item['负面舆情'])),
        wbft: sum(yqData.map(item => item['媒体访谈'])),
      }
      console.log('yqSheet', yqData, yq);
      console.log('========================================');

      // 省区排名
      let rank1Sheet = workBook.Sheets[workBook.SheetNames[7]];
      // let rank1header = this.getHeaderRow(rank1Sheet);

      const rank1Data = xlsx.utils.sheet_to_json(rank1Sheet).filter(item => !!item['序号']);
      const rank1 = rank1Data.map(item => ({
        name: item['省区'],
        value: item['风险度'] || 0,
      }))
      console.log('rank1Sheet', rank1Data, rank1);
      console.log('========================================');

      // 中心排名
      let rank2Sheet = workBook.Sheets[workBook.SheetNames[8]];
      const rank2Data = xlsx.utils.sheet_to_json(rank2Sheet).filter(item => !!item['序号']);
      const rank2 = rank2Data.map(item => ({
        name: item['中心'],
        value: item['风险度'] || 0,
      }))
      console.log('rank2Sheet', rank2Data, rank2);
      console.log('========================================');

      this.$demoDataBase
        .setItem("shengtong", {
          yh,
          wg,
          px,
          xxxt,
          jg,
          yq,
          rank1,
          rank2,
        })
        .then((res) => {
          this.$message.success('数据导入成功！')
        });


    },
    getHeaderRow(sheet) {
      const headers = []; // 定义数组，用于存放解析好的数据
      const range = xlsx.utils.decode_range(sheet["!ref"]); // 读取sheet的单元格数据
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers; // 经过上方一波操作遍历，得到最终的第一行头数据
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 16px;
}

.operate {
  display: flex;

  button {
    margin-right: 10px;
  }
}
</style>
