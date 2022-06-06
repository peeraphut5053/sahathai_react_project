import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CardReportProductFinish from './CardReportProductFinish';
import LatestProducts from './LatestProducts';
import ChartExecutiveSummary from './ChartExecutiveSummary';
import CardReportProductionDaily from './CardReportProductionDaily';
import TableExecutiveSummary from './TableExecutiveSummary';
import CardReportProductFromming from './CardReportProductFromming';
import CardAppProductionOvertime from './CardAppProductionOvertime';
import PieChartExecutiveSummary from './PieChartExecutiveSummary';
import PieChartExecutiveSummary2 from './PieChartExecutiveSummary2';
import clsx from 'clsx';
import { isMobile } from "react-device-detect";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2)
  }
}));

const ExecutiveReport = () => {
  const classes = useStyles();

  useEffect(() => {

    
    if (isMobile == true) {

      setTimeout(() => {
        document.documentElement.webkitRequestFullScreen();
      }, 5000);
    }
  }, [])

 


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      {/* {isMobile ? <h2>Mobile</h2> : <h2>Desktop</h2>} */}

      <Container maxWidth={false}>
        <Grid item lg={12}>
          <Grid container spacing={2}>
            <Grid item sm={6} xl={3} xs={12} lg={3} >
              <CardReportProductFromming />
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3}>
              <CardReportProductFinish />
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3}>
              <CardReportProductionDaily />
            </Grid>
            <Grid item sm={6} xl={3} xs={12} lg={3}>
              <CardAppProductionOvertime />
            </Grid>
            {/* <Grid item xs={12}>
                <CardNext />
              </Grid> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item sm={6} xl={6} xs={12} lg={6} >
            <TableExecutiveSummary />
          </Grid>
          <Grid item sm={6} xl={6} xs={12} lg={6} >
            <ChartExecutiveSummary />
          </Grid>
          <Grid item sm={6} xl={6} xs={12} lg={6} >
            <Card
            // className={clsx(classes.root, className)}
            // {...rest}
            >
              <CardContent>
                <CardHeader title="Coil Received(MT) & Steel Pipe Delivery(MT)" />
                <Divider />
                <Grid container spacing={2} >
                  <Grid item sm={6} xl={6} xs={6} lg={6} >
                    <PieChartExecutiveSummary />
                  </Grid>
                  <Grid item sm={6} xl={6} xs={6} lg={6} >
                    <PieChartExecutiveSummary2 />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>


          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12} >
            <LatestProducts />
          </Grid> */}
          <Grid item sm={6} xl={6} xs={12} lg={6}  >
            <LatestProducts />
          </Grid>




        </Grid>
      </Container>
    </Page>
  );
};

export default ExecutiveReport;
