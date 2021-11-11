import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Menu } from 'antd';

import './style.css'
import Axios from 'axios'
import { DownOutlined } from '@ant-design/icons';



function GraphToolbar({ setDataSwitch,dimension,setDimension,display }) {
  

  const optList = [
    {
      name: '图表一',
      value: 1
    },
    {
      name: '图表二',
      value: 2
    },
    {
      name: '图表三',
      value: 3
    }
  ]

  function handleMenuClick(e) {
    setDimension(e.key)

  }
  const menu = (
    //map循环
    <Menu onClick={handleMenuClick}>
      {Object.keys(display).map(s =>
        <Menu.Item key={s} className={dimension === s ? 'active' : null}>
          {display[s]}
        </Menu.Item>
      )}
    </Menu>
  );


  const valueSwitch = (val) => {
    setDataSwitch(val)
  };

  return (

    <div className="graphToolbar" style={{display:'flex',justifyContent:'space-between'}}>
      <div className='buttons' >
        {optList.map((opt) => (
          //[this+自动执行问题]所以用箭头函数
          <Button className='option' onClick={() => valueSwitch(opt.value)} key={opt.name}>
            {opt.name}
          </Button>
        ))
        }
      </div>
      <Dropdown overlay={menu}  trigger={['click']}>
        <Button className='option' style={{height:'2.5rem',fontSize:'1rem',minWidth:'7rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          {dimension?display[dimension]:display[Object.keys(display)[0]]} <DownOutlined />
        </Button>
        
      </Dropdown>

    </div>
  )
}

export default GraphToolbar
