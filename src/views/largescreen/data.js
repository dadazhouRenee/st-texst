const data = {
  msg: "获取   内部生产场景  ====> 监控模式数据   接口成功",
  code: 200,
  data: {
    //1-水泥数据监测          水泥产量（日产）、水泥产量（月产）、水泥库存（昨日）
    cementMonitoringData: {
      dailyProduction: "3000", //水泥产量(日产)
      monthlyProduction: "189484", //水泥产量 (月产)
      cementInventoryYesterday: "89484", //水泥库存 (昨日)
    },
    //2-能耗分析              实时数据：水泥综合能耗占比、1#号/2#号/3#号/4#号水泥磨电耗
    energyConsumptionAnalysis: {
      cementEnergyConsumption: "0.68", //水泥综合能耗
      cementPowerConsumptionList: [
        //水泥消电耗
        {
          powerConsumption: "1#", //编号
          number: "11", //消耗电量
        },
        {
          powerConsumption: "2#",
          number: "25",
        },
        {
          powerConsumption: "3#",
          number: "32",
        },
        {
          powerConsumption: "4#",
          number: "8",
        },
      ],
    },
    //3-设备状态              实时数据：总数、正常、报警、停机
    equipmentStatus: {
      numberOfAlarms: 25, //报警数量
      numberOfShutdowns: 733, //停机数量
      numberNormal: 469, //正常数量
      total: 1227, //总数
    },
    //4-生产计划              实时数据：当日计划、当日实际
    productionPlan: {
      dayPlan: 988, //当日计划
      dayActual: 1000, //当日实际
      monthPlan: 31278,
      monthActual: 20178,
      yearPlan: 101278,
      yearActual: 91278,
    },
    //5-质量信息              比表面积、比表合格比、3天抗压强度（平均/最大/最小）、28天抗压强度（平均/最大/最小）、混合材料数量
    qualityInformation: {
      qualityInfoList: [
        //列表信息
        {
          project: "1#号水泥", //项目
          specificSurfaceArea: "73.39", //比表面积
          specificSurfaceQualified: "35/56", //比表合格比
          compressiveStrength_01: "73.39 73.39 73.39", //3天抗压强度【平均、最大、最小】
          compressiveStrength_02: "73.39 73.39 73.39", //23天抗压强度【平均、最大、最小】
          quantityOfMixedMaterials: "73.39", //混合材料数量
        },
      ],
    },
    //6-生产分析（产量）      实时数据：8:00、10:00、12:00、14:00、16:00、18:00
    productAnalysis: [
      {
        time: "18:00", //时间
        yield: "198", //产量
        completionRate: "0.94", //完成率
      },
    ],
    //7-销量                 实时数据：8:00、10:00、12:00、14:00、16:00、18:00
    salesVolumes: [
      {
        time: "18:00", //时间
        salesVolume: "540", //销量
      },
    ],
    //8-摄像头列表            展示监控列表数据（名称，状态）
    surveillanceInfos: [
      {
        id: 999, //id
        name: "机枪", //名称
        code: 999, //编号
        status: "20", //摄像头状态::10-在线, 20-离线, 30-报警
        cameraGroup: "测试", //分组
        rtspUrl: "rtsp://admin:zf123456@192.168.0.64:554/Streaming/Channels/1", // rtsp视频流地址
        displayType: "10", //播放类型::0-不展示, 10-主页, 20-轮播
      },
    ],

    //9-监控反馈预警          展示预警数据（每条预警包含：预警时间、预警内容、预警等级）
    screenCameraWarnings: [
      {
        id: 3, //id
        cameraId: 3, //摄像头id
        warningType: "插板开关动作识别", //警告类型::10-移动侦测, 20-安全帽侦测, 30-插板开关动作识别, 40-漏料, 断料,堵料, 50-皮带停止, 60-睡离岗
        warningLevel: "三级警告", //警告级别::10-一级警告, 20-二级警告, 30-三级警告
      },
    ],

    //10-视频监控             视频监控预览6个，三维场景内监控气泡标签，轮播窗口
    surveillanceWheelSeedingInfos: [
      {
        id: 999, //id
        name: "机枪", //名称
        code: 999, //编号
        status: "20", //摄像头状态::10-在线, 20-离线, 30-报警
        cameraGroup: "测试", //分组
        rtspUrl: "rtsp://admin:zf123456@192.168.0.64:554/Streaming/Channels/1", // rtsp视频流地址
        displayType: "10", //播放类型::0-不展示, 10-主页, 20-轮播
      },
    ],
  },
};

export default data;
