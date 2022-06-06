import API from '../components/API';


// const searchExecutiveSummaryData = () => {
//     setTimeout(() => {
//         API.get(`API_ExecutiveReport/data.php?load=setExecutiveSummaryData1`)
//             .then(res => {
//                 (res.data) ? setExecutiveSummaryData1(res.data) : setExecutiveSummaryData1([])
//             })

//         API.get(`API_ExecutiveReport/data.php?load=setExecutiveSummaryData2`)
//             .then(res => {
//                 (res.data) ? setExecutiveSummaryData2(res.data) : setExecutiveSummaryData2([])
//             })
//     }, 2000);

// }

const searchExecutiveSummaryData2 = () => {
    API.get(`API_ExecutiveReport/data.php?load=setExecutiveSummaryData1`).then(res => {
        console.log(res.data)
        return res.data
    })
}


export { searchExecutiveSummaryData2 };
