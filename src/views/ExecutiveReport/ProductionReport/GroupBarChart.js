import React, {useState } from 'react';
import { useQuery } from "react-query";
import clsx from 'clsx';
import { Bar,Line } from 'react-chartjs-2';
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

const useStyles = makeStyles(() => ({
  root: {
    
  }
}));

const GroupBarChart = ({ className, ...rest }) => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [groupBy, setGroupBy] = useState('Forming');
  const [month, setMonth] = useState(moment().format('YYYY-MM'))
  const classes = useStyles();
  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ["GroupBarChart", month, groupBy],
    queryFn: async () => {
      try {
        const y = moment(month).format('YYYY');
        const m = moment(month).format('MM');
        const date = getFirstAndLastDayOfMonth(y, m);
        const lastMonth = getFirstAndLastDayOfMonth(y, m - 1);
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
              load: 'group',
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
            sumC: item.sumC > 0 ? parseInt(item.sumC) : 0,
        };
      });

      const newDate = response.data[1].map((item) => {
        return {
          ...item,
          sumA: item.sumA > 0 ? parseInt(item.sumA) : 0,
            sumB: item.sumB > 0 ? parseInt(item.sumB) : 0,
            sumC: item.sumC > 0 ? parseInt(item.sumC) : 0,
        };
      });
       
       return { res: currentMonth, res1: newDate };
    
       } catch (error) {
        console.log('error', error);
       }

    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, 
});

const unique = [...new Set(data?.res1.map(item => item.wc))].sort();
  const result = unique.map((item) => {
    const sumA = data?.res.filter((item1) => item1.wc === item).reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res.filter((item1) => item1.wc === item).reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res.filter((item1) => item1.wc === item).reduce((prev, current) => prev + current.sumC, 0);
    return {wc: item, sumA, sumB, sumC};
  });

 const result1 = unique.map((item) => {
    const sumA = data?.res1.filter((item1) => item1.wc === item).reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res1.filter((item1) => item1.wc === item).reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res1.filter((item1) => item1.wc === item).reduce((prev, current) => prev + current.sumC, 0);
    return {wc: item, sumA, sumB, sumC};
 });

 const times = unique.map((item) => {
    const data1 = data?.res.filter((item1) => item1.wc === item)
    const totalTimes = sumTimes(data1?.map((item) => item.work_hour));
    const breakTimes = sumTimes(data1?.map((item) => item.stop_hour));
    const realTime = sumTimes(data1?.map((item) => item.TOT_work_hour));
    return {wc: item, totalTimes, breakTimes, realTime};
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
    backgroundColor: '#3f51b5',
    borderWidth: 1
  },
  {
    label: 'Last Month A',
    data: result1.map((item) => (item.sumA / 1000).toFixed(2)),
    backgroundColor: 'red',
    borderWidth: 1
  },
  {
    label: 'B',
    data: result.map((item) => (item.sumB / 1000).toFixed(2)),
    backgroundColor:'#f1c40f',
    borderWidth: 1
  },
  {
    label: 'Last Month B',
    data: result1.map((item) => (item.sumB / 1000).toFixed(2)),
    backgroundColor:'yellow',
    borderWidth: 1
  },
  {
    label: 'C',
    data: result.map((item) => (item.sumC / 1000).toFixed(2)),
    backgroundColor: '#e74c3c',
    borderWidth: 1
  },
  {
    label: 'Last Month C',
    data: result1.map((item) => (item.sumC / 1000).toFixed(2)),
    backgroundColor: 'green',
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
      },
      onClick: function(evt, item) {
        if (item.length > 0) {
          const index = item[0]._index;
          const wc = unique[index];
          const r = data?.res.filter((item) => item.wc === wc);
          const r1 = data?.res1.filter((item) => item.wc === wc);
          setTableData({ currentMonth: r, lastMonth: r1})
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

  const group = [
        {
        value: 'Cuting',
        label: 'Cuting'
        },
        {
        value: 'Forming',
        label: 'Forming'
        },
        {
        value: 'Galvanize',
        label: 'Galvanize'
        },
        {
        value: 'Groove',
        label: 'Groove'
        },
        {
        value: 'HydroTest',
        label: 'HydroTest'
        },
        {
        value: 'Others',
        label: 'Others'
        },
        {
        value: 'Packing',
        label: 'Packing'
        },
        {
        value: 'Painting',
        label: 'Painting'
        },
        {
        value: 'Slit',
        label: 'Slit'
        },
        {
        value: 'Threading',
        label: 'Threading'
        }
  ]

  return (
   <>
    <ModalManagementFullPage
        open={open}
        onClose={() => setOpen(false)}
        modalDetail={
          <TableDetail data={tableData} />
        }
     />
      <ModalManagementFullPage
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        modalDetail={
          <TableDailyWorkCenter />
        }
     />
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
        subheader={(
          <Button
          color="secondary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="outlined"
          onClick={() => setOpenDetail(true)}
        >
          Daily Report
        </Button>
        )}
        title="Group Production Report"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
            display="flex"  justifyContent="center" alignItems="center"
        >
          {isLoading ? <CircularProgress /> : <Bar data={myData} options={options} />}
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Select
           menuPortalTarget={document.body} 
           styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            options={group}
            value={group.filter((item) => item.value === groupBy)}
            onChange={(e) => setGroupBy(e.value)}
            closeMenuOnSelect={true}
         />
      </Box>
    </Card>
    <Divider />
    <div style={{ marginTop: '30px' }}>
    <Grid container spacing={3}>
        {times?.length > 0 && times.map((item, index) => (
            <Grid item lg={2} key={index}>
                <PieChart data={item} />
            </Grid>
        ))}
    </Grid>
    </div>
   </>
  );
};


export default GroupBarChart;
