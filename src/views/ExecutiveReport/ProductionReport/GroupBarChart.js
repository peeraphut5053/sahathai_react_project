import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';
import API from 'src/views/components/API';
import moment from 'moment';
import DateMonthPicker from 'src/views/components/Input/CDateMonthPicker';
import PieChart from './PieChart';
import ModalManagementFullPage from 'src/views/components/ModalManagementFullPage';
import TableDetail from './TableDetail';
import TableDailyWorkCenter from './TableDailyWorkCenter';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FactoryIcon from '@mui/icons-material/Factory';
import InsightsIcon from '@mui/icons-material/Insights';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ParetoChart from './ParetoChart';
import TableFormingStop from './TableFormingStop';
import { addComma } from 'src/utils/getInitials';

const label = [
  {
    value: ["P2FM01", "P2FM05", "P2FM06", "P2FM08", "P2FM09", "P2FM10", "W2FM02", "W2FM04", "W2FM07", "W2FM11", "W2FMC1"],
    label: 'Forming'
  },
  {
    value: ["P1SL03", "P1SL05", "W1SL04"],
    label: 'Slit'
  },
  {
    value: ["P5HTF2", "P5HTF5", "P5HTO1", "P5HF10", "P5HTO2", "W5HT02", "W5HT04", "W5HT06"],
    label: 'HydroTest'
  },
  {
    value: ["P6GL01"],
    label: 'Galvanize'
  },
  {
    value: ["P6PT01",
      "P6PT0A",
      "P6PT0B",
      "P6PT0C"],
    label: 'Painting'
  },
  {
    value: ["P6TH01", "P6TH02", "P6TH03", "P6TH05"],
    label: 'Threading'
  },
  {
    value: ["P6RG01", "P6RG02", "W6RG02"],
    label: 'Groove'
  },
  {
    value: ["P6CT01", "P6CT02", "P6CT03", "P6CT04", "W6CT01"],
    label: 'Cuting'
  },
  {
    value: ["P7PK00", "P7PKP1", "P7PKPA", "P7PKPB", "P7PKPC", "W7PK01"],
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

const supportBlue = '#00a4d8';
const accentRed = '#ef3124';

const ReportCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  borderRadius: 8,
  boxShadow: `0 18px 42px ${alpha('#253746', 0.10)}`,
  overflow: 'hidden'
}));

const HeaderSurface = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.10)} 0%, ${alpha(supportBlue, 0.10)} 54%, ${alpha(accentRed, 0.06)} 100%)`,
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'minmax(260px, 1fr) auto',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    alignItems: 'stretch',
    gridTemplateColumns: '1fr'
  }
}));

const TitleIcon = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${supportBlue} 100%)`,
  borderRadius: 8,
  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.22)}`,
  color: '#ffffff',
  display: 'flex',
  flexShrink: 0,
  height: 46,
  justifyContent: 'center',
  width: 46
}));

const ControlSurface = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha('#ffffff', 0.86),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
  borderRadius: 8,
  boxShadow: `0 10px 24px ${alpha('#253746', 0.08)}`,
  display: 'flex',
  gap: theme.spacing(1.25),
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'stretch',
    flexDirection: 'column'
  }
}));

const SummaryStrip = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
  marginTop: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}));

const SummaryTile = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tileColor'
})(({ theme, tileColor }) => ({
  backgroundColor: alpha(tileColor, 0.09),
  border: `1px solid ${alpha(tileColor, 0.20)}`,
  borderLeft: `4px solid ${tileColor}`,
  borderRadius: 8,
  padding: theme.spacing(1.1, 1.25)
}));

const ChartPane = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.035)} 0%, #ffffff 48%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  borderRadius: 8,
  minHeight: 430,
  padding: theme.spacing(1.5)
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1)
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'space-between',
  margin: theme.spacing(2.5, 0, 1.5),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
}));

const GroupToolbar = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.035),
  borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.10)}`,
  padding: theme.spacing(1.5, 2)
}));

const PercentChip = styled(Chip)(({ theme }) => ({
  borderColor: alpha(theme.palette.primary.main, 0.18),
  borderRadius: 8,
  fontWeight: 800,
  height: 32,
  '.MuiChip-label': {
    paddingLeft: 10,
    paddingRight: 10
  }
}));



