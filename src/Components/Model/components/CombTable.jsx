import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { keepTwoDecimal, formatNumber3, toDollar } from '../utils/math'

const CombTable = ({ quantity, data, linkActive, onChange }) => {
    const [columns, setColumns] = useState([])
    // console.log(data, columns)

    useEffect(() => {

        if (!data) return;

        let temp = [{
            title: "",
            width: 150,
            dataIndex: "attr",
            key: "attr",
            fixed: "left",
            render: text => <div style={{ fontSize: '13px', fontWeight: '500', padding: '0px' }}>{text}</div>
        },]
        for (const i in data[0]) {
            if (i !== 'key' & i !== 'attr' & i !== 'value_type') {
                let currentObj = {
                    title: <div style={{ fontSize: '12px', fontWeight: '500', }}>{i}</div>,
                    width: 120,
                    dataIndex: i,
                    key: i,
                    render: (text, record) => {
                        let decimal = keepTwoDecimal(text)
                        let val
                        if (record.value_type === 'cnt') return <div style={{ fontSize: '12px', fontWeight: '400', padding: '0px' ,color:'#33334F',fontFamily:"Inter"}}>{formatNumber3(decimal)}</div>
                        if (record.value_type === 'per') return <div style={{ fontSize: '12px', fontWeight: '400', padding: '0px' ,color:'#33334F',fontFamily:"Inter"}}>{decimal}%</div>
                        if (record.value_type === 'amt') {
                            val =toDollar(decimal,quantity)
                            if (decimal===0 || val==='N/A') return <div style={{ fontSize: '12px', fontWeight: '400', padding: '0px' ,color:'#B8B8D9'}}>{val}</div>
                            if (decimal>0) return <div style={{ fontSize: '12px', fontWeight: '400', padding: '0px' ,color:'#E84C85'}}>{val}</div>
                            if (decimal<0) return <div style={{ fontSize: '12px', fontWeight: '400', padding: '0px' ,color:'#12C457'}}>{val}</div>
                        }
                    }
                }
                if (!(currentObj in columns)) {

                    temp.push(currentObj)
                }
            }
        }


        setColumns(temp)
    }, [data,quantity])

    useEffect(() => {
        if (linkActive) {
            //find the table, thead and tbody
            const table = document.getElementsByClassName('combTable')[0]
            const thead = table.getElementsByClassName('ant-table-thead')[0].getElementsByClassName('ant-table-cell')
            const tbody = table.getElementsByClassName('ant-table-tbody')[0].getElementsByClassName('ant-table-row')

            //change the title
            //activeIndex work in tbody part
            let activeIndex = -1
            for (let i = 0; i < thead.length; i++) {
                
                if (i === linkActive) {
                    thead[i].scrollIntoView({
                        behavior: "smooth", block: 'nearest', inline: "center"
                    })
                    thead[i].style.color = '#fff'
                    thead[i].style.backgroundColor = '#6076fa'
                    activeIndex = i
                } else {
                    thead[i].style.color = 'black'
                    thead[i].style.backgroundColor = 'white'
                }

                let bodyCells = null
                for (let i = 0; i < tbody.length; i++) {

                    bodyCells = tbody[i].getElementsByClassName('ant-table-cell')
                    for (let j = 0; j < bodyCells.length; j++) {
                        if (j === activeIndex) {
                            bodyCells[j].style.backgroundColor = '#eef0ff'
                        } else {
                            bodyCells[j].style.backgroundColor = 'white'
                        }
                    }

                }
            }
        }
    }, [linkActive,data])

    return (

        <div className='combTable'>
            <Table
                size='small'
                dataSource={data}
                columns={columns}
                scroll={{ x: 100 }}
                pagination={false}
                // loading={data?false:true}
                onRow={(record, index) => {
                    return {
                        onClick: event => {
                            // console.log(event.target, record, index)
                            const table = document.getElementsByClassName('combTable')[0]
                            const thead = table.getElementsByClassName('ant-table-thead')[0].getElementsByClassName('ant-table-cell')
                            const tbody = table.getElementsByClassName('ant-table-tbody')[0].getElementsByClassName('ant-table-row')

                            let bodyCells = tbody[index].getElementsByClassName('ant-table-cell')

                              //遍历所有列
                              for (let j = 0; j < bodyCells.length; j++) {
                                //点击目标和为cells，遍历得到当前点击值所在的index
                                if (bodyCells[j] === event.target) {
                                    onChange(j)
                                }
                                //点击目标和为cells下级的文字，需要设置为其父元素
                                if (bodyCells[j] === event.target.parentElement) {
                                    onChange(j)
                                }
                            }
                        },
                        onMouseEnter: event => { }, // 鼠标移入行
                        onMouseLeave: event => { },
                    };
                }}
                onHeaderRow={(record, index) => {
                    return {
                        onClick: event => {
                            for (let i=1; i<record.length; i++) {
                                if(event.target.innerText === record[i].dataIndex) {
                                    onChange(i)
                                    return 
                                }
                            }
                            // console.log(event,index,record)
                        },
                        onMouseEnter: event => { }, // 鼠标移入行
                        onMouseLeave: event => { },
                    };
                }}

            ></Table>
            
        </div>
    )

};

export default CombTable;

//
