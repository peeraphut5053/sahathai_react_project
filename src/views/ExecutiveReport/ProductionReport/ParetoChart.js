import React from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import API from 'src/views/components/API';
import { Typography, useTheme } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const label = [
  {
    value: ["P2FM01", "P2FM05", "P2FM06", "P2FM08", "P2FM09", "W2FM02", "W2FM04", "W2FM07", "W2FMC1"],
    label: 'Forming'
  },
  {
    value: ["P1SL03", "P1SL05", "W1SL04"],
    label: 'Slit'
  },
  {
    value: ["P5HTF2", "P5HTF5", "P5HTO1", "P5HTO2", "W5HT02", "W5HT04", "W5HT06"],
    label: 'HydroTest'
  },
  {
    value: ["P6GL01"],
    label: 'Galvanize'
  },
  {
    value: ["P6PT01",
      "P6PT0B",
      "P6PT0C"],
    label: 'Painting'
  },
  {
    value: ["P6TH01", "P6TH02", "P6TH03", "P6TH05", "W6TH04"],
    label: 'Threading'
  },
  {
    value: ["P6RG01", "P6RG02", "W6RG02"],
    label: 'Groove'
  },
  {
    value: ["P6CT01", "P6CT02", "P6CT03","W6CT01"],
    label: 'Cutting'
  },
  {
    value: ["P7PK00", "P7PKP1", "P7PKPB", "P7PKPC", "W7PK01"],
    label: 'Packing'
  }
]

