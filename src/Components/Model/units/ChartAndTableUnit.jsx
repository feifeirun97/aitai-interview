import React, { useEffect, useState } from 'react'
import CombChart from '../components/CombChart'
import CombTable from '../components/CombTable'
import GraphToolbar from '../components/GraphToolbar'
import axios from 'axios'
import { Button } from 'antd'
import { Empty } from 'antd';
import TableToolbar from '../components/TableToolBar'

export default function ChartAndTableUnit() {
    //这两个都是选中的标题，如2018Q1
    const [tableActive, setTableActive] = useState('')
    const [chartActive, setChartActive] = useState('')
    const [dataSwitch, setDataSwitch] = useState(1)
    //dimension是一个{‘requestKey’:'period','requestValue':'Y'}字典
    const [dimension, setDimension] = useState([])
    //展示内容
    const [display, setDisplay] = useState([])
    const [data, setData] = useState('')
    //Table tool bar
    const [quantity, SetQuantity] = useState('')


    // useEffect(() => {
    //     console.log(dataSwitch)
    // }, [dataSwitch])

    useEffect(() => {
        //
        console.log('纬度改变：', dimension)
    }, [dimension])

    // useEffect(() => {
    //     if (!quantity){
    //         SetQuantity('Raw')
    //     }
    //     console.log('单位改变：', quantity)
    // }, [quantity])

    const urlList = {
        arpuGet: 'http://192.168.8.165:5020/service-itdd-get/get_drive_user_arpu_doc',
        arpuPost: 'http://192.168.8.165:5020/service-itdd-post/get_drive_user_arpu',
        topnAmtGet: 'http://192.168.8.165:5020/service-itdd-get/get_drive_topn_amt_doc',
        topnAmtPost: 'http://192.168.8.165:5020/service-itdd-post/get_drive_topn_amt',
        isNewGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_is_new_doc',
        isNewPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_is_new',
        topnArpuGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_topn_arpu_doc',
        topnArpuPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_topn_arpu',
        fpYearGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_fp_year_doc', //
        fpYearPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_fp_year', //
        orderDurGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_order_dur_doc',
        orderDurPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_order_dur',
        mrrNewGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_is_new_doc',
        mrrNewPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_is_new',
        mrrUserDurGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_user_dur_doc',
        mrrUserDurPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_user_dur',
        mrrAliveGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_is_alive_doc',
        mrrAlivePost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_is_alive',
        mrrCallBackGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_callback_doc',
        mrrCallBackPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_callback',
        mrrTopnGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_topn_doc',
        mrrTopnPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_topn',
        mrrSnumGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_snum_doc',
        mrrSnumPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_snum',
        mrrConvertGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_convert_doc',
        mrrConvertPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_convert',
        netRrGet:'http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_net_rr_doc',
        netRrPost:'http://192.168.8.165:5020/service-itdd-post/get_drive_mrr_net_rr',
        behaviorOrderGet:'http://192.168.8.165:5020/service-itdd-get/get_behavior_order_time_doc',
        behaviorOrderPost:'http://192.168.8.165:5020/service-itdd-post/get_behavior_order_time'
    }

    useEffect(() => {

        let formdata = new FormData()
        formdata.append('proj_id', 'gc_dxm')
        //先get确定下一步post的formdata内容
        axios.get(urlList.behaviorOrderGet)
            .then(res => {
                //第一次请求先获取display列表，获取并设置demensionList
                if(display.length===0){
                    console.log('display列表：', res.data.content.display)
                    if (dimension.length === 0){
                        setDimension( res.data.content.display.map(d=>(
                            {requestKey:d.dim,requestValue:Object.keys(d.options)[0],displayName:Object.values(d.options)[0]}
                        ))) 
                    }
                    setDisplay(res.data.content.display)
                }

                //dimension空就获取display中第一个的数据Y发请求
                //dimension不空就获取dimension发请求
                // if (Object.keys(dimension).length) {
                //     formdata.append(dimension.requestKey, dimension.requestValue)
                // } else {
                //     //第一次请求即吧display,dimension设置好
                //     let requestKey = res.data.content.display[0].dim
                //     let requestValue = Object.keys(res.data.content.display[0].options)[0]
                //     console.log('无dimension，获取首次display第一个默认纬度参数', [requestKey, requestValue])
                //     formdata.append(requestKey, requestValue)
                //     setDimension({"requestKey":requestKey, "requestValue":requestValue})

                //     return 
                // }
                //post请求
                // axios.post(urlList.behaviorOrderPost, formdata)
                //     .then(res => {
                //         setData(res.data.content)
                //         console.log('Post请求数据', res.data.content)
                //     })
            })
            .catch(err => console.log(err))
    }, [dimension])
    //加一个空状态，等到data获取到才显示

    return (
        <>  
            <GraphToolbar setDataSwitch={setDataSwitch} dimension={dimension} setDimension={setDimension} display={display} />
            {/* <CombChart data={data.plt} tableActive={tableActive} chartActive={chartActive} setTableActive={setTableActive} setChartActive={setChartActive} /> */}
            {/* <TableToolbar quantity={quantity} setQuantity={SetQuantity}/> */}
            {/* <CombTable quantity={quantity} data={data.table} tableActive={tableActive} setTableActive={setTableActive} setChartActive={setChartActive} /> */}
        </>
    )
}
