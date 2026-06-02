import React, { useState } from 'react';
import { useQuery } from "react-query";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FactoryIcon from '@mui/icons-material/Factory';
import InsightsIcon from '@mui/icons-material/Insights';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Page from 'src/components/Page';
import API from 'src/views/components/API';
import moment from 'moment';
import ModalManagement from 'src/views/components/ModalManagement';
import BuildIcon from '@mui/icons-material/Build';
import WorkCenterStatus from './WorkCenterStatus';
import { addComma } from 'src/utils/getInitials';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RootPage = styled(Page)(({ theme }) => ({
  background:
    'linear-gradient(180deg, #edf5f8 0%, #f7fafb 42%, #ffffff 100%)',
  minHeight: '100%',
  paddingBottom: theme.spacing(4.5),
  paddingTop: theme.spacing(3)
}));

const HeaderPanel = styled(Paper)(({ theme }) => ({
  background:
    'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(239,248,251,0.96) 100%)',
  border: '1px solid rgba(15, 54, 84, 0.12)',
  borderRadius: 8,
  boxShadow: '0 18px 44px rgba(15, 54, 84, 0.10)',
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  padding: theme.spacing(2.25, 2.5),
  position: 'relative',
  '&::before': {
    background:
      'linear-gradient(90deg, #00a4d8 0%, #00a4d8 46%, #ef3124 46%, #ef3124 100%)',
    content: '""',
    height: 5,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#102f43',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.85rem',
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1.12,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.45rem',
  }
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  alignItems: 'center',
  background: '#ffffff',
  border: '1px solid rgba(15, 54, 84, 0.11)',
  borderRadius: 8,
  boxShadow: '0 10px 24px rgba(15, 54, 84, 0.08)',
  display: 'grid',
  gap: theme.spacing(1.25),
  gridTemplateColumns: '38px 1fr',
  height: 88,
  padding: theme.spacing(1.5),
}));

const SummaryIcon = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'rgba(0, 132, 168, 0.10)',
  borderRadius: 6,
  color: '#006b86',
  display: 'flex',
  height: 38,
  justifyContent: 'center',
  width: 38,
}));

const StatusChip = styled(Chip)({
  borderRadius: 6,
  fontWeight: 800,
  height: 26,
  '& .MuiChip-icon': {
    fontSize: 17,
    marginLeft: 6,
  }
});

const BoardPanel = styled(Paper)(({ theme }) => ({
  background: 'rgba(255,255,255,0.78)',
  border: '1px solid rgba(15, 54, 84, 0.10)',
  borderRadius: 8,
  boxShadow: '0 16px 38px rgba(15, 54, 84, 0.08)',
  padding: theme.spacing(1.25),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  }
}));

const SectionGrid = styled(Grid)(({ theme }) => ({
  alignItems: 'stretch',
  marginBottom: theme.spacing(0.65),
  '&:last-of-type': {
    marginBottom: 0,
  }
}));

const StatusPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(15, 54, 84, 0.08)',
  boxShadow: '0 10px 24px rgba(15, 54, 84, 0.10)',
  color: '#183247',
  fontWeight: 700,
  minHeight: 64,
  transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 16px 30px rgba(15, 54, 84, 0.18)',
    filter: 'saturate(1.05)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  }
}));

const SummaryPaper = styled(Paper)(({ theme }) => ({
  padding: '14px 8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 64,
  fontSize: '14px',
  fontFamily: 'Roboto, sans-serif',
  color: '#062b45',
  fontWeight: 700,
  lineHeight: 1.38,
  background: 'linear-gradient(180deg, #ffffff 0%, #e2edf5 100%)',
  border: '1px solid rgba(15, 54, 84, 0.28)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 8px 18px rgba(15, 54, 84, 0.12)',
  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 14px 26px rgba(15, 54, 84, 0.14)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  }
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
  borderBottom: 0,
  borderLeft: '6px solid #3f51b5',
  borderRadius: 8,
  background: 'linear-gradient(180deg, #ffffff 0%, #f3f8fb 100%)',
  boxShadow: '0 8px 18px rgba(15, 54, 84, 0.07)',
  color: '#17344c',
  fontSize: '0.95rem',
  fontWeight: 800,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: 0,
  minHeight: 64,
  textTransform: 'uppercase',
}));

const RotatingSettingsIcon = styled(SettingsIcon)({
  animation: `${rotation} 10s infinite linear`,
});

