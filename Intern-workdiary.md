# Echarts

![image-20211104150414370](https://i.loli.net/2021/11/04/imEvcJ7rs5Q8Loj.png)      // emphasis: {      //   focus: 'series'      // },

##### 调色color

```js
option = {
  // 全局调色盘。
  color: ['#c23531','#2f4554',],
  series: [
    {type: 'bar',
    // 此系列自己的调色盘。
     color: ['#dd6b66','#759aa0',]
    },
//89, 112, 250
const color=[rgb(89, 112, 250),rgb(222, 114, 247),rgb(59, 181, 216),rgb(252, 185, 75)]
    {type: 'bar',stack: 'ad',atasetIndex: 0,emphasis: {focus: 'series'},color:'rgba(89, 112, 250, 0.6)'},
    { type: 'bar', stack: 'ad', datasetIndex: 0,emphasis: {focus: 'series'},color:'rgba(222, 114, 247, 0.6)'},
    { type: 'bar', stack: 'ad', datasetIndex: 0 ,emphasis: {focus: 'series'},color:'rgba(59, 181, 216, 0.6)'},
    { type: 'bar', stack: 'ad', datasetIndex: 0,emphasis: {focus: 'series'},color:'rgba(252, 185, 75,0.6)'},
    // { type: 'bar', stack: 'ad', datasetIndex: 0,emphasis: {focus: 'series'}},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' }, yAxisIndex:1,lineStyle:{width:3},color:'rgba(89, 112, 250, 1)'},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' }, yAxisIndex:1,lineStyle:{width:3},color:'rgba(222, 114, 247, 1)'},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' } ,yAxisIndex:1,lineStyle:{width:3},color:'rgba(59, 181, 216, 1)'},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' } ,yAxisIndex:1,lineStyle:{width:3},color:'rgba(252, 185, 75,1)'},
```

##### 样式设置: itemStyle、lineStyle、areaStyle、label

```js
option = {
  series: {
    type: 'scatter',

    // 普通样式。
    itemStyle: {
      // 点的颜色。
      color: 'red'
    },
    label: {
      show: true,
      // 标签的文字。
      formatter: 'This is a normal label.'
    }
}
```

##### 高亮emphasis

```js
emphasis: {
    focus: 'series',
    itemStyle: {
    // 高亮时点的颜色。
         color: 'blue'
    },
    label: {
        show: true,
        // 高亮时标签的文字。
        formatter: 'This is a emphasis label.'
    }   
},
```

**example**

```js
const option1 = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: true,
    enterable: true,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff'
      }
    },
    position: function (point, params, dom, rect, size) {
      // 上部
      return [point[0] - 65, point[1] - 110];
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
    // 提供一份数据。
    dimensions: ['mon', 'users', 'arpu'],
    source: [
      { mon: '2018-01', users: 1543, arpu: 548.58 },
      { mon: '2018-02', users: 1202, arpu: 560.01 },
      { mon: '2018-03', users: 1974, arpu: 572.13 },
      { mon: '2018-04', users: 1957, arpu: 590.02 },
      { mon: '2018-05', users: 2029, arpu: 544.3 },
      { mon: '2018-06', users: 2033, arpu: 463.55 },
      { mon: '2018-07', users: 2619, arpu: 579.24 },
      { mon: '2018-08', users: 2646, arpu: 493.33 },
      { mon: '2018-09', users: 2741, arpu: 495.25 },
      { mon: '2018-10', users: 2927, arpu: 459.38 },
      { mon: '2018-11', users: 3546, arpu: 683.51 },
      { mon: '2018-12', users: 3071, arpu: 426.44 },
      { mon: '2019-01', users: 2824, arpu: 487.96 },
      { mon: '2019-02', users: 2976, arpu: 506.64 },
      { mon: '2019-03', users: 4338, arpu: 526.52 },
      { mon: '2019-04', users: 4426, arpu: 475.03 },
      { mon: '2019-05', users: 4722, arpu: 466.5 },
      { mon: '2019-06', users: 4511, arpu: 411.59 },
      { mon: '2019-07', users: 5373, arpu: 502.57 },
      { mon: '2019-08', users: 5684, arpu: 547.21 },
      { mon: '2019-09', users: 5622, arpu: 463.22 },
      { mon: '2019-10', users: 6515, arpu: 592.54 },
      { mon: '2019-11', users: 6598, arpu: 606.1 },
      { mon: '2019-12', users: 5762, arpu: 411.13 },
      { mon: '2020-01', users: 4302, arpu: 424.9 },
      { mon: '2020-02', users: 4765, arpu: 492.76 },
      { mon: '2020-03', users: 6842, arpu: 543.16 },
      { mon: '2020-04', users: 7289, arpu: 488.48 },
      { mon: '2020-05', users: 7298, arpu: 510.26 },
      { mon: '2020-06', users: 6076, arpu: 890.63 },
      { mon: '2020-07', users: 2398, arpu: 909.42 },
      { mon: '2020-08', users: 3672, arpu: 880.37 },
      { mon: '2020-09', users: 7679, arpu: 609.35 },
      { mon: '2020-10', users: 7771, arpu: 595.02 },
      { mon: '2020-11', users: 8750, arpu: 910.67 },
      { mon: '2020-12', users: 7214, arpu: 488.68 },
      { mon: '2021-01', users: 6797, arpu: 518.2 },
      { mon: '2021-02', users: 6337, arpu: 563.26 },
      { mon: '2021-03', users: 9256, arpu: 664.83 },
      { mon: '2021-04', users: 9307, arpu: 553.46 },
      { mon: '2021-05', users: 9724, arpu: 565.12 },
      { mon: '2021-06', users: 10579, arpu: 712.43 },
      { mon: '2021-07', users: 9128, arpu: 421.88 }
    ]
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
      min: 0,
      max: 10000,
      interval: 2000,
      axisLabel: {
        formatter: function(value) {
          if (value===0){return 0 }
          return value/1000 + 'k'
        }
      }
    },
    {
      type: 'value',
      name: 'arpu',
      min: 400,
      max: 950,
      interval: 100,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    { type: 'bar', color: '#22A7D9', yAxisIndex:0,},
    { type: 'line', color: '#FF8119',yAxisIndex: 1,}
  ]
};

```

##### example2

```js
//line+bar堆叠
option = {
    legend: { selected: {
      'per(01) top1-20':false,
      'per(02) top21-100':false,
      'per(03) top101-500':false,
      'per(04) top501-1000':false,
      'per other':false,
    }},
    tooltip: {
    trigger: 'axis',
    showContent: true,
    enterable: true,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff'
      }
    },
  },
  toolbox: {
    orient : 'vertical',
    itemSize:12,
    itemGap:15,
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
      name: 'per',
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
    {type: 'bar',stack: 'ad',atasetIndex: 0,emphasis: {focus: 'series'},color:'rgba(255, 40, 145, 0.4)'},
    { type: 'bar', stack: 'ad', datasetIndex: 0,emphasis: {focus: 'series'},color:'rgba(60, 227, 145, 0.4)'},
    { type: 'bar', stack: 'ad', datasetIndex: 0 ,emphasis: {focus: 'series'},color:'rgba(60, 27, 145, 0.4)'},
    // { type: 'bar', stack: 'ad', datasetIndex: 0,emphasis: {focus: 'series'}},
    // { type: 'bar', stack: 'ad', datasetIndex: 0,emphasis: {focus: 'series'}},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' }, yAxisIndex:1,lineStyle:{width:3},color:'rgba(255, 40, 145, 1)'},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' }, yAxisIndex:1,lineStyle:{width:3},color:'rgba(60, 227, 145, 1)'},
    { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' } ,yAxisIndex:1,lineStyle:{width:3},color:'rgba(60, 27, 145, 1)'},
    // { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' } ,yAxisIndex:1,lineStyle:{width:3}},
    // { type: 'line', datasetIndex: 1, emphasis: { focus: 'series' } ,yAxisIndex:1,lineStyle:{width:3}},
    
    
  ]
};

```



```json
//直角坐标系
grid:{
    show:false,//坐标系
    top:"20%",   //离上部分距离
    tooltip: {
      show: true,
      trigger: "axis" //再坐标轴就显示
    }
}
yAxis: [{
    type: "value",
    logBase: 10,
    axisLine: {
        show: false //取消y轴
    }
}],

tooltip: {
    trigger: 'axis',
    showContent: true,
    enterable: true,//可以进入tooltip,
    transitionDuration:0.9,//跟随鼠标延迟
    axisPointer: {
        type: 'cross',
        crossStyle: {
            color: '#999'
        }
    },
    position: function (point, params, dom, rect, size) {
    // tooltip浮动鼠标上部
    return [point[0]-65, point[1]-110];
    }
  
},
```

## CSS

```css
box-shadow: 0 2px 10px 0 rgb(51 51 79 / 2%);
border-radius: 10px;

/*graph toolbar*/
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
border-bottom: 1px solid #E6E6FF;
padding-bottom: 0.375rem;
margin-bottom: 1.75rem;
align-items: flex-start;
```



## Axios

> 2层错误码，http外封装自己的代码
>
> 错误也返回200，包含data【0000，。。。】
>
> 跨域proxy

##### Example

```jsx
  const handleClose = () => {
    if (query.version === undefined) {
      request("service-postInvestment/businessProcessNode/deleteTempProcess", {
        method: "GET",
        params: {
          id: data.id,
        },
      }).then((res) => {
        callback();
      });
    } else {
      handlerClose(index)
    }
  };
  
  
    useEffect(() => {
    if (!reqType) return;

    request('service-postInvestment/projectMaintain/getDictByType', 
    {
      method: 'GET',
      params: {
        type: reqType
      }
    })
    .then(res => {
      setList([...res.data.data])
    })

  }, reqType)



  useEffect(() => {
    // get GP info list
    request('service-postInvestment/childfund/getGpSelectList', {
      method: 'get'
    }).then((res) => {
      setGpList(res.data.data);
    }).catch((err) => {
      console.log(err);
      message.error("获取GP数据失败");
    });

```



```jsx
    await request('service-postInvestment/childfund/saveChildfundPre', {
      method: 'post',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      console.log(res);
      message.success("子基金创建成功！");
      setLoading(false);

      props.handleCancel();
      props.queryFunds();
    }).catch(err => {
      console.log(err);
      message.error("创建失败！");
      setLoading(false);
    });
  }
  
  const getlistGp = async (params) => {
    let res = await getData(API.listGp, {
      data: params,
      method: 'POST'
    })
    let shortNameArr = [];
    res.dataList.forEach(item => {
      shortNameArr.push({ text: item.shortName, value: item.shortName })
      item.gpStrategy = formatGpStrategyData(item.gpStrategy)
    })
    setGpList(res)
    setFlterData({ shortNameArr })
  }
```

##### Mine

```jsx
// console.log(dataSwitch)
const getURL = 'http://192.168.8.165:5020/service-itdd-get/get_drive_user_arpu_doc'
const postURL = 'http://192.168.8.165:5020/service-itdd-post/get_drive_user_arpu'
axios.get(getURL)
.then(
res => console.log(res.data.content)
)
.catch(
err=>console.log('err:',err)
)

axios.post(postURL, {
proj_id: 'gc_dxm',
period: 'Y'
})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
```

## JavaScript

##### 对象循环

```

```



## React

##### 渲染

```jsx
//首次加载先从上往下执行，遇到useEffect跳过
//按顺序运行useEffect，运行完刷新一次
//state变化刷新一次
```





## AntD Pro









## Questions

#### Week2-day2

> Class extends--- this.state  和 function的选择
>
> 是大组件用class extends + this.state, 小组件用function + hook吗 【model文件夹下观察得到】

```jsx
//页面级用class， 看个人习惯
```



> utils文件夹下是什么

```jsx
//公用文件
```



> import { history } from "umi". umi的history和react-router-dom的history是一个东西吗？

```jsx

history.push("/modifyPSW");
//一个东西
```



> routes理解？

```jsx
//config.js调试
```



> 结构理解？
>
> + Src下的Components是自定义的组件吗
>
> + utils文件夹下是什么

```jsx
//pages当前页面组件
//src下是公用的，用的比较多
//utils公用
```



> Layout理解？
>
> antd官网的layout是<Sider><Content><Header>,开发中也是按这样的来吗
>
> model里的代码是前人自己写的css布局的的

```jsx
//content部分自己写
```





##### Week2-day4

> ::before理解？
>
> 点击后加一个before元素表示被激活
>
> 是通过getElements去设定style.before, 还是通过判断新加一个classname

```jsx
//一般通过classname去判断
//：before比div简单
```

> antdPro学习路线/先后顺序？
>
> 重要程度 a- b- c-
>
> less	
>
> axios	
>
> proxy	
>
> dva [redux plus]	
>
> webpack	
>
> umi	

![image-20211111171516010](/Users/xufei/Library/Application Support/typora-user-images/image-20211111171516010.png)

```jsx
//
```

