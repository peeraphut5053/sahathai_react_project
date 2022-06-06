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
import MenuChip from './MenuChip';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const STS_execRpt_F_byType_Live = (props) => {
  const classes = useStyles();
  const [DataSTS_execRpt_F_byType_Live, setDataSTS_execRpt_F_byType_Live] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)


  const searchSTS_execRpt_F_byType_Live = (daystart, dayend) => {

    API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_F_byType_Live&daystart=${daystart}&dayend=${dayend}`)
      .then(res => {
        setDataSTS_execRpt_F_byType_Live(res.data)
        setIsLoadingState(false)

      })
  }

  useEffect(() => {

    searchSTS_execRpt_F_byType_Live(props.daystart, props.dayend)
  }, [])



  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

      <Container maxWidth={false}>

        <Grid container spacing={0} >
          {/* {JSON.stringify(DataSTS_execRpt_F_byType_Live)} */}
          {/* <Grid item xs={12}>
            <Button onClick={searchSTS_execRpt_F_byType_Live}>Search</Button>

          </Grid> */}
          <Grid item xs={12}>
            <MaterialTable
              title={`รายงาน ${props.title}`}
              icons={tableIcons}
              isLoading={IsLoadingState}

              columns={[
                { title: 'Type', field: 'Type' },
                { title: 'USA จำนวนเส้น', field: 'USA จำนวนเส้น', type: 'numeric' },
                { title: 'USA นน.ตัน', field: 'USA นน.ตัน', type: 'numeric' },
                { title: 'AUS จำนวนเส้น', field: 'AUS จำนวนเส้น', type: 'numeric' },
                { title: 'AUS นน.ตัน', field: 'AUS นน.ตัน', type: 'numeric' },
                { title: 'ขายใน จำนวนเส้น', field: 'ขายใน จำนวนเส้น', type: 'numeric' },
                { title: 'ขายใน นน.ตัน', field: 'ขายใน นน.ตัน', type: 'numeric' },
                { title: 'รวม จำนวนเส้น', field: 'รวม จำนวนเส้น', type: 'numeric' },
                { title: 'รวม นน.ตัน', field: 'รวม นน.ตัน', type: 'numeric' },


              ]}
              data={DataSTS_execRpt_F_byType_Live}

              options={{

                cellStyle: { padding: '0.1' },
                headerStyle: { padding: '0.1' },
                search: false,
                paging: false,
                maxBodyHeight: '65vh',
                minBodyHeight: '65vh',
                sorting: false,
                filtering: false,
                // width: '100vw',
                exportButton: true,
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

export default STS_execRpt_F_byType_Live;
