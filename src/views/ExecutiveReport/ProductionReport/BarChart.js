import React, { useState } from 'react';
import { useQuery } from "react-query";
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import API from 'src/views/components/API';
import moment from 'moment';
import DateMonthPicker from 'src/views/components/Input/CDateMonthPicker';

const useStyles = makeStyles(() => ({
  root: {
    
  }
}));

const Test = ({ className, ...rest }) => {
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const classes = useStyles();
  const theme = useTheme();

  // use react-query instead of useEffect
  const { data, isLoading, error } = useQuery({
    queryKey: ["BarChart", month],
    queryFn: async () => {
       try {
        const y = moment(month).format('YYYY');
        const m = moment(month).format('MM');
        const date = getFirstAndLastDayOfMonth(y, m);
        const lastMonth = getFirstAndLastDayOfMonth(y, m - 1);
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
              load: 'grape',
              StartDate: moment(date.firstDay).format('YYYY-MM-DD'),
              EndDate: moment(date.lastDay).format('YYYY-MM-DD'),
              StartLastMonth: moment(lastMonth.firstDay).format('YYYY-MM-DD'),
              EndLastMonth: moment(lastMonth.lastDay).format('YYYY-MM-DD'),
          }
      });
      return { res: response.data[0], res1: response.data[1] };
        
       } catch (error) {
        console.log('error', error);
       }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, 
});

const wcGroup = data?.res.map((item) => item.wcGroup);
 
const dat = {
  labels: wcGroup,
  datasets: [
    {
    label: 'A',
    data: data?.res.map((item) => (item.sumA / 1000).toFixed(2)),
    backgroundColor: '#3f51b5',
    borderWidth: 1
  },
  {
    label: 'Last Month A',
    data: data?.res1.map((item) => (item.sumA / 1000).toFixed(2)),
    backgroundColor: 'red',
    borderWidth: 1
  },
  {
    label: 'B',
    data: data?.res.map((item) => (item.sumB / 1000).toFixed(2)),
    backgroundColor:'#f1c40f',
    borderWidth: 1
  },
  {
    label: 'Last Month B',
    data: data?.res1.map((item) => (item.sumB / 1000).toFixed(2)),
    backgroundColor:'yellow',
    borderWidth: 1
  },
  {
    label: 'C',
    data: data?.res.map((item) => (item.sumC / 1000).toFixed(2)),
    backgroundColor: '#e74c3c',
    borderWidth: 1
  },
  {
    label: 'Last Month C',
    data: data?.res1.map((item) => (item.sumC / 1000).toFixed(2)),
    backgroundColor: 'green',
    borderWidth: 1
  },
]
};

  const options = {
    animation: false,
    layout: { padding: 0 },
    legend: { display: false },
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
        fontSize: 16,  // คุณสามารถเพิ่มหรือลดขนาดตัวอักษรตรงนี้
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary,
        
        // เพิ่มตัวเลือกต่อไปนี้เพื่อปรับขนาดและรูปแบบเพิ่มเติม:
        padding: 12,  // ปรับระยะขอบภายใน tooltip
        cornerRadius: 4,  // ปรับความโค้งของมุม tooltip
        caretSize: 6,  // ปรับขนาดของลูกศรชี้
        bodySpacing: 8,  // ระยะห่างระหว่างบรรทัดในส่วน body
        titleSpacing: 6,  // ระยะห่างระหว่างหัวข้อและเนื้อหา
        
        // ถ้าต้องการกำหนดความกว้างสูงสุด:
        bodyFontSize: 14,  // ขนาดตัวอักษรส่วน body แยกจาก title
        titleFontSize: 16,  // ขนาดตัวอักษรส่วน title
        xPadding: 12,  // padding แนวนอน
        yPadding: 12,  // padding แนวตั้ง
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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
            <DateMonthPicker
              label="Month"
              name="month"
              value={month}
              onChange={(e) => setMonth(moment(e).format('YYYY-MM'))}
             />
        
        )}
        title="All Production Report"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
          display="flex"  justifyContent="center" alignItems="center"
        >
          {isLoading ? <CircularProgress /> : <Bar data={dat} options={options} />}
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};


export default Test;
