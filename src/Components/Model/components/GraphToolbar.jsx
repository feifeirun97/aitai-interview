import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Menu } from 'antd';
import './style.css'
import { DownOutlined } from '@ant-design/icons';



function GraphToolbar({ setDataSwitch, dimension, setDimension, display }) {

  function handleMenuClick(e,dim) {
    //dimension是一个{‘requestKey’,'requestValue'}字典
    //e.key包含了key和value
    let kv = e.key.split(',')
    let temp = dimension
    temp.forEach(t=>{
      if (t.requestKey === dim.dim) {
        t.requestValue = kv[0]
        t.displayName = kv[1]
        // t.displayName = 
      }
    })
    setDimension([...temp])
  }
  const menu =(d,index) => {
    // console.log(dimension.requestValue)
    return (
      <Menu onClick={(e)=>handleMenuClick(e,d)}>
        {Object.keys(d.options).map(s =>
          <Menu.Item key={[s,d.options[s]]} className={dimension[index].requestValue=== s ? 'active' : null}>
            {d.options[s]}
          </Menu.Item>
        )}
      </Menu>
    )
  };


  return (

    <div className="graphToolbar" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {
        display.map((d,index) => (
          <Dropdown overlay={()=>menu(d,index)} trigger={['hover']} key={d.dim}>
            <Button className='option' style={{ height: '2rem', fontSize: '14px', minWidth: '7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {dimension[index].displayName? dimension[index].displayName:'rea'}<DownOutlined />
            </Button>

          </Dropdown>
        ))
      }
    </div>
  )
}

export default GraphToolbar
