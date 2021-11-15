import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { Empty } from 'antd';
const TestUnit = () => {
    const [data,setData] = useState('')
    useEffect(() => {

        //先get确定下一步post的formdata内容
        let formdata = new FormData()
        formdata.append('proj_id', 'gc_dxm')
        formdata.append('period', 'M')
        axios.post('http://192.168.8.165:5020/service-itdd-post/get_drive_user_arpu', formdata)
        .then(res => {
            let data = res.data.content.plt
            console.log(data)
        })
        .catch(err => console.log(err))
    }, [data])

    let a={
        "plt": {
            "bar_data": [
                [
                    "mon",
                    "users"
                ],
                [
                    "2018-01",
                    1543
                ],
                [
                    "2018-02",
                    1202
                ],
                [
                    "2018-03",
                    1974
                ],
                [
                    "2018-04",
                    1957
                ],
                [
                    "2018-05",
                    2029
                ],
                [
                    "2018-06",
                    2033
                ],
                [
                    "2018-07",
                    2619
                ],
                [
                    "2018-08",
                    2646
                ],
                [
                    "2018-09",
                    2741
                ],
                [
                    "2018-10",
                    2927
                ],
                [
                    "2018-11",
                    3546
                ],
                [
                    "2018-12",
                    3071
                ],
                [
                    "2019-01",
                    2824
                ],
                [
                    "2019-02",
                    2976
                ],
                [
                    "2019-03",
                    4338
                ],
                [
                    "2019-04",
                    4426
                ],
                [
                    "2019-05",
                    4722
                ],
                [
                    "2019-06",
                    4511
                ],
                [
                    "2019-07",
                    5373
                ],
                [
                    "2019-08",
                    5684
                ],
                [
                    "2019-09",
                    5622
                ],
                [
                    "2019-10",
                    6515
                ],
                [
                    "2019-11",
                    6598
                ],
                [
                    "2019-12",
                    5762
                ],
                [
                    "2020-01",
                    4302
                ],
                [
                    "2020-02",
                    4765
                ],
                [
                    "2020-03",
                    6842
                ],
                [
                    "2020-04",
                    7289
                ],
                [
                    "2020-05",
                    7298
                ],
                [
                    "2020-06",
                    6076
                ],
                [
                    "2020-07",
                    2398
                ],
                [
                    "2020-08",
                    3672
                ],
                [
                    "2020-09",
                    7679
                ],
                [
                    "2020-10",
                    7771
                ],
                [
                    "2020-11",
                    8750
                ],
                [
                    "2020-12",
                    7214
                ],
                [
                    "2021-01",
                    6797
                ],
                [
                    "2021-02",
                    6337
                ],
                [
                    "2021-03",
                    9256
                ],
                [
                    "2021-04",
                    9307
                ],
                [
                    "2021-05",
                    9724
                ],
                [
                    "2021-06",
                    10579
                ],
                [
                    "2021-07",
                    9128
                ]
            ],
            "line_data": [
                [
                    "mon",
                    "arpu"
                ],
                [
                    "2018-01",
                    548.58
                ],
                [
                    "2018-02",
                    560.01
                ],
                [
                    "2018-03",
                    572.13
                ],
                [
                    "2018-04",
                    590.02
                ],
                [
                    "2018-05",
                    544.3
                ],
                [
                    "2018-06",
                    463.55
                ],
                [
                    "2018-07",
                    579.24
                ],
                [
                    "2018-08",
                    493.33
                ],
                [
                    "2018-09",
                    495.25
                ],
                [
                    "2018-10",
                    459.38
                ],
                [
                    "2018-11",
                    683.51
                ],
                [
                    "2018-12",
                    426.44
                ],
                [
                    "2019-01",
                    487.96
                ],
                [
                    "2019-02",
                    506.64
                ],
                [
                    "2019-03",
                    526.52
                ],
                [
                    "2019-04",
                    475.03
                ],
                [
                    "2019-05",
                    466.5
                ],
                [
                    "2019-06",
                    411.59
                ],
                [
                    "2019-07",
                    502.57
                ],
                [
                    "2019-08",
                    547.21
                ],
                [
                    "2019-09",
                    463.22
                ],
                [
                    "2019-10",
                    592.54
                ],
                [
                    "2019-11",
                    606.1
                ],
                [
                    "2019-12",
                    411.13
                ],
                [
                    "2020-01",
                    424.9
                ],
                [
                    "2020-02",
                    492.76
                ],
                [
                    "2020-03",
                    543.16
                ],
                [
                    "2020-04",
                    488.48
                ],
                [
                    "2020-05",
                    510.26
                ],
                [
                    "2020-06",
                    890.63
                ],
                [
                    "2020-07",
                    909.42
                ],
                [
                    "2020-08",
                    880.37
                ],
                [
                    "2020-09",
                    609.35
                ],
                [
                    "2020-10",
                    595.02
                ],
                [
                    "2020-11",
                    910.67
                ],
                [
                    "2020-12",
                    488.68
                ],
                [
                    "2021-01",
                    518.2
                ],
                [
                    "2021-02",
                    563.26
                ],
                [
                    "2021-03",
                    664.83
                ],
                [
                    "2021-04",
                    553.46
                ],
                [
                    "2021-05",
                    565.12
                ],
                [
                    "2021-06",
                    712.43
                ],
                [
                    "2021-07",
                    421.88
                ]
            ]
        },
        "table": [
            {
                "key": 1,
                "attr": "users",
                "2018-01": 1543,
                "2018-02": 1202,
                "2018-03": 1974,
                "2018-04": 1957,
                "2018-05": 2029,
                "2018-06": 2033,
                "2018-07": 2619,
                "2018-08": 2646,
                "2018-09": 2741,
                "2018-10": 2927,
                "2018-11": 3546,
                "2018-12": 3071,
                "2019-01": 2824,
                "2019-02": 2976,
                "2019-03": 4338,
                "2019-04": 4426,
                "2019-05": 4722,
                "2019-06": 4511,
                "2019-07": 5373,
                "2019-08": 5684,
                "2019-09": 5622,
                "2019-10": 6515,
                "2019-11": 6598,
                "2019-12": 5762,
                "2020-01": 4302,
                "2020-02": 4765,
                "2020-03": 6842,
                "2020-04": 7289,
                "2020-05": 7298,
                "2020-06": 6076,
                "2020-07": 2398,
                "2020-08": 3672,
                "2020-09": 7679,
                "2020-10": 7771,
                "2020-11": 8750,
                "2020-12": 7214,
                "2021-01": 6797,
                "2021-02": 6337,
                "2021-03": 9256,
                "2021-04": 9307,
                "2021-05": 9724,
                "2021-06": 10579,
                "2021-07": 9128
            },
            {
                "key": 2,
                "attr": "arpu",
                "2018-01": 548.58,
                "2018-02": 560.01,
                "2018-03": 572.13,
                "2018-04": 590.02,
                "2018-05": 544.3,
                "2018-06": 463.55,
                "2018-07": 579.24,
                "2018-08": 493.33,
                "2018-09": 495.25,
                "2018-10": 459.38,
                "2018-11": 683.51,
                "2018-12": 426.44,
                "2019-01": 487.96,
                "2019-02": 506.64,
                "2019-03": 526.52,
                "2019-04": 475.03,
                "2019-05": 466.5,
                "2019-06": 411.59,
                "2019-07": 502.57,
                "2019-08": 547.21,
                "2019-09": 463.22,
                "2019-10": 592.54,
                "2019-11": 606.1,
                "2019-12": 411.13,
                "2020-01": 424.9,
                "2020-02": 492.76,
                "2020-03": 543.16,
                "2020-04": 488.48,
                "2020-05": 510.26,
                "2020-06": 890.63,
                "2020-07": 909.42,
                "2020-08": 880.37,
                "2020-09": 609.35,
                "2020-10": 595.02,
                "2020-11": 910.67,
                "2020-12": 488.68,
                "2021-01": 518.2,
                "2021-02": 563.26,
                "2021-03": 664.83,
                "2021-04": 553.46,
                "2021-05": 565.12,
                "2021-06": 712.43,
                "2021-07": 421.88
            }
        ]
    }

    console.log(Object.keys(a.plt).map(s => (
                        {
                            source: a.plt[s]
                        }
                    )))
 

    return (
        data? <div id='main' style={{ height: '400px', maxWidth: '1000px' }} ></div> : <Empty />
            )
};




export default TestUnit;