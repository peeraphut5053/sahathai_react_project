import React, { useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Divider,
  makeStyles,
  Grid,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from 'react-select';
import API from 'src/views/components/API';
import moment from 'moment';
import DateMonthPicker from 'src/views/components/Input/CDateMonthPicker';
import PieChart from './PieChart';
import ModalManagementFullPage from 'src/views/components/ModalManagementFullPage';
import TableDetail from './TableDetail';
import TableDailyWorkCenter from './TableDailyWorkCenter';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ParetoChart from './ParetoChart';
import { addComma } from 'src/utils/getInitials';

const useStyles = makeStyles(() => ({
  root: {}
}));


const group = [
  {
    value: 'Forming',
    label: 'Forming',
    color: '#9c27b0'
  },
  {
    value: 'Slit',
    label: 'Slit',
    color: '#e91e63'
  },
  {
    value: 'HydroTest',
    label: 'HydroTest',
    color: '#795548'
  },
  {
    value: 'Galvanize',
    label: 'Galvanize',
    color: '#00bcd4'
  },
  {
    value: 'Painting',
    label: 'Painting',
    color: '#2196f3'
  },
  {
    value: 'Threading',
    label: 'Threading',
    color: '#673ab7'
  },
  {
    value: 'Groove',
    label: 'Groove',
    color: '#ff9800'
  },
  {
    value: 'Cutting',
    label: 'Cuting',
    color: '#f44336'
  },
  {
    value: 'Packing',
    label: 'Packing',
    color: '#4caf50'
  },
];

const GroupBarChart = ({ className, ...rest }) => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [groupBy, setGroupBy] = useState('Forming');
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const classes = useStyles();
  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['GroupBarChart', month, groupBy],
    queryFn: async () => {
      try {
        const y = moment(month).format('YYYY');
        const m = moment(month).format('MM');
        const date = getFirstAndLastDayOfMonth(y, m);
        const lastMonth = getFirstAndLastDayOfMonth(y, m - 1);
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
            load: 'group2',
            StartDate: moment(date.firstDay).format('YYYY-MM-DD'),
            EndDate: moment(date.lastDay).format('YYYY-MM-DD'),
            StartLastMonth: moment(lastMonth.firstDay).format('YYYY-MM-DD'),
            EndLastMonth: moment(lastMonth.lastDay).format('YYYY-MM-DD'),
            GroupBy: groupBy
          }
        });

        const currentMonth = response.data[0].map((item) => {
          return {
            ...item,
            sumA: item.sumA > 0 ? parseInt(item.sumA) : 0,
            sumB: item.sumB > 0 ? parseInt(item.sumB) : 0,
            sumC: item.sumC > 0 ? parseInt(item.sumC) : 0
          };
        });

        const newDate = response.data[1].map((item) => {
          return {
            ...item,
            sumA: item.sumA > 0 ? parseInt(item.sumA) : 0,
            sumB: item.sumB > 0 ? parseInt(item.sumB) : 0,
            sumC: item.sumC > 0 ? parseInt(item.sumC) : 0
          };
        });

        return { res: currentMonth, res1: newDate };
      } catch (error) {
        console.log('error', error);
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });

  const unique = [...new Set(data?.res1.map((item) => item.wc))].sort();
  const result = unique.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sumA, sumB, sumC };
  });

  const result1 = unique.map((item) => {
    const sumA = data?.res1
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res1
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res1
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sumA, sumB, sumC };
  });

  const times = unique.map((item) => {
    const data1 = data?.res.filter((item1) => item1.wc === item);
    const totalTimes = sumTimes(data1?.map((item) => item.work_hour));
    const breakTimes = sumTimes(data1?.map((item) => item.stop_hour));
    const realTime = sumTimes(data1?.map((item) => item.TOT_work_hour));
    return { wc: item, totalTimes, breakTimes, realTime };
  });

  function sumTimes(times) {
    let totalMinutes = 0;
    for (let time of times) {
      const [hours, minutes] = time.split(':').map(Number);
      totalMinutes += hours * 60 + minutes;
    }

    const resultHours = Math.floor(totalMinutes / 60);
    const resultMinutes = totalMinutes % 60;

    return `${resultHours}.${String(resultMinutes).padStart(2, '0')}`;
  }

  const myData = {
    labels: unique,
    datasets: [
      {
        label: 'A',
        data: result.map((item) => (item.sumA / 1000).toFixed(2)),
        backgroundColor: 'green',
        borderWidth: 1
      }
    ]
  };

  const myData2 = {
    labels: unique,
    datasets: [
      {
        label: 'B',
        data: result.map((item) => (item.sumB / 1000).toFixed(2)),
        backgroundColor: '#ff6600',
        borderWidth: 1
      },
      {
        label: 'C',
        data: result.map((item) => (item.sumC / 1000).toFixed(2)),
        backgroundColor: '#990000',
        borderWidth: 1
      },
  
    ]
  };

  const options = {
    animation: false,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    width: 500,
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
    plugins: {
      datalabels: {
        color: '#000',  // เปลี่ยนเป็นสีดำเพื่อให้เห็นชัดเจน
        anchor: 'end',   // ยึดกับจุดบนสุดของแท่งกราฟ
        align: 'top',    // จัดตำแหน่งให้อยู่เหนือจุดยึด
        offset: 5,       // ระยะห่างจากแท่งกราฟ 5 pixels
        formatter: (value) => value.toLocaleString(),
        font: {
          weight: 'bold',
          size: 12
        },
        // เพิ่มพื้นหลังสีขาวโปร่งใสเพื่อให้อ่านง่ายขึ้น
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 4,
        padding: 4
      }
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
    onClick: function (evt, item) {
      if (item.length > 0) {
        const index = item[0]._index;
        const wc = unique[index];
        const r = data?.res.filter((item) => item.wc === wc);
        const r1 = data?.res1.filter((item) => item.wc === wc);
        setTableData({ currentMonth: r, lastMonth: r1 });
        setOpen(true);
      }
    }
  };

  const options2 = {
    animation: false,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    width: 500,
    scales: {
      xAxes: [
        {
          stacked: true,
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
          stacked: true,
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
    plugins: {
      datalabels: {
        color: '#000',  // เปลี่ยนเป็นสีดำเพื่อให้เห็นชัดเจน
        anchor: 'end',   // ยึดกับจุดบนสุดของแท่งกราฟ
        align: 'top',    // จัดตำแหน่งให้อยู่เหนือจุดยึด
        offset: 5,       // ระยะห่างจากแท่งกราฟ 5 pixels
        display: (ctx) => ctx.dataset.data[ctx.dataIndex] > 5,
        formatter: (value, ctx) => {
          // legend ของ แท่งกราฟ
          const label = ctx.chart.data.datasets[ctx.datasetIndex].label;

          if (label === 'B') {
            return 'B = ' + value.toLocaleString()
          } else {
            return 'C = ' + value.toLocaleString()
          }

        },
        font: {
          weight: 'bold',
          size: 12
        },
        // เพิ่มพื้นหลังสีขาวโปร่งใสเพื่อให้อ่านง่ายขึ้น
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 4,
        padding: 4
      }
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
    onClick: function (evt, item) {
      if (item.length > 0) {
        const index = item[0]._index;
        const wc = unique[index];
        const r = data?.res.filter((item) => item.wc === wc);
        const r1 = data?.res1.filter((item) => item.wc === wc);
        setTableData({ currentMonth: r, lastMonth: r1 });
        setOpen(true);
      }
    }
  };

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

  const sumA = result.reduce((sum, item) => sum + item.sumA , 0) / 1000;
  const sumB = result.reduce((sum, item) => sum + item.sumB + item.sumC, 0) / 1000;

  const percentageDif = result.map((item) => {
    const sumA = item.sumA / 1000;
    const sumB = (item.sumB + item.sumC) / 1000;
     // sumB how many % of sumA
    const percentage = (sumB / sumA) * 100;
    return percentage.toFixed(2);
  });

  return (
    <>
      <ModalManagementFullPage
        open={open}
        onClose={() => setOpen(false)}
        modalDetail={<TableDetail data={tableData} />}
      />
      <ModalManagementFullPage
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        modalDetail={<TableDailyWorkCenter />}
      />
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader
          action={
            <DateMonthPicker
              label="Month"
              name="month"
              value={month}
              onChange={(e) => setMonth(moment(e).format('YYYY-MM'))}
            />
          }
          subheader={
            <Box style={{ display: 'flex' }}>
              <Button
              color="secondary"
              endIcon={<ArrowRightIcon />}
              size="small"
              variant="outlined"
              style={{ width: '15%' }}
              onClick={() => setOpenDetail(true)}
            >
              Daily Report
            </Button>
            <Typography style={{  fontWeight: 'bold', fontSize: '20px', color: 'Crimson', width: '40%', textAlign: 'center' }}>Total A : {addComma(sumA)} Tons</Typography>
            <Typography style={{  fontWeight: 'bold', fontSize: '20px' ,color: 'Crimson', width: '40%', textAlign: 'center' }}>Total B+C  : {addComma(sumB)} Tons</Typography>
            </Box>
          }
          title="Group Production Report"
          // want many subheader
          
        />
        
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <Box
                height={400}
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Bar data={myData} plugins={[ChartDataLabels]} options={options} />
                )}
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box
                height={400}
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Bar data={myData2} plugins={[ChartDataLabels]} options={options2} />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex-col" justifyContent="flex-end" p={2}>
        <Grid container spacing={2}>
            {unique.map((item, index) => (
              <Grid item key={item}>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>{item} : <span style={{ color: 'red' }}>{(percentageDif[index])}%</span></Typography>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            {group.map((item) => (
              <Grid item key={item.value}>
                <Button
                  style={{ color: item.color, backgroundColor: item.value === groupBy ? 'gray' : 'transparent' }}
                  variant="outlined"
                  endIcon={<ArrowRightIcon />}
                  size="small"
                  color="primary"
                  onClick={() => setGroupBy(item.value)}
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
      <Divider />
      <Typography style={{ marginTop: '30px' }} variant="h2">Working Hours of Machines </Typography>
      <div style={{ marginTop: '30px' }}>
        <Grid container spacing={3}>
          {/* Grid ฝั่งซ้าย */}
          <Grid item xs={6}>
            <Grid container spacing={3}>
              {times?.length > 0 &&
                times.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <PieChart data={item} />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* Grid ฝั่งขวา */}
          <Grid item xs={6}>
          <ParetoChart month={month} group={groupBy} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default GroupBarChart;
