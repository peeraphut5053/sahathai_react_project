import React from 'react';
import { useTheme } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const BarCard = (dataLine) => {
  const theme = useTheme();

  let threading = [];

  for (let i = 0; i < dataLine?.data?.threading?.length; i++) {
    const sumBC = Number(dataLine.data.threading[i]?.sumBC) + Number(dataLine.data.groove[i]?.sumBC ? dataLine.data.groove[i]?.sumBC : 0)

    threading.push({
      sumBC: sumBC / 1000
    })
    
  }

  const slit = dataLine.data.slit.map((item) => {
    const sum = Number(item.sumBC);
    return sum / 1000
  });

  const forming = dataLine.data.forming.map((item) => {
    const sum = Number(item.sumBC);
    return sum/ 1000
  });

  const hydro = dataLine.data.hydro.map((item) => {
    const sum = Number(item.sumBC);
    return sum / 1000
  });

  const packing = dataLine.data.packing.map((item) => {
    const sum = Number(item.sumBC);
    return sum/ 1000
  });

  const galvanize = dataLine.data.galvanize.map((item) => {
    const sum = Number(item.sumBC);
    return sum/ 1000
  });

  const cuting = dataLine.data.cuting.map((item) => {
    const sum = Number(item.sumBC);
    return sum/ 1000
  });

  const painting = dataLine.data.painting.map((item) => {
    const sum = Number(item.sumBC);
    return sum/ 1000
  });


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Slit',
        data: slit.map((item) => (item).toFixed(2)),
        borderColor: '#ffb200',
        backgroundColor: '#ffb200',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Forming',
        data: forming.map((item) => (item).toFixed(2)),
        borderColor: '#cc0000',
        backgroundColor: '#cc0000',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'HydroTest',
        data: hydro.map((item) => (item).toFixed(2)),
        borderColor: '#0051ff',
        backgroundColor: '#0051ff',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Packing',
        data: packing.map((item) => (item).toFixed(2)),
        borderColor: '#663300',
        backgroundColor: '#663300',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Galvanize',
        data: galvanize.map((item) => (item).toFixed(2)),
        borderColor: '#009933',
        backgroundColor: '#009933',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Painting',
        data: painting.map((item) => (item).toFixed(2)),
        borderColor: '#9900cc',
        backgroundColor: '#9900cc',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Threading',
        data: threading.map((item) => (item.sumBC).toFixed(2)),
        borderColor: '#cccc00',
        backgroundColor: '#cccc00',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Cuting',
        data: cuting.map((item) => (item).toFixed(2)),
        borderColor: '#00ffff',
        backgroundColor: '#00ffff',
        fill: false,
        borderWidth: 1,
        barThickness: 40
      }
    ]
  };

  const options = {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
        }
      ],
      yAxes: [
        {
          stacked: true
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
      <Bar data={data} options={options}  />
  );
};

export default BarCard;
