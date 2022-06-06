import pdfMake from "pdfmake/build/pdfmake";
import moment from "moment";
// import { workcenterHeader, checkingByLot } from './function/GroupLot';
import { logo } from './function/logo'
moment.locale("th");

function dateFormatReport(DateTime) {
    return `  วันที่  (Date): ${moment(DateTime).format('YYYY-MM-DD')}  เวลา (Time): ${moment(DateTime).format('HH:mm:ss')} น.  `
}

function ReportMovingProductReport(dataNow, selectedDateStart, selectedDateEnd) {

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
    const data2 = []

    data.push([
        { text: `No.`, fontSize: 14, alignment: 'center', style: 'header' },
        { text: "จำนวน", fontSize: 14, alignment: 'center' },
        { text: "รายการ", fontSize: 14, alignment: 'center' },
        { text: "เวลาที่ย้าย", fontSize: 14, alignment: 'center' },
        { text: "หมายเหตุ", fontSize: 14, alignment: 'center' },
    ],
    )

    data2.push([
        { text: `No.`, fontSize: 14, alignment: 'center', style: 'header' },
        { text: "จำนวน", fontSize: 14, alignment: 'center' },
        { text: "รายการ", fontSize: 14, alignment: 'center' },
        { text: "เวลาที่ย้าย", fontSize: 14, alignment: 'center' },
        { text: "หมายเหตุ", fontSize: 14, alignment: 'center' },
    ],
    )

    for (let i = 0; i < dataNow.length; i++) {
        data.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow[i]["countbundle"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["item"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["movetime"], fontSize: 12, alignment: 'center' },
            { text: '', fontSize: 12, alignment: 'center' },
        ],
        )
        data2.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow[i]["countbundle"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["item"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["movetime"], fontSize: 12, alignment: 'center' },
            { text: '', fontSize: 12, alignment: 'center' },
        ],
        )
    }

    let addrow = 5 - dataNow.length
    for (let i = 0; i < addrow; i++) {
        data.push([
            { text: ' ', alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
        ],
        )

        data2.push([
            { text: ' ', alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
        ],
        )
    }



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
                                width: 140,
                                image: logo(),
                                alignment: 'left',
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: 'ใบขนย้ายระหว่างสาขา', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 3
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
            },
            {
                table: {
                    widths: [35, 35, '*', 100, 70],
                    headerRows: 1,
                    body: data,
                },
            },
            {
                margin: [20, 5, 20, 10],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `วัสดุที่ส่งมานี้อยู่ในสภาพเรียบร้อย         และถูกต้องทุกประการ
                                    ได้ตรวจรับถูกต้องทุกประการ       บริษัทสหไทยสตีลไพพ์ จำกัด (มหาชน)`, fontSize: 16, colSpan: 3, alignment: 'center',
                            },
                            { text: 'วันที่', fontSize: 14 },
                            { text: 'เวลา', fontSize: 14 },
                        ],
                    ],
                },
            },

            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้รับวัสดุ.....................................................................`,
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

            },
            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้ส่งวัสดุ .................................................................... `,
                                margin: [40, 10],
                                fontSize: 16,
                            },
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

            },
            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้ตรวจสอบ................................................................
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

            },
            {
                text: '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
            },

            {
                margin: [20, 15, 50, 10],
                table: {
                    widths: [310, 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                width: 140,
                                image: logo(),
                                alignment: 'left',
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: 'ใบขนย้ายระหว่างสาขา', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)         `, fontSize: 14, colSpan: 3
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
            },
            {
                table: {
                    widths: [35, 35, '*', 100, 70],
                    headerRows: 1,
                    body: data2,
                },
            },
            {
                margin: [20, 5, 20, 10],
                table: {
                    widths: ['*', 0, 350],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: `วัสดุที่ส่งมานี้อยู่ในสภาพเรียบร้อย         และถูกต้องทุกประการ
                                    ได้ตรวจรับถูกต้องทุกประการ       บริษัทสหไทยสตีลไพพ์ จำกัด (มหาชน)`, fontSize: 16, colSpan: 3, alignment: 'center',
                            },
                            { text: 'วันที่', fontSize: 14 },
                            { text: 'เวลา', fontSize: 14 },
                        ],
                    ],
                },
            },

            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้รับวัสดุ.....................................................................`,
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

            },
            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้ส่งวัสดุ .................................................................... `,
                                margin: [40, 10],
                                fontSize: 16,
                            },
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

            },
            {
                margin: [15, 0, 0, 10],
                columns: [
                    {
                        fontSize: 16,
                        text: [
                            {
                                text: `ผู้ตรวจสอบ................................................................
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
    pdfMake.createPdf(docDefinition).open()

}

export { ReportMovingProductReport };