const statusCardStyles = {
  green: {
    background: 'linear-gradient(135deg, #bdf2cd 0%, #55d786 100%)',
    borderColor: '#25b85f',
    color: '#071827',
  },
  yellow: {
    background: 'linear-gradient(135deg, #ffeaa3 0%, #ffbd34 100%)',
    borderColor: '#e49b09',
    color: '#071827',
  },
  red: {
    background: 'linear-gradient(135deg, #ffc7c2 0%, #f25d55 100%)',
    borderColor: '#df352d',
    color: '#071827',
  },
};

const getStatusCardStyle = (status) => statusCardStyles[status] || statusCardStyles.red;

const statusCellBaseStyle = {
  padding: '10px 8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: 10,
};

const renderWorkCenterCardContent = (item) => (
  <>
    <Box display="flex" alignItems="center" justifyContent="center">
      <span>{item.wc}</span>
      {item.status === 'green' && <RotatingSettingsIcon style={{ paddingLeft: '3px' }} />}
      {item.status === 'red' && <SettingsIcon style={{ paddingLeft: '3px' }} />}
      {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
    </Box>
    <Typography
      component="div"
      style={{
        color: '#000000',
        fontSize: 14,
        fontWeight: 800,
        lineHeight: 1.2,
        marginTop: 5,
      }}
    >
      {addComma(Number(item.sum).toFixed(2))} Tons
    </Typography>
  </>
);

const formingWorkCenters = [
  'P2FM01', 'P2FM05', 'P2FM06', 'P2FM08', 'P2FM09', 'P2FM10',
  'W2FM02', 'W2FM04', 'W2FM07', 'W2FM11', 'W2FMC1'
];

const slitWorkCenters = ['P1SL03', 'P1SL05', 'W1SL04'];

const getStatusText = (item, timeDiff) => {
  if (item.status === 'green') {
    return 'Running';
  }

  if (item.status === 'red') {
    return 'Stopped';
  }

  return `${item.reason || 'Waiting'} (${timeDiff} min)`;
};

const normalizeProductionRows = (rows = []) => rows.map((item) => ({
  ...item,
  sumA: item.sumA > 0 ? Number(item.sumA) : 0,
  sumApcs: item.sumApcs > 0 ? Number(item.sumApcs) : 0,
}));

const sumProduction = (rows = []) => rows.reduce(
  (total, item) => total + Number(item.sumA || 0),
  0
);

const renderWorkCenterTooltip = (item) => {
  const timeDiff = item.time?.date ? Math.abs(moment(item.time.date).diff(moment(), 'minutes')) : 0;
  const totalTime = timeDiff + Number(item.totalTime || 0);
  const stopCount = item.status === 'yellow' ? Number(item.totalStop || 0) + 1 : Number(item.totalStop || 0);
  const showPieces = !slitWorkCenters.includes(item.wc);
  const showOperation = formingWorkCenters.includes(item.wc);

  return (
    <Box style={{ maxWidth: 340, minWidth: 300, overflowWrap: 'break-word', padding: '9px 6px' }}>
      <Typography style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>
        {item.wc} ({item.name})
      </Typography>
      <Typography style={{ fontSize: 15, lineHeight: 1.55 }}>
        Status: {getStatusText(item, timeDiff)}
      </Typography>
      <Typography style={{ fontSize: 15, lineHeight: 1.55 }}>
        Stop today: {totalTime} min / {stopCount} times
      </Typography>
      <Typography style={{ fontSize: 15, lineHeight: 1.55 }}>
        Size: {item.size || '-'}
      </Typography>
      <Typography style={{ color: '#8cc5ff', fontSize: 15, fontWeight: 800, lineHeight: 1.55, marginTop: 5, whiteSpace: 'normal' }}>
        Daily Production: {addComma(Number(item.sum).toFixed(2))} Tons
        {showPieces && ` | ${addComma(Number(item.piece).toFixed(2))} Pieces`}
      </Typography>
      {showOperation && (
        <Typography style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.55, marginTop: 5 }}>
          Speed: {item.operationSpeed || '-'} | Operation Time: {item.operationTime || '-'}
        </Typography>
      )}
    </Box>
  );
};

