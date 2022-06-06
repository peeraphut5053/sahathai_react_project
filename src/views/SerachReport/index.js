import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateSearchReport from './CreateSearchReport';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '95%',
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0)
  }
}));

const SerachReportView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
        <CreateSearchReport />
    </Page>
  );
};

export default SerachReportView;
