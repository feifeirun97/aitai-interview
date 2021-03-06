import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Menu } from 'antd';

import './style.css'
import { DownOutlined } from '@ant-design/icons';


function TableToolbar({ quantity, onChange }) {
  const display = ['Raw', 'Thousand', 'Million', 'Billion']

  const menu = (

      <Menu onClick={(e) => onChange(e.key)}>
        {display.map(q =>
          <Menu.Item key={q} className={q === quantity ? 'active' : null}>
            {q}
          </Menu.Item>
        )}
      </Menu>
  )


  return (

    <div className="graphToolbar" style={{ display: 'flex', justifyContent: 'flex-end' }}>

      {

        <Dropdown overlay={menu} trigger={['hover']} key={quantity}>
          <Button className='option' style={{ height: '2rem', fontSize: '14px', minWidth: '7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {quantity ? quantity:'Raw'}<DownOutlined />
          </Button>

        </Dropdown>
      }


    </div>
  )
}

export default TableToolbar