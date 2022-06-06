import moment from "moment";
moment.locale("th");


function workcenterHeader(dataNow) {
    var arr2 = dataNow.reduce((a, b) => {
        var i = a.findIndex(x => x.wc === b.wc);
        // eslint-disable-next-line
        return i === -1 ? a.push({ wc: b.wc, WCname: b.WCname, times: 1 }) : a[i].times++, a;
    }, []);

    let workcenterHeader = "";

    for (let i = 0; i < arr2.length; i++) {
        workcenterHeader = workcenterHeader + arr2[i].wc + " (" + arr2[i].WCname + ") "
        if (i < arr2.length - 1) {
            workcenterHeader = workcenterHeader + ","
        }
    }
    return workcenterHeader
}

const splitLotToObj = (LotFromData) => {
    let dataNotSpiltLotQty = LotFromData.split(';')
    let dataSpiltLotQty = []
    dataNotSpiltLotQty.map((lotdata, index) => {
        dataSpiltLotQty.push({
            lotnum: Number(lotdata.split("(")[0].trim()),
            lotqty: Number(lotdata.split("(")[1].trim())
        })
        return 1;
    })
    return dataSpiltLotQty;
}

const GroupLot = (list) => {
    const result = [];
    let workingList = [];
    let nextLot = 0
    let nextQty = 0
    list.forEach((number, index) => {
        let next = number.lotnum + 1
        if (index < list.length - 1) {
            nextLot = list[index + 1].lotnum;
            nextQty = list[index + 1].lotqty;
        } else {
            nextLot = list[index].lotnum;
            nextQty = list[index].lotqty;
        }
        if (nextLot !== next) {
            if (list[index].lotqty !== nextQty) {
                workingList.push({ lotnum: number.lotnum, lotqty: number.lotqty, nobundle: 71 })
            }
            if (list[index].lotqty === nextQty) {
                workingList.push({ lotnum: number.lotnum, lotqty: number.lotqty, nobundle: 72 })
            }
            result.push(workingList);
            workingList = [];

        } else {
            if (list[index].lotqty !== nextQty) {
                workingList.push({ lotnum: number.lotnum, lotqty: number.lotqty, nobundle: 32 })
                result.push([{ lotnum: nextLot, lotqty: nextQty, nobundle: 999 }]);
            } else {
                workingList.push({ lotnum: number.lotnum, lotqty: number.lotqty, nobundle: 31 })
            }
        }
    })
    return result;
}

function showLotNo(groupLot) {
    if (groupLot[0][0].lotnum > groupLot[groupLot.length - 1][0].lotnum) {
        groupLot.reverse();
    }
    let word = "";
    return word
}

function showLotQty(groupLot) {
    if (groupLot[0][0].lotnum > groupLot[groupLot.length - 1][groupLot.length - 1].lotnum) {
        groupLot.reverse();
    }
    let word = "";
    for (let i = 0; i < groupLot.length; i++) {
        word = word + `${groupLot[i][0].lotqty}`
        if (i !== groupLot.length - 1) {
            word = word + '\n_____\n'
        }
    }
    return word
}

function showCountLotQty(groupLot) {
    if (groupLot[0][0].lotnum > groupLot[groupLot.length - 1][groupLot.length - 1].lotnum) {
        groupLot.reverse();
    }
    let word = "";
    let count = "";
    for (let i = 0; i < groupLot.length; i++) {
        if (groupLot[i][0].lotqty !== groupLot[i][groupLot[i].length - 1].lotqty) {
            count = groupLot[i].length - 1
        } else {
            count = groupLot[i].length
        }
        word = word + `${count}`
        if (i !== groupLot.length - 1) {
            word = word + '\n_____\n'
        }
    }
    return word
}


function showMatlUsed(matlused) {
    let matlusedSplit = matlused.split(";")
    let word = ""
    for (let i = 0; i < matlusedSplit.length; i++) {
        word = word + `- ${matlusedSplit[i]}`
        if (i !== matlusedSplit.length - 1) {
            word = word + '\n'
        }
    }
    return word
}

