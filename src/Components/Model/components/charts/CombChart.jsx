import React, { useEffect } from 'react';
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例


const ComboChart = ({ index,data,linkActive,onChange }) => {
  // console.log('chartData',data)

  useEffect(() => {

    let myChart = echarts.init(document.getElementById(`main${index}`));
    if (data) {
      myChart.hideLoading();
      myChart.setOption({
        legend: {},
        tooltip: {
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
          left: '5%',
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

            
            axisLabel: {
              formatter: function (value) {
                let val = Math.abs(value)
                if (val >= 1000000) {
                  return value / 1000000 + 'M'
                }
                else if (val >= 1000) {
                  return value / 1000 + 'k'
                }

                return value
              }
            },
          },
          {
            type: 'value',

            axisLabel: {
              formatter: function (value) {
                let val = Math.abs(value)
                if (val >= 1000000) {
                  return value / 1000000 + 'M'
                }
                else if (val >= 1000) {
                  return value / 1000 + 'k'
                }

                return value
              }
            },
          }
        ],
        series: (function () {
          let barSeries = []
          if (data.bar_data.length !== 0) {
            barSeries = data.bar_data[0].map(s => ({
              type: 'bar',
              barMaxWidth:120,
              stack: 'same',
              datasetIndex: 0,
              // emphasis: { focus: 'series' },
            }))
          }

          let lineSeries = []
          if (data.line_data.length !== 0) {
            lineSeries = data.line_data[0].map(s => ({
              type: 'line',
              datasetIndex: 1,
              // emphasis: { focus: 'series' },
              yAxisIndex: 1,
              symbol: 'circle',
              lineStyle: { width: 3 },
              symbolSize: (val, params) => {
                const dataLength = data[Object.keys(data)[0]].length
            
                if (linkActive >= 0) {
                  if (params.dataIndex === linkActive -1) { return dataLength < 8 ? 20 : 10}
                  if (params.dataIndex === linkActive - 2) { return dataLength < 8 ? 12 : 7 }
                  if (params.dataIndex === linkActive ) { return dataLength< 8 ? 12 : 7}
                }
                return 3.5
              }

            }))
          }

          barSeries.shift()
          lineSeries.shift()
          let a = barSeries.concat(lineSeries)
          // console.log('series:', a)
          return a

        })()
      }, true); //legend变化不更新，必须加true


      myChart.on('click', function (e) {
        //先把之前的放大状态清空

        onChange(e.dataIndex+1)        
        myChart.setOption({
          series: [
            {
              id: 'aaa',
              symbolSize: (val, params) => {
                // console.log(params.dataIndex,e.dataIndex)
                const dataLength = data[Object.keys(data)[0]].length
                if (params.dataIndex === e.dataIndex) { return dataLength < 8 ? 20 : 12 }
                if (params.dataIndex === e.dataIndex - 1) { return dataLength < 8 ? 12 : 7 }
                if (params.dataIndex === e.dataIndex + 1) { return dataLength < 8 ? 12 : 7 }

                return 3.5
              }
            }
          ]
        });
      });

      window.onresize = function () {
        myChart.resize();
      }
    } else {
      myChart.showLoading();
    }

  }, [linkActive, data])

  return (
    <div id={'main'+index} style={{ height: '400px',width:'100%'}} ></div>
  )
};

export default ComboChart;