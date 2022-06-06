import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MaterialTable from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import API from 'src/views/components/API';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '10px 10px',
      },
    },
  },
});


const V_STS_execRpt_F_byMKTType_Live = (props) => {
  const classes = useStyles();
  const [DataV_STS_execRpt_F_byMKTType_Live, setDataV_STS_execRpt_F_byMKTType_Live] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)


  const searchV_STS_execRpt_F_byMKTType_Live = (daystart, dayend) => {

    API.get(`API_ExecutiveReport/data.php?load=V_STS_execRpt_F_byMKTType_Live&daystart=${daystart}&dayend=${dayend}`)
      .then(res => {
        setDataV_STS_execRpt_F_byMKTType_Live(addTotal(res.data))
        setIsLoadingState(false)

      })
  }

  useEffect(() => {

    searchV_STS_execRpt_F_byMKTType_Live(props.daystart, props.dayend)
  }, [])


  const addTotal = (data) => {
    let keys = Object.keys(data[0]);
    let totalRow = {};
    let emptyRow = {};
    for (let key of keys) {
      if (key === keys[0]) { totalRow[key] = 'Total'; }
      else if (key === keys[1]) { totalRow[key] = 'Total'; }
      else if (key === keys[2]) { totalRow[key] = 'Total' }
      else if (key === keys[3]) { totalRow[key] = '' }
      else if (key === keys[4]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[4]]); }, 0);; }
      else if (key === keys[5]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[5]]); }, 0);; }
      else if (key === keys[6]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[6]]); }, 0);; }
      else if (key === keys[7]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[7]]); }, 0);; }
      else if (key === keys[8]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[8]]); }, 0);; }
      else if (key === keys[9]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[9]]); }, 0);; }
      else if (key === keys[10]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[10]]); }, 0);; }
      else if (key === keys[11]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[11]]); }, 0);; }
      else if (key === keys[12]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[12]]); }, 0);; }
      else if (key === keys[13]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[13]]); }, 0);; }
      else if (key === keys[14]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[14]]); }, 0);; }
      else if (key === keys[15]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[15]]); }, 0);; }
      else if (key === keys[16]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[16]]); }, 0);; }
      else if (key === keys[17]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[17]]); }, 0);; }
      else if (key === keys[18]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[18]]); }, 0);; }
      else if (key === keys[19]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[19]]); }, 0);; }
      else if (key === keys[20]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[20]]); }, 0);; }
      else if (key === keys[21]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[21]]); }, 0);; }
      else if (key === keys[22]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[22]]); }, 0);; }
      else if (key === keys[23]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[23]]); }, 0);; }
      else {
        totalRow[key] = '';
      }
      emptyRow[key] = '';
    }
    return [...data, emptyRow, totalRow];
  }


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={0} >
          <Grid item xs={12}>
            <ThemeProvider theme={theme}>

              <MaterialTable
                title={`รายงาน ${props.title}`}
                icons={tableIcons}
                isLoading={IsLoadingState}

                columns={[
                  {
                    title: 'Market', field: 'Market', width: 300,
                    headerStyle: { backgroundColor: '#f8f7ff', width: 130 },
                    cellStyle: { backgroundColor: '#f8f7ff', width: 130 }
                  },
                  {
                    title: 'Type', field: 'Type', width: 300,
                    headerStyle: { backgroundColor: '#f8f7ff', width: 130 },
                    cellStyle: { backgroundColor: '#f8f7ff', width: 130 }
                  },
                  {
                    title: 'TypeDesc', field: 'TypeDesc', width: 300,
                    headerStyle: { backgroundColor: '#f8f7ff', width: 130 },
                    cellStyle: { backgroundColor: '#f8f7ff', width: 130 }
                  },
                  { title: 'Today จำนวนเส้น', field: 'Today จำนวนเส้น', type: 'numeric' },
                  { title: 'Today นน.ตัน', field: 'Today นน.ตัน', type: 'numeric' },
                  { title: '1-7 วัน จำนวนเส้น', field: '1-7 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '1-7 วัน นน.ตัน', field: '1-7 วัน นน.ตัน', type: 'numeric' },
                  { title: '8-14 วัน จำนวนเส้น', field: '8-14 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '8-14 วัน นน.ตัน', field: '8-14 วัน นน.ตัน', type: 'numeric' },
                  { title: '8-14 วัน เส้น', field: '8-14 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '8-14 วัน นน.ตัน', field: '8-14 วัน นน.ตัน', type: 'numeric' },
                  { title: '15-30 วัน เส้น', field: '15-30 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '15-30 วัน นน.ตัน', field: '15-30 วัน นน.ตัน', type: 'numeric' },
                  { title: '31-90 วัน เส้น', field: '31-90 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '31-90 วัน นน.ตัน', field: '31-90 วัน นน.ตัน', type: 'numeric' },
                  { title: '91-180 วัน เส้น', field: '91-180 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '91-180 วัน นน.ตัน', field: '91-180 วัน นน.ตัน', type: 'numeric' },
                  { title: '181-365 วัน จำนวนเส้น', field: '181-365 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '181-365 วัน นน.ตัน', field: '181-365 วัน นน.ตัน', type: 'numeric' },
                  { title: '1-2 ปี จำนวนเส้น', field: '1-2 ปี จำนวนเส้น', type: 'numeric' },
                  { title: '1-2 ปี วัน นน.ตัน', field: '1-2 ปี วัน นน.ตัน', type: 'numeric' },
                  { title: '>2 ปี จำนวนเส้น', field: '>2 ปี จำนวนเส้น', type: 'numeric' },
                  { title: '>2 ปี นน.ตัน', field: '>2 ปี วัน นน.ตัน', type: 'numeric' },
                  { title: 'รวม เส้น', field: 'รวม จำนวนเส้น', type: 'numeric' },
                  { title: 'รวม นน.ตัน', field: 'รวม นน.ตัน', type: 'numeric' },

                ]}
                data={DataV_STS_execRpt_F_byMKTType_Live}

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
            </ThemeProvider>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default V_STS_execRpt_F_byMKTType_Live;
