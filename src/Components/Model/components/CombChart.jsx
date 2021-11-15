import React, { useEffect } from 'react';
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例


const ComboChart = ({ data, tableActive, chartActive, setTableActive, setChartActive }) => {
  console.log('chartData',data)
 
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
        position:

            function (pos, params, dom, rect, size) {
                // tooltip will be fixed on the right if mouse hovering on the left,
                // and on the left if hovering on the right.
                var obj = { top: 60 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
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
      dataset: [
        {
          source: data.bar_data
        },
        {
          source: data.line_data
        },
      ],
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
          // name: 'users',
          axisLabel: {
            formatter: function (value) {
              if (value === 0) { return 0 }
              if (value > 1000000){
                return value / 1000000 + 'M'
              }
              else if (value > 1000){
                return value / 1000 + 'k'
              }
        
              return value
            }
          }
        },
        {
          type: 'value',
          // name: 'arpu',
          axisLabel: {
            formatter: function (value) {
              if (value === 0) { return 0 }
              if (value > 1000000){
                return value / 1000000 + 'M'
              }
              else if (value > 1000){
                return value / 1000 + 'k'
              }
        
              return value
            }
          }
        }
      ],
      series: (function () {

        let barSeries = data.bar_data[0].map(s => ({
          type: 'bar',
          stack: 'same',
          datasetIndex: 0,
          // emphasis: { focus: 'series' },
        }))

        let lineSeries = data.line_data[0].map(s => ({
          type: 'line',
          datasetIndex: 1,
          // emphasis: { focus: 'series' },
          yAxisIndex: 1,
          symbol:'circle',
          lineStyle: { width: 3 },
          symbolSize: (val, params) => {

            if (chartActive >= 0) {
              if (params.dataIndex === chartActive) { return data.length < 8 ? 20 : 12 }
              if (params.dataIndex === chartActive - 1) { return data.length < 8 ? 12 : 7 }
              if (params.dataIndex === chartActive + 1) { return data.length < 8 ? 12 : 7 }
            }
            return 4
          }
        
        }))

        barSeries.shift()
        lineSeries.shift()
        let a =barSeries.concat(lineSeries)
        console.log('series:',a)
        return a

      })()
    },true); //legend变化不更新，必须加true


    myChart.on('click', function (e) {
      //先把之前的放大状态清空
      // console.log(e)
      setChartActive('')
      setTableActive(e.data[0])
      myChart.setOption({
        series: [
          {
            id: 'aaa',
            symbolSize: (val, params) => {
              // console.log(params.dataIndex,e.dataIndex)
              
                if (params.dataIndex === e.dataIndex) { return data.length < 8 ? 20 : 12 }
                if (params.dataIndex === e.dataIndex - 1) { return data.length < 8 ? 12 : 7 }
                if (params.dataIndex === e.dataIndex + 1) { return data.length < 8 ? 12 : 7 }
              
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