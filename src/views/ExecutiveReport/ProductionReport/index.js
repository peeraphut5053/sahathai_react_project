import React from 'react';
import Test from './BarChart';
import { Container, Grid, Typography } from '@material-ui/core';
import GroupBarChart from './GroupBarChart';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ProductionOverTimeTable from './ProductionOverTime';

const ProductionReport = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Container style={{ marginBottom: '20px' }} maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        Production Chart
      </Typography>
      <BottomNavigation
        style={ { marginBottom: '20px' } }
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction style={{ fontWeight: 'bold', fontSize: '20px', color: value === 0 ? 'white' : '#3f51b5', backgroundColor: value === 0 ? '#3f51b5' : 'white'   }} label="Monthly Report"  />
        <BottomNavigationAction style={{ fontWeight: 'bold', fontSize: '20px', color: value === 1 ? 'white' : '#3f51b5', backgroundColor: value === 1 ? '#3f51b5' : 'white'  }} label="Group Report" />
        <BottomNavigationAction style={{ fontWeight: 'bold', fontSize: '20px', color: value === 2 ? 'white' : '#3f51b5', backgroundColor: value === 2 ? '#3f51b5' : 'white'  }} label="Overtime Report" />
      </BottomNavigation>
    
        {value === 0 ? <Test /> : value === 1 ? <GroupBarChart /> : <ProductionOverTimeTable />}

    </Container>
  );
};

export default ProductionReport;
