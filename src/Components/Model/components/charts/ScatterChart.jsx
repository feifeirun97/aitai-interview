import React, { useEffect } from 'react'
import * as echarts from 'echarts';

function ScatterChart({ index, data }) {

  console.log('this is received data:,', data)
  // console.log('this is scatter data:,',scatterData)


  useEffect(() => {
    let myChart = echarts.init(document.getElementById(`main${index}`));

    if (data && data.scatter_data) {
      let scatterData = data.scatter_data
      myChart.hideLoading();
      myChart.setOption({
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: true,
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
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        dataset: scatterData.map(s => (
          { source: s.data }
        )),
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%'

        },
        xAxis: {
          type: 'value',
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
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0],
            start: 0,
            end: 10
          },
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            start: 10,
            end: 30
          },
        ],
        series: scatterData.map((s, index) => (
          {
            name: s.type,
            symbolSize: function (val) {
              let v
              switch (true) {
                case (Math.abs(val[2]) < 10): v = 6; break
                case (10 <= Math.abs(val[2]) < 100): v = 18; break
                case (100 <= Math.abs(val[2])): v = 25; break
                default: v = 1
              }
              return v
            },
            datasetIndex: index,
            type: 'scatter'
          }
        ))
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
}

export default ScatterChart
