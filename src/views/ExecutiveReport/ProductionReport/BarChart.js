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
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import API from 'src/views/components/API';
import moment from 'moment';
import DateMonthPicker from 'src/views/components/Input/CDateMonthPicker';
import BarCard from './BarCard';

const useStyles = makeStyles(() => ({
  root: {
    
  }
}));

const Test = ({ className, ...rest }) => {
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const classes = useStyles();

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
  );
};


export default Test;
