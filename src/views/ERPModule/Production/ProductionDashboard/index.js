import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import API from 'src/views/components/API';
import moment from "moment";
import MaterialTable from 'material-table'
import tableIcons from './tableIcons'

moment.locale("th");

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

const ProductionDashboard = () => {
  const classes = useStyles();

  const [date, setDate] = React.useState(new Date());
  const [ProductionDashboardP, setProductionDashboardP] = useState([])
  const [ProductionDashboardW, setProductionDashboardW] = useState([])


  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 15000);

    

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    API.get(`API_ExecutiveReport/data.php?load=ProductionDashboardP`)
      .then(res => {
        setProductionDashboardP(res.data)
      })
      API.get(`API_ExecutiveReport/data.php?load=ProductionDashboardW`)
      .then(res => {
        setProductionDashboardW(res.data)
      })
      
    setDate(new Date());
  }


  return (
    <Page
      className={classes.root}
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
            // className={clsx(classes.root, className)}
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
                    {moment().format('YYYY-MM-DD HH:mm:ss')} เวลา {date.toLocaleTimeString()}
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
                <MaterialTable
                  style={{ width: '100%', margin: 5, overflowX: "scroll" }}
                  icons={tableIcons}
                  title={"ปู่เจ้า"}
                  columns={[
                    { title: 'description', field: 'description', width: 200 },
                    { title: 'qty', field: 'qty', type: 'numeric' },
                  ]}
                  data={ProductionDashboardP}
                  options={{
                    cellStyle: { padding: '0.1' },
                    headerStyle: { padding: '0.1' },
                    search: false,
                    paging: false,
                    maxBodyHeight: '70vh',
                    minBodyHeight: '70vh',
                    rowStyle: rowData => ({
                      // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                      fontSize: 12,
                      padding: 0,
                      width: 500,
                      fontFamily: 'sans-serif'
                    }
                    ),
                  }}
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
                <MaterialTable
                  style={{ width: '100%', margin: 5, overflowX: "scroll" }}
                  icons={tableIcons}
                  title={"วังน้อย"}
                  columns={[
                    { title: 'description', field: 'description', width: 200 },
                    { title: 'qty', field: 'qty', type: 'numeric' },
                  ]}
                  data={ProductionDashboardW}
                  options={{
                    cellStyle: { padding: '0.1' },
                    headerStyle: { padding: '0.1' },
                    search: false,
                    paging: false,
                    maxBodyHeight: '70vh',
                    minBodyHeight: '70vh',
                    rowStyle: rowData => ({
                      fontSize: 12,
                      padding: 0,
                      width: 500,
                      fontFamily: 'sans-serif'
                    }
                    ),
                  }}
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
