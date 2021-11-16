import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { keepTwoDecimal, toWan, formatNumber1,formatNumber } from '../utils/math'

const CombTable = ({ data, tableActive, setTableActive, setChartActive }) => {
    const [columns, setColumns] = useState([])
    // console.log(data, columns)

    useEffect(() => {

        if (!data) return;

        let temp = [{ title: "", width: 150, dataIndex: "attr", key: "attr", fixed: "left" },]
        for (const i in data[0]) {
            if (i !== 'key' & i !== 'attr' & i !== 'value_type') {
                let currentObj = {
                    title: i,
                    width: 100,
                    dataIndex: i,
                    key: i,
                    render: (text, record) => {
                        let decimal = keepTwoDecimal(text)
                        return record.value_type === 'amt' ? `${decimal}金额` : record.value_type === 'cnt' ? `${decimal}数量` :`${decimal}%`
                    }
                }
                if (!(currentObj in columns)) {

                    temp.push(currentObj)
                }
            }
        }


        setColumns(temp)
    }, [data])

    useEffect(() => {
        if (tableActive) {
            //find the table, thead and tbody
            const table = document.getElementsByClassName('combTable')[0]
            const thead = table.getElementsByClassName('ant-table-thead')[0].getElementsByClassName('ant-table-cell')
            const tbody = table.getElementsByClassName('ant-table-tbody')[0].getElementsByClassName('ant-table-row')

            //change the title
            //activeIndex work in tbody part
            let activeIndex = -1
            for (let i = 0; i < thead.length; i++) {
                if (thead[i].innerText === tableActive) {
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
    }, [tableActive])

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

                            for (let j = 0; j < bodyCells.length; j++) {
                                if (bodyCells[j] === event.target) {
                                    setTableActive(thead[j].innerText)
                                    //行标题index为0，故返回-1
                                    setChartActive(j - 1)
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
                            setTableActive(event.target.innerText)
                        },
                        onMouseEnter: event => { }, // 鼠标移入行
                        onMouseLeave: event => { },
                    };
                }}

            ></Table>
            {}
       </div>
    )

};

export default CombTable;

//