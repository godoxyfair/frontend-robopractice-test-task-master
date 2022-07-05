import {Table} from "antd";
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";


/*const [dataSource, setDataSource] = useState( [
    {key: 1, name: 'may', address: '12'},
    {key: 2, name: 'Bay', address: '1234'},
    {key: 3, name: 'Lay', address: '123456'},
]);*/

export const App = () => {

    useEffect(() => {
        async function getResponse() {
            let response = await fetch('http://localhost:8080/api/users/')
            //let data = [...content]

            //console.log('Line 25', content)
            return response.json();
        }
        getResponse().then(res => {
            setData(res)
            })

    },[])

    const [data, setData] = useState([])
    const [month, setMonth] = useState([])
    const [daysStart, setDaysStart] = useState([])
    const [daysEnd, setDaysEnd] = useState([])
    const [dataSingle, setDataSingle] = useState({})

    useEffect(()=> {
        // setMonth(data.map((item) => item.Days))
        // setDaysStart(data.map((item) => item.Days[0].Start))
        // setDaysEnd(data.map((item) => item.Days[0].End))
        setDataSingle(data[0])
        //console.log('single', dataSingle)
        //console.log('single', dataSingle.Days)
    },[data])

        // console.log('month',month)
        // console.log('DaysStart',daysStart)
        // console.log('DaysEnd',daysEnd)

        // useEffect(() => {
        //
        //     if ( dataSingle.Days.length > 0 ) {
        //     const singleDataMyObject = dataSingle.Days.reduce((acc, element) => {return {...acc, [element.Date] : element.Start}}, {})
        //     console.log(singleDataMyObject)
        //     }
        // },[dataSingle])

    //КОНВЕРТИРОВАТЬ dateSingle в объект

    const columns =  [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
            fixed: 'left',
        },
        {
            title: 'User',
            dataIndex: 'Fullname',
            key: '2',
            fixed: 'left',
        },
        {
            key: '3',
            dataIndex: '',
            title: (el) => {console.log('console text', el)
                return 5},
            fixed: 'left',
        }
    ];

    for (let i = 1; i <= 31; i++) {
        columns.push( {
            key: i,
            title: `${i}`,
            dataIndex: 'Date[Days]',
        });
    }
    columns.push({
        key: 33,
        title: 'Total',
        dataIndex: 'Date',
    })


    return (
        <div className="App">
                <Table  dataSource={[dataSingle]} columns={columns} />
        </div>
    )
}