const label = [
  {
    value: ["P2FM01", "P2FM05", "P2FM06", "P2FM08", "P2FM09", "P2FM10", "W2FM02", "W2FM04", "W2FM07", "W2FM11", "W2FMC1"],
    name: [["P2FM01", "สถานี Forming 01"], ["P2FM05", "สถานี Forming 05"], ["P2FM06", "สถานี Forming 06"], ["P2FM08", "สถานี Forming 08"], ["P2FM09", "สถานี Forming 09"], ["P2FM10", "สถานี Forming 10"], ["W2FM02", "สถานี Forming 02"], ["W2FM04", "สถานี Forming 04"], ["W2FM07", "สถานี Forming 07"], ["W2FM11", "สถานี Forming 11 วังน้อย"], ["W2FMC1", "สถานีตัวซีเครื่อง 1"]],
    label: 'Forming'
  },
  {
    value: ["P1SL03", "P1SL05", "W1SL04"],
    name: [["P1SL03", "สถานี Slit 03"], ["P1SL05", "สถานี Slit 05"], ["W1SL04", "สถานี Slit 04 วังน้อย"]],
    label: 'Slit'
  },
  {
    value: ["P5HTF5", "P5HF10", "P5HTO1", "P5HTO2", "W5HT02", "W5HT04", "W5HT06"],
    name: [["P5HTF5", "สถานีเทสน้ำ F5"], ["P5HF10", "สถานีเทสน้ำ F10"], ["P5HTO1", " สถานีเทสน้ำ O1 A6"], ["P5HTO2", "สถานีเทสน้ำ O2 A6"], ["W5HT02", "สถานีเทสน้ำ 02 วังน้อย"], ["W5HT04", "สถานีเทสน้ำ 04 วังน้อย"], ["W5HT06", "สถานีเทสน้ำ 06 วังน้อย"]],
    label: 'HydroTest'
  },
  {
    value: ["P6GL01", "P6GL02"],
    name: [["P6GL01", "สถานีชุป 01"], ["P6GL02", "สถานีชุป 02"]],
    label: 'Galvanize'
  },
  {
    value: ["P6PT01",
      "P6PT0A",
      "P6PT0B",
      "P6PT0C"],
    name: [["P6PT01", "สถานีพ่นสี 01"], ["P6PT0A", "สถานีพ่นสี A"], ["P6PT0B", "สถานีพ่นสี B"], ["P6PT0C", "สถานีพ่นสี C"]],
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
    value: ["P6CT01", "P6CT02", "P6CT03", "P6CT04", "P6CT05", "W6CT01"],
    name: [["P6CT01", "สถานีตัดแบ่งความยาว No.1"], ["P6CT02", "สถานีตัดแบ่งความยาว No.2"], ["P6CT03", "สถานีตัดแบ่งความยาว No.3 เลเซอร์"], ["P6CT04", "สถานีตัดแบ่งความยาว No.4 เลเซอร์"], ["P6CT05", "สถานีตัดแบ่งความยาว No.5 เลเซอร์"], ["W6CT01", "สถานีตัดท่อ"]],
    label: 'Cuting'
  },
  {
    value: ["P7PK00", "P7PKP1", "P7PKPA", "P7PKPB", "P7PKPC", "W7PK01"],
    name: [["P7PK00", "สถานีแพ๊ค"], ["P7PKP1", "สถานีแพ๊ค ท้ายเครื่องพ่นสี 1"], ["P7PKPA", "สถานีแพ๊ค ท้ายเครื่องพ่นสี A"], ["P7PKPB", "สถานีแพ๊คท้ายเครื่องพ่นสี PB"], ["P7PKPC", "สถานีแพ๊คท้ายเครื่องพ่นสี PC"], ["W7PK01", "สถานีแพ็ควังน้อย"]],
    label: 'Packing'
  }
]

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [workCenter, setWorkCenter] = useState({});
  const { data, isLoading, error } = useQuery({
    queryKey: ['WorkCenter'],
    queryFn: async () => {
      try {
        const today = moment();
        const yesterday = today.clone().subtract(1, 'day');
        const previousMonth = today.clone().subtract(1, 'month');
        const startDate = previousMonth.clone().startOf('month');

        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
            load: 'work',
            StartDate: startDate.format('YYYY-MM-DD'),
            EndDate: today.format('YYYY-MM-DD'),
          }
        });

        const productionRows = normalizeProductionRows(response.data[0]);
        const currentDay = productionRows.filter(item => moment(item.date.date).isSame(today, 'day'));
        const yesterdayRows = productionRows.filter(item => moment(item.date.date).isSame(yesterday, 'day'));
        const currentMonth = productionRows.filter(item => moment(item.date.date).isSame(today, 'month'));

        return {
          res: currentDay,
          status: response.data[1],
          month: currentMonth,
          yesterday: yesterdayRows
        };

      } catch (error) {
        console.log('error', error);
      }
    },
    refetchInterval: 30000,
    staleTime: 0,
    cacheTime: 30 * 1000, //  
  });

  const workCenters = ['Forming', 'Packing', 'Threading', 'Cuting', 'Groove', 'HydroTest', 'Slit', 'Painting', 'Galvanize'];
  const [forming, packing, threading, cutting, groove, hydro, slit, painting, galvanize] = workCenters.map(labelName => label.find(item => item.label === labelName));

  const fm = forming.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: forming.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '', operationSpeed: Number(status?.pcs_hr * status?.multiplier / 60).toFixed(0) || '-', operationTime: status?.operationtime };
  });

  const fmMonth = forming.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  })

  const pk = packing.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: packing.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const pkMonth = packing.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  })

  const th = threading.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: threading.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const thMonth = threading.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  })

  const ct = cutting.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: cutting.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const ctMonth = cutting.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  });

  const gr = groove.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: groove.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const grMonth = groove.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  });

  const ht = hydro.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: hydro.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const htMonth = hydro.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  });

  const sl = slit.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: slit.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const slMonth = slit.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  });

  const pt = painting.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: painting.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const ptMonth = painting.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  });

  const ga = galvanize.value.map((item, index) => {
    const sumA = data?.res.filter((item1) => item1.wc === item)[0]?.sumA || 0;
    const piece = data?.res.filter((item1) => item1.wc === item)[0]?.sumApcs || 0;
    const status = data?.status.filter((item1) => item1.wc === item)[0];
    return { wc: item, name: galvanize.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '' };
  });

  const gaMonth = galvanize.value.map((item, index) => {
    const sumA = data?.month
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    return sumA;
  });

  const all = [...fm, ...pk, ...sl, ...ht, ...pt, ...ga, ...gr, ...ct, ...th];
  const total = all.reduce((prev, current) => prev + Number(current.sum), 0);
  const allMonth = [...fmMonth, ...pkMonth, ...slMonth, ...htMonth, ...ptMonth, ...gaMonth, ...grMonth, ...ctMonth, ...thMonth];
  const totalMonth = allMonth.reduce((prev, current) => prev + current, 0);
  const totalYesterday = sumProduction(data?.yesterday);

  const green = all.filter((item) => item.status === 'green').length;
  const yellow = all.filter((item) => item.status === 'yellow').length;
  const red = all.filter((item) => item.status === 'red').length;

  const renderWorkCenterCard = (item, extraStyle = {}) => (
    <Tooltip
      arrow
      enterDelay={250}
      placement="top"
      title={renderWorkCenterTooltip(item)}
    >
      <StatusPaper
        onClick={() => { setOpen(true); setWorkCenter(item) }}
        style={{ ...statusCellBaseStyle, ...getStatusCardStyle(item.status), ...extraStyle }}
        variant="outlined"
        square
      >
        {renderWorkCenterCardContent(item)}
      </StatusPaper>
    </Tooltip>
  );

  const summaryItems = [
    {
      icon: <FactoryIcon fontSize="small" />,
      label: 'Daily Production',
      value: `${addComma(total.toFixed(2))} Mt`,
      supporting: `Yesterday: ${addComma(totalYesterday.toFixed(2))} Mt`,
      color: '#006b86',
      iconBg: 'rgba(0, 132, 168, 0.10)'
    },
    {
      icon: <InsightsIcon fontSize="small" />,
      label: 'Monthly Production',
      value: `${addComma(totalMonth.toFixed(2))} Mt`,
      color: '#3f51b5',
      iconBg: 'rgba(63, 81, 181, 0.10)'
    },
    {
      icon: <SettingsIcon fontSize="small" />,
      label: 'Machine Status',
      color: '#17344c',
      iconBg: 'rgba(23, 52, 76, 0.10)',
      value: (
        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 0.5 }}>
          <StatusChip
            icon={<CheckCircleIcon />}
            label={`${green} Run`}
            size="small"
            sx={{ backgroundColor: '#dff7e8', color: '#087b3f' }}
          />
          <StatusChip
            icon={<WarningAmberIcon />}
            label={`${yellow} Maintenance`}
            size="small"
            sx={{ backgroundColor: '#fff3c7', color: '#986300' }}
          />
          <StatusChip
            icon={<ErrorOutlineIcon />}
            label={`${red} Stop`}
            size="small"
            sx={{ backgroundColor: '#ffe1de', color: '#b42318' }}
          />
        </Stack>
      )
    }
  ];

  return (
    <RootPage

      title="Dashboard"
    >
      <ModalManagement open={open} onClose={() => setOpen(false)} modalDetail={<WorkCenterStatus wc={workCenter.wc} status={workCenter.status} sum={workCenter.sum} piece={workCenter.piece} reason={workCenter.reason} name={workCenter.name} time={workCenter.time} size={workCenter.size} totalTime={workCenter.totalTime} totalStop={workCenter.totalStop} operationSpeed={workCenter.operationSpeed} operationTime={workCenter.operationTime} onClose={() => setOpen(false)} />} />
      <Container maxWidth={false}>
        <HeaderPanel>
          <Stack
            alignItems={{ xs: 'flex-start', md: 'center' }}
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: isLoading ? 0 : 2 }}
          >
            <Box>
              <Title variant="h1">
                Work Center
              </Title>
              <Typography color="textSecondary" sx={{ mt: 0.75 }} variant="body2">
                Real-time production status by station, refreshed every 30 seconds.
              </Typography>
            </Box>
            <Chip
              icon={<AccessTimeIcon />}
              label={moment().format('DD MMM YYYY')}
              sx={{
                backgroundColor: 'rgba(0, 132, 168, 0.10)',
                color: '#006b86',
                fontWeight: 700
              }}
            />
          </Stack>
          {!isLoading && !error && (
            <Grid container spacing={1.25}>
              {summaryItems.map((item) => (
                <Grid item xs={12} md={4} key={item.label}>
                  <SummaryCard variant="outlined">
                    <SummaryIcon sx={{ backgroundColor: item.iconBg, color: item.color }}>
                      {item.icon}
                    </SummaryIcon>
                    <Box>
                      <Typography color="textSecondary" variant="caption">
                        {item.label}
                      </Typography>
                      <Typography component="div" sx={{ color: item.color || '#102f43', fontWeight: 800, lineHeight: 1.2 }}>
                        {item.value}
                      </Typography>
                      {item.supporting && (
                        <Typography color="textSecondary" sx={{ display: 'block', mt: 0.35, fontWeight: 700 }} variant="caption">
                          {item.supporting}
                        </Typography>
                      )}
                    </Box>
                  </SummaryCard>
                </Grid>
              ))}
            </Grid>
          )}
        </HeaderPanel>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Unable to load work center data. Please try again.
          </Alert>
        )}
        {isLoading ? <Box height={'50vh'} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box> : (
          <BoardPanel>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#ffb200' }} variant="h5" gutterBottom>
                  Slit
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {sl?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(slMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {sl?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#cc0000' }} variant="h5" gutterBottom>
                  Forming
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {fm?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(fmMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {fm?.map((item, index) => (
                    <React.Fragment key={item.wc || index}>
                      {index === fm.length - 1 && <Grid item xs={3} md={1}></Grid>}
                      {index === fm.length - 1 && <Grid item xs={3} md={1}></Grid>}
                      <Grid key={index} item xs={3} md={1}>
                        {renderWorkCenterCard(item, { marginBottom: index === fm.length - 1 ? '4px' : '' })}
                      </Grid>
                    </React.Fragment>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#0051ff' }} variant="h5" gutterBottom>
                  HydroTest
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {ht?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(htMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {ht?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#009933' }} variant="h5" gutterBottom>
                  Galvanize
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {ga?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(gaMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {ga?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#9900cc' }} variant="h5" gutterBottom>
                  Painting
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {pt?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(ptMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {pt?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#cccc00' }} variant="h5" gutterBottom>
                  Threading
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {th?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(thMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {th?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#3f51b5' }} variant="h5" gutterBottom>
                  Groove
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {gr?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(grMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {gr?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#00ffff' }} variant="h5" gutterBottom>
                  Cutting
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {ct?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(ctMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {ct?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
            <SectionGrid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#663300' }} variant="h5" gutterBottom>
                  Packing
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {pk?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(pkMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {pk?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      {renderWorkCenterCard(item)}
                    </Grid>
                  ))}
                </>
              )}
            </SectionGrid>
          </BoardPanel>
        )}
      </Container>
    </RootPage>
  );
};

export default Dashboard;

