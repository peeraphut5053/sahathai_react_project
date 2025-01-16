import React, { useState } from 'react';
import { useQuery } from "react-query";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Page from 'src/components/Page';
import API from 'src/views/components/API';
import moment from 'moment';
import ModalManagement from 'src/views/components/ModalManagement';
import BuildIcon from '@material-ui/icons/Build';
import WorkCenterStatus from './WorkCenterStatus';
import { addComma } from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2)
  },
  title: {
    borderBottom: `3px solid #3f51b5`,
    paddingBottom: theme.spacing(1),
    fontFamily: 'Roboto',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3f51b5',
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
    "&:hover": {
      cursor: 'pointer',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      transition: '0.3s ease',
      transform: 'scale(1.05)',
    },
    // how to write responsive css in material-ui v4
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    }
  },
  box: {
    padding: '15px 5px 15px 5px',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '13px',
    fontFamily: 'Sans-serif',
    border: '1px solid #000',
    boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
    "&:hover": {
      cursor: 'pointer',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      transform: 'scale(1.05)',
    },
    // how to write responsive css in material-ui v4
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    }
  },
  group: {
    borderBottom: `3px solid #3f51b5`,
    paddingBottom: theme.spacing(1),
    display: 'flex',
  },
  '@keyframes rotation': {  // กำหนด keyframes
    'from': {
      transform: 'rotate(0deg)',
    },
    'to': {
      transform: 'rotate(360deg)',
    },
  },
  rotating: {  // class ที่จะใช้ animation
    animation: '$rotation 10s infinite linear',
    // '$' คือการอ้างอิงไปที่ keyframes ที่เรากำหนดด้านบน
  },
}));

const label = [
  {
    value: ["P2FM01", "P2FM05", "P2FM06", "P2FM08", "P2FM09", "W2FM02", "W2FM04", "W2FM07", "W2FMC1"],
    name: [["P2FM01", "สถานี Forming 01"], ["P2FM05", "สถานี Forming 05"], ["P2FM06", "สถานี Forming 06"], ["P2FM08", "สถานี Forming 08"], ["P2FM09", "สถานี Forming 09"], ["W2FM02", "สถานี Forming 02"], ["W2FM04", "สถานี Forming 04"], ["W2FM07", "สถานี Forming 07"], ["W2FMC1", "สถานีตัวซีเครื่อง 1"]],
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
    name: [["P6CT01", "สถานีตัดแบ่งความยาว No.1"], ["P6CT02", "สถานีตัดแบ่งความยาว No.2"], ["P6CT03", "สถานีตัดแบ่งความยาว No.3 เลเซอร์"], ["W6CT01", "สถานีตัดท่อ"]],
    label: 'Cuting'
  },
  {
    value: ["P7PK00", "P7PKP1", "P7PKPB", "P7PKPC", "W7PK01"],
    name: [["P7PK00", "สถานีแพ๊ค"], ["P7PKP1", "สถานีแพ๊ค ท้ายเครื่องพ่นสี 1"], ["P7PKPB", "สถานีแพ๊คท้ายเครื่องพ่นสี PB"], ["P7PKPC", "สถานีแพ๊คท้ายเครื่องพ่นสี PC"], ["W7PK01", "สถานีแพ็ควังน้อย"]],
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
    return { wc: item, name: forming.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: packing.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: threading.name[index][1], sum: Number(sumA).toFixed(2), piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: cutting.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: groove.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: hydro.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: slit.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: painting.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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
    return { wc: item, name: galvanize.name[index][1], sum: Number(sumA).toFixed(2),piece: Number(piece).toFixed(2), status: status?.status || 'red', reason: status?.reason_description || '', time: status?.time_stopped || '', size: status?.size || '' };
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

  const classes = useStyles();
  
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <ModalManagement open={open} onClose={() => setOpen(false)} modalDetail={<WorkCenterStatus wc={workCenter.wc} status={workCenter.status} sum={workCenter.sum} piece={workCenter.piece}  reason={workCenter.reason} name={workCenter.name} time={workCenter.time} size={workCenter.size} onClose={() => setOpen(false)} />} />
      <Container maxWidth={false}>
        <Typography className={classes.title} align='center' variant="h1" gutterBottom>
          Work Center
        </Typography>
        {isLoading ? <Box height={'50vh'} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box> : (
          <>
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={12} md={1}>
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#ffb200' }} variant="h5" gutterBottom>
                  Slit
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {sl?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(slMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {sl?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#cc0000' }} variant="h5" gutterBottom>
                  Forming
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {fm?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(fmMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {fm?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#0051ff' }} variant="h5" gutterBottom>
                  HydroTest
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {ht?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(htMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {ht?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#009933' }} variant="h5" gutterBottom>
                  Galvanize
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {ga?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(gaMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {ga?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#9900cc' }} variant="h5" gutterBottom>
                  Painting
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {pt?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(ptMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {pt?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#cccc00' }} variant="h5" gutterBottom>
                  Threading
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {th?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(thMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {th?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#3f51b5' }} variant="h5" gutterBottom>
                  Groove
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {gr?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(grMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {gr?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#00ffff' }} variant="h5" gutterBottom>
                  Cutting
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {ct?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(ctMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {ct?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
                <Typography className={classes.group} style={{ padding: 20, borderColor: '#663300' }} variant="h5" gutterBottom>
                  Packing
                </Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {pk?.reduce((prev, current) => prev + Number(current.sum), 0).toFixed(2)} Mt</div>
                    <div>M: {addComma(pkMonth?.reduce((prev, current) => prev + current, 0).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
              {!isLoading && (
                <>
                  {pk?.map((item, index) => (
                    <Grid key={index} item xs={3} md={1}>
                      <Paper onClick={() => { setOpen(true); setWorkCenter(item) }} className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.status === 'red' ? '#ff4d4d' : item.status === 'yellow' ? ' #ffff66' : '#66ff99' }} variant="outlined" square>
                        {item.wc} {item.status === 'green' && <SettingsIcon className={item.status == 'green' ? classes.rotating : ''} />} {item.status === 'red' && <SettingsIcon />} {item.status === 'yellow' && <BuildIcon style={{ paddingLeft: '3px' }} />}
                      </Paper>
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
              <Typography className={classes.group} style={{ padding: 20, borderColor: '#663300' }} variant="h5" gutterBottom>
                Total
              </Typography>
            </Grid>
            <Grid item xs={3} md={1}>
                <Paper className={classes.box} style={{ fontWeight: '300', borderRadius: 10 }} variant="outlined" square>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>D: {(total).toFixed(2)} Mt</div>
                    <div>M: {addComma((totalMonth).toFixed(2))} Mt</div>
                  </div>
                </Paper>
              </Grid>
            <Grid item xs={3} md={1}>
              <Paper className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: '#66ff99' }} variant="outlined" square>
                <span style={{ fontWeight: 'bold' }}>{green}</span> <SettingsIcon style={{ paddingLeft: '3px' }} className={classes.rotating} />
              </Paper>
            </Grid>
            <Grid item xs={3} md={1}>
              <Paper className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: '#ffff66' }} variant="outlined" square>
                <span style={{ fontWeight: 'bold' }}>{yellow}</span> <BuildIcon style={{ paddingLeft: '3px' }} />
              </Paper>
            </Grid>
            <Grid item xs={3} md={1}>
              <Paper className={classes.paper} style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: '#ff4d4d' }} variant="outlined" square>
                <span style={{ fontWeight: 'bold' }}>{red}</span> <SettingsIcon style={{ paddingLeft: '3px' }} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default Dashboard;

