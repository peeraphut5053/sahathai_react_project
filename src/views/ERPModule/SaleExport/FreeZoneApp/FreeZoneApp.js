import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import {  useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';

import {
  ImportModule,
  DocumentModule,
  ItemWarehouseModule
} from './components';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid container spacing={0}  >
      <Grid item xs={12} role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
        {value === index && (
          <Box p={3}>{children} </Box>
        )}
      </Grid>
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => { setValue(newValue); };
  const handleChangeIndex = (index) => { setValue(index); };

  return (
    <Grid container spacing={0}  >
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="full width tabs example" >
            <Tab label="Import" {...a11yProps(0)} />
            <Tab label="Document" {...a11yProps(1)} />
            <Tab label="Item Warehouse " {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex} >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ImportModule />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <DocumentModule />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ItemWarehouseModule />
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
}
