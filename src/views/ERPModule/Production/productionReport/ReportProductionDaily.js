import pdfMake from "pdfmake/build/pdfmake";
import { showMatlUsed, convertAllLotReport,workcenterHeader, dateFormatReport,fontsReport } from './function/GroupLot';
import { logo } from './function/logo'

function ReportProductionDaily(dataNow, selectedDateStart, selectedDateEnd) {

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
        { text: "จำนวน\n เกรด B", fontSize: 11, alignment: 'center' },
        { text: "STS PO \nJob", fontSize: 11, alignment: 'center' },
        { text: "Remark", fontSize: 11, alignment: 'center' },
        { text: "วัสดุสิ้นเปลือง\nที่ใช้ผลิต", fontSize: 11, alignment: 'center' },
        { text: "วัสดุสิ้นเปลือง\n(ตามสูตร)", fontSize: 11, alignment: 'center' },
        { text: "วัสดุสิ้นเปลือง\n(ใช้จริง)", fontSize: 11, alignment: 'center' },
    ],
    )

    let total_bundle = 0;
    let total_pcs = 0;


    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["SUMLotBundle"]
        total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]

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
            { text: `${convertAllLotReport("wordsqtybundletotal", dataNow[i]["AllLot"])}`, fontSize: 12, alignment: 'right' },
            { text: dataNow[i]["sumBBundle"], fontSize: 11, alignment: 'center' },
            { text: dataNow[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: ``, fontSize: 12, alignment: 'right' },
            { text: showMatlUsed(dataNow[i]["itemjobmatlused"]), fontSize: 12, alignment: 'left' },
            { text: `${(Number(dataNow[i]["jobmatlused"]).toFixed(2) * Number(dataNow[i]["sumABundle"]).toFixed(2)).toFixed(2)}`, fontSize: 12, alignment: 'right' },
            { text: dataNow[i]["matlused"], fontSize: 12, alignment: 'left' },
        ],
        )
        //i > 0 && i % 13 == 0 ||
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
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
            ],
            )
        }

    }
    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [5, 120, 5, 155],
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
                                border: [false, false, false, false], text: 'Production performance records \n รายงานการผลิตสินค้าประจำวัน', fontSize: 18
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
                margin: [20, 15, 50, 10],
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            {
                                border: [false, false, false, false], text: 'หมายเหตุ .......................................\n......................................................'
                                , fontSize: 14, colSpan: 3
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: '', fontSize: 16
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `ผู้ผลิต /หัวหน้าแผนก...........................`
                                , fontSize: 16, colSpan: 2
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: 'ผู้จัดการฝ่าย .................................. '
                                , fontSize: 16
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: `มุ่งมั่นพัฒนา     สินค้าคุณภาพ     ส่งมอบตรงเวลา     ลูกค้าพึงพอใจ`
                                , fontSize: 14
                                , colSpan: 3
                                , alignment: 'center'
                            },
                            { text: 'วันที่', fontSize: 14 },
                            { text: 'เวลา', fontSize: 14 },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: `FOMFN-07/01-Oct-20`, fontSize: 14,
                            },
                            {
                                border: [false, false, false, false],
                                text: '', fontSize: 14
                            },
                            {
                                border: [false, false, false, false],
                                text: `${currentPage.toString()}/${pageCount}`, fontSize: 14
                                , alignment: 'right'
                            },
                        ],
                    ],
                },
            };
        },

        content: [
            {
                table: {
                    widths: [15, 25, 40, 20, 30, 40, 20, 40, 25, 30, 35, 30, 50, 70, '*', '*', '*'],
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

export { ReportProductionDaily };
