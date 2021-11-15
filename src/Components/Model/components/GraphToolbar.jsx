import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Menu } from 'antd';

import './style.css'
import Axios from 'axios'
import { DownOutlined } from '@ant-design/icons';
import { compose } from 'redux';



function GraphToolbar({ setDataSwitch, dimension, setDimension, display }) {

  function handleMenuClick(e,dim) {
    //dimension是一个{‘requestKey’,'requestValue'}字典
    setDimension({requestKey:dim.dim, requestValue:e.key})
  }
  const menu =(dim) => {
    // console.log(dimension.requestValue)
    return (
      <Menu onClick={(e)=>handleMenuClick(e,dim)}>
        {Object.keys(dim.options).map(s =>
          <Menu.Item key={s} className={dimension.requestValue=== s ? 'active' : null}>
            {dim.options[s]}
          </Menu.Item>
        )}
      </Menu>
    )
  };


  const valueSwitch = (val) => {
    setDataSwitch(val)
  };

  return (

    <div className="graphToolbar" style={{ display: 'flex', justifyContent: 'flex-end' }}>

      {
        display.map((dim) => (
          <Dropdown overlay={()=>menu(dim)} trigger={['hover']} key={dim.dim}>
            <Button className='option' style={{ height: '2.5rem', fontSize: '1rem', minWidth: '7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {dim.dim}<DownOutlined />
            </Button>

          </Dropdown>
        ))
      }


    </div>
  )
}

export default GraphToolbar