function convertAllLotReport(wordShow, LotFromData) {
    let dataNotSpiltLotQty = LotFromData.split(';')
    let dataSpiltLotQty = []
    dataNotSpiltLotQty.map((lotdata, index) => {
        if (lotdata.length > 0) {
            dataSpiltLotQty.push({
                lotnum: Number(lotdata.split("(")[0].trim()),
                lotqty: Number(lotdata.split("(")[1].trim())
            })
        }

        return 1;
    })

    let dataObj = dataSpiltLotQty
    let tempA = []
    let tempB = []
    for (let i = 0; i < dataObj.length; i++) {
        if (dataObj[i + 1] !== undefined) {
            if (dataObj[i] !== dataObj[i + 1]) {
                if (dataObj[i].lotqty !== dataObj[i + 1].lotqty) {
                    tempA.push(dataObj[i])
                    tempA.push(dataObj[i + 1])
                    tempB.push(tempA[0])
                    if (tempA.length - 1 > 0) {
                        tempB.push(tempA[1])
                    }
                    tempA = []
                } else {
                    if (dataObj[i].lotnum + 1 !== dataObj[i + 1].lotnum) {
                        tempB.push({ lotnum: dataObj[i].lotnum, lotqty: dataObj[i].lotqty })
                        tempB.push({ lotnum: dataObj[i + 1].lotnum, lotqty: dataObj[i + 1].lotqty })
                    }
                    tempB.push(dataObj[0])
                    tempB.push(dataObj[dataObj.length - 1])
                }
            } else {

                if (dataObj[i] !== dataObj[i + 1]) {
                    tempB.push(dataObj[0])
                    tempB.push(dataObj[dataObj.length - 1])
                }
            }
        } else {
            tempB.push(dataObj[0])
            tempB.push(dataObj[dataObj.length - 1])

        }
    }

    let dataArrGroup = tempB.reduce((acc, current) => {
        const x = acc.find(item => item === current);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []).sort(function (a, b) {
        var nameA = a.lotnum;
        var nameB = b.lotnum;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    let wordslot = "";
    let wordsqty = "";
    let wordsqtybundle = "";
    let wordsqtybundletotal = "";
    let arraynew = "";
    let tmp = ""
    let tmp2 = ""
    let tmp3 = ""
    let tmp4 = ""
    for (let l = 0; l < dataArrGroup.length; l++) {
        let br = ``
        if (l === dataArrGroup.length - 2) {
            br = ''
        } else {
            br = `\n____\n`
        }

        if (dataArrGroup[l + 1] !== undefined) {

            if (dataArrGroup[l].lotqty === dataArrGroup[l + 1].lotqty) {

                if (dataArrGroup[l + 2] !== undefined) {
                    if (dataArrGroup[l].lotnum !== tmp4) {
                        wordslot = wordslot + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l + 1].lotnum} ${br}`
                        wordsqty = wordsqty + `${dataArrGroup[l].lotqty}${br}`
                        wordsqtybundle = wordsqtybundle + `${dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum + 1}${br}`
                        wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum + 1) * dataArrGroup[l].lotqty}${br}`
                        arraynew = arraynew + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l + 1].lotnum} (${dataArrGroup[l].lotqty})1 ,${l},${tmp4},${dataArrGroup[l + 1].lotnum}${br}`

                    }

                    if (dataArrGroup[l].lotnum === tmp4) {


                        if (dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum === 2 ||
                            dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum === 100) {
                            // if (l == 1) {

                        } else {
                            wordslot = wordslot + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l + 1].lotnum} ${br}`
                            wordsqty = wordsqty + `${dataArrGroup[l].lotqty}${br}`
                            wordsqtybundle = wordsqtybundle + `${dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum + 1}${br}`
                            wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum + 1) * dataArrGroup[l].lotqty}${br}`
                            arraynew = arraynew + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l + 1].lotnum} (${dataArrGroup[l].lotqty})1.5 ,${l},tmp4=${tmp4},tmp3=${tmp3},${dataArrGroup[l].lotnum} ${br}`
                        }
                    }



                } else {
                    wordslot = wordslot + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l + 1].lotnum} ${br}`
                    wordsqty = wordsqty + `${dataArrGroup[l].lotqty}${br}`
                    wordsqtybundle = wordsqtybundle + `${dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum + 1}${br}`
                    wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l + 1].lotnum - dataArrGroup[l].lotnum + 1) * dataArrGroup[l].lotqty}${br}`
                    arraynew = arraynew + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l + 1].lotnum} (${dataArrGroup[l].lotqty})1 ,${l},${tmp4},${dataArrGroup[l + 1].lotnum}${br}`


                }


                tmp = dataArrGroup[l + 1].lotnum
                tmp2 = dataArrGroup[l + 1].lotnum
                tmp3 = dataArrGroup[l + 1].lotnum
                tmp4 = dataArrGroup[l + 1].lotnum



            }



            if (dataArrGroup[l].lotqty !== dataArrGroup[l + 1].lotqty) {
                if (dataArrGroup[l - 1] === undefined) {
                    if (l !== dataArrGroup.length - 1) {
                        br = `\n____\n`
                    }
                    wordslot = wordslot + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l].lotnum} ${br}`
                    wordsqty = wordsqty + `${dataArrGroup[l].lotqty}${br}`
                    wordsqtybundle = wordsqtybundle + `${dataArrGroup[l].lotnum - dataArrGroup[l].lotnum + 1}${br}`
                    wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l].lotnum - dataArrGroup[l].lotnum + 1) * dataArrGroup[l].lotqty}${br}`
                    arraynew = arraynew + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l].lotnum} (${dataArrGroup[l].lotqty})2 ${br} `
                } else {

                    if (dataArrGroup[l - 1].lotqty === dataArrGroup[l].lotqty) {
                        if (dataArrGroup[l].lotnum + 1 === dataArrGroup[l + 1].lotnum && dataArrGroup[l].lotqty + 1 !== dataArrGroup[l + 1].lotqty) {
                            if (dataArrGroup[l + 2] !== undefined) {
                                if (dataArrGroup[l + 1].lotqty !== dataArrGroup[l + 2].lotqty) {
                                    wordslot = wordslot + `${dataArrGroup[l + 1].lotnum} - ${dataArrGroup[l + 1].lotnum} ${br}`
                                    wordsqty = wordsqty + `${dataArrGroup[l + 1].lotqty}${br}`
                                    wordsqtybundle = wordsqtybundle + `${dataArrGroup[l + 1].lotnum - dataArrGroup[l + 1].lotnum + 1}${br}`
                                    wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l + 1].lotnum - dataArrGroup[l + 1].lotnum + 1) * dataArrGroup[l + 1].lotqty}${br}`
                                    arraynew = arraynew + `${dataArrGroup[l + 1].lotnum} - ${dataArrGroup[l + 1].lotnum} (${dataArrGroup[l + 1].lotqty})3 ${br}`
                                    tmp2 = dataArrGroup[l + 1].lotnum
                                }
                            }
                        }
                    } else {
                        if (l === 0) {

                            wordslot = wordslot + `${dataArrGroup[l + 1].lotnum} - ${dataArrGroup[l + 1].lotnum} ${br}`
                            wordsqty = wordsqty + `${dataArrGroup[l + 1].lotqty} ${br}`
                            wordsqtybundle = wordsqtybundle + `${dataArrGroup[l + 1].lotnum - dataArrGroup[l + 1].lotnum + 1} ${br}`
                            wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l + 1].lotnum - dataArrGroup[l + 1].lotnum + 1) * dataArrGroup[l + 1].lotqty} ${br}`
                            arraynew = arraynew + `${dataArrGroup[l + 1].lotnum} - ${dataArrGroup[l + 1].lotnum} (${dataArrGroup[l + 1].lotqty})4 ${br}`
                        }
                        if (tmp2 !== dataArrGroup[l].lotnum) {
                            if (l !== dataArrGroup.length - 1) {
                                br = `\n____\n`
                            }
                            wordslot = wordslot + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l].lotnum} ${br}`
                            wordsqty = wordsqty + `${dataArrGroup[l].lotqty} ${br}`
                            wordsqtybundle = wordsqtybundle + `${dataArrGroup[l].lotnum - dataArrGroup[l].lotnum + 1} ${br}`
                            wordsqtybundletotal = wordsqtybundletotal + `${(dataArrGroup[l].lotnum - dataArrGroup[l].lotnum + 1) * dataArrGroup[l].lotqty} ${br}`
                            arraynew = arraynew + `${dataArrGroup[l].lotnum} - ${dataArrGroup[l].lotnum} (${dataArrGroup[l].lotqty})4.5 ${br}`
                        }
                    }
                }

            }
        } else {

            let br2;
            if (l > dataArrGroup.length - 1 || tmp !== dataArrGroup[dataArrGroup.length - 1].lotnum) {
                br2 = `\n____\n`
                br2 = ''

            } else {
                br2 = ''
            }
            if (l === dataArrGroup.length - 1) {

                if (tmp !== dataArrGroup[dataArrGroup.length - 1].lotnum) {
                    wordslot = wordslot + `${br2} ${dataArrGroup[dataArrGroup.length - 1].lotnum} - ${dataArrGroup[dataArrGroup.length - 1].lotnum} `
                    wordsqty = wordsqty + `${br2} ${dataArrGroup[dataArrGroup.length - 1].lotqty}`
                    wordsqtybundle = wordsqtybundle + `${br2} ${dataArrGroup[dataArrGroup.length - 1].lotnum - dataArrGroup[dataArrGroup.length - 1].lotnum + 1}`
                    wordsqtybundletotal = wordsqtybundletotal + `${br2} ${(dataArrGroup[dataArrGroup.length - 1].lotnum - dataArrGroup[dataArrGroup.length - 1].lotnum + 1) * dataArrGroup[dataArrGroup.length - 1].lotqty}`
                    arraynew = arraynew + `${br2} ${dataArrGroup[dataArrGroup.length - 1].lotnum} - ${dataArrGroup[dataArrGroup.length - 1].lotnum} (${dataArrGroup[dataArrGroup.length - 1].lotqty})5 ${l} `
                }

            }
        }


    }
    if (wordShow === "wordslot") {
        return wordslot
    } else if (wordShow === "wordsqty") {
        return wordsqty
    } else if (wordShow === "wordsqtybundle") {
        return wordsqtybundle
    } else if (wordShow === "wordsqtybundletotal") {
        return wordsqtybundletotal
    } else {
        return 1
    }

}

function checkingByLot(LotFromData) {
    var obj = JSON.parse(LotFromData);
    return obj
}

function dateFormatReport(DateTime) {
    return `  วันที่  (Date): ${moment(DateTime).format('YYYY-MM-DD')}  เวลา (Time): ${moment(DateTime).format('HH:mm:ss')} น.  `
}


function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + " ชั่วโมง " + (secs < 10 ? "0" : "");
    ret += "" + secs + " นาที";
    return ret;
}

function fancyTimeFormatHr(duration) {
    duration = duration * 3600
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3599) / 60);
    var ret = "";

    if (hrs > 0) {
        ret += "";
    }

    ret += "" + hrs + " ชั่วโมง ";
    ret += "" + mins + " นาที";
    return ret;
}


const diff_hours = (dt2, dt1) => {
    dt1 = new Date(dt1);
    dt2 = new Date(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}

const fontsReport = {
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


export { splitLotToObj, GroupLot, showLotNo, showLotQty, showCountLotQty, showMatlUsed, convertAllLotReport, workcenterHeader, checkingByLot, dateFormatReport, fancyTimeFormat, fancyTimeFormatHr, fontsReport, diff_hours };