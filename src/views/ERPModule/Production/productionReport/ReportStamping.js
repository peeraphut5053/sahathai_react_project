import pdfMake from "pdfmake/build/pdfmake";
import { workcenterHeader, dateFormatReport, fontsReport } from './function/GroupLot';
import { logo } from './function/logo'

function ReportStamping(dataNow, selectedDateStart, selectedDateEnd) {

    let startdate = dateFormatReport(selectedDateStart)
    let enddate = dateFormatReport(selectedDateEnd)

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
        { text: "จำนวนมัด \n Bundle", fontSize: 11, alignment: 'center' },
        { text: "จำนวนเส้น \n PCS", fontSize: 11, alignment: 'center' },
        { text: "STS PO \n Job", fontSize: 11, alignment: 'center' },
        { text: "City \n port", fontSize: 11, alignment: 'center' },
        { text: "Remark", fontSize: 11, alignment: 'center' },
    ],
    )

    let total_bundle = 0;
    let total_pcs = 0;
    let cal_bundel = []

    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["SUMLotBundle"]
        total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]
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
            { text: dataNow[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["uf_pack"] * dataNow[i]["countlot"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["city"], fontSize: 12, alignment: 'center' },
            { text: ' ', fontSize: 12, alignment: 'center' },
        ],
        )
        if (i === dataNow.length - 1) {
            data.push([
                { text: ` `, fontSize: 11, alignment: 'center', style: 'header', colSpan: 12 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
            ],
            )
        }
    }

    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [20, 120, 10, 50],
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
                                border: [false, false, false, false], text: 'Stamping production report \n รายงานการพิมพ์ตราประจำวัน', fontSize: 18
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
                                text: `ผู้ผลิต /หัวหน้าแผนก................................
                  FOMFN-07/01-Oct-20`,
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
                    widths: [15, 25, 40, 20, 30, 40, 20, 40, 40, 50, 50, 40, '*'],
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

export { ReportStamping };
