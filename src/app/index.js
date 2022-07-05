import {Table} from "antd";
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";



/*const [dataSource, setDataSource] = useState( [
    {key: 1, name: 'may', address: '12'},
    {key: 2, name: 'Bay', address: '1234'},
    {key: 3, name: 'Lay', address: '123456'},
]);*/



export const App = () => {

    const dataSource = [];

   async function getResponse() {
       let response = await fetch('http://localhost:8080/api/users/', {
           mode: "no-cors",
           method: "get"}
           )
       let content = await response.text()
       //let data = JSON.parse('[' + content + ']')
       //let data = [...content]
       //console.log(typeof data)
       console.log(response.body)

       let key ;
       for (key in content) {
           console.log(content[key])
       }
    }
    getResponse()

    const columns =  [
        {
            title: 'ID',
            dataIndex: 'id',
            //key: '',
        },
        {
            title: 'User',
            dataIndex: 'Fullname',
            //key: '',
        },
    ];


    return (
        <div className="App">
                <Table  dataSource={dataSource} columns={columns} />
        </div>
    )
}
