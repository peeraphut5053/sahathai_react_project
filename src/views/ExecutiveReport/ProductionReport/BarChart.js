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
  Grid
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import API from 'src/views/components/API';
import moment from 'moment';
import BarCard from './BarCard';
import ModalManagementFullPage from 'src/views/components/ModalManagementFullPage';
import TableDailyReport from './TableDailyReport';
import CYearPicker from 'src/views/components/Input/CYearPicker';
import LineCard from './LineCard';
import { useTheme } from '@material-ui/core';
import TableProduction from './TableProduction';
const useStyles = makeStyles(() => ({
  root: {
    
  }
}));

const Test = ({ className, ...rest }) => {
  const theme = useTheme();
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

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
      console.log(response.data);
  
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
    },onClick: function (evt, item) {
      if (item.length > 0) {
        setOpenModal(true);
      }
    }
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
              onChange={(e) => setMonth(moment(e).format('YYYY'))}
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
        <Box
          height={400}
          position="relative"
          display="flex"  justifyContent="center" alignItems="center"
        >
           {isLoading ? <CircularProgress /> : <LineCard data={data} options={options}  />}
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
    </Grid>
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
    </Grid>
</Grid>
  );
};


export default Test;
