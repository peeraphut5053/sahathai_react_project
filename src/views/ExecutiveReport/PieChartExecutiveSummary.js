import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {   Box, Card, CardContent, CardHeader, Divider, Typography, useTheme, Grid, Chip } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from 'src/mui/MuiPickersCompat';
import moment from "moment";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import MomentUtils from "@date-io/moment";
import API from '../components/API';
import { Fragment } from 'react';

moment.locale("th");

const RootCard = styled(Card)({
  minHeight: '50vh'
});

const PieChartExecutiveSummary = ({ className, ...rest }) => {
  const theme = useTheme();


  // const [selectedDateStart, setSelectedDateStart] = useState(moment().subtract(1, 'months').format("YYYY-MM-DD"));
  // const [selectedDateEnd, setSelectedDateEnd] = useState(moment().format("YYYY-MM-DD"));
  const [selectedDateStart, setSelectedDateStart] = useState(moment().subtract(1, 'months').clone().startOf('month').format('YYYY-MM-DD'));
  const [selectedDateEnd, setSelectedDateEnd] = useState(moment().subtract(1, 'months').clone().endOf('month').format('YYYY-MM-DD'));


  const [CoilRecive, setCoilRecive] = useState([]);
  const [CoilReciveNow, setCoilReciveNow] = useState([]);
  const [PipeSale, setPipeSale] = useState([]);
  const [PipeSaleNow, setPipeSaleNow] = useState([]);




  const onDateStartChange = (date, value) => {
    setSelectedDateStart(value)
  };

  const onDateEndChange = (date, value) => {
    setSelectedDateEnd(value)
  };



  const showLineDataSetByItemGroup = (market, data) => {
    var dataset = data.filter(function (data) {
      return data.market == market;
    });
    let o = dataset.map((i) => {
      return i.sumQTY
    })

    return o
  }



  const dataCoil = {
    datasets: [
      {
        data: [showLineDataSetByItemGroup('Domestic', CoilRecive), showLineDataSetByItemGroup('International', CoilRecive)],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Domestic', 'International']
  };

  const dataCoilNow = {
    datasets: [
      {
        data: [showLineDataSetByItemGroup('Domestic', CoilReciveNow), showLineDataSetByItemGroup('International', CoilReciveNow)],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Domestic', 'International']
  };

  const dataPipe = {
    datasets: [
      {
        data: [showLineDataSetByItemGroup('Domestic', PipeSale), showLineDataSetByItemGroup('International', PipeSale)],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Domestic', 'International']
  };

  const dataPipeNow = {
    datasets: [
      {
        data: [showLineDataSetByItemGroup('Domestic', PipeSaleNow), showLineDataSetByItemGroup('International', PipeSaleNow)],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Domestic', 'International']
  };



  const options = {
    animation: false,
    cutout: '80%',
    layout: { padding: 0 },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false, // ปิดการแสดง datalabels
      },
      tooltip: {
        backgroundColor: theme.palette.background.default,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleColor: theme.palette.text.primary
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };


  const ExecPie = (selectedDateStart, selectedDateEnd) => {
    API.get(`API_ExecutiveReport/data.php?load=STS_execSUM_Coil_Rec&startDate=${selectedDateStart}&endDate=${selectedDateEnd}`)
      .then(res => {
        (res.data) ? setCoilRecive(res.data) : setCoilRecive([])
      })

    API.get(`API_ExecutiveReport/data.php?load=STS_execSUM_Pipe_Sale&startDate=${selectedDateStart}&endDate=${selectedDateEnd}`)
      .then(res => {
        (res.data) ? setPipeSale(res.data) : setPipeSale([])
      })
  }

  useEffect(() => {
    setTimeout(() => {
      ExecPie(selectedDateStart, selectedDateEnd)
    }, 2000);
  }, [])

  const CoilReciveDataSet = [
    {
      title: 'Domestic',
      value: showLineDataSetByItemGroup('Domestic', CoilRecive),
      icon: ArrowDownwardIcon,
      color: colors.indigo[600]
    },
    {
      title: 'International',
      value: showLineDataSetByItemGroup('International', CoilRecive),
      icon: ArrowUpwardIcon,
      color: colors.red[600]
    }
  ];

  const CoilReciveDataSetNow = [
    {
      title: 'Domestic',
      value: showLineDataSetByItemGroup('Domestic', CoilReciveNow),
      icon: ArrowDownwardIcon,
      color: colors.indigo[600]
    },
    {
      title: 'International',
      value: showLineDataSetByItemGroup('International', CoilReciveNow),
      icon: ArrowUpwardIcon,
      color: colors.red[600]
    }
  ];

  const PipeSaleDataSet = [
    {
      title: 'Domestic',
      value: showLineDataSetByItemGroup('Domestic', PipeSale),
      icon: ArrowDownwardIcon,
      color: colors.indigo[600]
    },
    {
      title: 'International',
      value: showLineDataSetByItemGroup('International', PipeSale),
      icon: ArrowUpwardIcon,
      color: colors.red[600]
    }
  ];

  const PipeSaleDataSetNow = [
    {
      title: 'Domestic',
      value: showLineDataSetByItemGroup('Domestic', PipeSaleNow),
      icon: ArrowDownwardIcon,
      color: colors.indigo[600]
    },
    {
      title: 'International',
      value: showLineDataSetByItemGroup('International', PipeSaleNow),
      icon: ArrowUpwardIcon,
      color: colors.red[600]
    }
  ];

  const dateFormatter = str => {
    return str;
  };

  return (
    <RootCard
      className={clsx(className)}
      {...rest}
    >
      <CardContent>
        {/* <CardHeader title="Coil Received(MT) & Steel Pipe Delivery(MT)" /> */}

        <Grid container spacing={3} >
          <Grid item xs={12} lg={4} >
            <Fragment>
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  showTodayButton={true}
                  value={selectedDateStart}
                  format="YYYY-MM-DD"
                  inputValue={selectedDateStart}
                  onChange={onDateStartChange}
                  rifmFormatter={dateFormatter}
                />
              </MuiPickersUtilsProvider>
            </Fragment>
          </Grid>
          <Grid item xs={12} lg={4}>

            <Fragment>
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  showTodayButton={true}
                  value={selectedDateEnd}
                  format="YYYY-MM-DD"
                  inputValue={selectedDateEnd}
                  onChange={onDateEndChange}
                  rifmFormatter={dateFormatter}
                />
              </MuiPickersUtilsProvider>
            </Fragment>

          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ padding: '0px 5px' }}>
              <span style={{ padding: '0px 4px' }}>
                <Chip color="primary" onClick={() => { ExecPie(selectedDateStart, selectedDateEnd) }} label={"PROCESS"} />
              </span>
            </div>
          </Grid>
        </Grid>

      </CardContent>
      <Divider />
      <CardContent>
        <Grid container >
          <Grid item xs={12} >
            <Box
              height={150}
              position="relative"
            >
              <Pie
                data={dataCoil}
                plugins={[ChartDataLabels]}
                options={options}
              />
            </Box>
           
            <CardHeader 
             title="Coil Received (MT)" 
             style={{ textAlign: 'center' }}
             /> 

            <Box
              display="flex"
              justifyContent="center"
              mt={2}
            >
              {/* <Grid item xs={12}>
                  Coil Received(MT)
                </Grid> */}
              {CoilReciveDataSet.map(({
                color,
                icon: Icon,
                title,
                value
              }) => (
                <Box key={title} p={1} textAlign="center" >
                  {/* <Icon color="action" /> */}
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    style={{ color }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    style={{ color }}
                    variant="h4"
                  >
                    {value}
                  </Typography>
                </Box>
              ))}


            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              height={150}
              position="relative"
            >

              <Pie
                data={dataPipe}
                plugins={[ChartDataLabels]}
                options={options}
              />
            </Box>
            <CardHeader 
             title="Steel Pipe Delivery (MT) " 
             style={{ textAlign: 'center' }}
             />
            <Box
              display="flex"
              justifyContent="center"
              mt={2}
            >
              {PipeSaleDataSet.map(({
                color,
                icon: Icon,
                title,
                value
              }) => (
                <Box
                  key={title}
                  p={1}
                  textAlign="center"
                >
                  {/* <Icon color="action" /> */}
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    style={{ color }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    style={{ color }}
                    variant="h4"
                  >
                    {value}

                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>


      </CardContent>
    </RootCard>
  );
};

PieChartExecutiveSummary.propTypes = {
  className: PropTypes.string
};

export default PieChartExecutiveSummary;
