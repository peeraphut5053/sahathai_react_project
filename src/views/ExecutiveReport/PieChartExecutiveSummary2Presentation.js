import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  colors,
  makeStyles,
  useTheme,
  Grid,
  Chip,
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from "moment";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import MomentUtils from "@date-io/moment";
import API from '../components/API';
import { Fragment } from 'react';

moment.locale("th");

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '35vh'
  }
}));

const PieChartExecutiveSummary2 = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();


  // const [selectedDateStart, setSelectedDateStart] = useState(moment().subtract(1, 'months').format("YYYY-MM-DD"));
  // const [selectedDateEnd, setSelectedDateEnd] = useState(moment().format("YYYY-MM-DD"));
  const [selectedDateStart, setSelectedDateStart] = useState(moment().clone().startOf('month').format('YYYY-MM-DD'));
  const [selectedDateEnd, setSelectedDateEnd] = useState(moment().format('YYYY-MM-DD'));

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
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };


  const ExecPie = (selectedDateStart, selectedDateEnd) => {
    console.log(selectedDateStart)
    console.log(selectedDateEnd)


    API.get(`API_ExecutiveReport/data.php?load=STS_execSUM_Coil_Rec&startDate=${selectedDateStart}&endDate=${selectedDateEnd}`)
      .then(res => {
        (res.data) ? setCoilReciveNow(res.data) : setCoilReciveNow([])
        console.log(res.data)
      })

    API.get(`API_ExecutiveReport/data.php?load=STS_execSUM_Pipe_Sale&startDate=${selectedDateStart}&endDate=${selectedDateEnd}`)
      .then(res => {
        (res.data) ? setPipeSaleNow(res.data) : setPipeSaleNow([])
        console.log(res.data)
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
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      <CardContent>
        <Grid container >
        <Grid item xs={4} style={{ textAlign: 'center',alignSelf:'center' }} >
            <Grid container spacing={1} >
              <Grid item xs={12} lg={12} >
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
              <Grid item xs={12} lg={12}>

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
              <Grid item xs={12} lg={12}>
                <div style={{ padding: '0px 5px' }}>
                  <span style={{ padding: '0px 4px' }}>
                    <Chip color="primary" onClick={() => { ExecPie(selectedDateStart, selectedDateEnd) }} label={"PROCESS"} > </Chip>
                  </span>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Box
              height={'20vh'}
              position="relative"
            >

              <Pie
                data={dataCoilNow}
                options={options}
              />
            </Box>


            <CardHeader
              title="Coil Received(MT) Now!!"
              style={{ textAlign: 'center',padding:'8px'}}
            />
            <Box
              display="flex"
              justifyContent="center"
              mt={0}
            >
              {CoilReciveDataSetNow.map(({
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

          <Grid item xs={4}>
            <Box
              height={'20vh'}
              position="relative"
            >

              <Pie
                data={dataPipeNow}
                options={options}
              />
            </Box>

            <CardHeader
              title="Steel Pipe Delivery(MT) Now!!"
              style={{ textAlign: 'center',padding:'8px' }}
            />
            <Box
              display="flex"
              justifyContent="center"
              mt={0}
            >
              {PipeSaleDataSetNow.map(({
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
    </Card>
  );
};

PieChartExecutiveSummary2.propTypes = {
  className: PropTypes.string
};

export default PieChartExecutiveSummary2;
