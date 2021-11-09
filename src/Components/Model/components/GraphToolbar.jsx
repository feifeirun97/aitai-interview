import React, { useState } from 'react'
import { Button } from 'antd';
import { Radio } from 'antd';
import './style.css'
import Axios from 'axios'


function GraphToolbar({setDataSwitch}) {

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

  const valueSwitch = (val) => {
    setDataSwitch(val)
  };

  return (
    <div className='graphToolbar'>
      {optList.map((opt) => (
        //[this+自动执行问题]所以用箭头函数
        <Button className='option' onClick={() => valueSwitch(opt.value)} key={opt.name}>
          {opt.name}
        </Button>
      ))
      }
    </div>
  )
}

export default GraphToolbar
