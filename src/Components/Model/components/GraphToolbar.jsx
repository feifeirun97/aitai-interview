import React, { useEffect, useState } from 'react'
import { Button, Cascader, Dropdown, Menu } from 'antd';
import './style.css'
import { DownOutlined } from '@ant-design/icons';
// import CustomSelect from './CustomSelect';


function GraphToolbar({ onChange, dimension, display }) {

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
    }))
    flag = pattern.test(baseOpt[0].value)
    let arr
    // flag为true 时间维度, 通过Q,M判断二级菜单
    if (flag) {
      arr = baseOpt
        .filter(({ label }) => !label.includes("Q") && !label.includes("M"))
        .map((item) => {
          return {
            ...item,
            children: baseOpt
              .filter(({ label }) => {
                let bool = label.includes(item.label);
                //时间维度，二级菜单会显示该时间
                //不是而且不为‘all'，就不显示
                if (flag || label === 'all') return bool;
                return bool && label !== item.label;
              })
          };
        });
    }
    // flag为false 其他维度, 通过-判断二级菜单
    else {
      arr = baseOpt
        .filter(({ value }) => !value.includes("-"))
        .map((item) => {
          return {
            ...item,
            children: baseOpt
              .filter(({ value }) => {
                let bool = value.includes(item.value);
                //时间维度，二级菜单会显示该时间
                //不是而且不为‘all'，就不显示
                if (flag || value === 'all') return bool;
                return bool && value !== item.value;
              })
          };
        });
    }

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
              displayRender={label => label[label.length-1]}  
              defaultValue={[dimension[index].requestValue,dimension[index].requestValue]}
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
