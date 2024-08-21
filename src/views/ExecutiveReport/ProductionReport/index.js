import React from 'react'
import Test from './BarChart';
import { Container, Grid, Typography } from '@material-ui/core';
import GroupBarChart from './GroupBarChart';
import { Bar,Line } from 'react-chartjs-2';

const ProductionReport = () => {
  return (
    <Container style={{ marginBottom: '20px' }} maxWidth={false}>
         <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
            Production Chart
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Test />
            </Grid>
            <Grid item xs={12}>
                <GroupBarChart />
            </Grid>
        </Grid>
    </Container>
  )
}

export default ProductionReport;