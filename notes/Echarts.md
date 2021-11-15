# Api

```python
# GET请求示例
sample_url_get = 'http://192.168.8.165:5020/service-itdd-get/get_drive_topn_amt_doc'
# POST请求示例
sample_url_post = 'http://192.168.8.165:5020/service-itdd-post/get_drive_topn_amt'
# POST参数
request = {
  "proj_id": "gc_dxm, 唯一项目id，str，必选",
  "topn_period": "Y，统计topn周期选择月年 M|Y，str，必选"
}

post_api_dict = {
    'get_drive_topn_amt'     : get_drive_topn_amt,
    'get_drive_topn_arpu'    : get_drive_topn_arpu,
    'get_drive_user_arpu'    : get_drive_user_arpu,
    'get_drive_fp_year'      : get_drive_fp_year,
    'get_drive_net_rr'       : get_drive_net_rr,
    'get_drive_order_dur'    : get_drive_order_dur,
    'get_drive_is_new'       : get_drive_is_new,
    'get_drive_mrr_is_new'   : get_drive_mrr_is_new,
    'get_drive_mrr_user_dur' : get_drive_mrr_user_dur,
    'get_drive_mrr_is_alive' : get_drive_mrr_is_alive,
    'get_drive_mrr_callback' : get_drive_mrr_callback,
    'get_drive_mrr_topn'     : get_drive_mrr_topn,
    'get_drive_mrr_snum'     : get_drive_mrr_snum,
    'get_drive_mrr_convert'  : get_drive_mrr_convert,
}

get_api_dict = {
    'get_drive_topn_amt_doc'   : get_drive_topn_amt_doc,
    'get_drive_topn_arpu_doc'  : get_drive_topn_arpu_doc,
    'get_drive_user_arpu_doc'  : get_drive_user_arpu_doc,
    'get_drive_fp_year_doc'    : get_drive_fp_year_doc,
    'get_drive_net_rr_doc'     : get_drive_net_rr_doc,
    'get_drive_order_dur_doc'  : get_drive_order_dur_doc,
    'get_drive_is_new_doc'     : get_drive_is_new_doc,
    'get_drive_mrr_is_new_doc'  : get_drive_mrr_is_new_doc,
    'get_drive_mrr_user_dur_doc' : get_drive_mrr_user_dur_doc,
    'get_drive_mrr_is_alive_doc' : get_drive_mrr_is_alive_doc,
    'get_drive_mrr_callback_doc' : get_drive_mrr_callback_doc,
    'get_drive_mrr_topn_doc'     : get_drive_mrr_topn_doc,
    'get_drive_mrr_snum_doc'     : get_drive_mrr_snum_doc,
    'get_drive_mrr_convert_doc'  : get_drive_mrr_convert_doc,
}
```



# Line & Stacked Bar 

##### **用户总数与客单价（柱形图+折线图）**

