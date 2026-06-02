import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {   Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Menu, MenuItem } from '@mui/material';
import * as colors from '@mui/material/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from 'react';
import API from '../components/API';
import CircularProgress from '@mui/material/CircularProgress';
import moment from "moment";
import ChartDataLabels from 'chartjs-plugin-datalabels';
moment.locale("th");

const ChartExecutiveSummary = ({ className, ...rest }) => {
  const theme = useTheme();

  const [GarphLineData, setGarphLineData] = useState([])
  const [GarphLineDataAll, setGarphLineDataAll] = useState([])
  //const [Item_Group, setItem_Group] = useState("all")
  const [Item_Group, setItem_Group] = useState("all")
  const [LoadingData, setLoadingData] = useState(true)
  const [selectLineColor, setSelectLineColor] = useState("")
  const [item_Group_selected, setItem_Group_selected] = useState("")

  const STS_execRpt_SUM_mthly = (Item_Group) => {
    setLoadingData(false)

    if (Item_Group == 'all') {
      API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_SUM_mthly_all`)
        .then(res => {
          (res.data) ? setGarphLineDataAll(res.data) : setGarphLineDataAll([])
          // (res.data) ? setGarphLineDataAll(res.data) : setGarphLineDataAll([])
          setLoadingData(true)
        })
    }
    else {
      API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_SUM_mthly&startDate=${moment().subtract(13, 'months').format("YYYY-MM-DD")}&endDate=${moment().format("YYYY-MM-DD")}&codeItem=${Item_Group}`)
        .then(res => {

          // if (res !== null) {
          //   setGarphLineData(res.data)
          //     (res.data) ? setItem_Group_selected(res.data[0].Item_Group) : setItem_Group_selected("Coil")
          //   setLoadingData(true)
          // } else {
          //   setGarphLineData([])
          // }


          (res.data) ? setGarphLineData(res.data) : setGarphLineData([])
          setLoadingData(true)
          if (res.data.length > 0) {
            setItem_Group_selected(res.data[0].Item_Group)
          }




        })
    }


  }

  useEffect(() => {
    STS_execRpt_SUM_mthly(Item_Group)
    selectColor(item_Group_selected)
    var timerID = setInterval(() => STS_execRpt_SUM_mthly(Item_Group), 900000);
    // var timerID = setInterval(() =>  selectColor(item_Group_selected), 15000);


    return function cleanup() {
      clearInterval(timerID);
    };

  }, [Item_Group, item_Group_selected])





  const showLineDataSetByItemGroup = (Data_Group, data) => {
    var dataset = data.filter(function (data) {
      return data.Data_Group == Data_Group;
    });
    let o = dataset.map((i) => {
      return i.sumQTY
    })

    return o
  }

  const showLineDataSetByItemGroupAll = (Item_Group, data) => {

    /*
    data = [
      { Year: 2019, Month: 1, Item_Group: "Strip", sumQTY: 20000 },
      { Year: 2019, Month: 2, Item_Group: "Strip", sumQTY: 30000 },
      { Year: 2019, Month: 3, Item_Group: "Strip", sumQTY: 40000 },
      { Year: 2019, Month: 4, Item_Group: "Strip", sumQTY: 50000 },
      { Year: 2019, Month: 5, Item_Group: "Strip", sumQTY: 60000 },
      { Year: 2019, Month: 6, Item_Group: "Strip", sumQTY: 70000 },
      { Year: 2019, Month: 7, Item_Group: "Strip", sumQTY: 80000 },
      ...data]
      */
    var dataset = data.filter(function (data) {
      return data.Item_Group == Item_Group;
    });
    let datasetGroup = dataset.map((i) => {
      return i.sumQTY
    })
    let dataReturn = [...datasetGroup]
    return dataReturn
  }

  const selectColor = (item_Group_selected) => {
    if (item_Group_selected == "Coil") {
      setSelectLineColor(colors.indigo[500])
    } else if (item_Group_selected == "Strip") {
      setSelectLineColor(colors.orange[500])
    } else if (item_Group_selected == "Processing Pipe") {
      setSelectLineColor(colors.red[500])
    } else if (item_Group_selected == "Finished Pipe") {
      setSelectLineColor(colors.green[500])
    } else if (item_Group_selected == "Scrap Pipe") {
      setSelectLineColor(colors.blue[300])
    }

  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.pink[900],
        data: showLineDataSetByItemGroup("Received", GarphLineData),
        label: 'Received',
        fill: false,
        borderColor: colors.pink[900],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,

      },
      {
        backgroundColor: colors.pink[500],
        data: showLineDataSetByItemGroup("Released", GarphLineData),
        label: 'Released',
        fill: false,
        borderColor: colors.pink[500],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        backgroundColor: selectLineColor,
        data: showLineDataSetByItemGroup("Balance", GarphLineData),
        label: 'Balance',
        fill: false,
        borderColor: selectLineColor,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      }
    ],
    labels: [
      [moment().subtract(13, 'months').format("MMM-YYYY")],
      [moment().subtract(12, 'months').format("MMM-YYYY")],
      [moment().subtract(11, 'months').format("MMM-YYYY")],
      [moment().subtract(10, 'months').format("MMM-YYYY")],
      [moment().subtract(9, 'months').format("MMM-YYYY")],
      [moment().subtract(8, 'months').format("MMM-YYYY")],
      [moment().subtract(7, 'months').format("MMM-YYYY")],
      [moment().subtract(6, 'months').format("MMM-YYYY")],
      [moment().subtract(5, 'months').format("MMM-YYYY")],
      [moment().subtract(4, 'months').format("MMM-YYYY")],
      [moment().subtract(3, 'months').format("MMM-YYYY")],
      [moment().subtract(2, 'months').format("MMM-YYYY")],
      [moment().subtract(1, 'months').format("MMM-YYYY")],
      [moment().format("MMM-YYYY")],
      // [moment().add(1, 'months').format("MMM-YYYY")],
    ]
  };

  const data_all = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: showLineDataSetByItemGroupAll("Coil", GarphLineDataAll),
        label: 'Coil',
        fill: false,
        borderColor: colors.indigo[500],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,

      },
      {
        backgroundColor: colors.orange[500],
        data: showLineDataSetByItemGroupAll("Strip", GarphLineDataAll),
        label: 'Strip',
        fill: false,
        borderColor: colors.orange[500],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        backgroundColor: colors.red[500],
        data: showLineDataSetByItemGroupAll("Processing Pipe", GarphLineDataAll),
        label: 'Processing Pipe',
        fill: false,
        borderColor: colors.red[500],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        backgroundColor: colors.green[500],
        data: showLineDataSetByItemGroupAll("Finished Pipe", GarphLineDataAll),
        label: 'Finished Pipe',
        fill: false,
        borderColor: colors.green[500],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },

      {
        backgroundColor: colors.blue[300],
        data: showLineDataSetByItemGroupAll("Scrap Pipe", GarphLineDataAll),
        label: 'Scrap Pipe',
        fill: false,
        borderColor: colors.blue[300],
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },

    ],
    labels:
      [
        // [moment().subtract(13, 'months').format("MMM-YYYY")],
        [moment().subtract(12, 'months').format("MMM-YYYY")],
        [moment().subtract(11, 'months').format("MMM-YYYY")],
        [moment().subtract(10, 'months').format("MMM-YYYY")],
        [moment().subtract(9, 'months').format("MMM-YYYY")],
        [moment().subtract(8, 'months').format("MMM-YYYY")],
        [moment().subtract(7, 'months').format("MMM-YYYY")],
        [moment().subtract(6, 'months').format("MMM-YYYY")],
        [moment().subtract(5, 'months').format("MMM-YYYY")],
        [moment().subtract(4, 'months').format("MMM-YYYY")],
        [moment().subtract(3, 'months').format("MMM-YYYY")],
        [moment().subtract(2, 'months').format("MMM-YYYY")],
        [moment().subtract(1, 'months').format("MMM-YYYY")],
        [moment().format("MMM-YYYY")],
        // [moment().add(1, 'months').format("MMM-YYYY")],
      ]
  };



  const optionsLine = {
    animation: true,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.secondary
        },
        grid: {
          display: true,
          drawBorder: false
        }
      },
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          color: theme.palette.text.secondary
        },
        grid: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false
        }
      }
    },
    // tooltips: {
    //   backgroundColor: theme.palette.background.default,
    //   bodyFontColor: theme.palette.text.secondary,
    //   borderColor: theme.palette.divider,
    //   borderWidth: 1,
    //   enabled: true,
    //   footerFontColor: theme.palette.text.secondary,
    //   intersect: true,
    //   mode: 'index',
    //   titleFontColor: theme.palette.text.primary
    // }

    plugins: {
      datalabels: {
        display: false, // ปิดการแสดง datalabels
      },
    },
    tooltips: {
      enabled: false,

      custom: function (tooltipModel) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<thead>';

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });
          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        // `this` will be the overall tooltip
        var position = this._chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setItem_Group(event.currentTarget)
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    setItem_Group(value)
  };


  return (
    <Card
      className={clsx(className)}
      {...rest}
    >
      {/* *{selectLineColor}{item_Group_selected}* */}
      {/* {JSON.stringify(GarphLineData)} */}
      <CardHeader
        action={(
          <div>
            <Button
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="text"
              aria-haspopup="true" onClick={handleClick}
            >
              {Item_Group}

            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
            >
              <MenuItem onClick={() => handleClose("all")}>OVERALL BALANCE</MenuItem>
              <MenuItem onClick={() => handleClose("Coil")}>Coil</MenuItem>
              <MenuItem onClick={() => handleClose("Strip")}>Strip</MenuItem>
              <MenuItem onClick={() => handleClose("Processing Pipe")}>Processing Pipe</MenuItem>
              <MenuItem onClick={() => handleClose("Finished Pipe")}>Finished Pipe</MenuItem>
              <MenuItem onClick={() => handleClose("Scrap Pipe")}>Scrap Pipe</MenuItem>
            </Menu>
            <span hidden={LoadingData}>
              <CircularProgress color="secondary" hidden={true} />
            </span>


          </div>

        )}
        title="Executive Summary"
      />
      <Divider />
      <CardContent>

        {/* <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box> */}

        <Box
          height={400}
          position="relative"
        >
          <Line
            data={(Item_Group == 'all') ? data_all : data}
            plugins={[ChartDataLabels]}
            options={optionsLine}
          />
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
          onClick={() => { STS_execRpt_SUM_mthly("Strip") }}
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

ChartExecutiveSummary.propTypes = {
  className: PropTypes.string
};

export default ChartExecutiveSummary;
