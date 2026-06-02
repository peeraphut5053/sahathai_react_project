import React, { useState } from 'react';
import { useQuery } from "react-query";
import Select from 'react-select';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import API from 'src/views/components/API';
import moment from 'moment';
import ModalManagementFullPage from 'src/views/components/ModalManagementFullPage';
import TableDailyReport from './TableDailyReport';
import CYearPicker from 'src/views/components/Input/CYearPicker';
import LineCard from './LineCard';
import { useTheme } from '@mui/material';
import TableProduction from './TableProduction';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import DateTimePicker from 'src/views/components/Input/CDatePicker';
import TableGroupDetail from './TableGroupDetail';
import { alpha, styled } from '@mui/material/styles';

const ReportCard = styled(Card)(({ theme }) => ({
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,252,0.98) 100%)',
  border: `1px solid ${alpha(theme.palette.info.main, 0.12)}`,
  borderRadius: 8,
  boxShadow: `0 18px 38px ${alpha(theme.palette.info.main, 0.10)}`,
  overflow: 'hidden',
}));

const ReportHeader = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background:
    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, rgba(255,255,255,0.96) 46%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
  borderBottom: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2.25),
  [theme.breakpoints.down('md')]: {
    alignItems: 'stretch',
    flexDirection: 'column',
  }
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
  borderRadius: 8,
  color: theme.palette.primary.dark,
  display: 'flex',
  height: 46,
  justifyContent: 'center',
  width: 46,
}));

const ControlSurface = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background:
    `linear-gradient(180deg, ${alpha('#ffffff', 0.98)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.16)}`,
  borderRadius: 8,
  boxShadow: `0 10px 24px ${alpha(theme.palette.info.main, 0.08)}`,
  display: 'flex',
  gap: theme.spacing(1),
  minHeight: 64,
  padding: theme.spacing(1.15, 1.25),
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  }
}));

const ChartStage = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.info.main, 0.08)}`,
  borderRadius: 8,
  display: 'flex',
  height: 420,
  justifyContent: 'center',
  position: 'relative',
}));

const MonthSummaryPanel = styled(Card)(({ theme }) => ({
  background:
    `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, rgba(255,255,255,0.98) 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
  borderRadius: 8,
  boxShadow: 'none',
  height: '100%',
}));

const ActionRail = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  borderTop: `1px solid ${alpha(theme.palette.info.main, 0.08)}`,
  display: 'flex',
  gap: theme.spacing(1.5),
  justifyContent: 'space-between',
  padding: theme.spacing(1.75, 2),
  [theme.breakpoints.down('md')]: {
    alignItems: 'stretch',
    flexDirection: 'column',
  }
}));

