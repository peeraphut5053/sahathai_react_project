import pdfMake from "pdfmake/build/pdfmake";
// import { convertAllLotReport, workcenterHeader, dateFormatReport,fontsReport } from './function/GroupLot';
import { convertAllLotReport, workcenterHeader, dateFormatReport, fontsReport } from '../../Production/productionReport/function/GroupLot'
import { logo } from './function/logo'

function ReportMoveInternal(dataNowHeader,dataNow) {



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
        { text: "เส้น/มัด\nPCS/Bundle", fontSize: 11, alignment: 'center' },
        { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
        { text: "City \n port", fontSize: 11, alignment: 'center' },
        // { text: "มัดที่ \n Bundle no", fontSize: 11, alignment: 'center' },
        { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },
        { text: "จำนวนเส้น \n PCS", fontSize: 11, alignment: 'center' },
        { text: "น้ำหนัก \n มาตรฐาน", fontSize: 11, alignment: 'center' },

    ],
    )

    let total_bundle = 0;
    let total_pcs = 0;
    let total_std_wei = 0;
    let cal_bundel = []

    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["countlot"]
        // total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]
        total_pcs = total_pcs + dataNow[i]["uf_pack"] * dataNow[i]["countlot"]
        total_std_wei = total_std_wei + Number(dataNow[i]["qty2"])

        cal_bundel.push(dataNow[i]["SUMLotPCS"])

        data.push([
            { text: i + 1, alignment: 'center' },
            { text: dataNow[i]["Uf_NPS"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_spec"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Grade"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_Schedule"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_length"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["Uf_TypeEnd"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["uf_pack"], fontSize: 12, alignment: 'center' },
            // { text: dataNow[i]["uf_pack"] * dataNow[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["city"], fontSize: 12, alignment: 'center' },
            // { text: `${convertAllLotReport("wordslot", dataNow[i]["AllLot"])}`, fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["uf_pack"] * dataNow[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["qty2"], fontSize: 12, alignment: 'center' },

        ],
        )
        if (i === dataNow.length - 1) {
            data.push([
                { text: `เอกสารเลขที่ : ${dataNow[i]["doc_num"]}`, fontSize: 11, alignment: 'center', style: 'header', colSpan: 8 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bundle, fontSize: 11, alignment: 'center' },
                { text: total_pcs, fontSize: 11, alignment: 'center' },
                { text: Number(total_std_wei).toFixed(2), fontSize: 11, alignment: 'center' }
                // { text: "", fontSize: 11, alignment: 'center' },
                // { text: "", fontSize: 11, alignment: 'center' },
            ],
            )
        }

    }

    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [5, 120, 50, 50],
        header: function (currentPage, pageCount, pageSize) {
            return {
                margin: [20, 15, 550, 110],
                table: {
                    headerRows: 4,
                    widths: [410, 0, 450],
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
                                border: [false, false, false, false], text: 'Delivery report \n รายงานการส่งของ', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)      `, fontSize: 14, colSpan: 1
                            },
                            {
                                border: [false, false, false, false], text: '', fontSize: 14, colSpan: 1
                            },
                            {
                                border: [false, false, false, false], text: `ปลายทาง: ${dataNowHeader[0].destination}`, fontSize: 14, colSpan: 1
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: `  78 หมู่ 3 ถนน ปู่เจ้าสมิงพราย ต.บางหญ้าแพรก อ.พระประแดง จ.สมุทรปราการ 10130 `, fontSize: 14, colSpan: 2
                            },
                            { 
                                border: [false, false, false, false],
                                text: 'วันที่', fontSize: 14
                            },
                            {
                                border: [false, false, false, false],
                                text: `เวลา ${dataNowHeader[0].create_date.date.substring(0, 16)}`, fontSize: 14 
                            },
                        ],

                        [
                            {
                                border: [false, false, false, false],
                                text: ` บริษัท ได้ส่งวัสดุ เป็นจำนวน ............... รายการ  ตามรายละเอียดดังต่อไปนี้ `, fontSize: 14, colSpan: 3
                            },
                            {
                                border: [false, false, false, false],
                                text: 'วันที่', fontSize: 14 
                            },
                            { text: 'เวลา', fontSize: 14 },
                        ],
                    ],
                },
            };
        },
        footer: function (currentPage, pageCount) {
            return {
                margin: [25, -200, 0, 300],
                columns: [
                    {
                        table: {
                            widths: [300, 250],
                            body: [
                                [

                                    {
                                        margin: [5, 5, 20, 10],
                                        border: [false, false, false, false],
                                        text: `วัสดุที่ส่งมานี้อยู่ในสภาพเรียบร้อย         และถูกต้องทุกประการ
                                            ได้ตรวจรับถูกต้องทุกประการ       บริษัทสหไทยสตีลไพพ์ จำกัด (มหาชน)`, fontSize: 16, colSpan: 2, alignment: 'center',
                                    },
                                    { text: 'วันที่', fontSize: 14 },
                                ],
                                [

                                    {
                                        margin: [80, 5, 20, 10],
                                        border: [false, false, false, false], text: ` ........................................... \n ผู้รับวัสดุ /หัวหน้าแผนก`, fontSize: 14, colSpan: 1
                                    },
                                    {
                                        margin: [30, 5, 20, 10],
                                        border: [false, false, false, false], text: `........................................... \n       กรรมการหรือตัวแทน   `, fontSize: 14, colSpan: 1
                                    },

                                ],
                                [
                                    {
                                        margin: [80, 5, 20, 10],
                                        border: [false, false, false, false], text: `........................................... \n         ผู้ส่งวัสดุ  `, fontSize: 14, colSpan: 1
                                    },
                                    {
                                        margin: [30, 5, 20, 10],
                                        border: [false, false, false, false], text: `........................................... \n        ร.ป.ภ   `, fontSize: 14, colSpan: 1
                                    },

                                ],
                                [
                                    {
                                        margin: [80, 5, 20, 10],
                                        border: [false, false, false, false], text: `........................................... \n        ผู้ตรวจสอบวัสดุ  `, fontSize: 14, colSpan: 1
                                    },
                                    {
                                        margin: [30, 5, 20, 10],
                                        border: [false, false, false, false], text: `..............${dataNowHeader[0].Uf_car_no}..................... \n          ทะเบียนรถ   `, fontSize: 14, colSpan: 1
                                    },

                                ],
                            ],
                        },
                    },
                ]
            };
        },

        content: [
            {
                margin: [0, 0, 0, 0],
                columns: [
                    {

                        table: {
                            widths: [15, 50, 120, 30, 40, 60, 60, 60, 60],
                            headerRows: 1,
                            body: [
                                {
                                    border: [false, false, false, false],
                                    text: `  78 หมู่ 3 ถนน ปู่เจ้าสมิงพราย ต.บางหญ้าแพรก อ.พระประแดง จ.สมุทรปราการ 10130  `, fontSize: 14, colSpan: 3
                                },
                                { text: 'วันที่', fontSize: 14 },
                                { text: 'เวลา', fontSize: 14 },
                            ],
                        },
                    },
                ],
                columns: [
                    {

                        table: {
                            widths: [15, 40, 50, 28, 32, 50, 20, 40, 50, 30, 30, 35, 50, 30,25],
                            headerRows: 1,
                            body: data,
                        },
                    },
                ],
            }
        ],
        defaultStyle: {
            font: 'THSarabunNew',
        },
    };


    pdfMake.createPdf(docDefinition).open()
}

export { ReportMoveInternal };
