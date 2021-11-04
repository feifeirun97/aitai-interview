import React from 'react'
import CombChart from '../components/CombChart'
import CombTable from '../components/CombTable'


export default function ChartAndTableUnit() {
    return (
        <>
        <div style={{padding:"0 3%"}}>
            <CombChart/>
        </div>
        <CombTable/>
        </>
    )
}
