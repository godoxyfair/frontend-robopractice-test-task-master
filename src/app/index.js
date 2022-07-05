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
            setMonth(res.map((item) => item.Days))

            })
    },[])

    const [data, setData] = useState([])
    const [month, setMonth] = useState([])
    const [days, setDays] = useState([])
    console.log('dateDays',days)

    //console.log(month[0][0].Date)


    const columns =  [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: 'User',
            dataIndex: 'Fullname',
            key: '2',
        },
        {
            title: 'Data',
            dataIndex: 'Date',
            key: '3',
        },
    ];




    return (
        <div className="App">
                <Table  dataSource={data} columns={columns} />
        </div>
    )
}
