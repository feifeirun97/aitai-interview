import { Cascader } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";


const CustomSelect = ({ dataSource, onChange }) => {
  const [options, setOption] = useState([]);

  function sortedSquaredArray(array) {
    let rez= []
    let [left,right] = [0,array.length-1]
    while (left<=right){
      console.log(left,right)
      if(Math.abs(array[left])<Math.abs(array[right])) {rez.push(Math.abs(array[right]**2));right--};
      if(Math.abs(array[left])>Math.abs(array[right])) {rez.push(Math.abs(array[left]**2));left++};
      if(Math.abs(array[left])===Math.abs(array[right])) {rez.push(Math.abs(array[left]**2));left++}
    }
    console.log(rez.reverse()) ;
  }
  
  sortedSquaredArray([-11,-2,0,2,3,4,5,6])

  return 123
}

export default CustomSelect;
