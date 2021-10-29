import { Typography } from 'antd'
import { Menu, Dropdown, Button, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';
import { useSelector } from 'react-redux';

const DemoBar = () => {
  const tableChange = useSelector((state) => state.tableChange);
  const dataT1 = [
    { product: '产品线A', type: '实际', value: 30.6, },
    { product: '产品线A', type: '预测', value: 20.4, },
    { product: '产品线B', type: '实际', value: 20.5, },
    { product: '产品线B', type: '预测', value: 18.6, },
  ];
  const dataT2 = [
    { product: '上海', type: '实际', value: 28.9, },
    { product: '上海', type: '预测', value: 15.3, },
    { product: '北京', type: '实际', value: 16.4, },
    { product: '北京', type: '预测', value: 10.1, },
  ];
  const data = tableChange===1 ? dataT1 : dataT2
  const config = {
    data: data.reverse(),
    xField: 'value',
    yField: 'type',
    seriesField: 'product',
    isStack: true,
    color: ['#4875db', '#f95c6a'],
    legend: {
      // layout: 'horizontal',
      position: 'bottom'
    },
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
      render: text => <p>{text}%</p>,

    },
  };
  return <Bar {...config} />;
};

const { Text } = Typography;

const seasons = [
  '2019Q2',
  '2019Q3',
  '2019Q4',
  '2020Q1',
  '2020Q2E',
  '2020Q3E',
  '2020Q4E',
  '2021Q1E'
]

const menu = (setBtnValue) => (
  <Menu>
    {seasons.map((s) => (
      <Menu.Item key={s} onClick={() => setBtnValue(s)}>
        {s}
      </Menu.Item>
    ))}
  </Menu>

);

function Barchart() {
  const [btnValue, setBtnValue] = useState(seasons[0]);
  return (
    <div>
      <Space align='center' size='middle'>
        <Text style={{ fontSize: '1.2rem', fontWeight: '700' }}>构成</Text>
        <Dropdown overlay={menu(setBtnValue)} trigger={['click']}>
          <Button
            shape="round"
            size='small'
            style={{
              boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.1)',
              fontSize: '0.7rem',
            }}
          >
            {btnValue}
            <CaretDownOutlined />
          </Button>
        </Dropdown>
      </Space>

      <div className="" style={{ height: '9rem', maxWidth:'40rem', marginTop: '1rem' }}>
        <DemoBar />
      </div>


    </div>
  )
}

export default Barchart