const label = [
  {
    value: ["P2FM01", "P2FM05", "P2FM06", "P2FM08", "P2FM09","P2FM10", "W2FM02", "W2FM04", "W2FM07", "W2FM11", "W2FMC1"],
    name: [["P2FM01", "สถานี Forming 01"], ["P2FM05", "สถานี Forming 05"], ["P2FM06", "สถานี Forming 06"], ["P2FM08", "สถานี Forming 08"], ["P2FM09", "สถานี Forming 09"],["P2FM10", "สถานี Forming 10"], ["W2FM02", "สถานี Forming 02"], ["W2FM04", "สถานี Forming 04"], ["W2FM07", "สถานี Forming 07"],["W2FM11", "สถานี Forming 11 วังน้อย"], ["W2FMC1", "สถานีตัวซีเครื่อง 1"]],
    label: 'Forming'
  },
  {
    value: ["P1SL03", "P1SL05", "W1SL04"],
    name: [["P1SL03", "สถานี Slit 03"], ["P1SL05", "สถานี Slit 05"], ["W1SL04", "สถานี Slit 04 วังน้อย"]],
    label: 'Slit'
  },
  {
    value: ["P5HTF2", "P5HTF5", "P5HTO1", "P5HTO2", "W5HT02", "W5HT04", "W5HT06"],
    name: [["P5HTF2", "สถานีเทสน้ำ F2"], ["P5HTF5", "สถานีเทสน้ำ F5"], ["P5HTO1", " สถานีเทสน้ำ O1 A6"], ["P5HTO2", "สถานีเทสน้ำ O2 A6"], ["W5HT02", "สถานีเทสน้ำ 02 วังน้อย"], ["W5HT04", "สถานีเทสน้ำ 04 วังน้อย"], ["W5HT06", "สถานีเทสน้ำ 06 วังน้อย"]],
    label: 'HydroTest'
  },
  {
    value: ["P6GL01"],
    name: [["P6GL01", "สถานีชุป 01"]],
    label: 'Galvanize'
  },
  {
    value: ["P6PT01",
      "P6PT0B",
      "P6PT0C"],
    name: [["P6PT01", "สถานีพ่นสี 01"], ["P6PT0B", "สถานีพ่นสี B"], ["P6PT0C", "สถานีพ่นสี C"]],
    label: 'Painting'
  },
  {
    value: ["P6TH01", "P6TH02", "P6TH03", "P6TH05"],
    name: [["P6TH01", "สถานนีต๊าป 01"], ["P6TH02", "สถานนีต๊าป 02"], ["P6TH03", "สถานนีต๊าป 03"], ["P6TH05", "สถานนีต๊าป 05"]],
    label: 'Threading'
  },
  {
    value: ["P6RG01", "P6RG02", "W6RG02"],
    name: [["P6RG01", "สถานี Groove 1"], ["P6RG02", "สถานี Groove 2"], ["W6RG02", "สถานี Groove 2 วังน้อย"]],
    label: 'Groove'
  },
  {
    value: ["P6CT01", "P6CT02", "P6CT03", "W6CT01"],
    name: [["P6CT01", "สถานีตัดแบ่งความยาว No.1"], ["P6CT02", " สถานีตัดแบ่งความยาว No.3 เลเซอร์"], ["P6CT03", "สถานีตัดแบ่งความยาว No.3 เลเซอร์"], ["W6CT01", "สถานีตัดท่อ"]],
    label: 'Cuting'
  },
  {
    value: ["P7PK00", "P7PKP1", "P7PKPB", "P7PKPC", "W7PK01"],
    name: [["P7PK00", "สถานีแพ๊ค"], ["P7PKP1", "สถานีแพ๊ค ท้ายเครื่องพ่นสี 1"], ["P7PKPB", "สถานีแพ๊คท้ายเครื่องพ่นสี PB"], ["P7PKPC", "สถานีแพ๊คท้ายเครื่องพ่นสี PC"], ["W7PK01", "สถานีแพ็ควังน้อย"]],
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

const months = ['Main', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Test = ({ className, ...rest }) => {
  const theme = useTheme();
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [currentMonth, setCurrentMonth] = useState(moment().format('M') - 1);
  const [currentData, setCurrentData] = useState([]);
  const [Types, setTypes] = useState('Main');
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [barModal, setBarModal] = useState(false);
  const [groupBy, setGroupBy] = useState('Forming');
  const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
  const [dayEnd, setDayEnd] = useState(moment().format('YYYY-MM-DD'));
  const [grade, setGrade] = useState('sumA');

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


  const { data: data2, isLoading: isLoading2, error: error2 } = useQuery({
    queryKey: ['GroupBarChart', day, dayEnd, groupBy],
    queryFn: async () => {
      try {
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
            load: 'group',
            StartDate: moment(day).format('YYYY-MM-DD'),
            EndDate: moment(dayEnd).format('YYYY-MM-DD'),
            StartLastMonth: moment("2024-09-01").format('YYYY-MM-DD'),
            EndLastMonth: moment("2024-09-30").format('YYYY-MM-DD'),
            GroupBy: groupBy
          }
        });

        const currentMonth = response.data[0].map((item) => {
          return {
            ...item,
            sumA: item.sumA > 0 ? Number(item.sumA) : 0,
            sumB: item.sumB > 0 ? Number(item.sumB) : 0,
            sumC: item.sumC > 0 ? Number(item.sumC) : 0
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
      .reduce((prev, current) => prev + current.sumA, 0).toFixed(2);
    const sumB = data2?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0).toFixed(2);
    const sumC = data2?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0).toFixed(2);
    return { wc: item, sumA, sumB, sumC };
  });

  const color = group.filter((item) => item.value === groupBy)[0]?.color;

  const myData = {
    labels: label.find((item) => item.label === groupBy).name,
    datasets: [
      {
        label: groupBy,
        data: result.map((item) => item?.[grade] / 1000),
        backgroundColor: color,
        borderColor: color,
        barThickness: 40,
        maxBarThickness: 40,
        barPercentage: 1,
        categoryPercentage: 1,
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
    },

  };

  const handleData = (item) => {

    if (item !== 'Main') {
      setTypes(item);
    } else {
      setTypes(item);
      // get number current month
      const currentMonthNumber = moment().format('M') - 1;
      setCurrentMonth(currentMonthNumber);
      const mainData = [
        data?.slit[currentMonthNumber]?.sumA ? (data?.slit[currentMonthNumber].sumA / 1000).toFixed(2) : 0,
        data?.forming[currentMonthNumber]?.sumA ? (data?.forming[currentMonthNumber].sumA / 1000).toFixed(2) : 0,
        data?.hydro[currentMonthNumber]?.sumA ? (data?.hydro[currentMonthNumber].sumA / 1000).toFixed(2) : 0,
        data?.galvanize[currentMonthNumber]?.sumA ? (data?.galvanize[currentMonthNumber].sumA / 1000).toFixed(2) : 0,
        data?.painting[currentMonthNumber]?.sumA ? (data?.painting[currentMonthNumber].sumA / 1000).toFixed(2) : 0,
        data?.threading[currentMonthNumber]?.sumA ? ((data?.threading[currentMonthNumber].sumA || 0 / 1000 + data?.groove[currentMonthNumber].sumA || 0) / 1000).toFixed(2) : 0,
        data?.cuting[currentMonthNumber]?.sumA ? (data?.cuting[currentMonthNumber].sumA / 1000).toFixed(2) : 0,
        data?.packing[currentMonthNumber]?.sumA ? (data?.packing[currentMonthNumber].sumA / 1000).toFixed(2) : 0
      ];
      setCurrentData(mainData);
      
      
      return false;
    }

    const m = moment(item, 'MMM').format('M') - 1;
    const month = Number(m);
    setCurrentMonth(month);
    setCurrentData([
      // if undefined, set to 0
      data.slit[month]?.sumA ? (data?.slit[month].sumA / 1000).toFixed(2) : 0,
      data?.forming[month]?.sumA ? (data?.forming[month].sumA / 1000).toFixed(2) : 0,
      data?.hydro[month]?.sumA ? (data?.hydro[month].sumA / 1000).toFixed(2) : 0,
      data?.galvanize[month]?.sumA ? (data?.galvanize[month].sumA / 1000).toFixed(2) : 0,
      data?.painting[month]?.sumA ? (data?.painting[month].sumA / 1000).toFixed(2) : 0,
      data?.threading[month]?.sumA ? ((data?.threading[month].sumA || 0 / 1000 + data?.groove[month].sumA || 0) / 1000).toFixed(2) : 0,
      data?.cuting[month]?.sumA ? (data?.cuting[month].sumA / 1000).toFixed(2) : 0,
      data?.packing[month]?.sumA ? (data?.packing[month].sumA / 1000).toFixed(2) : 0
    ])
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
    onClick: function () {
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

  const sum = result.reduce((acc, item) => acc + Number(item.sumA), 0);

  const handleYearChange = (year) => {
    const currentYear = moment().format('YYYY');

    if (year > currentYear) {
      return alert('ไม่มีข้อมูลในปีนี้');
    }
    setMonth(year);
  };

  const grades = [
    {
      value: 'sumA',
      label: 'A'
    },
    {
      value: 'sumB',
      label: 'B'
    },
    {
      value: 'sumC',
      label: 'C'
    }
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReportCard className={className} {...rest}>
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
          <ReportHeader>
            <Stack alignItems="center" direction="row" spacing={1.5}>
              <HeaderIcon>
                <InsightsOutlinedIcon />
              </HeaderIcon>
              <Box>
                <Typography sx={{ color: '#102f43', fontSize: 20, fontWeight: 800 }}>
                  Monthly Production Volumes
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Department comparison for Grade A output across the selected year.
                </Typography>
              </Box>
            </Stack>
            <ControlSurface>
              <Chip
                icon={<CalendarMonthOutlinedIcon />}
                label="Year"
                size="small"
                sx={{ fontWeight: 700 }}
              />
              <CYearPicker
                label="Month"
                name="month"
                value={month}
                onChange={(date) => handleYearChange(moment(date).format('YYYY'))}
              />
              <Button
                color="secondary"
                endIcon={<ArrowRightIcon />}
                size="small"
                sx={{
                  alignSelf: 'center',
                  borderRadius: 1.5,
                  fontWeight: 800,
                  height: 40,
                  minWidth: 150,
                  px: 1.75,
                  textTransform: 'uppercase'
                }}
                variant="outlined"
                onClick={() => setOpen(true)}
              >
                Daily Report
              </Button>
            </ControlSurface>
          </ReportHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={9}>
                <ChartStage>
                  {isLoading ? <CircularProgress /> : <LineCard data={data} options={options} currentData={currentData} Types={Types} />}
                </ChartStage>
              </Grid>
              <Grid item xs={12} lg={3}>
                <MonthSummaryPanel>
                  <CardHeader
                    avatar={<FactoryOutlinedIcon color="primary" />}
                    sx={{ textAlign: 'center' }}
                    title={moment().month(currentMonth).format('MMMM')}
                    titleTypographyProps={{ fontWeight: 800 }}
                  />
                  <CardContent sx={{ px: 2.5, py: 2, textAlign: 'center' }}>
                    {!isLoading &&
                      <>
                        <Typography sx={{ color: '#ffb200', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Slit : {data.slit?.length > 0 ? addComma((data?.slit[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                        <Typography sx={{ color: '#cc0000', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Forming : {data.forming?.length > 0 ? addComma((data?.forming[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                        <Typography sx={{ color: '#0051ff', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          HydroTest : {data.hydro?.length > 0 ? addComma((data?.hydro[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                        <Typography sx={{ color: '#009933', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Galvanize : {data.galvanize?.length > 0 ? addComma((data?.galvanize[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                        <Typography sx={{ color: '#9900cc', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Painting : {data.painting?.length > 0 ? addComma((data?.painting[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                        <Typography sx={{ color: '#b4b400', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Threading : {addComma(((data?.threading?.length > 0 ? data?.threading[currentMonth]?.sumA : 0 + data?.groove?.length > 0 ? data?.groove[currentMonth]?.sumA : 0) / 1000).toFixed(2))}
                        </Typography>
                        <Typography sx={{ color: '#00b8c8', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Cuting : {data.cuting?.length > 0 ? addComma((data?.cuting[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                        <Typography sx={{ color: '#663300', fontSize: 18, fontWeight: 800, lineHeight: 1.55 }}>
                          Packing : {data.packing?.length > 0 ? addComma((data?.packing[currentMonth]?.sumA / 1000).toFixed(2)) : 0}
                        </Typography>
                      </>
                    }
                  </CardContent>
                </MonthSummaryPanel>
              </Grid>
            </Grid>
          </CardContent>
          <ActionRail>
            {!isLoading && (
              <>
                <Grid container spacing={1}>
                  {months.map((item, index) => (
                    <Grid item key={index}>
                      <Button
                        sx={{
                          backgroundColor: item === Types ? 'primary.main' : 'transparent',
                          borderColor: item === Types ? 'primary.main' : 'rgba(0, 150, 214, 0.32)',
                          color: item === Types ? '#ffffff' : 'primary.dark',
                          fontWeight: 700,
                          '&:hover': {
                            backgroundColor: item === Types ? 'primary.dark' : 'rgba(0, 150, 214, 0.08)'
                          }
                        }}
                        variant="outlined"
                        endIcon={<ArrowRightIcon />}
                        size="small"
                        onClick={() => handleData(item)}
                      >
                        {item}
                      </Button>
                    </Grid>
                  ))}

                </Grid>
                <Button
                  color="primary"
                  endIcon={<ArrowRightIcon />}
                  size="small"
                  sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                >
                  Overview
                </Button>
              </>
            )}
          </ActionRail>
        </ReportCard>
      </Grid>
      <Grid item xs={12}>
        <ReportCard className={className} {...rest}>
          <ModalManagementFullPage
            open={barModal}
            onClose={() => setBarModal(false)}
            modalDetail={
              <TableGroupDetail day={day} wc={groupBy} />
            }
          />
          <ReportHeader>
            <Stack alignItems="center" direction="row" spacing={1.5}>
              <HeaderIcon>
                <FactoryOutlinedIcon />
              </HeaderIcon>
              <Box>
                <Typography sx={{ color: '#102f43', fontSize: 20, fontWeight: 800 }}>
                  {groupBy} Production Report
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ fontWeight: 800,  }}>
                  Total Production: {sum ? (sum / 1000).toFixed(2) : 0} Tons
                </Typography>
              </Box>
            </Stack>
            <ControlSurface>
              <DateTimePicker
                label="StartDate"
                name="day"
                value={day}
                onChange={(e) => setDay(moment(e).format('YYYY-MM-DD'))}
              />
              <DateTimePicker
                label="EndDate"
                name="day"
                value={dayEnd}
                onChange={(e) => setDayEnd(moment(e).format('YYYY-MM-DD'))}
              />
            </ControlSurface>
          </ReportHeader>
          <CardContent>
            <ChartStage>
              {isLoading2 ? (
                <CircularProgress />
              ) : (
                <Bar data={myData} plugins={[ChartDataLabels]} options={optionsBar} />
              )}
            </ChartStage>
          </CardContent>
          <ActionRail>
            <Grid container spacing={2}>
              {group.map((item) => (
                <Grid item key={item.value}>
                  <Button
                    sx={{
                      backgroundColor: item.value === groupBy ? alpha(item.color, 0.16) : 'transparent',
                      borderColor: item.value === groupBy ? item.color : alpha(item.color, 0.4),
                      color: item.color,
                      fontWeight: 800,
                      '&:hover': {
                        backgroundColor: alpha(item.color, 0.12),
                        borderColor: item.color,
                      }
                    }}
                    variant="outlined"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    onClick={() => setGroupBy(item.value)}
                  >
                    {item.label}
                  </Button>
                </Grid>
              ))}

            </Grid>
            <Box sx={{ minWidth: 130 }}>
              <Select
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              width: '100px',
                            }),
                          }}
                          autosize={true}
                          options={grades}
                          closeMenuOnSelect={true}
                          defaultValue={grades[0]}
                          placeholder="Grade"
                          onChange={(e) => setGrade(e.value)}
                        />
            </Box>
          </ActionRail>
        </ReportCard>
      </Grid>


      {/*<Grid item xs={12}>
    <Card
      className={className}
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