const ParetoChart = ({month,group}) => {
  const theme = useTheme();

  const wc = label.find((item) => item.label === group)?.value;
  console.log(wc);
  

  const { data: paretoData, isLoading, error } = useQuery({
    queryKey: ['pareto', month, group],
    queryFn: async () => {
      try {
        let load = group === 'Forming' ? 'paretoData' : 'paretoData2';
        const y = moment(month).format('YYYY');
        const m = moment(month).format('MM');
        const date = getFirstAndLastDayOfMonth(y, m);
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
            load: load,
            StartDate: moment(date.firstDay).format('YYYY-MM-DD'),
            EndDate: moment(date.lastDay).format('YYYY-MM-DD'),
            GroupBy: wc.map(item => `'${item}'`).join(',')
          }
        });

        if (group === 'Forming') {
          const data = response.data[0];
          const other = data.filter((item) => item.reason_id === 'อื่นๆ');
          const forming = data.filter((item) => item.reason_id === 'ฟอร์มมิ่ง');
          const plate = data.filter((item) => item.reason_id === 'จานเก็บเหล็ก');
          const saw = data.filter((item) => item.reason_id === 'แท่นเลื่อย');
          const conveyer = data.filter((item) => item.reason_id === 'รางคอนเวนเยอร์');
          const machineS = data.filter((item) => item.reason_id === 'เครื่องดัดทรง');
          const machineH = data.filter((item) => item.reason_id === 'เครื่องคว้านหัว');
          const machineHD = data.filter((item) => item.reason_id === 'เครื่องเทสน้ำ');
  
          const totalOther = other.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalForming = forming.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalPlate = plate.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalSaw = saw.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalConveyer = conveyer.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalMachineS = machineS.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalMachineH = machineH.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
          const totalMachineHD = machineHD.reduce((previousValue, currentValue) => previousValue + Number(currentValue.time_used), 0);
  
          const newData = [{value: totalOther, name: 'อื่นๆ' }, {value: totalForming ,name: 'ฟอร์มมิ่ง'}, {value: totalPlate, name: 'จานเก็บเหล็ก'}, {value: totalSaw , name: 'แท่นเลื่อย'}, {value: totalConveyer , name: 'รางคอนเวนเยอร์'}, {value: totalMachineS , name: 'เครื่องดัดทรง'}, {value: totalMachineH, name: 'เครื่องคว้านหัว'}, {value: totalMachineHD, name: 'เครื่องเทสน้ำ'}];
  
          const sortedData = newData.sort((a, b) => b.value - a.value);
  
          return sortedData;
        } else {
          const data = response.data[0];
          const other = data.filter((item) => item.reason_id === 6);
          const machineS = data.filter((item) => item.reason_id === 1);
          const machineI = data.filter((item) => item.reason_id === 2);
          const int = data.filter((item) => item.reason_id === 3);
          const clean = data.filter((item) => item.reason_id === 4);

          const totalOther = other.reduce((previousValue, currentValue) => previousValue + Number(currentValue.down_time), 0);
          const totalMachineS = machineS.reduce((previousValue, currentValue) => previousValue + Number(currentValue.down_time), 0);
          const totalMachineI = machineI.reduce((previousValue, currentValue) => previousValue + Number(currentValue.down_time), 0);
          const totalInt = int.reduce((previousValue, currentValue) => previousValue + Number(currentValue.down_time), 0);
          const totalClean = clean.reduce((previousValue, currentValue) => previousValue + Number(currentValue.down_time), 0);
  
          const newData = [{value: totalOther, name: 'อื่นๆ' }, { value: totalMachineS, name: 'เครื่องจักรเสีย / ซ่อมเครื่อง' }, { value: totalMachineI, name: 'ปรับตั้งเครื่องจักร / เปลี่ยนไซส์' }, { value: totalInt, name: 'ระบบอินเตอร์เน็ต / ระบบไฟฟ้าล่ม' }, { value: totalClean, name: 'ทำความสะอาดเครื่องจักร' }];
  
          const sortedData = newData.sort((a, b) => b.value - a.value);
  
          return sortedData;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const datapoints = paretoData.map((item) => item.value);

  const reduceArray = ((sum, datapoint) => sum + datapoint);
  const totalSum = datapoints.reduce(reduceArray);

  const cumulativeSum = (sum => datapoint => sum += datapoint)(0);
  const cumulativeDatapoints = datapoints.map(cumulativeSum);

  const percentageDatapoints = cumulativeDatapoints.map((value) => {
    const values = parseFloat((value / totalSum) * 100).toFixed(1);
    return values;
  });

  function getFirstAndLastDayOfMonth(year, month) {
    // สร้างวันที่แรกของเดือน
    const firstDay = new Date(year, month - 1, 1);

    // สร้างวันที่แรกของเดือนถัดไป แล้วลบออก 1 วัน เพื่อได้วันสุดท้ายของเดือนปัจจุบัน
    const lastDay = new Date(year, month, 0);

    return {
      firstDay: firstDay,
      lastDay: lastDay
    };
  }


  const data = {
    labels: paretoData.map((item) => item.name),
    datasets: [
      {
        label: 'Percentage',
        data: percentageDatapoints,
        borderColor: '#e68a00',
        yAxisID: 'LinePercentage',
        fill: false,
        type: 'line',
      },
      {
        label: 'Downtime',
        data: datapoints,
        borderColor: '#ccb3ff',
        backgroundColor: '#ccb3ff',
        yAxisID: 'bar1',
      },
    ]
  };

  // how to use width and height in chart

  const options = {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        yAxes: [{
            id: 'LinePercentage',
            type: 'linear',
            position: 'right',
            min: 0,
            max: 100,
            ticks:{
                callback: function(value, index, values) {
                    return value + '%';
                },
                beginAtZero: true,
                stepSize: 10
            }
        },
        {
            id: 'bar1',
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            grid: {
                display: false
            },
            scaleLabel: {
              display: true,
              labelString: '(Mins)', // Your title here
              fontStyle: 'bold',
            }
            //  how to set gap between bars
        }
    ],

     
    },
  };

  return (
    <>
    <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>Pareto Chart of Downtime Causes</Typography>
    <Bar width={800} height={500} data={data} options={options}  />
    </>
  );
};

export default ParetoChart;
