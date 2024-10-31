import React, { useState } from 'react';
import { useQuery } from "react-query";
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Grid,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import API from 'src/views/components/API';
import moment from 'moment';
import ModalManagementFullPage from 'src/views/components/ModalManagementFullPage';
import TableDailyReport from './TableDailyReport';
import CYearPicker from 'src/views/components/Input/CYearPicker';
import LineCard from './LineCard';
import { useTheme } from '@material-ui/core';
import TableProduction from './TableProduction';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import DateTimePicker from 'src/views/components/Input/CDatePicker';
import TableGroupDetail from './TableGroupDetail';
const useStyles = makeStyles(() => ({
  root: {
    
  }
}));
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
    value: ["P6CT01", "P6CT02", "P6CT03", "W6CT01"],
    label: 'Cuting'
  },
  {
    value: ["P7PK00", "P7PKP1", "P7PKPB", "P7PKPC", "W7PK01"],
    label: 'Packing'
  }
]

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
    value: 'Cuting',
    label: 'Cuting',
    color: '#f44336'
  },
  {
    value: 'Packing',
    label: 'Packing',
    color: '#4caf50'
  },
];

const Test = ({ className, ...rest }) => {
  const theme = useTheme();
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [currentMonth, setCurrentMonth] = useState(moment().format('M') -1);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [barModal, setBarModal] = useState(false);
  const [groupBy, setGroupBy] = useState('Forming');
  const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
  const classes = useStyles();

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  // use react-query instead of useEffect
  const { data, isLoading, error } = useQuery({
    queryKey: ["BarChart", month],
    queryFn: async () => {
       try {
        const y = moment(month).format('YYYY');
        const date = getFirstAndLastDayOfYear(y);
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
              load: 'grape',
              StartDate: moment(date.firstDay).format('YYYY-MM-DD'),
              EndDate: moment(date.lastDay).format('YYYY-MM-DD'),
          }
      });
  
      const slit = response.data[0].filter((item) => item.wcGroup === 'Slit');
      const forming = response.data[0].filter((item) => item.wcGroup === 'Forming');
      const packing = response.data[0].filter((item) => item.wcGroup === 'Packing');
      const hydro = response.data[0].filter((item) => item.wcGroup === 'HydroTest');
      const galvanize = response.data[0].filter((item) => item.wcGroup === 'Galvanize');
      const groove = response.data[0].filter((item) => item.wcGroup === 'Groove');
      const painting = response.data[0].filter((item) => item.wcGroup === 'Painting');
      const cuting = response.data[0].filter((item) => item.wcGroup === 'Cuting');
      const threading = response.data[0].filter((item) => item.wcGroup === 'Threading');

      return {
        slit,
        forming,
        packing,
        hydro,
        galvanize,
        groove,
        painting,
        cuting,
        threading
      }
        
       } catch (error) {
        console.log('error', error);
       }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, 
});


