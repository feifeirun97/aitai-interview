import { Cascader } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";


const opt = {
  2020: "2020",
  "2020-Q1": "2020Q1",
  "2020-Q2": "2020Q2",
  2021: "2021",
  "2021-Q1": "2021Q1",
};

axios.get('http://192.168.8.165:5020/service-itdd-get/get_drive_mrr_order_dur_dim_doc',{'proj_id': 'gc_dxm'}).then(res=>console.log(res.data.content.display))

const CustomSelect = ({ dataSource, onChange }) => {
  const [oprions, setOption] = useState([]);

  useEffect(() => {
    // if (!dataSource) return;
    const baseOpt = Object.entries(opt).map(([label, value]) => ({ label, value }));
    // console.log(Object.entries(opt))
    // console.log('baseoutput', baseOpt)


    const arr = baseOpt
      .filter(({ label }) => !label.includes("-"))
      .map((item) => {
        item.children = baseOpt.filter(({ label }) => label.includes(item.label))
          .map(f => ({
            ...f,
          }))
        return item;
      });
    // console.log('arr', arr)
    setOption(arr)
  }, [dataSource]);
  return <Cascader
    expandTrigger="hover"
    options={oprions}
    onChange={val => onChange(val[val.length - 1])} />;
}

export default CustomSelect;
