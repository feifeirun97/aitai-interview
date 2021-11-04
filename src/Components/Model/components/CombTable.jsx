import React from 'react';
import {  Table } from 'antd';




const CombTable = () => {

    const data = [{"key":3,"attr":"attr_one","Jan":342,"Feb":0,"Mar":0,"Apr":0,"May":342,"Jun":0,"Jul":372,"Aug":0,"Sep":12,"Oct":7,"Nov":32,"Dec":87},{"key":4,"attr":"attr_two","Jan":43,"Feb":234,"Mar":0,"Apr":53,"May":0,"Jun":344,"Jul":43,"Aug":5,"Sep":0,"Oct":453,"Nov":63,"Dec":0},{"key":5,"attr":"attr_three","Jan":0,"Feb":200,"Mar":3,"Apr":599,"May":0,"Jun":12,"Jul":0,"Aug":32,"Sep":345,"Oct":40,"Nov":0,"Dec":0},{"key":6,"attr":"attr_four","Jan":323,"Feb":323,"Mar":33,"Apr":0,"May":323,"Jun":132,"Jul":323,"Aug":0,"Sep":0,"Oct":0,"Nov":23,"Dec":2},{"key":7,"attr":"attr_five","Jan":0,"Feb":0,"Mar":2,"Apr":60,"May":0,"Jun":567,"Jul":0,"Aug":67,"Sep":0,"Oct":3,"Nov":352,"Dec":234}]
    const col=[{"title":"","width":100,"dataIndex":"attr","key":"attr","fixed":"left"},{"title":"Jan","width":100,"dataIndex":"Jan","key":"Jan"},{"title":"Feb","width":100,"dataIndex":"Feb","key":"Feb"},{"title":"Mar","width":100,"dataIndex":"Mar","key":"Mar"},{"title":"Apr","width":100,"dataIndex":"Apr","key":"Apr"},{"title":"May","width":100,"dataIndex":"May","key":"May"},{"title":"Jun","width":100,"dataIndex":"Jun","key":"Jun"},{"title":"Jul","width":100,"dataIndex":"Jul","key":"Jul"},{"title":"Aug","width":100,"dataIndex":"Aug","key":"Aug"},{"title":"Sep","width":100,"dataIndex":"Sep","key":"Sep"},{"title":"Oct","width":100,"dataIndex":"Oct","key":"Oct"},{"title":"Nov","width":100,"dataIndex":"Nov","key":"Nov"},{"title":"Dec","width":100,"dataIndex":"Dec","key":"Dec"}]

    return (
        <div className='combotable'>
        
        <Table dataSource={data} columns={col} scroll={{x:100}} pagination={false}></Table>
    </div>
    )

};

export default CombTable;

//