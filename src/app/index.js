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
    const [singleDataObjectStart, setSingleDataObjectStart] = useState({})
    const [singleDataObjectEnd, setSingleDataObjectEnd] = useState({})

    // useEffect(()=> {
    //     // setMonth(data.map((item) => item.Days))
    //     // setDaysStart(data.map((item) => item.Days[0].Start))
    //     // setDaysEnd(data.map((item) => item.Days[0].End))
    //
    //         data?.length > 0 ? setDataSingle(data[3]) : console.log('ERROR')
    //             // for (let i = 0; i< data?.length; i++) {
    //             //     setDataSingle(data[i]) //вот тут надо все данные выводить а не одного
    //             // }
    //
    //   // console.log('single1', dataSingle)
    //     //console.log('single2', dataSingle.Days)
    // },[data])
//console.log( dataSingle?.Days)
        // console.log('month',month)
        // console.log('DaysStart',daysStart)
        // console.log('DaysEnd',daysEnd)
        //
   // console.log('single2', dataSingle)


    //console.log('newArray',newArrayDate)
//TODO: заполнить массив нормально
    const trueArrayDays = [
        '2021-05-01','2021-05-02', '2021-05-03', '2021-05-04','2021-05-05', '2021-05-06','2021-05-07',
        '2021-05-08', '2021-05-09', '2021-05-10','2021-05-11','2021-05-12', '2021-05-13', '2021-05-14', '2021-05-15',
        '2021-05-16','2021-05-17', '2021-05-18', '2021-05-19','2021-05-20', '2021-05-21', '2021-05-22', '2021-05-23',
        '2021-05-24', '2021-05-25', '2021-05-26', '2021-05-27', '2021-05-28', '2021-05-29', '2021-05-30', '2021-05-31'
    ]
        useEffect(() => {
            //console.log(data)
            if (data && data?.length > 0) {
            //console.log('WORK')


            function arrayMutation(user) {
                const newArrayDate = []

                //let newArrayDate = []

                for (let s of trueArrayDays) {
                    const found = user?.Days?.find(feature => feature?.Date === s);
                    newArrayDate.push(found || { Date: s, End: '0', Start: '0'  });
                }
                //console.log(newArrayDate)
                return {id: user?.id, Fullname: user?.Fullname ,Days: newArrayDate}
                //console.log(newArrayDate);

            }

            //data.forEach(user => {arrayMutation(user?.Days)})

              const newUsers = data.map(user => {return arrayMutation(user)})
            //arrayMutation(dataSingle?.Days)
            //console.log(newUsers)


                function userArrayToObject(user) {
                    let  singleDataMyObjectStart = {}
                    let  singleDataMyObjectEnd ={}
                    //console.log('user', user)
                    //optional chaining ?
                    //if ( user?.length > 0 ) {
                        //console.log('work')
                    //TODO
                        singleDataMyObjectStart = user.Days.reduce((acc, element) => {return {...acc,  [element.Date ] : element.Start}}, {id: user?.id, Fullname: user?.Fullname} )
                        //singleDataMyObjectEnd = user.reduce((acc, element) => {return {...acc,  [element?.Date ] : element?.End}}, {})

                   // }
                    //console.log('singleDataMyObjectStart',singleDataMyObjectStart)
                    //setSingleDataObjectStart(singleDataMyObjectStart)
                    //setSingleDataObjectEnd(singleDataMyObjectEnd)
                    return singleDataMyObjectStart
                }

                const newUsersDate =  newUsers.map(user => {return userArrayToObject(user)})
                console.log('newUsersDate',newUsersDate)
                setSingleDataObjectStart(newUsersDate)
                }
        },[ data])

    //console.log('singleDataObjectStart',singleDataObjectStart)
    //let setSingleDataObjectDuration ={}
    //КОНВЕРТИРОВАТЬ dateSingle в объект
    let allObject = {id:dataSingle.id, Fullname:dataSingle.Fullname, ...singleDataObjectStart};
  // let keys = Object.keys(singleDataObjectStart)

   //console.log('singleDataObject',singleDataObject)
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
        // {
        //     key: '3',
        //     dataIndex: '',
        //     title: (el) => {console.log('console text', el)
        //         return 1},
        //     fixed: 'left',
        // }
    ];

    for (let s of trueArrayDays) {
        columns.push( {
            key: s,
            title: `${s}`,
            dataIndex: trueArrayDays[s],
        });
    }
    columns.push({
        key: 33,
        title: 'Total',
        dataIndex: 'Date',
        fixed: 'right',
    })


    return (
        <div className="App">
                <Table  dataSource={[allObject]} columns={columns} />
        </div>
    )
}
