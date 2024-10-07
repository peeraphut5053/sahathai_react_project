import React from 'react';
import { useTheme } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

const LineCard = ({ data: dataLine, options }) => {
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

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Slit',
        data: loopFill(dataLine.slit).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#ffb200',
        backgroundColor: '#ffb200',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Forming',
        data: loopFill(dataLine.forming).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#cc0000',
        backgroundColor: '#cc0000',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'HydroTest',
        data: loopFill(dataLine.hydro).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#0051ff',
        backgroundColor: '#0051ff',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Packing',
        data: loopFill(dataLine.packing).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#663300',
        backgroundColor: '#663300',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Galvanize',
        data: loopFill(dataLine.galvanize).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#009933',
        backgroundColor: '#009933',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Painting',
        data: loopFill(dataLine.painting).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#9900cc',
        backgroundColor: '#9900cc',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Threading',
        data: loopFill(threading).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#cccc00',
        backgroundColor: '#cccc00',
        fill: false,
        borderWidth: 1
      },
      {
        label: 'Cuting',
        data: loopFill(dataLine.cuting).map((item) => (item.sumA / 1000).toFixed(2)),
        borderColor: '#00ffff',
        backgroundColor: '#00ffff',
        fill: false,
        borderWidth: 1
      }
    ]
  };

  return (
      <Line data={data} options={options}  />
  );
};

export default LineCard;
