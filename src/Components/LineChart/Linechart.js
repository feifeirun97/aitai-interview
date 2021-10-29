import { Typography } from 'antd'

import { Menu, Dropdown, Button, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { useSelector } from 'react-redux';

const { Text } = Typography;


const DemoLine = () => {
  const tableChange = useSelector((state) => state.tableChange);
  const dataT1 = [
    { Date: '2019Q2', scales: 28.9, category: '产品线A' },
    { Date: '2019Q2', scales: 2.9, category: '产品线B' },
    { Date: '2019Q3', scales: 25.4, category: '产品线A' },
    { Date: '2019Q3', scales: 29.9, category: '产品线B' },
    { Date: '2019Q4', scales: 13.9, category: '产品线A' },
    { Date: '2019Q4', scales: 2.9, category: '产品线B' },
    { Date: '2020Q1', scales: 15.4, category: '产品线A' },
    { Date: '2020Q1', scales: 29.9, category: '产品线B' },
    { Date: '2020Q2E', scales: 9.9, category: '产品线A' },
    { Date: '2020Q2E', scales: 17.9, category: '产品线B' },
    { Date: '2020Q3E', scales: 19.4, category: '产品线A' },
    { Date: '2020Q3E', scales: 29.9, category: '产品线B' },
    { Date: '2020Q4E', scales: 15.3, category: '产品线A' },
    { Date: '2020Q4E', scales: 7.9, category: '产品线B' },
    { Date: '2021Q1E', scales: 3.4, category: '产品线A' },
    { Date: '2021Q1E', scales: 29.9, category: '产品线B' },
  ];
  const dataT2 = [
    { Date: '2019Q2', scales: 18.9, category: '上海' },
    { Date: '2019Q2', scales: 12.9, category: '北京' },
    { Date: '2019Q3', scales: 15.4, category: '上海' },
    { Date: '2019Q3', scales: 9.9, category: '北京' },
    { Date: '2019Q4', scales: 23.9, category: '上海' },
    { Date: '2019Q4', scales: 11.9, category: '北京' },
    { Date: '2020Q1', scales: 17.4, category: '上海' },
    { Date: '2020Q1', scales: 16.9, category: '北京' },
    { Date: '2020Q2E', scales: 7.9, category: '上海' },
    { Date: '2020Q2E', scales: 12.3, category: '北京' },
    { Date: '2020Q3E', scales: 17.4, category: '上海' },
    { Date: '2020Q3E', scales: 23.9, category: '北京' },
    { Date: '2020Q4E', scales: 11.3, category: '上海' },
    { Date: '2020Q4E', scales: 18.9, category: '北京' },
    { Date: '2021Q1E', scales: 15.4, category: '上海' },
    { Date: '2021Q1E', scales: 23.9, category: '北京' },
  ];
  const data = tableChange === 1 ? dataT1 : dataT2
  var config = {
    data: data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    seriesField: 'category',
    colorField: 'category', // 部分图表使用 seriesField
    color: ['#4875db', '#f95c6a'],
    point: {
      size: 3,
      shape: 'round',
    },
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.2,
      end: 1,
    },
  };
  return <Line {...config} />;
};



function LineChart() {

  return (
    <div>
      <Space align='center' size='middle'>
        <Text strong>构成</Text>

      </Space>


      <div className="" style={{ height: '10rem', maxWidth:'40rem', marginTop: '1rem' }}>
        <DemoLine />
      </div>
    </div>
  )
}

export default LineChart
