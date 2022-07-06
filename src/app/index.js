import {Table} from "antd";
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";
import axios from "axios";
import PostService from "../API/PostService";



/*const [dataSource, setDataSource] = useState( [
    {key: 1, name: 'may', address: '12'},
    {key: 2, name: 'Bay', address: '1234'},
    {key: 3, name: 'Lay', address: '123456'},
]);*/

export const App = () => {


    // useEffect(() => {
    //     async function getResponse() {
    //         const response = await fetch('http://localhost:8080/api/users/')
    //         //let data = [...content]
    //
    //         //console.log('Line 25', content)
    //         return response.json();
    //     }
    //     getResponse().then(res => {
    //         setData(res)
    //         setDataSingle(res[0].Days)
    //         })
    //
    // },[])

    useEffect(() => {
        async function getResponse() {

                const tableArrayObject = await PostService.getALL()

                //console.log('Line 25', content)
                setData(tableArrayObject);
                //setMonth(tableArrayObject[0]);
        }
        getResponse();

    },[])


    const [data, setData] = useState([])
    const [month, setMonth] = useState([])
    const [daysStart, setDaysStart] = useState([])
    const [daysEnd, setDaysEnd] = useState([])
    const [dataSingle, setDataSingle] = useState([])
    const [singleDataObject, setSingleDataObject] = useState({})

    useEffect(()=> {
        // setMonth(data.map((item) => item.Days))
        // setDaysStart(data.map((item) => item.Days[0].Start))
        // setDaysEnd(data.map((item) => item.Days[0].End))
        const timer = setTimeout (() => {
            if (data?.length > 0) {
                setDataSingle(data[0])
            } else {
                console.log('ERROR')
            }

        }, 1000)

      // console.log('single1', dataSingle)
        //console.log('single2', dataSingle.Days)
    },[data])
//console.log( dataSingle)
        // console.log('month',month)
        // console.log('DaysStart',daysStart)
        // console.log('DaysEnd',daysEnd)
        //
        useEffect(() => {
            let  singleDataMyObject = {}

            if ( dataSingle && dataSingle?.Days?.length > 0 ) {
            singleDataMyObject = dataSingle?.Days?.reduce((acc, element) => {return {...acc,  [element?.Date ] : element?.Start}}, {})
            console.log('singleDataMyObject',singleDataMyObject)
            }
            setSingleDataObject(singleDataMyObject)
        },[ dataSingle])

    //КОНВЕРТИРОВАТЬ dateSingle в объект
    let allObject = Object.assign({},dataSingle, singleDataObject);
   let keys = Object.keys(singleDataObject)
    console.log('singleDataObject',singleDataObject)
    //console.log(dataSingle)
    // console.log(allObject)
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
                return 1},
            fixed: 'left',
        }
    ];

    for (let i = 0; i <= 31; i++) {
        columns.push( {
            key: i,
            title: `${i+1}`,
            dataIndex: keys[i],
        });
    }
    columns.push({
        key: 33,
        title: 'Total',
        dataIndex: 'Date',
    })


    return (
        <div className="App">
                <Table  dataSource={[allObject]} columns={columns} />
        </div>
    )
}
