import React, { useEffect, useState } from 'react'
import CombChart from '../components/CombChart'
import CombTable from '../components/CombTable'


export default function ChartAndTableUnit() {
    const [tableActive,setTableActive] =useState('')

    useEffect(()=>{
        console.log(tableActive)
    },[tableActive])

    return (
        <>
        <div style={{}}>
            <CombChart setTableActive={setTableActive}/>
        </div>
        <CombTable tableActive={tableActive}/>
        </>
    )
}
