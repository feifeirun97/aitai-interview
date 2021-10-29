import {  Table } from 'antd';
import { Typography } from 'antd';
import React from 'react'

import { BarChartOutlined } from '@ant-design/icons';

import './Tables.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../Redux/index"

const { Title } = Typography;


const columns = [
  {
    title: '投资主体',
    dataIndex: 'name',
    width: '24%'
  },
  {
    title: '2019Q2',
    dataIndex: 'q22019',
    width: '9.5%'
  },
  {
    title: '2019Q3',
    dataIndex: 'q32019',
    width:  '9.5%'
  },
  {
    title: '2019Q4',
    dataIndex: 'q42019',
    width:  '9.5%'
  },
  {
    title: '2020Q1',
    dataIndex: 'q12020',
    width:  '9.5%'
  },
  {
    title: '2020Q2E',
    dataIndex: 'q2e2020',
    width:  '9.5%'
  },
  {
    title: '2020Q3E',
    dataIndex: 'q3e2020',
    width:  '9.5%'
  },
  {
    title: '2020Q4E',
    dataIndex: 'q4e2020',
    width:  '9.5%'
  },
  {
    title: '2021Q1E',
    dataIndex: 'q1e2021',
    width: '9.5%'
  },
];
const data1 = [
  {
    key: '1',
    name: '产品线A',
    q22019: '28.9%',
    q32019: '35.4%',
    q42019: '28.9%',
    q12020: '35.4%',
    q2e2020: '28.9%',
    q3e2020: '35.4%',
    q4e2020: '28.9%',
    q1e2021: '35.4%',
  },
  {
    key: '2',
    name: '产品线B',
    age: 42,
    q22019: '28.9%',
    q32019: '35.4%',
    q42019: '28.9%',
    q12020: '35.4%',
    q2e2020: '28.9%',
    q3e2020: '35.4%',
    q4e2020: '28.9%',
    q1e2021: '35.4%',
  },
  {
    key: '3',
    name: '产品线C',
    age: 32,
    q22019: '28.9%',
    q32019: '35.4%',
    q42019: '28.9%',
    q12020: '35.4%',
    q2e2020: '28.9%',
    q3e2020: '35.4%',
    q4e2020: '28.9%',
    q1e2021: '35.4%',
  },
];
const data2 = [
  {
    key: '1',
    name: '上海',
    q22019: '28.9%',
    q32019: '35.4%',
    q42019: '28.9%',
    q12020: '35.4%',
    q2e2020: '28.9%',
    q3e2020: '35.4%',
    q4e2020: '28.9%',
    q1e2021: '35.4%',
  },
  {
    key: '2',
    name: '北京',
    age: 42,
    q22019: '28.9%',
    q32019: '35.4%',
    q42019: '28.9%',
    q12020: '35.4%',
    q2e2020: '28.9%',
    q3e2020: '35.4%',
    q4e2020: '28.9%',
    q1e2021: '35.4%',
  },
  {
    key: '3',
    name: '广州',
    age: 32,
    q22019: '28.9%',
    q32019: '35.4%',
    q42019: '28.9%',
    q12020: '35.4%',
    q2e2020: '28.9%',
    q3e2020: '35.4%',
    q4e2020: '28.9%',
    q1e2021: '35.4%',
  },
];
const Titles= [
  '2019Q2',
  '2019Q3',
  '2019Q4',
  '2020Q1',
  '2020Q2E',
  '2020Q3E',
  '2020Q4E',
  '2021Q1E'
]

export default function TableCustomized() {
  //connect to redux store
  const tableChange = useSelector((state) => state.tableChange);
  const dispatch = useDispatch();
  const { changeT1, changeT2 } = bindActionCreators(actionCreators, dispatch);
  //state=1, selectT1
  //state=2, selectT2
  const selectedT1 = tableChange===1? true :false;
  const selectedT2 = tableChange===2? true :false;
  console.log(tableChange);
  return (
    <div >
      <div style={{display:'flex',alignItems:'center',height:'2.5rem',backgroundColor:'#f8f8f8',padding:'0 0.5rem',margin:'1rem 0'}}>
        <div style={{ fontSize: '0.9rem', fontWeight: '700',width:'24%'}}>投资主体</div>
        {Titles.map((title)=>(
          <div key={title} style={{ fontSize: '0.9rem', fontWeight: '700', width:'9.5%' }}>{title} </div>
        ))}

      </div>
      <div className={`table ${selectedT1 && "table-active"}`} style={{marginBottom:'1.5rem'}} onClick={()=>changeT1()}>
        <div className={`table ${selectedT1 && "tableName-active"}`} style={{display:'flex',alignItems:'center'}}>
          <div className={`${selectedT1 ? "selectBar-active":"selectBar"}`}></div>
          <Title style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0.5rem 1rem 0.5rem 0.2rem' }}>产品</Title>
          <BarChartOutlined style={{ fontSize: '1.2rem'}}/>
        </div>
        <Table  showHeader={false} tableLayout='fixed' columns={columns} dataSource={data1} size="middle" pagination={{ position: ["none", "none"] }} />
      </div>

      <div className={`table ${selectedT2 && "table-active"}`} style={{marginBottom:'1.5rem'}} onClick={()=>changeT2()}>
        <div className={`table ${selectedT2 && "tableName-active"}`} style={{display:'flex',alignItems:'center'}}>
          <div className={`${selectedT2 ? "selectBar-active":"selectBar"}`}></div>
          <Title style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0.5rem 1rem 0.5rem 0.2rem' }}>产品</Title>
          <BarChartOutlined style={{ fontSize: '1.2rem'}}/>
        </div>
        <Table  showHeader={false} tableLayout='fixed' columns={columns} dataSource={data2} size="middle" pagination={{ position: ["none", "none"] }} />
      </div>
    </div>
  )
}
