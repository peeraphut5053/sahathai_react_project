import React from 'react';
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


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
    "&:hover": {
      cursor: 'pointer',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      transition: '0.3s ease',
      transform: 'scale(1.05)',
    }
  },
  group: {
    borderBottom: `3px solid #3f51b5`,
    paddingBottom: theme.spacing(1),
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
    name: [["P2FM01", "สถานี Forming 01"], ["P2FM05","สถานี Forming 05"], ["P2FM06", "สถานี Forming 06"], ["P2FM08","สถานี Forming 08"], ["P2FM09", "สถานี Forming 08"], ["W2FM02", "สถานี Forming 02"], ["W2FM04", "สถานี Forming 04"], ["W2FM07", "สถานี Forming 07"], ["W2FMC1", "สถานีตัวซีเครื่อง 1"]],
    label: 'Forming'
  },
  {
    value: ["P1SL03", "P1SL05", "W1SL04"],
    name: [["P1SL03", "สถานี Slit 03"], ["P1SL05", "สถานี Slit 05"], ["W1SL04", "สถานี Slit 04 วังน้อย"]],
    label: 'Slit'
  },
  {
    value: ["P5HTF2", "P5HTF5", "P5HTO1", "P5HTO2", "W5HT02", "W5HT04", "W5HT06"],
    name: [["P5HTF2", "สถานีเทสน้ำ F2"], ["P5HTF5", "สถานีเทสน้ำ F5"], ["P5HTO1"," สถานีเทสน้ำ O1 A6"], ["P5HTO2", "สถานีเทสน้ำ O2 A6"], ["W5HT02","สถานีเทสน้ำ 02 วังน้อย"], ["W5HT04", "สถานีเทสน้ำ 04 วังน้อย"], ["W5HT06", "สถานีเทสน้ำ 06 วังน้อย"]],
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
    name: [["P6TH01","สถานนีต๊าป 01"], ["P6TH02", "สถานนีต๊าป 02"], ["P6TH03", "สถานนีต๊าป 03"], ["P6TH05", "สถานนีต๊าป 05"]],
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

const Dashboard = () => {
  const { data , isLoading, error } = useQuery({
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
  
        const currentMonth = response.data[0].map((item) => {
          return {
            ...item,
            sumA: item.sumA > 0 ? parseInt(item.sumA) : 0,
            sumB: item.sumB > 0 ? parseInt(item.sumB) : 0,
            sumC: item.sumC > 0 ? parseInt(item.sumC) : 0
          };
        });
        return { res: currentMonth };
        
      } catch (error) {
        console.log('error', error);
      }
    },
    refetchInterval: 10000,
    staleTime: 0,
    cacheTime: 10 * 1000,
  });
  
  const forming = label.find(item => item.label === 'Forming').value
  const packing = label.find(item => item.label === 'Packing').value
  const threading = label.find(item => item.label === 'Threading').value
  const cutting = label.find(item => item.label === 'Cuting').value
  const groove = label.find(item => item.label === 'Groove').value
  const hydro = label.find(item => item.label === 'HydroTest').value
  const slit = label.find(item => item.label === 'Slit').value
  const painting = label.find(item => item.label === 'Painting').value
  const galvanize = label.find(item => item.label === 'Galvanize').value

  const fm = forming.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const pk = packing.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const th = threading.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const ct = cutting.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const gr = groove.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const ht = hydro.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const sl = slit.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const pt = painting.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });

  const ga = galvanize.map((item) => {
    const sumA = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumA, 0);
    const sumB = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumB, 0);
    const sumC = data?.res
      .filter((item1) => item1.wc === item)
      .reduce((prev, current) => prev + current.sumC, 0);
    return { wc: item, sum: sumA + sumB + sumC };
  });
  
  
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Typography className={classes.title} align='center' variant="h1" gutterBottom>
          Work Center
        </Typography>
        {isLoading ? <Box height={'50vh'} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress  />
        </Box> : (
          <>
           <Grid
          container
          spacing={1}
        >
        <Grid item xs={12} md={1}>
        <Typography className={classes.group} style={{padding: 20, borderColor: '#ffb200'}} variant="h5" gutterBottom>
           Slit
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {sl?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#cc0000'}} variant="h5" gutterBottom>
           Forming
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {fm?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#0051ff'}} variant="h5" gutterBottom>
           HydroTest
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {ht?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
            <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#009933'}} variant="h5" gutterBottom>
           Galvanize
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {ga?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#9900cc'}} variant="h5" gutterBottom>
           Painting
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {pt?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#cccc00'}} variant="h5" gutterBottom>
           Threading
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {th?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#3f51b5'}} variant="h5" gutterBottom>
           Groove
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {gr?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
          <Typography className={classes.group}  style={{padding: 20, borderColor: '#00ffff'}} variant="h5" gutterBottom>
           Cutting
          </Typography>
        </Grid>
         {!isLoading && (
          <>
          {ct?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
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
        <Typography className={classes.group}  style={{padding: 20, borderColor: '#663300'}} variant="h5" gutterBottom>
           Packing
         </Typography>
        </Grid>
         {!isLoading && (
          <>
          {pk?.map((item, index) => (
            <Grid key={index} item xs={3} md={1}>
             <Paper className={classes.paper} style={{padding: 20 , display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 10, backgroundColor: item.sum > 0 ? '#66ff99' : '#ff4d4d'}} variant="outlined" square>
               {item.wc} <SettingsIcon className={item.sum > 0 ? classes.rotating : ''} />
             </Paper>
            </Grid>
          ))}
          </>
         )}
        </Grid>
          </>
        )}
      </Container>
    </Page>
  );
};

export default Dashboard;
