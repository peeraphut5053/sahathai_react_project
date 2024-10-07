import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CardReportCO from './CardReportCO';
import { isMobile } from "react-device-detect";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2)
  }
}));

const ExecutiveReportSale = () => {
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
            <Grid item sm={12} xl={12} xs={12} lg={12} >
              <CardReportCO />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ExecutiveReportSale;
