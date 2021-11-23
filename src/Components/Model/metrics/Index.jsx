
import React, { useEffect, useState } from 'react'
import ChartAndTableUnit from '../units/ChartAndTableUnit'
import SideMenu from '../components/sideMenu'
import axios from 'axios'
import './styles.css'
import { Button } from 'antd'
function Model() {
  const urlList = {
    catlogGet: 'http://192.168.8.165:5020/service-itdd-get/get_catalog_doc',
    catlogPost: 'http://192.168.8.165:5020/service-itdd-post/get_catalog'
  }
  const [menuList, setMenuList] = useState([])
  const [dim, setDim] = useState('SaaS')
  const [urlValueList, setUrlValueList] = useState([{ "key": "get_drive_mrr_order_dur", "type": "bar_line" }])


  useEffect(() => {
    //请求参数
    let formdata = new FormData()
    formdata.append('proj_id', 'gc_dxm')
    formdata.append('type', dim)
    //post请求
    axios.post(urlList.catlogPost, formdata)
      .then(res => {
        setMenuList(res.data.content.cat)
      })
      .catch(err => console.log(err))
  }, [dim])

  useEffect(() => {
    console.log('url change', urlValueList)
  }, [urlValueList])

  return (
    <div >

      {/* <Button onClick={() => dim === 'SaaS' ? setDim('Retail') : setDim('SaaS')}>{dim}</Button> */}
      <SideMenu menuList={menuList} onChange={data1=>setUrlValueList(data1)} className='sideMenu' />
      <div className={'units'}>
        {
          urlValueList.map((unit, index) => (
            <div className='unit' key={unit.key}>
              <ChartAndTableUnit index={index} urlValue={unit.key} type={unit.type}  />
            </div>
          ))
        }
      </div>
    </div>
  )
}



export default Model;