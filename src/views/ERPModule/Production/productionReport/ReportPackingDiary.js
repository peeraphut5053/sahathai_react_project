import pdfMake from "pdfmake/build/pdfmake";
import { convertAllLotReport, workcenterHeader, dateFormatReport,fontsReport } from './function/GroupLot';
import {logo} from './function/logo'

function ReportPackingDiary(dataNow, selectedDateStart, selectedDateEnd) {

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
        { text: "มัดที่ \n Bundle no", fontSize: 11, alignment: 'center' },
        { text: "เส้น/มัด\nPCS/Bundle", fontSize: 11, alignment: 'center' },
        { text: "จำนวนมัด\nBundle", fontSize: 11, alignment: 'center' },
        { text: "จำนวนเส้น\nTotal(pcs)", fontSize: 11, alignment: 'center' },
        { text: "STS PO \nJob", fontSize: 11, alignment: 'center' },
        { text: "city\n Port", fontSize: 11, alignment: 'center' },
        { text: "Remark", fontSize: 11, alignment: 'center' },
        { text: "เกรด B \n reject", fontSize: 11, alignment: 'center' },
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
            { text: `${convertAllLotReport("wordslot", dataNow[i]["AllLot"])}`, fontSize: 12, alignment: 'center' },
            { text: `${convertAllLotReport("wordsqty", dataNow[i]["AllLot"])}`, fontSize: 12, alignment: 'center' },
            { text: `${convertAllLotReport("wordsqtybundle", dataNow[i]["AllLot"])}`, fontSize: 12, alignment: 'center' },
            { text: `${convertAllLotReport("wordsqtybundletotal", dataNow[i]["AllLot"])}`, fontSize: 12, alignment: 'right' }, //resuult_qty
            { text: dataNow[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["city"], fontSize: 10, alignment: 'center' },
            { text: "", fontSize: 12, alignment: 'right' },
            { text: dataNow[i]["sumBBundle"], fontSize: 12, alignment: 'right' },
        ],
        )
        if (i === dataNow.length - 1) {
            data.push([
                { text: ``, fontSize: 11, alignment: 'center', style: 'header', colSpan: 9 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: total_bundle, fontSize: 11, alignment: 'right' },
                { text: total_pcs, fontSize: 11, alignment: 'right' },
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
        pageMargins: [5, 120, 5, 50],
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
                                border: [false, false, false, false], text: 'Packing production performance records \n รายงานการมัดท่อประจำวัน', fontSize: 18
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
                    widths: [15, 25, 40, 20, 30, 40, 20, 40, 25, 30, 35, 30, 45, 35, 20],
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

export { ReportPackingDiary };
