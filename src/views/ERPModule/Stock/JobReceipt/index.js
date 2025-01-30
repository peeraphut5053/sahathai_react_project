import React from 'react';
import { Container } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import JobRecicpt from './JobRecipt';
import JobMaterial from './JobMaterial';

const ProductionJob = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Container style={{ marginBottom: '5px' }} maxWidth={false}>
      <BottomNavigation
        style={ { marginBottom: '10px', marginTop: '10px' } }
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction style={{ fontWeight: 'bold', fontSize: '20px', color: value === 0 ? 'white' : '#3f51b5', backgroundColor: value === 0 ? '#3f51b5' : 'white'   }} label="JobReceipt"  />
        <BottomNavigationAction style={{ fontWeight: 'bold', fontSize: '20px', color: value === 1 ? 'white' : '#3f51b5', backgroundColor: value === 1 ? '#3f51b5' : 'white'  }} label="JobMaterial" />
      </BottomNavigation>
    
        {value === 0 ? <JobRecicpt /> : <JobMaterial />}

    </Container>
  );
};

export default ProductionJob;