import { Cascader } from "antd";
import { useState, useEffect } from "react";

const opt = {
  2020: "2020",
  "2020-Q1": "2020Q1",
  "2020-Q2": "2020Q2",
  2021: "2021",
  "2021-Q1": "2021Q1",
};

function App({ dataSource, onChange }) {
  const [oprions, setOption] = useState([]);

  useEffect(() => {
    if (!dataSource) return;
    const baseOpt = Object.entries(opt).map(([label, value]) => ({ label, value }));
    const arr = baseOpt
    .filter(({ label }) => !label.includes("-"))
    .map((item) => {
      item.children = baseOpt.filter(({label}) => label.includes(item.label))
      .map(f => ({
        ...f,
      }))
      return item;
    });
    console.log('arr', arr)
    setOption(arr)
  }, [dataSource]);
  return <Cascader 
    expandTrigger="hover"
    options={oprions}
    onChange={val => onChange(val[val.length - 1])} />;
}

export default App;
