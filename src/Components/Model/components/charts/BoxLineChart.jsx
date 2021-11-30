import { useEffect } from "react";
import * as echarts from 'echarts';

const BoxLineChart = ({ linkActive, index, data, onChange }) => {

  useEffect(() => {
    let myChart = echarts.init(document.getElementById(`main${index}`));
    if (data) {
      myChart.hideLoading();
      myChart.setOption({
        legend: {},
        dataset: [
          {
            source: data.boxData
          },
          {
            transform: {
              type: 'boxplot',
              config: {
                itemNameFormatter: (d) => {
                  return data.period_list[d.value];
                }
              }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1
          },
          {
            source: [
              ['period_list', ...data.lineData.map((item) => item.title)],
              ...data.period_list.map((item, index) => {
                return [item, ...data.lineData.map((d) => d.data[index])];
              })
            ]
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '8%',
          top: '8%'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          splitArea: {
            show: false
          },
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
        series: [
          {
            name: data.boxTitle,
            type: 'boxplot',
            datasetIndex: 1
          },
          {
            name: data.scatterTitle,
            type: 'scatter',
            datasetIndex: 2,
            symbolSize: 5
          },
          ...data.lineData.map((item) => ({
            type: 'line',
            datasetIndex: 3,
            symbol: 'circle',
            lineStyle: { width: 2 },
            symbolSize: (val, params) => {
              if (linkActive >= 0) {
                if (params.dataIndex === linkActive - 1) { return data.length < 8 ? 20 : 10 }
                if (params.dataIndex === linkActive - 2) { return data.length < 8 ? 12 : 5 }
                if (params.dataIndex === linkActive) { return data.length < 8 ? 12 : 5 }
              }
              return 2
            }
          }))
        ]
      }, true); //legend变化不更新，必须加true

      myChart.on('click', function (e) {
        //先把之前的放大状态清空
        // console.log(e)
        onChange(e.dataIndex + 1)
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
    } else {
      myChart.showLoading();
    }

  }, [linkActive, data])

  return (
    <div id={'main' + index} style={{ height: '400px', width: '100%' }} ></div>
  )
};


export default BoxLineChart;