![](https://docimg4.docs.qq.com/image/E8fBKqdaJHa6bFjYb9Jl2w.png?w=950&h=483)

```jsx
myChart.setOption({
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: true,
    // enterable: true,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff'
      }
    },
    position: function (point, params, dom, rect, size) {
      // 上部
      return [point[0] - 65, point[1] - 220];
    },
    transitionDuration: 1.2 //跟随鼠标延迟
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  dataset: {
    source: data
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '10%'
  },
  xAxis: {
    type: 'category',
    axisPointer: {
      type: 'shadow'
    }
  },
  yAxis: [
    {
      type: 'value',
      name: 'users',
      axisLabel: {
        formatter: function (value) {
          if (value === 0) { return 0 }
          return value / 1000 + 'k'
        }
      }
    },
    {
      type: 'value',
      name: 'arpu',

      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    { id: 'bar', type: 'bar', color: '#6076fa', yAxisIndex: 0, clip: false },
    {
      id: 'line',
      type: 'line',
      color: '#de72f7',
      // smooth: true,
      yAxisIndex: 1,
      lineStyle: { width: data.length < 8 ? 7 : 4 },
      symbol: "circle",
      // showSymbol:false,
      symbolSize: (val, params) => {

        if (chartActive >= 0) {
          if (params.dataIndex === chartActive) { return data.length < 8 ? 20 : 12 }
          if (params.dataIndex === chartActive - 1) { return data.length < 8 ? 12 : 7 }
          if (params.dataIndex === chartActive + 1) { return data.length < 8 ? 12 : 7 }
        }
        return 4
      }
    }
  ]
});
myChart.on('click', function (e) {
      setChartActive('')
      setTableActive(e.data[0])
      myChart.setOption({
        series: [
          {
            id: 'line',
            symbolSize: (val, params) => {
              if (chartActive >= 0) {
                if (params.dataIndex === chartActive) { return data.length < 8 ? 20 : 12 }
                if (params.dataIndex === chartActive - 1) { return data.length < 8 ? 12 : 7 }
                if (params.dataIndex === chartActive + 1) { return data.length < 8 ? 12 : 7 }
              }
              return 4
            }
          }
        ]
      });
```

##### TopN用户月收入贡献与占比（柱形图+折线图

![](https://docimg9.docs.qq.com/image/uwTMo2OWyVqkFIyRjKM4yg.png?w=943&h=436)

```jsx
myChart.setOption({
  //line+bar堆叠

  legend: {
    selected: {
      'per(01) top1-20': false,
      'per(02) top21-100': false,
      'per(03) top101-500': false,
      'per(04) top501-1000': false,
      'per other': false
    }
  },
  tooltip: {
    trigger: 'axis',
    showContent: true,
    enterable: false,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff'
      }
    },
    position: function (point, params, dom, rect, size) {
      // 上部
      return [point[0] - 65, point[1] - 220];
    },
    transitionDuration: 1.2 //跟随鼠标延迟
  },
  toolbox: {
    orient: 'vertical',
    itemSize: 12,
    itemGap: 15,
    feature: {
      // dataView: { show: true, readOnly: false },
      // magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  dataset: [
    {
      // 序号为 0 的 dataset。
      source: [
        [
          'mon',
          '(01) top1-20',
          '(02) top21-100',
          '(03) top101-500',
          '(04) top501-1000',
          'other'
        ],
        ['2018-01', 57086.0, 18718.0, 112205.0, 103102.0, 555347.0],
        ['2018-02', 49552.0, 26092.0, 99365.0, 100281.0, 397839.0],
        ['2018-03', 0.0, 43263.0, 197521.0, 160330.0, 728276.0],
        ['2018-04', 20444.0, 83463.0, 177344.0, 143561.0, 729854.0],
        ['2018-05', 30206.0, 70268.0, 149197.0, 182448.0, 672258.0],
        ['2018-06', 41705.0, 61400.0, 116574.0, 113856.0, 608872.0],
        ['2018-07', 35332.0, 64614.0, 144188.0, 184810.0, 1088083.0],
        ['2018-08', 19800.0, 46392.0, 155033.0, 148085.0, 936034.0],
        ['2018-09', 29748.0, 91310.0, 196573.0, 157190.0, 882658.0],
        ['2018-10', 32239.0, 164288.0, 106850.0, 137938.0, 903276.0],
        ['2018-11', 81130.0, 119014.0, 372427.0, 229272.0, 1621868.0],
        ['2018-12', 11835.0, 74290.0, 156918.0, 123497.0, 943049.0],
        ['2019-01', 3578.0, 149821.0, 116951.0, 31892.0, 1075767.0],
        ['2019-02', 10498.0, 83231.0, 172464.0, 21454.0, 1220125.0],
        ['2019-03', 33288.0, 63360.0, 277456.0, 26311.0, 1883613.0],
        ['2019-04', 35744.0, 70159.0, 185674.0, 37732.0, 1773166.0],
        ['2019-05', 36355.0, 71836.0, 242307.0, 25704.0, 1826618.0],
        ['2019-06', 16662.0, 65543.0, 172900.0, 105136.0, 1496440.0],
        ['2019-07', 74006.0, 147010.0, 231663.0, 407490.0, 1840130.0],
        ['2019-08', 54323.0, 132264.0, 528535.0, 612248.0, 1782950.0],
        ['2019-09', 60903.0, 48399.0, 400141.0, 413664.0, 1681117.0],
        ['2019-10', 19632.0, 195520.0, 564179.0, 528089.0, 2552981.0],
        ['2019-11', 104102.0, 123527.0, 567929.0, 521612.0, 2681858.0],
        ['2019-12', 25757.0, 128553.0, 291974.0, 297891.0, 1624728.0],
        ['2020-01', 28833.0, 69789.0, 228853.0, 125459.0, 1374982.0],
        ['2020-02', 17179.0, 90961.0, 217704.0, 224815.0, 1797358.0],
        ['2020-03', 30853.0, 153172.0, 546047.0, 337870.0, 2648334.0],
        ['2020-04', 64717.0, 92311.0, 350926.0, 299823.0, 2752777.0],
        ['2020-05', 20976.0, 89209.0, 397768.0, 355191.0, 2860708.0],
        ['2020-06', 58386.0, 86880.0, 367812.0, 440221.0, 4458185.0],
        ['2020-07', 0.0, 115490.0, 350627.0, 184471.0, 1530210.0],
        ['2020-08', 42510.0, 288768.0, 309483.0, 411062.0, 2180895.0],
        ['2020-09', 13325.0, 115774.0, 295579.0, 408612.0, 3845904.0],
        ['2020-10', 46803.0, 120355.0, 435787.0, 564406.0, 3456551.0],
        ['2020-11', 192548.0, 313801.0, 886602.0, 869631.0, 5705787.0],
        ['2020-12', 21395.0, 54711.0, 328457.0, 410944.0, 2709820.0],
        ['2021-01', 19974.0, 154474.0, 380384.0, 204431.0, 2762923.0],
        ['2021-02', 59376.0, 152485.0, 428069.0, 281050.0, 2648397.0],
        ['2021-03', 77614.0, 223082.0, 956947.0, 613981.0, 4282054.0],
        ['2021-04', 47667.0, 119579.0, 594214.0, 536175.0, 3853403.0],
        ['2021-05', 113491.0, 270318.0, 790118.0, 541323.0, 3779992.0],
        ['2021-06', 66441.0, 299800.0, 518238.0, 1050754.0, 5601549.0],
        ['2021-07', 34152.0, 104577.0, 380361.0, 313164.0, 3018684.0]
      ]
    },
    {
      // 序号为 1 的 dataset。
      source: [
        [
          'mon',
          'per(01) top1-20',
          'per(02) top21-100',
          'per(03) top101-500',
          'per(04) top501-1000',
          'per other'
        ],
        ['2018-01', 6.74, 2.21, 13.26, 12.18, 65.61],
        ['2018-02', 7.36, 3.88, 14.76, 14.9, 59.1],
        ['2018-03', 0.0, 3.83, 17.49, 14.2, 64.48],
        ['2018-04', 1.77, 7.23, 15.36, 12.43, 63.21],
        ['2018-05', 2.74, 6.36, 13.51, 16.52, 60.87],
        ['2018-06', 4.43, 6.52, 12.37, 12.08, 64.61],
        ['2018-07', 2.33, 4.26, 9.5, 12.18, 71.72],
        ['2018-08', 1.52, 3.55, 11.88, 11.34, 71.71],
        ['2018-09', 2.19, 6.73, 14.48, 11.58, 65.02],
        ['2018-10', 2.4, 12.22, 7.95, 10.26, 67.18],
        ['2018-11', 3.35, 4.91, 15.37, 9.46, 66.92],
        ['2018-12', 0.9, 5.67, 11.98, 9.43, 72.01],
        ['2019-01', 0.26, 10.87, 8.49, 2.31, 78.07],
        ['2019-02', 0.7, 5.52, 11.44, 1.42, 80.92],
        ['2019-03', 1.46, 2.77, 12.15, 1.15, 82.47],
        ['2019-04', 1.7, 3.34, 8.83, 1.79, 84.34],
        ['2019-05', 1.65, 3.26, 11.0, 1.17, 82.92],
        ['2019-06', 0.9, 3.53, 9.31, 5.66, 80.6],
        ['2019-07', 2.74, 5.44, 8.58, 15.09, 68.15],
        ['2019-08', 1.75, 4.25, 16.99, 19.68, 57.32],
        ['2019-09', 2.34, 1.86, 15.37, 15.88, 64.55],
        ['2019-10', 0.51, 5.06, 14.61, 13.68, 66.13],
        ['2019-11', 2.6, 3.09, 14.2, 13.04, 67.06],
        ['2019-12', 1.09, 5.43, 12.33, 12.58, 68.59],
        ['2020-01', 1.58, 3.82, 12.52, 6.86, 75.22],
        ['2020-02', 0.73, 3.87, 9.27, 9.57, 76.55],
        ['2020-03', 0.83, 4.12, 14.69, 9.09, 71.26],
        ['2020-04', 1.82, 2.59, 9.86, 8.42, 77.31],
        ['2020-05', 0.56, 2.4, 10.68, 9.54, 76.82],
        ['2020-06', 1.08, 1.61, 6.8, 8.13, 82.38],
        ['2020-07', 0.0, 5.3, 16.08, 8.46, 70.17],
        ['2020-08', 1.31, 8.93, 9.57, 12.72, 67.46],
        ['2020-09', 0.28, 2.47, 6.32, 8.73, 82.19],
        ['2020-10', 1.01, 2.6, 9.42, 12.21, 74.75],
        ['2020-11', 2.42, 3.94, 11.13, 10.91, 71.61],
        ['2020-12', 0.61, 1.55, 9.32, 11.66, 76.87],
        ['2021-01', 0.57, 4.39, 10.8, 5.8, 78.44],
        ['2021-02', 1.66, 4.27, 11.99, 7.87, 74.2],
        ['2021-03', 1.26, 3.63, 15.55, 9.98, 69.59],
        ['2021-04', 0.93, 2.32, 11.54, 10.41, 74.81],
        ['2021-05', 2.07, 4.92, 14.38, 9.85, 68.79],
        ['2021-06', 0.88, 3.98, 6.88, 13.94, 74.32],
        ['2021-07', 0.89, 2.72, 9.88, 8.13, 78.39]
      ]
    }
  ],
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: 'category' },
  // 声明一个 Y 轴，数值轴。
  yAxis: [
    {
      type: 'value',
      name: 'top',
      // min: 0,
      // max: 8000000,
      // interval: 2000000,
      axisLabel: {
        formatter: function (value) {
          if (value === 0) {
            return 0;
          }
          return value / 1000000 + 'M';
        }
      }
    },
    {
      type: 'value',
      name: 'per'
      // min: 0,
      // max: 100,
      // interval: 20,
      // axisLabel: {
      //   formatter: '{value}'
      // }
    }
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
    {
      type: 'bar',
      stack: 'ad',
      datasetIndex: 0,
      emphasis: { focus: 'series' },
      color: 'rgba(255, 40, 145, 0.6)'
    },
    {
      type: 'bar',
      stack: 'ad',
      datasetIndex: 0,
      emphasis: { focus: 'series' },
      color: 'rgba(60, 227, 145, 0.6)'
    },
    {
      type: 'bar',
      stack: 'ad',
      datasetIndex: 0,
      emphasis: { focus: 'series' },
      color: 'rgba(60, 27, 145, 0.6)'
    },
    {
      type: 'bar',
      stack: 'ad',
      datasetIndex: 0,
      emphasis: { focus: 'series' },
      color: 'rgba(85, 114, 208,0.6)'
    },
    {
      type: 'bar',
      stack: 'ad',
      datasetIndex: 0,
      emphasis: { focus: 'series' },
      color: 'rgba(252, 185, 75,0.6)'
    },
    {
      type: 'line',
      datasetIndex: 1,
      emphasis: { focus: 'series' },
      yAxisIndex: 1,
      lineStyle: { width: 3 },
      color: 'rgba(255, 40, 145, 0.9)'
    },
    {
      type: 'line',
      datasetIndex: 1,
      emphasis: { focus: 'series' },
      yAxisIndex: 1,
      lineStyle: { width: 3 },
      color: 'rgba(60, 227, 145, 0.9)'
    },
    {
      type: 'line',
      datasetIndex: 1,
      emphasis: { focus: 'series' },
      yAxisIndex: 1,
      lineStyle: { width: 3 },
      color: 'rgba(60, 27, 145, 0.9)'
    },
    {
      type: 'line',
      datasetIndex: 1,
      emphasis: { focus: 'series' },
      yAxisIndex: 1,
      lineStyle: { width: 3 },
      color: 'rgba(85, 114, 208,0.9)'
    },
    {
      type: 'line',
      datasetIndex: 1,
      emphasis: { focus: 'series' },
      yAxisIndex: 1,
      lineStyle: { width: 3 },
      color: 'rgba(252, 185, 75,0.9)'
    }
  ]


})

```

```
import React, { useEffect } from 'react';
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例


const ComboChart = ({ data, tableActive, chartActive, setTableActive, setChartActive }) => {

  // console.log(chartActive)
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: true,
        // enterable: true,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#fff'
          }
        },
        position: function (point, params, dom, rect, size) {
          // 上部
          return [point[0] - 65, point[1] - 220];
        },
        transitionDuration: 1.2 //跟随鼠标延迟
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      dataset: {
        source: data
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '10%'

      },
      xAxis: {
        type: 'category',
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'users',
          axisLabel: {
            formatter: function (value) {
              if (value === 0) { return 0 }
              return value / 1000 + 'k'
            }
          }
        },
        {
          type: 'value',
          name: 'arpu',

          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        { id: 'bar', type: 'bar', color: '#6076fa', yAxisIndex: 0, clip: false },
        {
          id: 'line',
          type: 'line',
          color: '#de72f7',
          // smooth: true,
          yAxisIndex: 1,
          lineStyle: { width: data.length < 8 ? 7 : 4 },
          symbol: "circle",
          // showSymbol:false,
          symbolSize: (val, params) => {

            if (chartActive >= 0) {
              if (params.dataIndex === chartActive) { return data.length < 8 ? 20 : 12 }
              if (params.dataIndex === chartActive - 1) { return data.length < 8 ? 12 : 7 }
              if (params.dataIndex === chartActive + 1) { return data.length < 8 ? 12 : 7 }
            }
            return 4
          }
        }
      ]
    });





    myChart.on('click', function (e) {
      setChartActive('')
      setTableActive(e.data[0])
      myChart.setOption({
        series: [
          {
            id: 'line',
            symbolSize: (val, params) => {
              if (chartActive >= 0) {
                if (params.dataIndex === chartActive) { return data.length < 8 ? 20 : 12 }
                if (params.dataIndex === chartActive - 1) { return data.length < 8 ? 12 : 7 }
                if (params.dataIndex === chartActive + 1) { return data.length < 8 ? 12 : 7 }
              }
              return 4
            }
          }
        ]
      });
    });

    window.onresize = function () {
      myChart.resize();
    }
  }, [chartActive, data])

  return (
    <div id='main' style={{ height: '400px', maxWidth: '1100px' }} ></div>
  )
};

export default ComboChart;
```

1. **single line chart & single bar chart**

   

2. **Muti lines chart** 

   

3. ***Single line chart & stacked bar chart. Single yaxis***

   

4. **Muti lines chart & stacked bar chart**

   

5. **stacked bar chart**



```
        // let myChart = echarts.init(document.getElementById('main'));

        // myChart.setOption({
        //     legend: {
        //     },
        //     grid: {
        //         left: '3%',
        //         right: '3%',
        //         bottom: '10%'
        //     },
        //     tooltip: {
        //         trigger: 'axis',
        //         showContent: true,
        //         enterable: false,
        //         backgroundColor: 'rgba(255, 255, 255, 0.9)',
        //         axisPointer: {
        //             type: 'cross',
        //             crossStyle: {
        //                 color: '#fff'
        //             }
        //         },
        //         position:

        //             function (pos, params, dom, rect, size) {
        //                 // tooltip will be fixed on the right if mouse hovering on the left,
        //                 // and on the left if hovering on the right.
        //                 var obj = { top: 60 };
        //                 obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        //                 return obj;
        //             },
        //         transitionDuration: 1.2 //跟随鼠标延迟
        //     },
        //     toolbox: {
        //         orient: 'vertical',
        //         itemSize: 12,
        //         itemGap: 15,
        //         feature: {
        //             restore: { show: true },
        //             saveAsImage: { show: true }
        //         }
        //     },
        //     dataset:Object.keys(data.plt).map(s => (
        //                 {
        //                     source: data.plt[s]
        //                 }
        //             ))
        //     ,

        //     // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        //     xAxis: { type: 'category' },
        //     // 声明一个 Y 轴，数值轴。
        //     yAxis: [
        //         {
        //             type: 'value',
        //             name: 'top',
        //             axisLabel: {
        //                 formatter: function (value) {
        //                     if (value === 0) {
        //                         return 0;
        //                     }
        //                     return value / 1000000 + 'M';
        //                 }
        //             }
        //         },
        //         {
        //             type: 'value',
        //             name: 'per'
        //         }
        //     ],
        //     // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        //     series: (function () {

        //         console.log(Object.keys(data.plt))

        //         let barSeries = data.plt[Object.keys(data.plt)[0]][0].map(s => ({
        //             type: 'bar',
        //             stack: 'same',
        //             datasetIndex: 0,
        //             emphasis: { focus: 'series' },
        //         }))

        //         let lineSeries = data.plt[Object.keys(data.plt)[1]][0].map(s => ({
        //             type: 'line',
        //             datasetIndex: 1,
        //             emphasis: { focus: 'series' },
        //             yAxisIndex: 1,
        //             lineStyle: { width: 3 }
        //         }))
        //         barSeries.shift()
        //         lineSeries.shift()

        //         return barSeries.concat(lineSeries)
        //     })()
        // })


        // window.onresize = function () {
        //     myChart.resize();
        // }
```

## 细节

+ Setoption(option, **true**).

  当option变化时清除之前那个图，如果不加true，纬度切换时会出现legend变化不更新问题

+ Chart .on

  通过id和name锁定，必须唯一





## 成功

dim.options