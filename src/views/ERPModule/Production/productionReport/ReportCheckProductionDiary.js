import pdfMake from "pdfmake/build/pdfmake";
import moment from "moment";
import { workcenterHeader } from './function/GroupLot';
import { logo } from './function/logo'
moment.locale("th");

function dateFormatReport(DateTime) {
    return `  วันที่  (Date): ${moment(DateTime).format('YYYY-MM-DD')}  เวลา (Time): ${moment(DateTime).format('HH:mm:ss')} น.  `
}

function ReportCheckProductionDiary(dataNow, selectedDateStart, selectedDateEnd) {

    let startdate = dateFormatReport(selectedDateStart)
    let enddate = dateFormatReport(selectedDateEnd)

    pdfMake.fonts = {
        THSarabunNew: {
            normal: 'THSarabunNew.ttf',
            bold: 'THSarabunNew-Bold.ttf',
            italics: 'THSarabunNew-Italic.ttf',
            bolditalics: 'THSarabunNew-BoldItalic.ttf'
        },
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        }
    }
    const data = []

    data.push([
        { text: `No.`, fontSize: 14, alignment: 'center', style: 'header' },
        { text: "จำนวน", fontSize: 14, alignment: 'center' },
        { text: "lot", fontSize: 14, alignment: 'center' },
        { text: "act weight", fontSize: 14, alignment: 'center' },
        { text: "sts_no", fontSize: 14, alignment: 'center' },
        { text: "remark", fontSize: 14, alignment: 'center' },
    ],
    )

    let total_bundle = 0;
    let total_pcs = 0;

    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["SUMLotBundle"]
        total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]

        let datadetialJson = JSON.parse("[" + dataNow[i]["AllLot2"] + "]")



        data.push([
            {
                text:
                    `Item : ${dataNow[i]["item"]}  Description : ${dataNow[i]["item"]}  STS PO : ${dataNow[i]["ref_num"]}  City : ${dataNow[i]["city"]}
                   ข้อมูล:: Size: ${dataNow[i]["Uf_NPS"]} | Standard: ${dataNow[i]["Uf_NPS"]} | Grade: ${dataNow[i]["Uf_Grade"]} | ความหนา: ${dataNow[i]["Uf_Schedule"]} | ความยาว: ${dataNow[i]["Uf_length"]}  | ชนิด: ${dataNow[i]["Uf_TypeEnd"]}`
                , fontSize: 13, alignment: 'left', colSpan: 6,
            },
            { text: dataNow[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: '', fontSize: 12, alignment: 'center' },
        ],
        )

        for (let j = 0; j < datadetialJson.length; j++) {
            data.push([
                { text: j + 1, alignment: 'center' },
                { text: datadetialJson[j].qty, fontSize: 12, alignment: 'center' },
                { text: datadetialJson[j].lot, fontSize: 12, alignment: 'center' },
                { text: datadetialJson[j].uf_act_weight, fontSize: 12, alignment: 'center' },
                { text: datadetialJson[j].sts_no, fontSize: 12, alignment: 'center' },
                { text: ' ', fontSize: 12, alignment: 'center' },
            ],
            )
        }
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
                                border: [false, false, false, false], text: 'Production Inspection From \n ใบตรวจสอบการผลิตท่อประจำวัน', fontSize: 18
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
                                text: `ผู้ตรวจสอบ ................................
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
                                text: 'ผู้จัดการฝ่าย .................................. \n' + currentPage.toString() + '/' + pageCount, alignment: 'center',
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


                table: {
                    widths: [35, '*', '*', '*', '*', '*'],
                    headerRows: 1,
                    body: data,
                },
            },
        ],
        defaultStyle: {
            font: 'THSarabunNew',
        },

    };
    pdfMake.createPdf(docDefinition).open()

}

export { ReportCheckProductionDiary };
