import pdfMake from "pdfmake/build/pdfmake";
import { workcenterHeader, dateFormatReport, fontsReport } from './function/GroupLot';
import { logo } from './function/logo'



function ReportCheckPackingDiary(dataNow, selectedDateStart, selectedDateEnd, dataNow2) {

    let startdate = dateFormatReport(selectedDateStart)
    let enddate = dateFormatReport(selectedDateEnd)
    pdfMake.fonts = fontsReport
    const data = []
    const data2 = []

    data.push([
        { text: `No.`, fontSize: 14, alignment: 'center', style: 'header' },
        { text: "จำนวน", fontSize: 14, alignment: 'center' },
        { text: "lot", fontSize: 14, alignment: 'center' },
        { text: "act weight", fontSize: 14, alignment: 'center' },
        { text: "sts_no", fontSize: 14, alignment: 'center' },
        // { text: "remark", fontSize: 14, alignment: 'center' },
    ],
    )

    data2.push([
        { text: "lot", fontSize: 14, alignment: 'center' },
        { text: "จำนวน", fontSize: 14, alignment: 'center' },
        { text: "sts_no", fontSize: 14, alignment: 'center' },
    ],
    )

    let total_bundle = 0;
    let total_pcs = 0;

    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["SUMLotBundle"]
        total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]

        let datadetialJson = JSON.parse("[" + dataNow[i]["AllLot2"] + "]")
        let datadetialJson2 = JSON.parse("[" + dataNow2[i]["AllLot2"] + "]")


        
        data.push([
            {
                border: [true, false, true, false],
                text:
                    `Item : ${dataNow[i]["item"]} \n Description : ${dataNow[i]["ItemDesc"]} \n STS PO : ${dataNow[i]["ref_num"]}  City : ${dataNow[i]["city"]} 
                   ข้อมูล:: Size: ${dataNow[i]["Uf_NPS"]} | Standard: ${dataNow[i]["Uf_NPS"]} | Grade: ${dataNow[i]["Uf_Grade"]} | ความหนา: ${dataNow[i]["Uf_Schedule"]} | ความยาว: ${dataNow[i]["Uf_length"]}  | ชนิด: ${dataNow[i]["Uf_TypeEnd"]}`
                , fontSize: 13, alignment: 'left', colSpan: 5,
            },
            { text: dataNow[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: '', fontSize: 12, alignment: 'center' },
        ],
        )

        data2.push([
            {
                border: [true, false, true, false],
                text:
                    `Item : ${dataNow2[i]["item"]} \n Description : ${dataNow2[i]["ItemDesc"]} \n STS PO : ${dataNow2[i]["mainref"]}  City : ${dataNow2[i]["city"]} 
                   ข้อมูล:: Size: ${dataNow2[i]["Uf_NPS"]} | Standard: ${dataNow2[i]["Uf_NPS"]} | Grade: ${dataNow2[i]["Uf_Grade"]} | ความหนา: ${dataNow2[i]["Uf_Schedule"]} | ความยาว: ${dataNow2[i]["Uf_length"]}  | ชนิด: ${dataNow2[i]["Uf_TypeEnd"]}`
                , fontSize: 13, alignment: 'left', colSpan: 3,
            },
        ],
        )

        for (let j = 0; j < datadetialJson.length; j++) {
            data.push([
                { text: j + 1, alignment: 'center' },
                { text: datadetialJson[j].qty, fontSize: 12, alignment: 'center' },
                { text: datadetialJson[j].lot, fontSize: 12, alignment: 'center' },
                { text: datadetialJson[j].uf_act_weight, fontSize: 12, alignment: 'center' },
                { text: datadetialJson[j].sts_no, fontSize: 12, alignment: 'center' },
                // { text: ' ', fontSize: 12, alignment: 'center' },
            ],
            )
        }
        

        for (let k = 0; k < datadetialJson2.length; k++) {
      
            data2.push([
                { text: datadetialJson2[k].lot, fontSize: 12, alignment: 'center' },
                { text: datadetialJson2[k].qty, fontSize: 12, alignment: 'center' },
                { text: datadetialJson2[k].sts_no, fontSize: 12, alignment: 'center' },
            ],
            )
        }

            data.push([
                { border: [true, false, true, false], text: '' , fontSize: 12, alignment: 'center' , colSpan: 5, pageBreak: 'before'},
            ],
            )
            
            data2.push([
                { border: [true, false, true, false], text: '' , fontSize: 12, alignment: 'center' , colSpan: 3, pageBreak: 'before'},
            ],
            )
    }

    


    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [25, 120, 25, 50],
        header: function (currentPage, pageCount, pageSize) {
            return {
                margin: [20, 15, 50, 10],
                table: {
                    widths: [310, 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                width: 160,
                                image: logo(),
                                alignment: 'left',
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: 'Packing Inspection From \n ใบตรวจสอบการมัดท่อประจำวัน', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)        ${workcenterHeader(dataNow)} `, fontSize: 14, colSpan: 3
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: ` ${startdate} ถึง   ${enddate} `, fontSize: 14, colSpan: 3
                            },
                            { text: 'วันที่', fontSize: 14 },
                            { text: 'เวลา', fontSize: 14 },
                        ],
                    ],
                },
            };
        },
        footer: function (currentPage, pageCount) {
            return {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้ตรวจสอบ(QC)................................
                  FOMFN-08/01-Oct-20`,
                                margin: [40, 10],
                                fontSize: 16,
                            },
                            {
                                text: '',
                            }
                        ],
                        alignment: 'center'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: 'หัวหน้างาน .................................. \n' + currentPage.toString() + '/' + pageCount, alignment: 'center',
                                margin: [0, 0, 0, 0],
                            }
                        ],
                        alignment: 'center'
                    }
                ]
            };
        },

        content: [
            {
            columns: [
                {
                    table: {
                        widths: [30, 40, 75, 45, 80,],
                        headerRows: 1,
                        body: data
                    },
                },
                {          
                    table: {
                        widths: [75, 40, 80],
                        headerRows: 1,
                        body: data2,
                    },
                },
            ],
        },
    ],
        defaultStyle: {
            font: 'THSarabunNew',
            columnGap: 10
        },

    };
    pdfMake.createPdf(docDefinition).open()

}

export { ReportCheckPackingDiary };
