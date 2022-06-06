import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import WorkCenterGroup from './WorkCenterGroup';
import API from 'src/views/components/API';
import moment from "moment";

moment.locale("th");


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

const ProductionDashboard = () => {
  const classes = useStyles();

  const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);
  

  const datafromapi =
    [
      {
        title: 'สถานี Slit',
        wc: 'สถานี Slit 01',
        qty: rand,
        wc_group_num: '10'
      },
      {
        title: 'สถานี Slit',
        wc: 'สถานี Slit 02',
        qty: 2,
        wc_group_num: '10'
      },
      {
        title: 'สถานี Forming',
        wc: 'สถานี Forming 01',
        qty: 3,
        wc_group_num: '20'
      },
      {
        title: 'สถานี Forming',
        wc: 'สถานี Forming 02',
        qty: 4,
        wc_group_num: '20'
      },
      {
        title: 'สถานี ดัดทรง',
        wc: 'สถานี ดัดทรง 01',
        qty: 5,
        wc_group_num: '30'
      },
      {
        title: 'สถานี ดัดทรง',
        wc: 'สถานี ดัดทรง 02',
        qty: 6,
        wc_group_num: '30'
      },
      {
        title: 'สถานี ดัดทรง',
        wc: 'สถานี ดัดทรง 01',
        qty: 5,
        wc_group_num: '30'
      },
      {
        title: 'สถานี ดัดทรง',
        wc: 'สถานี ดัดทรง 02',
        qty: 6,
        wc_group_num: '20'
      }
    ]

  const convertToJsonFormat = (datafromapi) => {
    let a = []
    for (let i = 0; i < datafromapi.length; i++) {
      if (i + 1 < datafromapi.length) {


        if (datafromapi[i].wc_group_num == datafromapi[i + 1].wc_group_num) {
          a.push({ title: datafromapi[i].title, detail: [],wc_group_num: datafromapi[i].wc_group_num })


          if (a[i]) {
            for (let j = 0; j < datafromapi.length; j++) {
              a[i].detail.push({ wc: datafromapi[j].wc,qty:100,wc_group_num: datafromapi[j].wc_group_num })
            }
          }

        }
      }



    }
    console.log(a)
  }

  const data = [
    {
      title: 'สถานี Slit',
      detail:
        [
          { wc: 'สถานี Slit 01', qty: 1, wc_group_num: '10' },
          { wc: 'สถานี Slit 02', qty: 2, wc_group_num: '10' },
          { wc: 'สถานี Slit 03', qty: 3, wc_group_num: '10' },
          { wc: 'สถานี Slit 03', qty: 4, wc_group_num: '10' },
          { wc: 'สถานี Slit 03', qty: 5, wc_group_num: '10' },
          { wc: 'สถานี Slit 03', qty: 6, wc_group_num: '10' },
          { wc: 'สถานี Slit 03', qty: 7, wc_group_num: '10' },
        ]
    },
    {
      title: 'สถานี Forming',
      detail:
        [
          { wc: 'สถานี Forming 01', qty: 8, wc_group_num: '20' },
          { wc: 'สถานี Forming 02', qty: 9, wc_group_num: '20' },
          { wc: 'สถานี Forming 03', qty: 10, wc_group_num: '20' },
        ]
    }

  ]





  const [date, setDate] = React.useState(new Date());
  const [data1, setData1] = React.useState(0);


  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 5000);


    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    // API.get(`API_ExecutiveReport/data.php?load=matltran_mst_count_intreval_1&startDate=${moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')}&endDate=${moment('23:59:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')}`)
    //   .then(res => {
    //     console.log(res.data)
    //     setData1(res.data)
    //   })
    setDate(new Date());
  }

  // function callAPI() {



  // }


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Button onClick={() => convertToJsonFormat(datafromapi)}>123</Button>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={1}
        >
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card
              spacing={1}
            // className={clsx(classes.root, className)}
            >
              <Grid
                container
                spacing={1}
              >
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Typography color="textPrimary" gutterBottom variant="h4" >
                    ภาพรวมการผลิต {data1}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom variant="h5" >
                  {moment().format('YYYY-MM-DD HH:mm:ss')} เวลา {date.toLocaleTimeString()}
                  </Typography>
                </Grid>

              </Grid>

            </Card>
          </Grid>

          {
            data.map((x) =>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <WorkCenterGroup
                  workcenter_name={x.title}
                  data={x.detail}
                />
              </Grid>
            )
          }
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='Slit'
              data={[
                { wc: 'สถานี Slit 01', qty: 100 },
                { wc: 'สถานี Slit 02', qty: 200 },
                { wc: 'สถานี Slit 03', qty: 300 },
                { wc: 'สถานี Slit 03', qty: 300 },
                { wc: 'สถานี Slit 03', qty: 300 },
                { wc: 'สถานี Slit 03', qty: 300 },
                { wc: 'สถานี Slit 03', qty: 300 },
              ]}
            />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='Forming'
              data={[
                { wc: 'สถานี Forming 01', qty: 100 },
                { wc: 'สถานี Forming 02', qty: 200 },
                { wc: 'สถานี Forming 03', qty: 300 },
              ]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='ดัดทรง'
              data={[
                { wc: 'สถานี ดัดทรง 01', qty: 100 },
                { wc: 'สถานี ดัดทรง 02', qty: 200 },
                { wc: 'สถานี ดัดทรง 03', qty: 300 },
              ]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='คว้านหัว'
              data={[
                { wc: 'สถานี คว้านหัว 01', qty: 100 },
                { wc: 'สถานี คว้านหัว 02', qty: 200 },
                { wc: 'สถานี คว้านหัว 03', qty: 300 },
              ]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='เทสน้ำ'
              data={[
                { wc: 'สถานี เทสน้ำ 01', qty: 100 },
                { wc: 'สถานี เทสน้ำ 02', qty: 200 },
                { wc: 'สถานี เทสน้ำ 03', qty: 300 },
              ]}
            />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='เคลือบสี'
              data={[
                { wc: 'สถานี เคลือบสี 01', qty: 100 },
                { wc: 'สถานี เคลือบสี 02', qty: 200 },
                { wc: 'สถานี เคลือบสี 03', qty: 300 },
              ]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='Groove'
              data={[
                { wc: 'สถานี Groove 01', qty: 100 },
                { wc: 'สถานี Groove 02', qty: 200 },
                { wc: 'สถานี Groove 03', qty: 300 },
              ]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='ชุบ'
              data={[
                { wc: 'สถานี ชุบ 01', qty: 100 },
                { wc: 'สถานี ชุบ 02', qty: 200 },
                { wc: 'สถานี ชุบ 03', qty: 300 },
              ]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='ตัดแบ่ง'
              data={[
                { wc: 'สถานี ตัดแบ่ง 01', qty: 100 },
                { wc: 'สถานี ตัดแบ่ง 02', qty: 200 },
                { wc: 'สถานี ตัดแบ่ง 03', qty: 300 },
              ]}
            />
          </Grid>


          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <WorkCenterGroup
              workcenter_name='Packing'
              data={[
                { wc: 'สถานี Packing 01', qty: 100 },
                { wc: 'สถานี Packing 02', qty: 200 },
                { wc: 'สถานี Packing 03', qty: 300 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ProductionDashboard;
