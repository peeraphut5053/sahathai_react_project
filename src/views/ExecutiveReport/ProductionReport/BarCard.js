import React from 'react';
import { useTheme } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const BarCard = ({data}) => {
  const theme = useTheme();

  const wcGroup = data.res.map((item) => item.wcGroup);

  const dat = {
    labels: wcGroup,
    datasets: [
      {
        label: 'A',
        data: data.res.map((item) => (item.sumA / 1000).toFixed(2)),
        backgroundColor: '#3f51b5',
        borderWidth: 1
      },
      {
        label: 'Last Month A',
        data: data.res1.map((item) => (item.sumA / 1000).toFixed(2)),
        backgroundColor: 'red',
        borderWidth: 1
      },
      {
        label: 'B',
        data: data.res.map((item) => (item.sumB / 1000).toFixed(2)),
        backgroundColor: '#f1c40f',
        borderWidth: 1
      },
      {
        label: 'Last Month B',
        data: data.res1.map((item) => (item.sumB / 1000).toFixed(2)),
        backgroundColor: 'yellow',
        borderWidth: 1
      },
      {
        label: 'C',
        data: data.res.map((item) => (item.sumC / 1000).toFixed(2)),
        backgroundColor: '#e74c3c',
        borderWidth: 1
      },
      {
        label: 'Last Month C',
        data: data.res1.map((item) => (item.sumC / 1000).toFixed(2)),
        backgroundColor: 'green',
        borderWidth: 1
      }
    ]
  };

  const options = {
    animation: false,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 20,
          maxBarThickness: 20,
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
    }
  };

  return (
      <Bar data={dat} options={options} />
  );
};

export default BarCard;
