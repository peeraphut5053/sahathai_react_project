import pdfMake from "pdfmake/build/pdfmake";
import { convertAllLotReport, workcenterHeader, dateFormatReport, fontsReport } from '../../Production/productionReport/function/GroupLot'
import { logo } from './function/logo'

function ReportSummaryBoatNote(dataNow, loc, dataNow3, dataNow4) {
    pdfMake.fonts = fontsReport


    const data = []
    data.push([
        { text: `No.`, fontSize: 12, alignment: 'center', style: 'header' },
        { text: "Loc", fontSize: 12, alignment: 'center' },
        // { text: "Description", fontSize: 12, alignment: 'center' },
        { text: "Cust_name", fontSize: 12, alignment: 'center' },
        { text: "City", fontSize: 12, alignment: 'center' },
        { text: "STS_PO", fontSize: 12, alignment: 'center' },
        { text: "CUST_PO", fontSize: 12, alignment: 'center' },
        { text: "Countlot", fontSize: 12, alignment: 'center' },
        { text: "Weight", fontSize: 12, alignment: 'center' },
    ])


    let total_countlot = 0;
    let total_weight = 0;

    let result = dataNow

    for (let i = 0; i < result.length; i++) {
        const britishNumberFormatter = new Intl.NumberFormat("en-GB");

        total_countlot += result[i]["sumSTS_PO"]
        total_weight += result[i]["sumWeight"]

        data.push([
            { text: i + 1, alignment: 'center' },
            { text: result[i]["loc"], fontSize: 12, alignment: 'center' },
            // { text: result[i]["loc_description"], fontSize: 12, alignment: 'center' },
            { text: result[i]["cust_name"], fontSize: 12, alignment: 'center' },
            { text: result[i]["city"], fontSize: 12, alignment: 'center' },
            { text: result[i]["sts_PO"], fontSize: 12, alignment: 'center' },
            { text: result[i]["cust_po"], fontSize: 12, alignment: 'center' },
            { text: britishNumberFormatter.format(result[i]["sumSTS_PO"]), fontSize: 12, alignment: 'center' },
            { text: britishNumberFormatter.format(result[i]["sumWeight"]), fontSize: 12, alignment: 'center' },
        ],)

        if (i === result.length - 1) {
            data.push([
                { text: "Total", fontSize: 13, alignment: 'center', colSpan: 6 },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: britishNumberFormatter.format(total_countlot) , fontSize: 13, alignment: 'center' },
                { text: britishNumberFormatter.format(total_weight), fontSize: 13, alignment: 'center' },
            ])
        }
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
                                border: [false, false, false, false], text: `วันที่เริ่ม ${dataNow[0]["startDate"]}`, fontSize: 14
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: dataNow[0]["uf_by"], fontSize: 14
                            },
                            { 
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: `วันที่สิ้นสุด ${dataNow[1]["endDate"]}`, fontSize: 14
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `${dataNow[0]["loc_description"]} ทะเบียนเรือ ${dataNow[0]["loc_no"]}` , fontSize: 14
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
                                border: [false, false, false, false], text: ''
                            },
                            { 
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: ''
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
                                text: '',fontSize: 16, colSpan: 3, alignment: 'left',
                            },
                            { text: '', fontSize: 14 },
                            { text: '', fontSize: 14 },
                        ],
                    ],
                },
            },
            {
                table: {
                    widths: [20, 50, 70, 70, 50, 105, 50, 60,5],
                    headerRows: 1,
                    body: data,
                },
            },
            {
                margin: [20, 0, 0, 20],
                columns: [
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'right'
                    },
                ]
            },
            {
                margin: [20, 0, 0, 20],
                columns: [
                    {
                        fontSize: 16, text: [{ text: `............................................................
                        SAHA THAI STEEL PIPE CO., LTD.`, alignment: 'center' },], alignment: 'left'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                    {
                        fontSize: 16, text: [{ text: `............................................................
                        TAIKONG RECEIVER`, alignment: 'center' },], alignment: 'right'
                    },
                ]
            },
            {
                margin: [20, 0, 0, 20],
                columns: [
                    {
                        fontSize: 16, text: [{ text: `DATE : .................................................`
                        , alignment: 'center' },], alignment: 'left'
                    },
                    {
                        fontSize: 16, text: [{ text: '', alignment: 'right' },], alignment: 'center'
                    },
                    {
                        fontSize: 16, text: [{ text: `............................................................
                        CHECKER RECEIVER`, alignment: 'center' },], alignment: 'right'
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


export { ReportSummaryBoatNote };
