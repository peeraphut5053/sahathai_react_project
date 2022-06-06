import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import API from 'src/views/components/API';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const ReportProductFinish = () => {
  const classes = useStyles();
  const [DataReportProductFinish, setDataReportProductFinish] = useState([])


  const searchReportProductFinish = () => {

    API.get(`API_ExecutiveReport/data.php?load=ReportProductFinish`)
      .then(res => {
        setDataReportProductFinish(res.data)
      })

  }

  useEffect(() => {
    searchReportProductFinish()
  }, [])



  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

      <Container maxWidth={false}>

        <Grid container spacing={0} >
          {/* {JSON.stringify(DataReportProductFinish)} */}
          {/* <Grid item xs={12}>
            <Button onClick={searchReportProductFinish}>Search</Button>

          </Grid> */}
          <Grid item xs={12}>
            <MaterialTable
              title="รายงานอายุสินค้าสำเร็จรูป พร้อมส่งมอบ"
              icons={tableIcons}

              columns={[
                { title: 'แผนก', field: 'แผนก', width: 300, cellStyle: { backgroundColor: 'gray', width: 130 } },
                {
                  title: '0-1 วัน เส้น', field: '0-1 วัน จำนวนเส้น', type: 'numeric', cellStyle: { backgroundColor: '' },
                },
                { title: '0-1 วัน นน.ตัน', field: '0-1 วัน นน.ตัน', type: 'numeric' },
                { title: '2-7 วัน เส้น', field: '2-7 วัน จำนวนเส้น', type: 'numeric' },
                { title: '2-7 วัน นน.ตัน', field: '2-7 วัน นน.ตัน', type: 'numeric' },
                { title: '8-14 วัน เส้น', field: '8-14 วัน จำนวนเส้น', type: 'numeric' },
                { title: '8-14 วัน นน.ตัน', field: '8-14 วัน นน.ตัน', type: 'numeric' },
                { title: '15-30 วัน เส้น', field: '15-30 วัน จำนวนเส้น', type: 'numeric' },
                { title: '15-30 วัน นน.ตัน', field: '15-30 วัน นน.ตัน', type: 'numeric' },
                { title: '31-90 วัน เส้น', field: '31-90 วัน จำนวนเส้น', type: 'numeric' },
                { title: '31-90 วัน นน.ตัน', field: '31-90 วัน นน.ตัน', type: 'numeric' },
                { title: '91-180 วัน เส้น', field: '91-180 วัน จำนวนเส้น', type: 'numeric' },
                { title: '91-180 วัน นน.ตัน', field: '91-180 วัน นน.ตัน', type: 'numeric' },
                { title: '>180 วัน เส้น', field: '>180 วัน จำนวนเส้น', type: 'numeric' },
                { title: '>180 วัน นน.ตัน', field: '>180 วัน นน.ตัน', type: 'numeric' },
                { title: 'รวม เส้น', field: 'รวม จำนวนเส้น', type: 'numeric' },
                { title: 'รวม นน.ตัน', field: 'รวม นน.ตัน', type: 'numeric' },

              ]}
              data={DataReportProductFinish}
              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div style={{ padding: '0px 10px' }}>
                      <Chip onClick={()=>alert()} label="0-1 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="2-7 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="8-14 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="15-30 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="31-90 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="91-180 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="> 180 วัน" color="secondary" style={{ marginRight: 5 }} />
                      <Chip label="รวม" color="secondary" style={{ marginRight: 5 }} />
                    </div>
                  </div>
                ),
              }}
              options={{
                
                cellStyle: { padding: '0.0' },
                headerStyle: { padding: '0.1' },
                search: false,
                paging: false,
                maxBodyHeight: '66vh',
                minBodyHeight: '66vh',
                sorting: false,
                // width: '100vw',
                exportButton: true,
                filtering: false,
                rowStyle: rowData => ({
                  // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                  fontSize: 14,
                  padding: 0,
                  width: 500,
                  fontFamily: 'sans-serif'
                }
                ),
              }}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

export default ReportProductFinish;
