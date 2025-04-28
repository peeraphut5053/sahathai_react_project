import React from 'react';
import { useTheme } from '@material-ui/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar } from 'react-chartjs-2';
import { addComma } from 'src/utils/getInitials';

const LineCard = ({ data: dataLine, options, currentData, Types }) => {
  const theme = useTheme();

  let threading = [];

  for (let i = 0; i < dataLine?.threading?.length; i++) {
    const sumA = Number(dataLine.threading[i]?.sumA) + Number(dataLine.groove[i]?.sumA ? dataLine.groove[i]?.sumA : 0)
    threading.push({
      ...dataLine.threading[i],
      sumA: sumA
    })
  }

  function loopFill(data) {
    // want loop put data if data don't have that month
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const exitMonth = data.map(item => item.month)

    for (let i = 0; i < month.length; i++) {
      if (!exitMonth.includes(month[i])) {
        data.push({ month: month[i], sumA: 0 })
      }
    }
    const sortedData = data.sort((a, b) => a.month - b.month)
    return sortedData;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth() + 1; // 1-12

  function fillDataToCurrentMonth(arr) {
    // arr: ข้อมูล 1-12 เดือน (อาจขาด)
    const filled = [];
    for (let i = 0; i < 12; i++) {
      if (i < currentMonth) {
        filled.push(arr[i] ? Number(arr[i].sumA / 1000).toFixed(2) : null);
      } else {
        filled.push(null); // เดือนถัดไปเป็น null
      }
    }
    return filled;
  }

  function fillDataToLastMonth(arr) {
    // arr: ข้อมูล 1-12 เดือน (อาจขาด)
    // หาว่าเดือนสุดท้ายที่มีข้อมูลจริง (sumA > 0)
    let lastMonth = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && Number(arr[i].sumA) > 0) {
        lastMonth = i + 1;
      }
    }
    const filled = [];
    for (let i = 0; i < 12; i++) {
      if (i < lastMonth) {
        filled.push(arr[i] ? Number(arr[i].sumA / 1000).toFixed(2) : null);
      } else {
        filled.push(null); // หลังจากเดือนสุดท้ายที่มีข้อมูล ให้เป็น null
      }
    }
    return filled;
  }

  const data = {
    labels: monthNames,
    datasets: [
      {
        label: 'Slit',
        data: fillDataToLastMonth(loopFill(dataLine.slit)),
        borderColor: '#ffb200',
        backgroundColor: '#ffb200',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Forming',
        data: fillDataToLastMonth(loopFill(dataLine.forming)),
        borderColor: '#cc0000',
        backgroundColor: '#cc0000',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'HydroTest',
        data: fillDataToLastMonth(loopFill(dataLine.hydro)),
        borderColor: '#0051ff',
        backgroundColor: '#0051ff',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Galvanize',
        data: fillDataToLastMonth(loopFill(dataLine.galvanize)),
        borderColor: '#009933',
        backgroundColor: '#009933',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Painting',
        data: fillDataToLastMonth(loopFill(dataLine.painting)),
        borderColor: '#9900cc',
        backgroundColor: '#9900cc',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Threading',
        data: fillDataToLastMonth(threading),
        borderColor: '#cccc00',
        backgroundColor: '#cccc00',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Cuting',
        data: fillDataToLastMonth(loopFill(dataLine.cuting)),
        borderColor: '#00ffff',
        backgroundColor: '#00ffff',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Packing',
        data: fillDataToLastMonth(loopFill(dataLine.packing)),
        borderColor: '#663300',
        backgroundColor: '#663300',
        fill: false,
        borderWidth: 1
      },
    ]
  };

  let delayed = true;

  const optionsBar = {
    animation: true,
    layout: { padding: 0 },
    legend: {
      display: true,
    },
    maintainAspectRatio: false,
    responsive: true,
    width: '100%',
    scales: {
      xAxes: [
        {
          barThickness: 40,
          maxBarThickness: 40,
          barPercentage: 1,
          categoryPercentage: 1,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    dataLabels: {
      enabled: true,
    },
    plugins: {
      datalabels: {
        color: '#000',  // เปลี่ยนเป็นสีดำเพื่อให้เห็นชัดเจน
        anchor: 'end',   // ยึดกับจุดบนสุดของแท่งกราฟ
        align: 'top',    // จัดตำแหน่งให้อยู่เหนือจุดยึด
        offset: 5,       // ระยะห่างจากแท่งกราฟ 5 pixels
        formatter: (value) => addComma(value),
        font: {
          weight: 'bold',
          size: 12
        },
        // เพิ่มพื้นหลังสีขาวโปร่งใสเพื่อให้อ่านง่ายขึ้น
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 4,
        padding: 4
      },
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      fontSize: 16, // คุณสามารถเพิ่มหรือลดขนาดตัวอักษรตรงนี้
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,

      // เพิ่มตัวเลือกต่อไปนี้เพื่อปรับขนาดและรูปแบบเพิ่มเติม:
      padding: 12, // ปรับระยะขอบภายใน tooltip
      cornerRadius: 4, // ปรับความโค้งของมุม tooltip
      caretSize: 6, // ปรับขนาดของลูกศรชี้
      bodySpacing: 8, // ระยะห่างระหว่างบรรทัดในส่วน body
      titleSpacing: 6, // ระยะห่างระหว่างหัวข้อและเนื้อหา

      // ถ้าต้องการกำหนดความกว้างสูงสุด:
      bodyFontSize: 14, // ขนาดตัวอักษรส่วน body แยกจาก title
      titleFontSize: 16, // ขนาดตัวอักษรส่วน title
      xPadding: 12, // padding แนวนอน
      yPadding: 12 // padding แนวตั้ง
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  };
  
  const dataBar = {
    labels: ['Slit', 'Forming', 'HydroTest', 'Galvanize', 'Painting', 'Threading', 'Cuting', 'Packing'],
    datasets: [
      {
        label: Types,
        data: [currentData[0], currentData[1], currentData[2], currentData[3], currentData[4], currentData[5], currentData[6], currentData[7]],
        backgroundColor: [
          '#ffb200',
          '#cc0000',
          '#0051ff',
          '#009933',
          '#9900cc',
          '#cccc00',
          '#00ffff',
          '#663300',
        ],
        borderColor: [
          '#ffb200',
          '#cc0000',
          '#0051ff',
          '#009933',
          '#9900cc',
          '#cccc00',
          '#00ffff',
          '#663300',
        ],
       
      },
    ],
  }

  return (
      <>
      {Types === 'Main' ? (
        <Line data={data} plugins={[ChartDataLabels]} options={options}   />
      ) : (
        <Bar data={dataBar} plugins={[ChartDataLabels]} options={optionsBar}   />
      )}
      </>
  );
};

export default LineCard;
