import React, { useEffect, useState } from 'react'
import CombChart from '../components/CombChart'
import CombTable from '../components/CombTable'
import GraphToolbar from '../components/GraphToolbar'
import axios from 'axios'
import { Button } from 'antd'
import { Empty } from 'antd';


export default function ChartAndTableUnit() {
    //这两个都是选中的标题，如2018Q1
    const [tableActive, setTableActive] = useState('')
    const [chartActive, setChartActive] = useState('')
    const [dataSwitch, setDataSwitch] = useState(1)
    //年月纬度展示
    const [dimension, setDimension] = useState('')
    //展示内容
    const [display, setDisplay] = useState([])
    const [data, setData] = useState('')


    // useEffect(() => {
    //     console.log(dataSwitch)
    // }, [dataSwitch])

    useEffect(() => {
        console.log(dimension)
    }, [dimension])
    
    const urlList = {
        arpuGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_user_arpu_doc',
        arpuPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_user_arpu',
        topnAmtGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_topn_amt_doc',
        topnAmtPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_topn_amt'

    }

    useEffect(() => {

        let formdata = new FormData()
        formdata.append('proj_id', 'gc_dxm')
        //先get确定下一步post的formdata内容
        axios.get(urlList.arpuGet)
            .then(res => {
                //dimension空就获取display中第一个的数据Y
                //dimension不空就获取dimension
                if (dimension) {
                    formdata.append(Object.keys(res.data.content.request)[1], dimension)
                } else {
                    formdata.append(Object.keys(res.data.content.request)[1], Object.keys(res.data.content.display.period)[0])
                    setDisplay(res.data.content.display.period)
                }
                //post请求
                axios.post(urlList.arpuPost, formdata)
                    .then(res => {
                        setData(res.data.content)
                        // console.log(res)
                    })
            })
            .catch(err => console.log(err))
    }, [dimension])

    //加一个空状态，等到data获取到才显示
    return (
        <>

            {data
                ? <>
                    <GraphToolbar setDataSwitch={setDataSwitch} dimension={dimension} setDimension={setDimension} display={display}/>

                    {
                        dataSwitch === 1
                            ? <>
                                <CombChart data={data.plt} tableActive={tableActive} chartActive={chartActive} setTableActive={setTableActive} setChartActive={setChartActive} />
                                <CombTable data={data.table} tableActive={tableActive} setTableActive={setTableActive} setChartActive={setChartActive} />
                            </>
                            : null
                    }

                    {
                        dataSwitch === 2 || dataSwitch === 3
                            ? <>
                                yes
                            </>
                            : null
                    }
                </>
                : <Empty />




            }


        </>
    )
}
