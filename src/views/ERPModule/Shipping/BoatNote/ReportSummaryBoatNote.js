import pdfMake from "pdfmake/build/pdfmake";
import { convertAllLotReport, workcenterHeader, dateFormatReport, fontsReport } from '../../Production/productionReport/function/GroupLot'
import { logo } from './function/logo'

function ReportSummaryBoatNote(dataNow, loc, dataNow3, dataNow4) {
    pdfMake.fonts = fontsReport


    const data = []
    data.push([
        { text: `No.`, fontSize: 12, alignment: 'center', style: 'header' },
        { text: "Loc", fontSize: 12, alignment: 'center' },
        { text: "Description", fontSize: 12, alignment: 'center' },
        { text: "Cust_name", fontSize: 12, alignment: 'center' },
        { text: "City", fontSize: 12, alignment: 'center' },
        { text: "STS_PO", fontSize: 12, alignment: 'center' },
        { text: "Countlot", fontSize: 12, alignment: 'center' },
        { text: "Weight", fontSize: 12, alignment: 'center' },
    ])

    let result = dataNow

    for (let i = 0; i < result.length; i++) {

        data.push([
            { text: i + 1, alignment: 'center' },
            { text: result[i]["loc"], fontSize: 12, alignment: 'center' },
            { text: result[i]["loc_description"], fontSize: 12, alignment: 'center' },
            { text: result[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result[i]["sts_PO"], fontSize: 12, alignment: 'center' },
            { text: result[i]["sumSTS_PO"], fontSize: 12, alignment: 'center' },
            { text: result[i]["sumWeight"], fontSize: 12, alignment: 'center' },
        ])
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
                                width: 70,
                                image: logo(),
                                alignment: 'left',
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: 'Report Summary Boat Note', fontSize: 18
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
                                border: [false, false, false, false], text: dataNow[1]["uf_by"], fontSize: 14
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: ''
                            },
                            { 
                                border: [false, false, false, false], text: '' },
                            {
                                border: [false, false, false, false], text: ''
                            },
                        ],
                    ],
                },
            },
            // {
            //     margin: [0, 0, 0, 0],
            //     table: {
            //         widths: ['*', 0, 350],
            //         body: [
            //             [
            //                 {
            //                     border: [false, false, false, false],
            //                     text: dataNow[1]["uf_by"],fontSize: 16, colSpan: 3, alignment: 'left',
            //                 },
            //                 { text: '', fontSize: 14 },
            //                 { text: '', fontSize: 14 },
            //             ],
            //         ],
            //     },
            // },
            {
                table: {
                    widths: [20, 55, 90, 70, 70, 55, 55, 60],
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


export { ReportSummaryBoatNote };
