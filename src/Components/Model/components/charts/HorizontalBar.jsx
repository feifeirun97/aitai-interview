import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { toDollarAuto,toPercentage } from '../../utils/math'
// 基于准备好的dom，初始化echarts实例
const HorizontalBar = ({ index, data }) => {
  // console.log('chartData',data)

  useEffect(() => {

    let myChart = echarts.init(document.getElementById(`main${index}`));
    if (data) {
      myChart.hideLoading();
      myChart.setOption({
        legend: {},
        
        tooltip: {
          position: 'top',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#fff'
            }
          },
          formatter:(params,ticket,callback)=>{
            return `${params.data[0]}<br />
            ${params.marker + params.seriesName + ': ' + toDollarAuto(params.data[1])}`;
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
            source: data.bar_data_amt
          },
          {
            source: data.bar_data_per
          },
        ],
        grid: [{ right: '55%' }, { left: '55%' }],
        xAxis: [
          {
            gridIndex: 0,
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
          }, {
            gridIndex: 1,
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
        ],
        yAxis: [
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 }
        ],
        series: [
          // These series are in the first grid.
          {
            type: 'bar',
            datasetIndex: 0,
            seriesLayoutBy: 'row',
            label: {
              show:true,
              color:'#4d67bc',
              position: 'right',
              formatter: function (params) {
                return toDollarAuto(params.value[params.encode.x[0]])  ;
              }
            }
          },
          // These series are in the second grid.
          {
            type: 'bar',
            datasetIndex: 1,
            seriesLayoutBy: 'row',
            xAxisIndex: 1,
            yAxisIndex: 1,
            label: {
              show:true,
              color:'#4d67bc',
              position: 'right',
              formatter: function (params) {
                return toPercentage(params.value[params.encode.x[0]])  ;
              }
            }
          }
        ]

      }, true); //legend变化不更新，必须加true




      window.onresize = function () {
        myChart.resize();
      }
    } else {
      myChart.showLoading();
    }

  }, [data])

  return (
    <div id={'main' + index} style={{ height: '400px', width: '100%' }} ></div>
  )
};

export default HorizontalBar;