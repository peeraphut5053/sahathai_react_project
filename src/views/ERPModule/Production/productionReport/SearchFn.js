import React from 'react';
import API from '../components/API';


const SearchFn = async (values, wc_group_query) => {
    setLocalStorageW_c(values.w_c)
    setisLoadingData(true)
    try {
        const response = await API.get("RPT_JOBPACKING/data.php", {
            params: {
                load: "ajax2",
                txtFromDate: values.startdate,
                txtToDate: values.enddate,
                txtItem: values.item,
                txtref_num: values.refnum,
                txtw_c: values.w_c,
                wc_group_query: wc_group_query
            }
        });

        let kotFromDataO = " 0019(19; 0020(19; 0021(19; 0022(19; 0023(19; 0025(19; 0026(19; 0027(19; 0028(19; 0029(19; 0030(19; 0031(19; 0032(19; 0033(19; 0034(19; 0035(19; 0036(19; 0037(19; 0038(19; 0039(19; 0040(19; 0041(19; 0042(19; 0043(19; 0044(19; 0045(19; 0046(19; 0047(19; 0048(19; 0049(19; 0050(19; 0051(19; 0052(19; 0053(19; 0054(19; 0055(19; 0056(19; 0057(19; 0058(19; 0059(19; 0060(19; 0061(19; 0062(19; 0063(19; 0064(19; 0065(19; 0066(19; 0067(19; 0068(19; 0069(19; 0070(19; 0071(19; 0072(19; 0073(19; 0074(19; 0075(19; 0076(19; 0077(19; 0078(19"
        // console.log("------------------------------------")
        console.log(convertAllLotReport("wordslot", kotFromDataO))

        if (wc_group_query === 'Packing') {
            ReportPackingDiary(response.data, values.startdate, values.enddate)
        } else if (wc_group_query === 'Production') {
            ReportProductionDaily(response.data, values.startdate, values.enddate)
        } else if (wc_group_query === 'Forming') {
            ReportForming(response.data, values.startdate, values.enddate)
        } else {

        }
        setdata(response.data)
        setisLoadingData(false)
    } catch (error) {
        alert(error)
        console.log("error", error);
    }
}

export default SearchFn
