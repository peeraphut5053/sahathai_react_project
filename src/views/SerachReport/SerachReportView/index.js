import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
// import SearchPage2 from './SearchPage2';
import CreateSearchReport from '../CreateSearchReport';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(0)
  }
}));

const SerachReportView = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Page
      className={classes.root}
      title="SerachReport"
    >
      <CreateSearchReport />
      {/* <SearchPage2 /> */}
      <Container maxWidth={false}>
        {/* <SearchPage /> */}
        {/* <Toolbar /> */}
        {/* <Box mt={3}>
          <SearchPage />
        </Box> */}

        {/* <Results customers={customers} /> */}
       
        
      </Container>
    </Page>
  );
};

export default SerachReportView;
