import React, { useState } from 'react';
import { useQuery } from "react-query";
import {
  Box, CircularProgress, Container, Grid, Paper, Tooltip, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import SettingsIcon from '@mui/icons-material/Settings';
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
    'linear-gradient(180deg, #eef4f8 0%, #f7f9fb 46%, #ffffff 100%)',
  minHeight: '100%',
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(2.5)
}));

const Title = styled(Typography)(({ theme }) => ({
  borderBottom: '1px solid rgba(15, 54, 84, 0.14)',
  paddingBottom: theme.spacing(1.5),
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.65rem',
  fontWeight: 700,
  letterSpacing: 0,
  color: '#14324a',
  marginBottom: theme.spacing(2),
  textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)',
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
  borderBottom: '0',
  borderLeft: '5px solid #3f51b5',
  borderRadius: 8,
  background: 'rgba(255, 255, 255, 0.72)',
  boxShadow: '0 8px 18px rgba(15, 54, 84, 0.07)',
  color: '#17344c',
  fontWeight: 700,
  paddingBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  minHeight: 64,
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
    value: ["P6GL01"],
    name: [["P6GL01", "สถานีชุป 01"]],
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
    value: ["P6CT01", "P6CT02", "P6CT03", "P6CT04", "W6CT01"],
    name: [["P6CT01", "สถานีตัดแบ่งความยาว No.1"], ["P6CT02", "สถานีตัดแบ่งความยาว No.2"], ["P6CT03", "สถานีตัดแบ่งความยาว No.3 เลเซอร์"], ["P6CT04", "สถานีตัดแบ่งความยาว No.4 เลเซอร์"], ["W6CT01", "สถานีตัดท่อ"]],
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
        const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
            load: 'work',
            StartDate: moment().format('YYYY-MM-DD'),
            EndDate: moment().format('YYYY-MM-DD'),
          }
        });
        const date = moment().format('YYYY-MM-DD');

        const currentDay = response.data[0].filter((item) => {
          return moment(item.date.date).format('YYYY-MM-DD') === date;
        });

        const currentMonth = response.data[0].map((item) => {
          return {
            ...item,
            sumA: item.sumA > 0 ? Number(item.sumA) : 0,
            sumApcs: item.sumApcs > 0 ? Number(item.sumApcs) : 0,
          };
        });

        return { res: currentDay, status: response.data[1], month: currentMonth };

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
    return { wc: item, name: forming.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '', totalTime: status?.totalStop || '', totalStop: status?.countStop || '', operationSpeed: status?.operationSpeed, operationTime: status?.operationtime };
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

  const green = all.filter((item) => item.status === 'green').length;
  const yellow = all.filter((item) => item.status === 'yellow').length;
  const red = all.filter((item) => item.status === 'red').length;

  console.log(workCenter, 'workCenter');

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

  return (
    <RootPage

      title="Dashboard"
    >
      <ModalManagement open={open} onClose={() => setOpen(false)} modalDetail={<WorkCenterStatus wc={workCenter.wc} status={workCenter.status} sum={workCenter.sum} piece={workCenter.piece} reason={workCenter.reason} name={workCenter.name} time={workCenter.time} size={workCenter.size} totalTime={workCenter.totalTime} totalStop={workCenter.totalStop} operationSpeed={workCenter.operationSpeed} operationTime={workCenter.operationTime} onClose={() => setOpen(false)} />} />
      <Container maxWidth={false}>
        <Title align='center' variant="h1" gutterBottom>
          Work Center
        </Title>
        {isLoading ? <Box height={'50vh'} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box> : (
          <>
            <Grid
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
            </Grid>
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <GroupTitle style={{ padding: 20, borderColor: '#cc0000' }} variant="h5" gutterBottom>
                  Forming
                </GroupTitle>
              </Grid>
              <Grid item xs={3} md={1}>
                <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" suare>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {fm?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(fmMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </SummaryPaper>
              </Grid>
              {!isLoading && (
                <>
                  {fm?.map((item, index) => (
                    <>
                      {index === fm.length - 1 && <Grid item xs={3} md={1}></Grid>}
                      {index === fm.length - 1 && <Grid item xs={3} md={1}></Grid>}
                      <Grid key={index} item xs={3} md={1}>
                        {renderWorkCenterCard(item, { marginBottom: index === fm.length - 1 ? '4px' : '' })}
                      </Grid>
                    </>
                  ))}
                </>
              )}
            </Grid>
            <Grid
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
            </Grid>
            <Grid
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
            </Grid>
            <Grid
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
            </Grid>
            <Grid
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
            </Grid>
            <Grid
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
            </Grid>
            <Grid
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
            </Grid>
            <Grid
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
            </Grid>
          </>
        )}
        {!isLoading && (
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12} md={1}>
              <GroupTitle style={{ padding: 20, borderColor: '#663300' }} variant="h5" gutterBottom>
                Total
              </GroupTitle>
            </Grid>
            <Grid item xs={3} md={1}>
              <SummaryPaper style={{ fontWeight: '700', borderRadius: 10 }} variant="outlined" square>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>D: {(total).toFixed(2)} Mt</div>
                  <div>M: {addComma((totalMonth).toFixed(2))} Mt</div>
                </div>
              </SummaryPaper>
            </Grid>
            <Grid item xs={3} md={1}>
              <StatusPaper style={{ ...statusCellBaseStyle, ...statusCardStyles.green, flexDirection: 'row' }} variant="outlined" square>
                <span style={{ fontWeight: 'bold' }}>{green}</span> <RotatingSettingsIcon style={{ paddingLeft: '3px' }} />
              </StatusPaper>
            </Grid>
            <Grid item xs={3} md={1}>
              <StatusPaper style={{ ...statusCellBaseStyle, ...statusCardStyles.yellow, flexDirection: 'row' }} variant="outlined" square>
                <span style={{ fontWeight: 'bold' }}>{yellow}</span> <BuildIcon style={{ paddingLeft: '3px' }} />
              </StatusPaper>
            </Grid>
            <Grid item xs={3} md={1}>
              <StatusPaper style={{ ...statusCellBaseStyle, ...statusCardStyles.red, flexDirection: 'row' }} variant="outlined" square>
                <span style={{ fontWeight: 'bold' }}>{red}</span> <SettingsIcon style={{ paddingLeft: '3px' }} />
              </StatusPaper>
            </Grid>
          </Grid>
        )}
      </Container>
    </RootPage>
  );
};

export default Dashboard;