const { data: data2 , isLoading: isLoading2, error: error2 } = useQuery({
  queryKey: ['GroupBarChart', day, groupBy],
  queryFn: async () => {
    try {
      const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
        params: {
          load: 'group',
          StartDate: moment(day).format('YYYY-MM-DD'),
          EndDate: moment(day).format('YYYY-MM-DD'),
          StartLastMonth: moment("2024-09-01").format('YYYY-MM-DD'),
          EndLastMonth: moment("2024-09-30").format('YYYY-MM-DD'),
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
      return { res: currentMonth };
      
    } catch (error) {
      console.log('error', error);
    }
  },
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000
});

  const unique = label.find((item) => item.label === groupBy).value;
  const result = unique.map((item) => {
    const sumA = data2?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data2?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data2?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sumA, sumB, sumC };
  });

  const color = group.filter((item) => item.value === groupBy)[0]?.color;

  const myData = {
    labels: label.find((item) => item.label === groupBy).value,
    datasets: [
      {
        label: groupBy,
        data: result.map((item) => (item.sumA / 1000).toFixed(2)),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      }
    ],

  };


  {/*function getFirstAndLastDayOfMonth(year, month) {
    // สร้างวันที่แรกของเดือน
    const firstDay = new Date(year, month - 1, 1);
    
    // สร้างวันที่แรกของเดือนถัดไป แล้วลบออก 1 วัน เพื่อได้วันสุดท้ายของเดือนปัจจุบัน
    const lastDay = new Date(year, month, 0);
    
    return {
      firstDay: firstDay,
      lastDay: lastDay
    };
  }*/}

  function getFirstAndLastDayOfYear(year) {
    // สร้างวันที่แรกของเดือน
    const firstDay = new Date(year, 0, 1);

    const lastDay = new Date(year, 11, 31);
    
    return {
      firstDay: firstDay,
      lastDay: lastDay
    };
  }
  const options = {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: true
    },
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
    plugins: {
      datalabels: {
        display: false, // ปิดการแสดง datalabels
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

      callbacks: {
        // add comma to y-axis values
        label: function (tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].label + ': ' + addComma(tooltipItem.yLabel);
        },
      },
      titleFontStyle: 'bold',
      bodyFontStyle: 'bold',
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
    onClick: function (evt) {
      var activePoints = this.getElementAtEvent(evt);
      if (activePoints.length > 0) {
        var chartData = activePoints[0]._chart.config.data;
        var idx = activePoints[0]._index;
        var label = chartData.labels[idx];   
        setCurrentMonth(moment(label, 'MMM').format('M') - 1);
      }
    }

  };
  
  const optionsBar = {
    animation: false,
    layout: { padding: 0 },
    legend: {
      display: true,
      position: 'top',
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
    onClick: function() {
      setBarModal(true)
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
 
  const sum = result.reduce((acc , item) => acc + item.sumA , 0) / 1000

  const handleYearChange = (year) => {
    const currentYear = moment().format('YYYY');

    if (year >= currentYear || year < 2023) {
        return  alert('ไม่มีข้อมูลในปีนี้');
    }
    setMonth(year);
  };

  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <ModalManagementFullPage
        open={open}
        onClose={() => setOpen(false)}
        modalDetail={
          <TableDailyReport />
        }
     />
      <ModalManagementFullPage
        open={openModal}
        onClose={() => setOpenModal(false)}
        modalDetail={
          <TableProduction data={data} />
        }
     />
      <CardHeader
        action={(
            <CYearPicker
              label="Month"
              name="month"
              value={month}
              onChange={(date) => handleYearChange(moment(date).format('YYYY'))}
             />
        )}
        subheader={(
          <Button
          color="secondary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          Daily Report
        </Button>
        )}
        title="Monthly Production Volumes by Department (Grade A)"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
         <Grid item xs={10}>
           <Box
          height={400}
          position="relative"
          display="flex"  justifyContent="center" alignItems="center"
                >
           {isLoading ? <CircularProgress /> : <LineCard data={data} options={options}  />}
           </Box>
       </Grid>
          <Grid item xs={2}>
           <Card style={{ border: 'solid 1px red' }}>
            <CardHeader style={{ textAlign: 'center' }} title={moment().month(currentMonth).format('MMMM')} />
            <CardContent style={{ textAlign: 'center' }}>
              {!isLoading &&  
                <>
                <Typography style={{ fontWeight: 'bold', color: '#ffb200' }}>Slit : {addComma((data?.slit[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#cc0000' }}>Forming : {addComma((data?.forming[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#0051ff' }}>HydroTest : {addComma((data?.hydro[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#009933' }}>Galvanize : {addComma((data?.galvanize[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#9900cc' }}>Painting : {addComma((data?.painting[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#cccc00' }}>Threading :{addComma((data?.threading[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#00ffff' }}>Cuting :{addComma((data?.cuting[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                <Typography style={{ fontWeight: 'bold', color: '#663300' }}>Packing : {addComma((data?.packing[currentMonth].sumA / 1000).toFixed(2))}</Typography>
                </>
              }
            </CardContent>
           </Card>
          </Grid>
        </Grid>
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
          variant="outlined"
          onClick={() => setOpenModal(true)}
        >
          Overview
        </Button>
      </Box>
    </Card>
    </Grid>
    <Grid item xs={12}>
    <Card className={clsx(classes.root, className)} {...rest}>
    <ModalManagementFullPage
        open={barModal}
        onClose={() => setBarModal(false)}
        modalDetail={
        <TableGroupDetail day={day} wc={groupBy} />
        }
     />
        <CardHeader
          action={
            <DateTimePicker
              label="Day"
              name="day"
              value={day}
              onChange={(e) => setDay(moment(e).format('YYYY-MM-DD'))}
            />
          }
          title={`${groupBy} Production Report`}
          subheader={`Total Production : ${sum ? sum : 0} Tons`}
          subheaderTypographyProps={{ align: 'center', color: 'secondary', variant: 'h4', fontWeight: 'bold' }}
        />
        <Divider />
        <CardContent>
              <Box
                   height={400}
                   position="relative"
                   display="flex"  justifyContent="center" alignItems="center"
              >
                {isLoading2 ? (
                  <CircularProgress />
                ) : (
                  <Bar data={myData} plugins={[ChartDataLabels]} options={optionsBar} />
                )}
              </Box>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
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
    </Grid>
    
  
    {/*<Grid item xs={12}>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <ModalManagementFullPage
        open={open}
        onClose={() => setOpen(fa*lse)}
        modalDetail={
          <TableDailyReport />
        }
     />
      <CardHeader
        title="Monthly Production Volumes by Department (Grade B + C)"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
          display="flex"  justifyContent="center" alignItems="center"
        >
           {isLoading ? <CircularProgress /> : <BarCard data={data} />}
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
    </Grid>*/}
</Grid>
  );
};


export default Test;
