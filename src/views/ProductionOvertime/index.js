import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import OTReport from './OTReport';
import OTReportDetail from './OTReportDetail';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '95%',
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0)
  }
}));

const ProductionOvertimeView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false} style={{ paddingTop: 10 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={5}>
            <OTReport inModal={'123'} />
          </Grid>
          <Grid item xs={7}>
            <OTReportDetail inModal={'123'} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ProductionOvertimeView;
