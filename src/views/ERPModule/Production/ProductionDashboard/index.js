import React, { useState } from 'react';
import { Card, Container, Grid, Typography } from '@mui/material';
import Page from 'src/components/Page';
import API from 'src/views/components/API';
import moment from "moment";
import DataTable from 'src/components/DataTable';
import styles from './ProductionDashboard.module.css';

moment.locale("th");

const ProductionDashboard = () => {
  const [date, setDate] = React.useState(new Date());
  const [ProductionDashboardP, setProductionDashboardP] = useState([])
  const [ProductionDashboardW, setProductionDashboardW] = useState([])

  const columns = [
    { title: 'Station', field: 'Station', minWidth: 200 },
    { title: 'Qty Today (PCS)', field: 'Qty Today (PCS)', type: 'numeric' },
    { title: 'Qty MTD (PCS)', field: 'Qty MTD (PCS)', type: 'numeric' },
    { title: 'Qty Today (Ton)', field: 'Qty Today (Ton)', type: 'numeric' },
    { title: 'Qty MTD (Ton)', field: 'Qty MTD (Ton)', type: 'numeric' },
  ].map((column) => ({
    ...column,
    headerStyle: { padding: '0.1' },
    cellStyle: { padding: '0.1' },
  }));

  const rowStyle = () => ({
    fontSize: 12,
    padding: 0,
    width: 500,
    fontFamily: 'sans-serif'
  });


  const tick = () => {
      setTimeout(() => {
      API.get(`API_ExecutiveReport/data.php?load=ProductionDashboardP`)
        .then(res => {
          setProductionDashboardP(res.data)
        })
        API.get(`API_ExecutiveReport/data.php?load=ProductionDashboardW`)
        .then(res => {
          setProductionDashboardW(res.data) 
        })
        
      setDate(new Date());
    }, 2000);
  }

  React.useEffect(() => {
      tick()
      var timerID = setInterval(() => tick(), 600000);
      

      return function cleanup() {
        clearInterval(timerID);
      };
  }, [])

 
  return (
    <Page
      className={styles.root}
      title="Dashboard"
    >
      {/* <Button onClick={() => convertToJsonFormat(datafromapi)}>123</Button> */}

      <Container maxWidth={false}>
        <Grid
          container
          spacing={1}
        >
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card
              spacing={1}
            >
              <Grid
                container
                spacing={1}
              >
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Typography color="textPrimary" gutterBottom variant="h4" >
                    Production Index 
                  </Typography>
                  <Typography color="textPrimary" gutterBottom variant="h5" >
                    {moment().format('YYYY-MM-DD HH:mm:ss')} 
                    {/* เวลา {date.toLocaleTimeString()} */}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <Card>
              <Grid
                container
                spacing={1}
              >
                <DataTable
                  title={"ปู่เจ้า"}
                  columns={columns}
                  data={ProductionDashboardP}
                  maxBodyHeight="70vh"
                  search={false}
                  sorting
                  rowStyle={rowStyle}
                />
              </Grid>
            </Card>
          </Grid>

          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <Card>
              <Grid
                container
                spacing={1}
              >
                <DataTable
                  title={"วังน้อย"}
                  columns={columns}
                  data={ProductionDashboardW}
                  maxBodyHeight="70vh"
                  search={false}
                  sorting
                  rowStyle={rowStyle}
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ProductionDashboard;
