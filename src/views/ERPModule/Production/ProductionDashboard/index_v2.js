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

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import tableIcons from '../../../components/table/tableIcons'
import moment from "moment";

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

  const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);



  const [date, setDate] = useState(new Date());
  const [data1, setData1] = useState([]);
  const [data, setData] = useState([]);
  const [sumQtyAll, setSumQtyAll] = useState(0);


  useEffect(() => {
    var timerID = setInterval(() => tick(), 5000);


    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    API.get(`API_ExecutiveReport/data.php?load=matltran_mst_count_intreval&startDate=${moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')}&endDate=${moment('23:59:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')}`)
      .then(res => {
        setData1(res.data)
        var totalTaxes = 0;
        totalTaxes = res.data.reduce(function (sum, tax) {
          return Number(sum) + Number(tax.sumqty);
        }, 0);
        setSumQtyAll(totalTaxes)
      })

    API.get(`API_ExecutiveReport/data.php?load=matltran_mst_intreval&startDate=${moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')}&endDate=${moment('23:59:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')}`)
      .then(res => {
        setData(res.data)
      })
    setDate(new Date());
  }

  // function callAPI() {



  // }


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

      <Container maxWidth={false}>
        <Grid
          container
          spacing={1}
        >
          {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
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
                    ภาพรวมการผลิต 
                  </Typography>
                  <Typography color="textPrimary" gutterBottom variant="h5" >
                    วันที่ 16/02/2021 เวลา {date.toLocaleTimeString()}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid> */}
          <Grid item lg={3} sm={3} xl={3} xs={3}>
            <Card spacing={1} >
              <Accordion >
                <AccordionSummary
                  expandIcon={<></>}
                >
                  <Grid justify="space-between" container spacing={24}  >
                    <Grid item>
                      <Typography type="title" color="inherit"> ภาพรวมการผลิต  </Typography>
                    </Grid>
                    <Grid item>
                      วันที่ {moment('23:59:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')} เวลา {date.toLocaleTimeString()}
                    </Grid>
                  </Grid>
                </AccordionSummary>
              </Accordion>
              {
                data1.map((x) =>
                  <Accordion disabled={(x.sumqty == 0) ? true : false}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid justify="space-between" container spacing={24}  >
                        <Grid item>
                          <Typography type="title" color="inherit"> {x.wc_group_description}  </Typography>
                        </Grid>
                        <Grid item>
                          {Number(x.sumqty)}
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography> รายละเอียดแต่ละเครื่อง </Typography>
                    </AccordionDetails>
                  </Accordion>

                )
              }


              <Accordion >
                <AccordionSummary
                  expandIcon={<></>}
                >
                  <Grid justify="space-between" container spacing={24}  >
                    <Grid item>
                      <Typography type="title" color="inherit"> รวม  </Typography>
                    </Grid>
                    <Grid item>
                      {Number(sumQtyAll)}
                    </Grid>
                  </Grid>
                </AccordionSummary>
              </Accordion>
            </Card>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6}>
            <Card spacing={1} >
              <MaterialTable
                title="Last 20 transaction"
                icons={tableIcons}
                columns={[
                  { title: 'wc', field: 'wc' },
                  { title: 'CreateDate', field: 'CreateDate.date'},
                  { title: 'qty', field: 'qty',type:'numeric'},
                ]}
                data={data}

                options={{
                  search: false,
                  paging: false,
                  maxBodyHeight: '60vh',
                  minBodyHeight: '60vh',
                  exportButton: true,
                  filtering: false,
                  rowStyle: rowData => ({
                      // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                      fontSize: 12,
                      padding: 0
                  }
                  ),
              }}
                
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ProductionDashboard;
