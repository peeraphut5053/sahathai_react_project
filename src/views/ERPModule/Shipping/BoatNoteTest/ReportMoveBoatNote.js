import pdfMake from "pdfmake/build/pdfmake";
// import { convertAllLotReport, workcenterHeader, dateFormatReport,fontsReport } from './function/GroupLot';
import { convertAllLotReport, workcenterHeader, dateFormatReport, fontsReport } from '../../Production/productionReport/function/GroupLot'
import { logo } from './function/logo'

function ReportMoveBoatNote(dataNow, dataNow2, dataNow3, dataNow4) {
    pdfMake.fonts = fontsReport


    const data = []
    data.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "ขนาด\nSize", fontSize: 11, alignment: 'center' },
        { text: "มาตรฐาน\nStandard", fontSize: 11, alignment: 'center' },
        { text: "เกรด\nGrade", fontSize: 11, alignment: 'center' },
        { text: "ความหนา\nSCH", fontSize: 11, alignment: 'center' },
        { text: "ความยาว\nLength", fontSize: 11, alignment: 'center' },
        { text: "ชนิด\nType", fontSize: 11, alignment: 'center' },
        { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
        { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle = 0;
    let total_pcs = 0;
    let cal_bundel = []

    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["SUMLotBundle"]
        // total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]
        total_pcs = total_pcs + dataNow4[i]["countlot"]
        cal_bundel.push(dataNow[i]["SUMLotPCS"])

        data.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["countlot"], fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === dataNow.length - 1) {
            data.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 8 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: total_pcs, fontSize: 11, alignment: 'center' },
            ],
            )
        }
    }

    //----------------------------------------------
    const data2 = []
    data2.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "ขนาด\nSize", fontSize: 11, alignment: 'center' },
        { text: "มาตรฐาน\nStandard", fontSize: 11, alignment: 'center' },
        { text: "เกรด\nGrade", fontSize: 11, alignment: 'center' },
        { text: "ความหนา\nSCH", fontSize: 11, alignment: 'center' },
        { text: "ความยาว\nLength", fontSize: 11, alignment: 'center' },
        { text: "ชนิด\nType", fontSize: 11, alignment: 'center' },
        { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
        { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle2 = 0;
    let total_pcs2 = 0;
    let cal_bundel2 = []


    for (let i = 0; i < dataNow2.length; i++) {

        total_bundle2 = total_bundle + dataNow2[i]["SUMLotBundle"]
        // total_pcs2 = total_pcs + dataNow2[i]["SUMLotPCS"]
        total_pcs2 = total_pcs2 + dataNow4[i]["countlot"]
        cal_bundel2.push(dataNow2[i]["SUMLotPCS"])

        data2.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow2[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow2[i]["countlot"], fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === dataNow2.length - 1) {
            data2.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 8 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: total_pcs2, fontSize: 11, alignment: 'center' },
            ],
            )
        }
    }

    //---------------------------------------------

    //----------------------------------------------
    const data3 = []
    data3.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "ขนาด\nSize", fontSize: 11, alignment: 'center' },
        { text: "มาตรฐาน\nStandard", fontSize: 11, alignment: 'center' },
        { text: "เกรด\nGrade", fontSize: 11, alignment: 'center' },
        { text: "ความหนา\nSCH", fontSize: 11, alignment: 'center' },
        { text: "ความยาว\nLength", fontSize: 11, alignment: 'center' },
        { text: "ชนิด\nType", fontSize: 11, alignment: 'center' },
        { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
        { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle3 = 0;
    let total_pcs3 = 0;
    let cal_bundel3 = []


    for (let i = 0; i < dataNow3.length; i++) {

        total_bundle3 = total_bundle + dataNow3[i]["SUMLotBundle"]
        // total_pcs3 = total_pcs + dataNow3[i]["SUMLotPCS"]
        total_pcs3 = total_pcs3 + dataNow4[i]["countlot"]
        cal_bundel3.push(dataNow3[i]["SUMLotPCS"])

        data3.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow3[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow3[i]["countlot"], fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === dataNow3.length - 1) {
            data3.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 8 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: total_pcs3, fontSize: 11, alignment: 'center' },
            ],
            )
        }
    }

    //---------------------------------------------
    //----------------------------------------------
    const data4 = []
    data4.push([
        { text: `No.`, fontSize: 11, alignment: 'center', style: 'header' },
        { text: "ขนาด\nSize", fontSize: 11, alignment: 'center' },
        { text: "มาตรฐาน\nStandard", fontSize: 11, alignment: 'center' },
        { text: "เกรด\nGrade", fontSize: 11, alignment: 'center' },
        { text: "ความหนา\nSCH", fontSize: 11, alignment: 'center' },
        { text: "ความยาว\nLength", fontSize: 11, alignment: 'center' },
        { text: "ชนิด\nType", fontSize: 11, alignment: 'center' },
        { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
        { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },

    ])

    let total_bundle4 = 0;
    let total_pcs4 = 0;
    let cal_bundel4 = []


    for (let i = 0; i < dataNow4.length; i++) {

        total_bundle4 = total_bundle + dataNow4[i]["SUMLotBundle"]
        // total_pcs4 = total_pcs + dataNow4[i]["SUMLotPCS"]
        total_pcs4 = total_pcs4 + dataNow4[i]["countlot"]
        cal_bundel4.push(dataNow4[i]["SUMLotPCS"])

        data4.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow4[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow4[i]["countlot"], fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === dataNow4.length - 1) {
            data4.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 8 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: total_pcs4, fontSize: 11, alignment: 'center' },
            ],
            )
        }
    }

    //---------------------------------------------

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
                                text: `ชื่อเรือ`, fontSize: 14, colSpan: 2
                            },
                            { text: 'วันที่', fontSize: 14 },
                            {
                                border: [false, false, false, false],
                                text: 'วันที่ ............ เวลา............ ', fontSize: 14
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
                    widths: [20, 40, 60, 60, 50, 60, 35, 70, 50],
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
                    widths: [20, 40, 60, 60, 50, 60, 35, 70, 50],
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
                    widths: [20, 40, 60, 60, 50, 60, 35, 70, 50],
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
                    widths: [20, 40, 60, 60, 50, 60, 35, 70, 50],
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

export { ReportMoveBoatNote };
