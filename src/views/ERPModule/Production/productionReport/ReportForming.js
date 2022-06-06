import pdfMake from "pdfmake/build/pdfmake";
import { convertAllLotReport, workcenterHeader, dateFormatReport, fancyTimeFormat,fancyTimeFormatHr, fontsReport,diff_hours } from './function/GroupLot';
import { logo } from './function/logo'



function ReportForming(dataNow, selectedDateStart, selectedDateEnd,itemA,itemB,itemC) {

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
        { text: "จำนวน\n เกรด A \n(เส้น)", fontSize: 11, alignment: 'center' },
        { text: "จำนวน\n เกรด B \n(เส้น)", fontSize: 11, alignment: 'center' },
        { text: "จำนวน\n เกรด C \n(เส้น)", fontSize: 11, alignment: 'center' },
        { text: "STS PO \nJob", fontSize: 11, alignment: 'center' },
        { text: "รายการเหล็กสลิต", fontSize: 11, alignment: 'center' },
        { text: "จำนวน\nม้วน", fontSize: 11, alignment: 'center' },
        { text: "เวลา\nทำงาน", fontSize: 11, alignment: 'center' },
        { text: "เล้น/ชม.", fontSize: 11, alignment: 'center' },
        { text: "เป้าหมาย\nการผลิต\n(-10%) ", fontSize: 11, alignment: 'center' },
    ],
    )

    let total_bundle = 0;
    let total_pcs = 0;
    let cal_bundel = []
    let BreakTimeFormingRate = 8;


    for (let i = 0; i < dataNow.length; i++) {

        total_bundle = total_bundle + dataNow[i]["SUMLotBundle"]
        total_pcs = total_pcs + dataNow[i]["SUMLotPCS"]
        cal_bundel.push(dataNow[i]["SUMLotPCS"])

        BreakTimeFormingRate = (dataNow[i]["BreakTimeFormingRate"]) ? dataNow[i]["BreakTimeFormingRate"] : 8

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
            { text: dataNow[i]["sumRBundle"], fontSize: 11, alignment: 'center' },
            { text: dataNow[i]["ref_num"], fontSize: 12, alignment: 'center' },
            { text: dataNow[i]["MatItem"], fontSize: 12, alignment: 'right' },
            { text: dataNow[i]["totalMatUsed"], fontSize: 12, alignment: 'right' },
            { text: BreakTimeFormingRate, fontSize: 12, alignment: 'right' },
            { text: Number(dataNow[i]["pcs_per_mch_hr"]), fontSize: 12, alignment: 'right' },
            { text: (Number(dataNow[i]["pcs_per_mch_hr"]) * BreakTimeFormingRate) - (Number(dataNow[i]["pcs_per_mch_hr"]) * BreakTimeFormingRate) * 10 / 100, fontSize: 12, alignment: 'right' },
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
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' },
                { text: "", fontSize: 11, alignment: 'center' }
            ],
            )
        }
    }


    let dataReason = [];
    dataReason.push([
        { text: `สาเหตุ`, fontSize: 14, alignment: 'center', style: 'header' },
        { text: "รายละเอียด", fontSize: 14, alignment: 'center' },
        { text: "หมายเหตุ", fontSize: 14, alignment: 'center' },
        { text: "จำนวนครั้ง", fontSize: 14, alignment: 'center' },
        { text: "รวมเวลาหยุดเครื่อง", fontSize: 14, alignment: 'center' },
        
    ],
    )
    // let forming_reasonsplit = dataNow[i]["forming_reason"]
    let forming_reasonselectone = "-;-"

    if (dataNow.length !== 0) {
        forming_reasonselectone = dataNow[0]["forming_reason"].split(";")
    }

    for (let i = 0; i < forming_reasonselectone.length; i++) {
        let forming_reasonselectone2 = forming_reasonselectone[i].split(")")
        let splitWords = forming_reasonselectone2[1].split(':')
        dataReason.push([
            
            { text: splitWords[0], fontSize: 13, alignment: 'center' },
            { text: splitWords[1], fontSize: 13, alignment: 'center' },
            { text: splitWords[2], fontSize: 13, alignment: 'center' },
            { text: splitWords[3], fontSize: 13, alignment: 'center' },
            { text: forming_reasonselectone2[2], fontSize: 13, alignment: 'center' },
        ],
        )

    }

    if (forming_reasonselectone.length < 4) {
        for (let i = 0; i < 4 - forming_reasonselectone.length; i++) {
            dataReason.push([
                { text: ' ', fontSize: 13, alignment: 'center' },
                { text: ' ', fontSize: 13, alignment: 'center' },
                { text: ' ', fontSize: 13, alignment: 'center' },
                { text: ' ', fontSize: 13, alignment: 'center' },
                { text: ' ', fontSize: 13, alignment: 'center' },
            ],
            )
        }
    }


    let forming_reason_meter;
    let meters_minute_forming_reason
    let sum_time_used_forming_reason
    let sum_time_used_forming_reason_stop
    let time_diff = diff_hours(selectedDateStart,selectedDateEnd)
    let breakTimeWords = ''
    console.log(11111)
    console.log(time_diff - dataNow[0]["BreakTimeFormingRate"]);
    if(time_diff - dataNow[0]["BreakTimeFormingRate"] == 0.5){
        breakTimeWords = '(พักเย็น)'
        console.log(breakTimeWords)
    } else if (time_diff - dataNow[0]["BreakTimeFormingRate"]  == 1){
        breakTimeWords = '(พักเที่ยง)'
    } else if (time_diff - dataNow[0]["BreakTimeFormingRate"]  == 1.5){
        breakTimeWords = '(พักเที่ยง,พักเย็น)'
    }
    let forming_reason_meter_start = 0
    let forming_reason_meter_end = 0

    if (dataNow.length !== 0) {
        forming_reason_meter = dataNow[0]["forming_reason_meter"].split(",")
        forming_reason_meter_start = forming_reason_meter[0]
        forming_reason_meter_end = forming_reason_meter[1]
        meters_minute_forming_reason = dataNow[0]["meters_minute_forming_reason"]
        // sum_time_used_forming_reason = fancyTimeFormat(dataNow[0]["sum_time_used_forming_reason"])
        sum_time_used_forming_reason = fancyTimeFormatHr((forming_reason_meter_end - forming_reason_meter_start))
        sum_time_used_forming_reason_stop = fancyTimeFormat(dataNow[0]["sum_time_used_forming_reason"])



        


    } else {
        forming_reason_meter = ['..................', '..................']
        forming_reason_meter_start = forming_reason_meter[0]
        forming_reason_meter_end = forming_reason_meter[1]
        meters_minute_forming_reason = 0
        sum_time_used_forming_reason = 0
    }


    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [5, 120, 5, 270],
        header: function (currentPage, pageCount, pageSize) {
            return {
                margin: [20, 15, 20, 10],
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
                                border: [false, false, false, false], text: 'Production performance Forming records \n รายงานการผลิตสินค้าเครื่องฟอร์มมิ่ง', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `บริษัท สหไทย สตีลไพพ์ จำกัด (มหาชน)        ${workcenterHeader(dataNow)} `, fontSize: 14
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: `  หมายเหตุ: รวมเวลาทำงาน ${time_diff} ชั่วโมง ${breakTimeWords} `
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: `${startdate} ถึง   ${enddate} `, fontSize: 14, colSpan: 3
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
                    widths: [150, '*', 150],
                    body: [
                        [
                            {
                                border: [false, false, false, false], text: `น้ำหนักท่อชั่งจริง ________${itemA}___________ กิโลกรัม`
                                , fontSize: 12, colSpan: 3
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: '', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: `ความเร็วในการเดินเครื่อง มาตรฐาน ________${itemB}__________ เมตร/วินาที, เดินเครื่องจริง _________${itemC}_________ เมตร/วินาที `
                                , fontSize: 12, colSpan: 3
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: '', fontSize: 18
                            },
                        ],
                        [
                            {
                                border: [false, false, false, false], text: 'หมายเหตุ ลงบันทึกเวลาและรายงานสาเหตุที่ต้องหยุดเดินเครื่องจักรในเวลาทำงาน เช่น ปรับโรล,เปลี่ยนใบเลื่อย, เครนเสีย, ไฟฟ้าดับ, อื่นๆ '
                                , fontSize: 12, colSpan: 3
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: '', fontSize: 18
                            },
                        ],
                        [


                            {

                                table: {
                                    widths: [150, 150,'*', 60, 100],
                                    headerRows: 1,
                                    body: dataReason,
                                }, fontSize: 16, colSpan: 3, border: [false, false, false, false]

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

                                // border: [false, false, false, false], text: `ความเร็วในการเดินเครื่อง.....${meters_minute_forming_reason}......เมตร/นาที     เลขมิตเตอร์เริ่มเดินเครื่อง.......${forming_reason_meter_start}...... เลขมิตเตอร์เลิกงาน.....${forming_reason_meter_end}.........  รวมเวลาเดินเครื่อง......${sum_time_used_forming_reason}.... `
                                border: [false, false, false, false], text: `  เลขมิตเตอร์เริ่มเดินเครื่อง.......${forming_reason_meter_start}...... เลขมิตเตอร์เลิกงาน.....${forming_reason_meter_end}.........  รวมเวลาเดินเครื่อง......${sum_time_used_forming_reason}.... รวมเวลาที่หยุดเครื่อง ......... ${sum_time_used_forming_reason_stop} ....... `
                                , fontSize: 16, colSpan: 3
                            },
                            {
                                border: [false, false, false, false], text: ''
                            },
                            {
                                border: [false, false, false, false], text: ''
                                , fontSize: 16
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
                                , fontSize: 16
                                , colSpan: 3
                                , alignment: 'center'
                            },
                            { text: 'วันที่', fontSize: 14 },
                            { text: 'เวลา', fontSize: 14 },
                        ],
                        [
                            {
                                border: [false, false, false, false],
                                text: `FOMFN-01/01-Oct-20`, fontSize: 14,
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
                    widths: [15, 50, 50, 20, 30, 40, 20, 40, 25, 30, 35, 30, 30, 50, 80, 25, 20, 27, 30],
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

export { ReportForming };