const GroupBarChart = ({ className, ...rest }) => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [groupBy, setGroupBy] = useState('Forming');
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
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
        console.log('currentMonth', currentMonth);

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

  const renderUiTime = () => (
    times.map((item, index) => (
      <Grid item xs={4} key={index}>
        <PieChart data={item} />
      </Grid>
    ))
  );

  const times = unique.map((item) => {
    const data1 = data?.res.filter((item1) => item1.wc === item);
    const totalTimes = sumTimes(data1?.map((item) => item.work_hour));
    const breakTimes = sumTimes(data1?.map((item) => item.stop_hour));
    const realTime = sumTimes(data1?.map((item) => {
      // If work_hour < stop_hour, use work_hour, else use TOT_work_hour
      // ถ้า work_hour < stop_hour ใช้ช่อง work_hour else TOT_work_hour
      const hourToUse = item.work_hour < item.stop_hour ? item.work_hour : item.TOT_work_hour;

      // Assuming the hours are already in "HH:MM:SS" format
      return hourToUse;
    }));

    return { wc: item, totalTimes, breakTimes, realTime };
  });

  function sumTimes(times) {
    if (!times || times.length === 0) {
      return '00:00';
    }
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
        backgroundColor: theme.palette.primary.main,
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
        backgroundColor: supportBlue,
        borderWidth: 1
      },
      {
        label: 'C',
        data: result.map((item) => (item.sumC / 1000).toFixed(2)),
        backgroundColor: accentRed,
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

  const sumA = result.reduce((sum, item) => sum + item.sumA, 0) / 1000;
  const sumB = result.reduce((sum, item) => sum + item.sumB + item.sumC, 0) / 1000;

  const percentageDif = result.map((item) => {
    if (!item.sumA) {
      return 0;
    }
    const sumA = (item.sumA + item.sumB + item.sumC) / 1000;
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
      <ReportCard className={className} {...rest}>
        <HeaderSurface>
          <Box>
            <Stack alignItems="center" direction="row" spacing={1.5}>
              <TitleIcon>
                <FactoryIcon fontSize="small" />
              </TitleIcon>
              <Box>
                <Typography color="textPrimary" variant="h4">
                  Group Production Report
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Compare Grade A output, B+C hold volume, and machine working time by work center.
                </Typography>
              </Box>
            </Stack>
            <SummaryStrip>
              <SummaryTile tileColor={theme.palette.primary.main}>
                <Typography color="textSecondary" variant="caption">
                  Total A
                </Typography>
                <Typography sx={{ color: theme.palette.primary.main, fontWeight: 900, lineHeight: 1.15 }} variant="h4">
                  {addComma(sumA ? sumA : 0)} Tons
                </Typography>
              </SummaryTile>
              <SummaryTile tileColor={accentRed}>
                <Typography color="textSecondary" variant="caption">
                  Total B+C
                </Typography>
                <Typography sx={{ color: accentRed, fontWeight: 900, lineHeight: 1.15 }} variant="h4">
                  {addComma(sumB ? sumB : 0)} Tons
                </Typography>
              </SummaryTile>
            </SummaryStrip>
          </Box>
          <ControlSurface>
            <Box sx={{ minWidth: 220 }}>
              <DateMonthPicker
                label="Month"
                name="month"
                value={month}
                onChange={(e) => setMonth(moment(e).format('YYYY-MM'))}
              />
            </Box>
            <Button
              color="error"
              endIcon={<ArrowRightIcon />}
              size="small"
              sx={{ borderRadius: 1.5, fontWeight: 900, height: 40, px: 1.75, whiteSpace: 'nowrap' }}
              variant="contained"
              onClick={() => setOpenDetail(true)}
            >
              Daily Report
            </Button>
          </ControlSurface>
        </HeaderSurface>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ChartPane>
                <ChartHeader>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <QueryStatsIcon sx={{ color: theme.palette.primary.main }} fontSize="small" />
                    <Typography color="textPrimary" fontWeight={900} variant="subtitle1">
                      Grade A Output
                    </Typography>
                  </Stack>
                  <Typography color="textSecondary" variant="caption">
                    Tons by work center
                  </Typography>
                </ChartHeader>
                <Box
                  height={375}
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
              </ChartPane>
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartPane>
                <ChartHeader>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <InsightsIcon sx={{ color: supportBlue }} fontSize="small" />
                    <Typography color="textPrimary" fontWeight={900} variant="subtitle1">
                      B+C Volume
                    </Typography>
                  </Stack>
                  <Typography color="textSecondary" variant="caption">
                    Stacked hold volume
                  </Typography>
                </ChartHeader>
                <Box
                  height={375}
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
              </ChartPane>
            </Grid>
          </Grid>
        </CardContent>
        <GroupToolbar>
          <Stack spacing={1.5}>
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
              {unique.map((item, index) => (
                <PercentChip
                  key={item}
                  label={`${item}: ${percentageDif[index]}%`}
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: alpha(accentRed, 0.06),
                    color: percentageDif[index] > 0 ? accentRed : theme.palette.text.secondary
                  }}
                />
              ))}
            </Stack>
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
              {group.map((item) => {
                const selected = item.value === groupBy;
                return (
                  <Button
                    key={item.value}
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    sx={{
                      backgroundColor: selected ? theme.palette.primary.main : '#ffffff',
                      borderColor: selected ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.22),
                      borderRadius: 1.5,
                      color: selected ? '#ffffff' : theme.palette.primary.main,
                      fontWeight: 900,
                      minHeight: 34,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: selected ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.08),
                        borderColor: theme.palette.primary.main
                      }
                    }}
                    variant="outlined"
                    onClick={() => setGroupBy(item.value)}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        </GroupToolbar>
      </ReportCard>
      <SectionHeader>
        <Stack alignItems="center" direction="row" spacing={1}>
          <TitleIcon sx={{ height: 38, width: 38 }}>
            <AccessTimeIcon fontSize="small" />
          </TitleIcon>
          <Box>
            <Typography color="textPrimary" variant="h4">
              Working Hours of Machines
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Running time, break time, and stop Pareto for {groupBy}.
            </Typography>
          </Box>
        </Stack>
        <Chip
          color="primary"
          icon={<CalendarMonthIcon />}
          label={moment(month).format('MMM YYYY')}
          sx={{ borderRadius: 1.5, fontWeight: 900 }}
          variant="outlined"
        />
      </SectionHeader>
      <Box>
        <Grid container spacing={2}>
          {/* Grid ฝั่งซ้าย */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              {!isLoading &&
                times.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <PieChart data={item} />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* Grid ฝั่งขวา */}
          <Grid item xs={12} lg={6}>
            <ParetoChart month={month} group={groupBy} />
          </Grid>
        </Grid>
        <TableFormingStop data={data} month={month} group={groupBy} wc={unique} />
      </Box>
    </>
  );
};

export default GroupBarChart;
