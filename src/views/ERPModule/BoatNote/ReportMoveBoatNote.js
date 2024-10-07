import pdfMake from "pdfmake/build/pdfmake";
// import { convertAllLotReport, workcenterHeader, dateFormatReport,fontsReport } from './function/GroupLot';
import { fontsReport } from '../Production/productionReport/function/GroupLot'
import { logo } from './function/logo'

function ReportMoveBoatNote(dataNow, loc, boatPosition) {
    pdfMake.fonts = fontsReport

    const data = []
    // data.push([
    //     { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
    //     { text: "ขนาด\nSize", fontSize: 11, alignment: 'center' },
    //     { text: "มาตรฐาน\nStandard", fontSize: 11, alignment: 'center' },
    //     { text: "เกรด\nGrade", fontSize: 11, alignment: 'center' },
    //     { text: "ความหนา\nSCH", fontSize: 11, alignment: 'center' },
    //     { text: "ความยาว\nLength", fontSize: 11, alignment: 'center' },
    //     { text: "ชนิด\nType", fontSize: 11, alignment: 'center' },
    //     { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
    //     { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },
    //     // { text: "ตำแหน่งสินค้า \n boat position", fontSize: 11, alignment: 'center' },

    // ])

    data.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "STS_PO", fontSize: 11, alignment: 'center' },
        // { text: "cust_name", fontSize: 11, alignment: 'center' },
        { text: "City", fontSize: 11, alignment: 'center' },
        { text: "Uf_NPS", fontSize: 11, alignment: 'center' },
        { text: "Uf_spec", fontSize: 11, alignment: 'center' },
        { text: "Uf_Grade", fontSize: 11, alignment: 'center' },
        { text: "Uf_Schedule", fontSize: 11, alignment: 'center' },
        { text: "Uf_length", fontSize: 11, alignment: 'center' },
        { text: "Uf_TypeEnd", fontSize: 11, alignment: 'center' },
        { text: "PCS/BDL", fontSize: 11, alignment: 'center' },
        { text: "Countlot", fontSize: 11, alignment: 'center' },
        { text: "Weight", fontSize: 11, alignment: 'center' },
        // { text: "ตำแหน่งสินค้า \n boat position", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle = 0;
    let total_pcs = 0;
    let total_bdl = 0;
    let total_weight = 0;
    let cal_bundel = []


    let result = dataNow.filter((d) => d.boat_position == "หัวเรือ")

    for (let i = 0; i < result.length; i++) {

        total_bundle = total_bundle + result[i]["SUMLotBundle"]
        // total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]
        total_pcs = total_pcs + result[i]["countlot"]
        total_bdl = total_bdl + result[i]["PCSperBundle"]
        total_weight = total_weight + result[i]["weight"]
        cal_bundel.push(result[i]["SUMLotPCS"])

        data.push([
            { text: i + 1, alignment: 'center' },
            { text: result[i]["STS_PO"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: result[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: result[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: result[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: result[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: result[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: result[i]["PCSperBundle"], fontSize: 12, alignment: 'center' },
            { text: result[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: result[i]["weight"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["boat_position"], fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === result.length - 1) {
            data.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 10 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                // { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bdl, fontSize: 13, alignment: 'center' },
                { text: total_pcs, fontSize: 13, alignment: 'center' },
                { text: total_weight, fontSize: 13, alignment: 'center' },
            ],
            )
        }
    }

    //----------------------------------------------
    const data2 = []
    data2.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "STS_PO", fontSize: 11, alignment: 'center' },
        // { text: "cust_name", fontSize: 11, alignment: 'center' },
        { text: "City", fontSize: 11, alignment: 'center' },
        { text: "Uf_NPS", fontSize: 11, alignment: 'center' },
        { text: "Uf_spec", fontSize: 11, alignment: 'center' },
        { text: "Uf_Grade", fontSize: 11, alignment: 'center' },
        { text: "Uf_Schedule", fontSize: 11, alignment: 'center' },
        { text: "Uf_length", fontSize: 11, alignment: 'center' },
        { text: "Uf_TypeEnd", fontSize: 11, alignment: 'center' },
        { text: "PCS/BDL", fontSize: 11, alignment: 'center' },
        { text: "Countlot", fontSize: 11, alignment: 'center' },
        { text: "Weight", fontSize: 11, alignment: 'center' },
        // { text: "ตำแหน่งสินค้า \n boat position", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle2 = 0;
    let total_pcs2 = 0;
    let total_bdl2 = 0;
    let total_weight2 = 0;
    let cal_bundel2 = []

    let result2 = dataNow.filter((d) => d.boat_position == "กลางหัว")

    for (let i = 0; i < result2.length; i++) {

        total_bundle2 = total_bundle + result2[i]["SUMLotBundle"]
        // total_pcs2 = total_pcs + dataNow2[i]["SUMLotPCS"]
        total_pcs2 = total_pcs2 + result2[i]["countlot"]
        total_bdl2 = total_bdl2 + result2[i]["PCSperBundle"]
        total_weight2 = total_weight2 + result2[i]["weight"]
        cal_bundel2.push(dataNow[i]["SUMLotPCS"])


        data2.push([
            { text: i + 1, alignment: 'center' },
            { text: result2[i]["STS_PO"], fontSize: 12, alignment: 'center' },
            // { text: result2[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["PCSperBundle"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: result2[i]["weight"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["boat_position"], fontSize: 12, alignment: 'center' },

        ],
        )
        if (i === result2.length - 1) {
            data2.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 10 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                // { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bdl2, fontSize: 13, alignment: 'center' },
                { text: total_pcs2, fontSize: 13, alignment: 'center' },
                { text: total_weight2, fontSize: 13, alignment: 'center' },
            ],
            )
        }
    }

    //---------------------------------------------

    //----------------------------------------------
    const data3 = []
    data3.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "STS_PO", fontSize: 11, alignment: 'center' },
        // { text: "cust_name", fontSize: 11, alignment: 'center' },
        { text: "City", fontSize: 11, alignment: 'center' },
        { text: "Uf_NPS", fontSize: 11, alignment: 'center' },
        { text: "Uf_spec", fontSize: 11, alignment: 'center' },
        { text: "Uf_Grade", fontSize: 11, alignment: 'center' },
        { text: "Uf_Schedule", fontSize: 11, alignment: 'center' },
        { text: "Uf_length", fontSize: 11, alignment: 'center' },
        { text: "Uf_TypeEnd", fontSize: 11, alignment: 'center' },
        { text: "PCS/BDL", fontSize: 11, alignment: 'center' },
        { text: "Countlot", fontSize: 11, alignment: 'center' },
        { text: "Weight", fontSize: 11, alignment: 'center' },
        // { text: "ตำแหน่งสินค้า \n boat position", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle3 = 0;
    let total_pcs3 = 0;
    let total_bdl3 = 0;
    let total_weight3 = 0;
    let cal_bundel3 = []

    let result3 = dataNow.filter((d) => d.boat_position == "กลางท้าย")

    for (let i = 0; i < result3.length; i++) {

        total_bundle3 = total_bundle + result3[i]["SUMLotBundle"]
        // total_pcs3 = total_pcs + dataNow3[i]["SUMLotPCS"]
        total_pcs3 = total_pcs3 + result3[i]["countlot"]
        total_bdl3 = total_bdl3 + result3[i]["PCSperBundle"]
        total_weight3 = total_weight3 + result3[i]["weight"]
        cal_bundel3.push(result3[i]["SUMLotPCS"])

        data3.push([
            { text: i + 1, alignment: 'center' },
            { text: result3[i]["STS_PO"], fontSize: 12, alignment: 'center' },
            // { text: result3[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["PCSperBundle"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: result3[i]["weight"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["boat_position"], fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === result3.length - 1) {
            data3.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 10 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                // { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bdl3, fontSize: 13, alignment: 'center' },
                { text: total_pcs3, fontSize: 13, alignment: 'center' },
                { text: total_weight3, fontSize: 13, alignment: 'center' },
            ],
            )
        }
    }

    //---------------------------------------------
    //----------------------------------------------
    const data4 = []
    data4.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "STS_PO", fontSize: 11, alignment: 'center' },
        // { text: "cust_name", fontSize: 11, alignment: 'center' },
        { text: "City", fontSize: 11, alignment: 'center' },
        { text: "Uf_NPS", fontSize: 11, alignment: 'center' },
        { text: "Uf_spec", fontSize: 11, alignment: 'center' },
        { text: "Uf_Grade", fontSize: 11, alignment: 'center' },
        { text: "Uf_Schedule", fontSize: 11, alignment: 'center' },
        { text: "Uf_length", fontSize: 11, alignment: 'center' },
        { text: "Uf_TypeEnd", fontSize: 11, alignment: 'center' },
        { text: "PCS/BDL", fontSize: 11, alignment: 'center' },
        { text: "Countlot", fontSize: 11, alignment: 'center' },
        { text: "Weight", fontSize: 11, alignment: 'center' },
        // { text: "ตำแหน่งสินค้า \n boat position", fontSize: 11, alignment: 'center' },


    ])

    let total_bundle4 = 0;
    let total_pcs4 = 0;
    let total_bdl4 = 0;
    let total_weight4 = 0;
    let cal_bundel4 = []

    let result4 = dataNow.filter((d) => d.boat_position == "ท้ายเรือ")

    for (let i = 0; i < result4.length; i++) {

        total_bundle4 = total_bundle + result4[i]["SUMLotBundle"]
        // total_pcs4 = total_pcs + dataNow4[i]["SUMLotPCS"]
        total_pcs4 = total_pcs4 + result4[i]["countlot"]
        total_bdl4 = total_bdl4 + result4[i]["PCSperBundle"]
        total_weight4 = total_weight4 + result4[i]["weight"]
        cal_bundel4.push(result4[i]["SUMLotPCS"])

        data4.push([
            { text: i + 1, alignment: 'center' },
            { text: result4[i]["STS_PO"], fontSize: 12, alignment: 'center' },
            // { text: result4[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["PCSperBundle"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: result4[i]["weight"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["boat_position"], fontSize: 12, alignment: 'center' },

        ],
        )
        if (i === result4.length - 1) {
            data4.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 10 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                // { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bdl4, fontSize: 13, alignment: 'center' },
                { text: total_pcs4, fontSize: 13, alignment: 'center' },
                { text: total_weight4, fontSize: 13, alignment: 'center' },
            ],
            )
        }
    }

    //---------------------------------------------
    //----------------------------------------------
    const data5 = []
    data5.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "STS_PO", fontSize: 11, alignment: 'center' },
        // { text: "cust_name", fontSize: 11, alignment: 'center' },
        { text: "City", fontSize: 11, alignment: 'center' },
        { text: "Uf_NPS", fontSize: 11, alignment: 'center' },
        { text: "Uf_spec", fontSize: 11, alignment: 'center' },
        { text: "Uf_Grade", fontSize: 11, alignment: 'center' },
        { text: "Uf_Schedule", fontSize: 11, alignment: 'center' },
        { text: "Uf_length", fontSize: 11, alignment: 'center' },
        { text: "Uf_TypeEnd", fontSize: 11, alignment: 'center' },
        { text: "PCS/BDL", fontSize: 11, alignment: 'center' },
        { text: "Countlot", fontSize: 11, alignment: 'center' },
        { text: "Weight", fontSize: 11, alignment: 'center' },
        // { text: "ตำแหน่งสินค้า \n boat position", fontSize: 11, alignment: 'center' },


    ])

    let total_bundle5 = 0;
    let total_pcs5 = 0;
    let total_bdl5 = 0;
    let total_weight5 = 0;
    let cal_bundel5 = []

    let result5 = dataNow.filter((d) => d.boat_position == "")

    for (let i = 0; i < result5.length; i++) {

        total_bundle5 = total_bundle + result5[i]["SUMLotBundle"]
        // total_pcs4 = total_pcs + dataNow4[i]["SUMLotPCS"]
        total_pcs5 = total_pcs5 + result5[i]["countlot"]
        total_bdl5 = total_bdl5 + result5[i]["PCSperBundle"]
        total_weight5 = total_weight5 + result5[i]["weight"]
        cal_bundel5.push(result5[i]["SUMLotPCS"])

        data5.push([
            { text: i + 1, alignment: 'center' },
            { text: result5[i]["STS_PO"], fontSize: 12, alignment: 'center' },
            // { text: result5[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["PCSperBundle"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: result5[i]["weight"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["boat_position"], fontSize: 12, alignment: 'center' },

        ],
        )
        if (i === result5.length - 1) {
            data5.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 10 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                // { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bdl5, fontSize: 13, alignment: 'center' },
                { text: total_pcs5, fontSize: 13, alignment: 'center' },
                { text: total_weight5, fontSize: 13, alignment: 'center' },
            ],
            )
        }
    }

    if (boatPosition == "หัวเรือ"){
        var docDefinition2 = {
            pageSize: 'A4',
            pageMargins: [25, 5, 25, 10],
    
            content: [
                {
                    margin: [20, 5, 50, 10],
                    table: {
                        widths: [310, 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    width: 70,
                                    image: logo(),
                                    alignment: 'left',
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: 'Boat Note', fontSize: 18
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: `วันที่เริ่ม ${dataNow[0]["startDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    text: dataNow[0]["uf_by"], fontSize: 14, colSpan: 2
                                },
                                { text: 'วันที่', fontSize: 14 },
                                {
                                    border: [false, false, false, false],
                                    text: `วันที่สิ้นสุด ${dataNow[0]["endDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `ชื่อเรือ ${loc} (${dataNow[0]["loc_description"]})`, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Countlot : ${total_pcs + total_pcs2 + total_pcs3 + total_pcs4 + total_pcs5}`, fontSize: 14 
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: '', fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Weight : ${total_weight + total_weight2 + total_weight3 + total_weight4 + total_weight5}`, fontSize: 14 
                                },
                            ],
                        ],
                    },
                },
                {
                    margin: [0, 0, 0, 0],
                    table: {
                        widths: ['*', 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: `หัวเรือ`, fontSize: 16, colSpan: 3, alignment: 'left',
                                },
                                { text: '', fontSize: 14 },
                                { text: '', fontSize: 14 },
                            ],
                        ],
                    },
                },
                {
                    table: {
                        widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                        headerRows: 1,
                        body: data,
                    },
                },
    
               
                {
                    margin: [15, 0, 0, 10],
                    columns: [
                        {
                            fontSize: 16,
                            text: [
                                {
                                    text: `\n ผู้ตรวจสอบ................................................................
                                    FOMFN-08/01-Oct-20`,
                                    margin: [40, 10],
                                    fontSize: 16,
                                },
                                {
                                    text: '',
                                }
                            ],
                            alignment: 'left'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                    ]
    
                }
            ],
            defaultStyle: {
                font: 'THSarabunNew',
            },
    
        };
    }


    if (boatPosition == "กลางหัว"){
        var docDefinition3 = {
            pageSize: 'A4',
            pageMargins: [25, 5, 25, 10],
    
            content: [
                {
                    margin: [20, 5, 50, 10],
                    table: {
                        widths: [310, 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    width: 70,
                                    image: logo(),
                                    alignment: 'left',
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: 'Boat Note', fontSize: 18
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: `วันที่เริ่ม ${dataNow[0]["startDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    text: dataNow[0]["uf_by"], fontSize: 14, colSpan: 2
                                },
                                { text: 'วันที่', fontSize: 14 },
                                {
                                    border: [false, false, false, false],
                                    text: `วันที่สิ้นสุด ${dataNow[0]["endDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `ชื่อเรือ ${loc} (${dataNow[0]["loc_description"]})`, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Countlot : ${total_pcs + total_pcs2 + total_pcs3 + total_pcs4 + total_pcs5}`, fontSize: 14 
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: '', fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Weight : ${total_weight + total_weight2 + total_weight3 + total_weight4 + total_weight5}`, fontSize: 14 
                                },
                            ],
                        ],
                    },
                },
                {
                    margin: [0, 0, 0, 0],
                    table: {
                        widths: ['*', 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: `กลางหัว`, fontSize: 16, colSpan: 3, alignment: 'left',
                                },
                                { text: '', fontSize: 14 },
                                { text: '', fontSize: 14 },
                            ],
                        ],
                    },
                },
                {
                    table: {
                        widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                        headerRows: 1,
                        body: data2,
                    },
                },
    
               
                {
                    margin: [15, 0, 0, 10],
                    columns: [
                        {
                            fontSize: 16,
                            text: [
                                {
                                    text: `\n ผู้ตรวจสอบ................................................................
                                    FOMFN-08/01-Oct-20`,
                                    margin: [40, 10],
                                    fontSize: 16,
                                },
                                {
                                    text: '',
                                }
                            ],
                            alignment: 'left'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                    ]
    
                }
            ],
            defaultStyle: {
                font: 'THSarabunNew',
            },
    
        };
    }

    
    if (boatPosition == "กลางท้าย"){
        var docDefinition4 = {
            pageSize: 'A4',
            pageMargins: [25, 5, 25, 10],
    
            content: [
                {
                    margin: [20, 5, 50, 10],
                    table: {
                        widths: [310, 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    width: 70,
                                    image: logo(),
                                    alignment: 'left',
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: 'Boat Note', fontSize: 18
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: `วันที่เริ่ม ${dataNow[0]["startDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    text: dataNow[0]["uf_by"], fontSize: 14, colSpan: 2
                                },
                                { text: 'วันที่', fontSize: 14 },
                                {
                                    border: [false, false, false, false],
                                    text: `วันที่สิ้นสุด ${dataNow[0]["endDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `ชื่อเรือ ${loc} (${dataNow[0]["loc_description"]})`, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Countlot : ${total_pcs + total_pcs2 + total_pcs3 + total_pcs4 + total_pcs5}`, fontSize: 14 
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: '', fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Weight : ${total_weight + total_weight2 + total_weight3 + total_weight4 + total_weight5}`, fontSize: 14 
                                },
                            ],
                        ],
                    },
                },
                {
                    margin: [0, 0, 0, 0],
                    table: {
                        widths: ['*', 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: `กลางท้าย`, fontSize: 16, colSpan: 3, alignment: 'left',
                                },
                                { text: '', fontSize: 14 },
                                { text: '', fontSize: 14 },
                            ],
                        ],
                    },
                },
                {
                    table: {
                        widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                        headerRows: 1,
                        body: data3,
                    },
                },
    
               
                {
                    margin: [15, 0, 0, 10],
                    columns: [
                        {
                            fontSize: 16,
                            text: [
                                {
                                    text: `\n ผู้ตรวจสอบ................................................................
                                    FOMFN-08/01-Oct-20`,
                                    margin: [40, 10],
                                    fontSize: 16,
                                },
                                {
                                    text: '',
                                }
                            ],
                            alignment: 'left'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                    ]
    
                }
            ],
            defaultStyle: {
                font: 'THSarabunNew',
            },
    
        };
    }


    if (boatPosition == "ท้ายเรือ"){
        var docDefinition5 = {
            pageSize: 'A4',
            pageMargins: [25, 5, 25, 10],
    
            content: [
                {
                    margin: [20, 5, 50, 10],
                    table: {
                        widths: [310, 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    width: 70,
                                    image: logo(),
                                    alignment: 'left',
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: 'Boat Note', fontSize: 18
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false], text: `วันที่เริ่ม ${dataNow[0]["startDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    text: dataNow[0]["uf_by"], fontSize: 14, colSpan: 2
                                },
                                { text: 'วันที่', fontSize: 14 },
                                {
                                    border: [false, false, false, false],
                                    text: `วันที่สิ้นสุด ${dataNow[0]["endDate"]}`, fontSize: 14
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: `ชื่อเรือ ${loc} (${dataNow[0]["loc_description"]})`, fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Countlot : ${total_pcs + total_pcs2 + total_pcs3 + total_pcs4 + total_pcs5}`, fontSize: 14 
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false], text: '', fontSize: 14, colSpan: 2
                                },
                                {
                                    border: [false, false, false, false], text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: `Total Weight : ${total_weight + total_weight2 + total_weight3 + total_weight4 + total_weight5}`, fontSize: 14 
                                },
                            ],
                        ],
                    },
                },
                {
                    margin: [0, 0, 0, 0],
                    table: {
                        widths: ['*', 0, 350],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: `ท้ายเรือ`, fontSize: 16, colSpan: 3, alignment: 'left',
                                },
                                { text: '', fontSize: 14 },
                                { text: '', fontSize: 14 },
                            ],
                        ],
                    },
                },
                {
                    table: {
                        widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                        headerRows: 1,
                        body: data4,
                    },
                },
    
               
                {
                    margin: [15, 0, 0, 10],
                    columns: [
                        {
                            fontSize: 16,
                            text: [
                                {
                                    text: `\n ผู้ตรวจสอบ................................................................
                                    FOMFN-08/01-Oct-20`,
                                    margin: [40, 10],
                                    fontSize: 16,
                                },
                                {
                                    text: '',
                                }
                            ],
                            alignment: 'left'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                        {
                            fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                        },
                    ]
    
                }
            ],
            defaultStyle: {
                font: 'THSarabunNew',
            },
    
        };
    }

    
    else {

    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [25, 5, 25, 10],

        content: [
            {
                margin: [20, 5, 50, 10],
                table: {
                    widths: [310, 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                width: 70,
                                image: logo(),
                                alignment: 'left',
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: 'Boat Note', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 2
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: `วันที่เริ่ม ${dataNow[0]["startDate"]}`, fontSize: 14
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: dataNow[0]["uf_by"], fontSize: 14, colSpan: 2
                            },
                            { text: 'วันที่', fontSize: 14 },
                            {
                                border: [false, false, false, false],
                                text: `วันที่สิ้นสุด ${dataNow[0]["endDate"]}`, fontSize: 14
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `ชื่อเรือ ${loc} (${dataNow[0]["loc_description"]})`, fontSize: 14, colSpan: 2
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false],
                                text: `Total Countlot : ${total_pcs + total_pcs2 + total_pcs3 + total_pcs4 + total_pcs5}`, fontSize: 14 
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: '', fontSize: 14, colSpan: 2
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false],
                                text: `Total Weight : ${total_weight + total_weight2 + total_weight3 + total_weight4 + total_weight5}`, fontSize: 14 
                            },
                        ],
                    ],
                },
            },
            {
                margin: [0, 0, 0, 0],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `หัวเรือ`, fontSize: 16, colSpan: 3, alignment: 'left',
                            },
                            { text: '', fontSize: 14 },
                            { text: '', fontSize: 14 },
                        ],
                    ],
                },
            },
            {
                table: {
                    widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                    headerRows: 1,
                    body: data,
                },
            },

            {
                margin: [0, 0, 0, 0],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `กลางหัว`, fontSize: 16, colSpan: 3, alignment: 'left',
                            },
                            { text: '', fontSize: 14 },
                            { text: '', fontSize: 14 },
                        ],
                    ],
                },
            },
            {
                table: {
                    widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                    headerRows: 1,
                    body: data2,
                },
            },

            {
                margin: [0, 0, 0, 0],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `กลางท้าย`, fontSize: 16, colSpan: 3, alignment: 'left',
                            },
                            { text: '', fontSize: 14 },
                            { text: '', fontSize: 14 },
                        ],
                    ],
                },
            },
            {
                table: {
                    widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                    headerRows: 1,
                    body: data3,
                },
            },
            {
                margin: [0, 0, 0, 0],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `ท้ายเรือ`, fontSize: 16, colSpan: 3, alignment: 'left',
                            },
                            { text: '', fontSize: 14 },
                            { text: '', fontSize: 14 },
                        ],
                    ],
                },
            },
            {
                table: {
                    widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                    headerRows: 1,
                    body: data4,
                },
            },
            {
                margin: [0, 0, 0, 0],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `ไม่ระบุตำแหน่ง`, fontSize: 16, colSpan: 3, alignment: 'left',
                            },
                            { text: '', fontSize: 14 },
                            { text: '', fontSize: 14 },
                        ],
                    ],
                },
            },
            {
                table: {
                    widths: [15, 30, 45, 25, 65, 34, 44, 38, 40, 30, 30, 50],
                    headerRows: 1,
                    body: data5,
                },
            },

            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `\n ผู้ตรวจสอบ................................................................
                                FOMFN-08/01-Oct-20`,
                                margin: [40, 10],
                                fontSize: 16,
                            },
                            {
                                text: '',
                            }
                        ],
                        alignment: 'left'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                ]

            }
        ],
        defaultStyle: {
            font: 'THSarabunNew',
        },

    };
}


    if (boatPosition == "หัวเรือ"){
        pdfMake.createPdf(docDefinition2).open()
    }
    if (boatPosition == "กลางหัว"){
        pdfMake.createPdf(docDefinition3).open()
    }
    if (boatPosition == "กลางท้าย"){
        pdfMake.createPdf(docDefinition4).open()
    }
    if (boatPosition == "ท้ายเรือ"){
        pdfMake.createPdf(docDefinition5).open()
    }
    else {
        pdfMake.createPdf(docDefinition).open()
    }
}

export { ReportMoveBoatNote };
