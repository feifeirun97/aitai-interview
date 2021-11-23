import { useState, useEffect } from "react";
import { Table } from "antd";
import {toWan, toPercenr} from "@/utils/math"

const renderFormat = (type, value) => type === 'amt' ? toWan(value) : type === 'per' ? toPercenr(value) : value;

function App({ dataSource }) {
  const [data, setData] = useState([])
  const [col, setCol] = useState([])

  useEffect(() => {
    if (!dataSource) return;
    const {key, attr, value_type, ...reset} = dataSource[0];
    const newAttr = Object.keys(reset)
    const newData = newAttr.map((item, index) => {
      return {
        attr: item,
        ...dataSource.reduce((prev, d) => {
          prev[d.attr] = d[item];
          return prev
        }, {})
      }
    })
    setData([...newData])
  }, [dataSource])

  useEffect(() => {
    if (!data.length) return;

    const col = Object.keys(data[0]).map(item => ({
      dataIndex: item,
      title: item === 'attr' ? '时间' : item,
      render: (text, record) => {
        if (!dataSource.filter(d => d.attr === item).length) return text;
        
        const {value_type} = dataSource.filter(d => d.attr === item)[0];
        return renderFormat(value_type, text)

      }
    }))

    setCol([...col])
  }, [data])

  return <Table dataSource={data} columns={col} />;
}

export default App;
