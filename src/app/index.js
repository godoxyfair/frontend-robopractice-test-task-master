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
    const [usersDataObjectStart, setUsersDataObjectStart] = useState([])
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
                //console.log(user)
                //let newArrayDate = []

                for (let s of trueArrayDays) {
                    const found = user?.Days?.find(feature => feature?.Date === s);
                    newArrayDate.push(found || { Date: s, End: '00-00', Start: '00-00'  });
                }
                //console.log(newArrayDate)
                return {id: user?.id, Fullname: user?.Fullname ,Days: newArrayDate}
                //console.log(newArrayDate);

            }

            //data.forEach(user => {arrayMutation(user?.Days)})

              const newUsers = data.map(user => {return arrayMutation(user)})
               // const fakeNewUser = newUsers.map(user => {return user.Days})
                //console.log('fake',fakeNewUser)
         // console.log(newUsers)

                function getDataDuration(user) {
                    //console.log('UserDays', user)

                        //console.log(user.Days)
                        // separates the string in hours, minutes and seconds
                    function getElementDuration(el) {
                        const [startHours, startMinutes] = el.Start.split('-')
                        const [endHours, endMinutes] = el.End.split('-')
                        //console.log(startHours)
                        // creates a Date instance to work with
                        const startDateUser = new Date()
                        const endDateUser = new Date()

                        // sets hour, minutes and seconds to startDate
                        startDateUser.setHours(startHours)
                        startDateUser.setMinutes(startMinutes)
                        //startDate.setSeconds(startSeconds)

                        // sets hour, minutes and seconds to endDate
                        endDateUser.setHours(endHours)
                        endDateUser.setMinutes(endMinutes)
                        //endDate.setSeconds(endSeconds)

                        const differenceInMilliseconds = endDateUser - startDateUser
                        const differenceInSeconds = differenceInMilliseconds / 1000
                        const differenceInMinutes = differenceInSeconds / 60
                        //const differenceInHours = differenceInMinutes / 60
                        let resultHours;
                        function getTimeFromMins(mins) {
                            let hours = Math.trunc(mins/60);
                            let minutes = mins % 60;
                            resultHours = hours + ':' + minutes
                            return resultHours;
                        }
                        getTimeFromMins(differenceInMinutes)

                        return resultHours;
                    }

                    //const arrayWithDuration = []
                    //console.log(user)
                    //let newArrayDate = []
                    //arrayWithDuration вохвращает обогащенныей array Days
                    const arrayWithDuration = user.Days.map((elem) => {return {...elem, durationMs: getElementDuration(elem)}})
                    //console.log(arrayWithDuration)
                    return {id: user?.id, Fullname: user?.Fullname ,Days: arrayWithDuration}

                    //console.log(differenceInHours)
                }

                const newUsersDuration =  newUsers.map(user => {return getDataDuration(user)})
                //console.log('newUsersDuration',newUsersDuration)
                function getUsersDurationWithTotal(user) {

                //console.log('userDuration',user)

                    function getTotalDuration(userDur) {
                        let TotalDurationsAll = 0;
                        let TotalDurations = 0;
                        console.log('userDuration',userDur)
                       for (let i =0; i < userDur.length; i++){
                           const [startHours, startMinutes] = '00'
                           const [endHours, endMinutes] = userDur[i].durationMs.split(':')
                           const startDate = new Date()
                           const endDate = new Date()
                           startDate.setHours(startHours)
                           startDate.setMinutes(startMinutes)
                           endDate.setHours(endHours)
                           endDate.setMinutes(endMinutes)
                           const differenceInMilliseconds = endDate - startDate
                           const differenceInSeconds = differenceInMilliseconds / 1000
                           const differenceInMinutes = differenceInSeconds / 60

                           TotalDurations = differenceInMinutes + TotalDurations;
                           //console.log('total',TotalDurations)
                       }
                       let totalHours;
                        function getTimeFromMins(mins) {
                            let hours = Math.trunc(mins/60);
                            let minutes = mins % 60;
                            totalHours = hours + ':' + minutes
                            return totalHours;
                        }
                        getTimeFromMins(TotalDurations)
                        //console.log('total',TotalDurations)
                        return totalHours
                    }
                    //console.log('funk',getTotalDuration(user))
                    //getTotalDuration()
                    //console.log(TotalDurations)
                    //const arrayWithTotalDuration = user.Days.map((elem) => {return {...elem, totalDuration: getTotalDuration(elem)}})
                    return {id: user?.id, Fullname: user?.Fullname , Days : user?.Days , Total : getTotalDuration(user.Days) }
                }
                const newUsersDurationTotal =  newUsersDuration.map(user => {return getUsersDurationWithTotal(user)})
               //console.log('newUsersDurationTotal',newUsersDurationTotal)
                function userArrayToObject(user) {
                    let  singleDataObjectStartMy = {}
                    let  singleDataMyObjectEnd ={}
                    //console.log('user', user)
                    //optional chaining ?
                    //if ( user?.length > 0 ) {
                        //console.log('work')
                    //TODO
                    singleDataObjectStartMy = user.Days.reduce((acc, element) => {return {...acc,  [element.Date ] : element.durationMs}}, {id: user?.id, Fullname: user?.Fullname, Total: user?.Total} )
                        //singleDataMyObjectEnd = user.reduce((acc, element) => {return {...acc,  [element?.Date ] : element?.End}}, {})

                   // }
                    //console.log('singleDataMyObjectStart',singleDataObjectStartMy)
                    //setSingleDataObjectStart(singleDataMyObjectStart)
                    //setSingleDataObjectEnd(singleDataMyObjectEnd)
                    return singleDataObjectStartMy
                }

                const newUsersDate =  newUsersDurationTotal.map(user => {return userArrayToObject(user)})
                //console.log('newUsersDate',newUsersDate)
                setUsersDataObjectStart(newUsersDate)

                }
        },[ data])

    //console.log('singleDataObjectStart', singleDataObjectStart)
    //let setSingleDataObjectDuration ={}
    //КОНВЕРТИРОВАТЬ dateSingle в объект
    //let allObject = {id:dataSingle.id, Fullname:dataSingle.Fullname, ...singleDataObjectStart};
    //const newMap = singleDataObjectStart.map(user => {return {user}} )
   //console.log(newMap)
  //let keys = Object.keys(singleDataObjectStart)
    //console.log(keys)
   //console.log('singleDataObject',singleDataObject)
    //console.log(dataSingle)
    //console.log(allObject)
    const dataAll =[]


    const columns =  [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
            fixed: 'left',
            width: 150,
            //render: (item) => Object.keys(item)[0],
            //render: (record) => record.custom.one,
        },
        {
            title: 'User',
            dataIndex: 'Fullname',
            key: '2',
            fixed: 'left',
            width: 150,
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
            //key: s,
            title: s,
            dataIndex: s,
            width: 150,
            //render: item => Object.values(item)[0],
        });
    }
    columns.push({
        key: 33,
        title: 'Total',
        dataIndex: 'Total',
        fixed: 'right',
        width: 150,
    })
//console.log([singleDataObjectStart])
    //console.log(columns)
    return (
        <div className="App">

                <Table
                    rowkey={(record)=>record.primaryKey}
                    dataSource={usersDataObjectStart}
                    columns={columns}
                    scroll={{
                        x: 3000,
                    }}
                    title={() => 'May 2021'}
                    footer={() => 'Red Mad Robot 2021'}
                />

        </div>
    )
}
