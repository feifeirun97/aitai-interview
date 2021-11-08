import React, { useEffect, useState } from 'react'
import CombChart from '../components/CombChart'
import CombTable from '../components/CombTable'


export default function ChartAndTableUnit() {
    //这两个都是选中的标题，如2018Q1
    const [tableActive, setTableActive] = useState('')
    const [chartActive, setChartActive] = useState('')
    // useEffect(() => {
    //     console.log(tableActive)
    //     // console.log(chartActive)
    // }, [tableActive])

    const dummyData = {
        'plt': [
            ['quarter', 'users', 'arpu'],
            ['2018Q1', 2943, 900.09],
            ['2018Q2', 3686, 868.54],
            ['2018Q3', 4931, 847.67],
            ['2018Q4', 5865, 865.8],
            ['2019Q1', 6389, 809.17],
            ['2019Q2', 8237, 748.08],
            ['2019Q3', 9851, 854.21],
            ['2019Q4', 11174, 915.37],
            ['2020Q1', 9594, 822.62],
            ['2020Q2', 11873, 1069.31],
            ['2020Q3', 11365, 888.05],
            ['2020Q4', 13952, 1155.22],
            ['2021Q1', 13322, 994.24],
            ['2021Q2', 17395, 1045.3],
            ['2021Q3', 9128, 421.88]],

        'table': [
            {
                'key': 1,
                'attr': 'users',
                '2018Q1': 2943,
                '2018Q2': 3686,
                '2018Q3': 4931,
                '2018Q4': 5865,
                '2019Q1': 6389,
                '2019Q2': 8237,
                '2019Q3': 9851,
                '2019Q4': 11174,
                '2020Q1': 9594,
                '2020Q2': 11873,
                '2020Q3': 11365,
                '2020Q4': 13952,
                '2021Q1': 13322,
                '2021Q2': 17395,
                '2021Q3': 9128
            },
            {
                'key': 2,
                'attr': 'arpu',
                '2018Q1': 900.09,
                '2018Q2': 868.54,
                '2018Q3': 847.67,
                '2018Q4': 865.8,
                '2019Q1': 809.17,
                '2019Q2': 748.08,
                '2019Q3': 854.21,
                '2019Q4': 915.37,
                '2020Q1': 822.62,
                '2020Q2': 1069.31,
                '2020Q3': 888.05,
                '2020Q4': 1155.22,
                '2021Q1': 994.24,
                '2021Q2': 1045.3,
                '2021Q3': 421.88
            }
        ]
    }

    return (
        <>
            <div style={{}}>
                <CombChart data={dummyData.plt} tableActive={tableActive} chartActive={chartActive}  setTableActive={setTableActive} setChartActive={setChartActive}/>
            </div>
            <CombTable data={dummyData.table} tableActive={tableActive} setTableActive={setTableActive} setChartActive={setChartActive}/>
        </>
    )
}
