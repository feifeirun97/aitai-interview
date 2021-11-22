import React, { useEffect, useState } from 'react'
import CombChart from '../components/charts/CombChart'
import CombTable from '../components/CombTable'
import GraphToolbar from '../components/GraphToolbar'
import axios from 'axios'
import { Button } from 'antd'
import { Empty } from 'antd';
import TableToolbar from '../components/TableToolBar'
import ScatterChart from '../components/charts/ScatterChart'


// const Chart =(index,type,data)=>{
//     if (type==='scatter') return <ScatterChart index={index} data={data.plt}/>
//     if (type==='bar_line') return <CombChart index={index} data={data.plt} tableActive={tableActive} chartActive={chartActive} setTableActive={setTableActive} setChartActive={setChartActive} />
// }

export default function ChartAndTableUnit({ index, urlValue, type }) {

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



    useEffect(() => {
        if (!quantity) {
            SetQuantity('Raw')
        }
        console.log('单位改变：', quantity)
    }, [quantity])

    const urlList = {
        get: 'http://192.168.8.165:5020/service-itdd-get/',
        post: 'http://192.168.8.165:5020/service-itdd-post/',
    }
    //urlValue变化吧dimension晴空

    useEffect(() => {
        //先get确定下一步post的formdata内容
        axios.get(urlList.get + urlValue + '_doc')
            .then(res => {
                //第一次请求先获取display列表，获取并设置demensionList
                setDimension(res.data.content.display.map(d => (
                    { requestKey: d.dim, requestValue: Object.keys(d.options)[0], displayName: Object.values(d.options)[0] }
                )))
                setDisplay(res.data.content.display)
                console.log('display列表：', res.data.content.display)
            })
            .catch(err => console.log(err))
    }, [urlValue])


    useEffect(() => {
        // console.log('dimension',dimension)
        let formdata = new FormData()
        formdata.append('proj_id', 'gc_dxm')
        if (!dimension.length) return;
        dimension.forEach((r) => {
            formdata.append(r.requestKey, r.requestValue)
        })
        axios.post(urlList.post + urlValue, formdata)
            .then(res => {
                setData(res.data.content)
                console.log('Post请求数据', res.data.content)
            })
    }, [dimension])

    useEffect(() => {
        const Chart = () => {
            if (type === 'scatter') return <ScatterChart index={index} data={data.plt} />
            if (type === 'bar_line') return <CombChart index={index} data={data.plt} tableActive={tableActive} chartActive={chartActive} setTableActive={setTableActive} setChartActive={setChartActive} />
        }

    }, [type])




    //加一个空状态，等到data获取到才显示

    return (
        <div className={'ChartAndTableUnit'}>
            <GraphToolbar setDataSwitch={setDataSwitch} dimension={dimension} setDimension={setDimension} display={display} />
            {/* <CombChart index={index} data={data.plt} tableActive={tableActive} chartActive={chartActive} setTableActive={setTableActive} setChartActive={setChartActive} /> */}
  
            {
                data.table
                    ? <>
                        <TableToolbar quantity={quantity} setQuantity={SetQuantity} />
                        <CombTable quantity={quantity} data={data.table} tableActive={tableActive} setTableActive={setTableActive} setChartActive={setChartActive} />
                    </>
                    : null
            }
        </div>
    )
}