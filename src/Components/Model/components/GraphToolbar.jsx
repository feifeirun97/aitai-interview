import React, { useEffect, useState } from 'react'
import { Button, Cascader, Dropdown, Menu } from 'antd';
import './style.css'
import { DownOutlined } from '@ant-design/icons';
// import CustomSelect from './CustomSelect';


function GraphToolbar({ onChange, dimension, display }) {
  console.log(dimension)
  const handleMenuClick = (e, dim) => {
    //dimension是一个{‘requestKey’,'requestValue'}字典
    //e.key包含了key和value
    let kv = e.key.split(',')
    let temp = dimension
    temp.forEach(t => {
      if (t.requestKey === dim.dim) {
        t.requestValue = kv[0]
        t.displayName = kv[1]
      }
    })
    console.log(temp)
    onChange([...temp])
  }
  const menu = (d, index) => {

    return (
      <Menu onClick={(e) => handleMenuClick(e, d)}>
        {Object.keys(d.options).map(s =>
          <Menu.Item key={[s, d.options[s]]} className={dimension[index].requestValue === s ? 'active' : null}>
            {d.options[s]}
          </Menu.Item>
        )}
      </Menu>
    )
  };

  const cascaderOption = (dataSource) => {
    let flag = true; //标记数据是否为日期
    const pattern = /^(21|20|19)[0-9]{2}$/
    const baseOpt = Object.entries(dataSource).map(([value, label]) => ({
      value,
      label,
    }));
    flag = pattern.test(baseOpt[0].value)
    const arr = baseOpt
      .filter(({ value }) => !value.includes("-"))
      .map((item) => {
        return {
          ...item,
          children: baseOpt
            .filter(({ value }) => {
              let bool = value.includes(item.value);
              if (flag || value === 'all') return bool;
              return bool && value !== item.value;
            })
        };
      });
    return arr

  }


  return (

    <div className="graphToolbar" >

      {
        display.map((d, index) => (
          d.stepwise_menu
            ?
            <Cascader
              key={d.dim}
              className='cascader'
              expandTrigger="click"
              options={cascaderOption(d.options)}
              defaultValue={['all', 'all']}
              onChange={(val) => {
                let temp = dimension
                temp.forEach(t => {
                  if (t.requestKey === d.dim) {
                    t.requestValue = val[1]
                    t.displayName = '级联选择无须displayName'
                  }
                })
                onChange([...temp])
              }}
            />
            :
            <Dropdown overlay={() => menu(d, index)} trigger={['hover']} key={d.dim}>
              <Button className='option' style={{ height: '2rem', fontSize: '14px', minWidth: '7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {dimension[index].displayName ? dimension[index].displayName : 'rea'}<DownOutlined />
              </Button>
            </Dropdown>
        ))
      }
    </div>
  )
}

export default GraphToolbar
