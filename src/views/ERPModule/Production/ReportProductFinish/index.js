import React, { useEffect, useState } from 'react';
import {
  Chip,
  colors,
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
import ModalNopaperLGPage from 'src/views/components/ModalNopaperLGPage';
import V_STS_execRpt_F_byMarket_Live from './V_STS_execRpt_F_byMarket_Live';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'
import moment from "moment";

moment.locale("th");

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



const ReportProductFinish = (props) => {
  const classes = useStyles();
  const [DataReportProductFinish, setDataReportProductFinish] = useState([])
  const [openModalItem2, setOpenModalItem2] = React.useState(false);


  const searchReportProductFinish = () => {


    API.get(`API_ExecutiveReport/data.php?load=ReportProductFinish`)
      .then(res => {
        setDataReportProductFinish(addTotal(res.data))
      })
  }

  
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

  useEffect(() => {
    searchReportProductFinish()
  }, [])

  const handleClick = (event) => {
    setOpenModalItem2(true);

  };

  const handleCloseModalItem = async () => {
    setOpenModalItem2(false);
  };


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

      <ModalNopaperLGPage
        modalHeader={
          <>รายงาน {`รายงานจำแนกโดยชนิดท่อ`}</>
        }
        modalDetail={
          <V_STS_execRpt_F_byMarket_Live
            title={`รายงานจำแนกโดยชนิดท่อ`}
            daystart={props.daystart}
            dayend={props.dayend}
          />
        }
        open={openModalItem2}
        onClose={handleCloseModalItem}
      />

      <Container maxWidth={false}>

        <Grid container spacing={0} >
          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <MaterialTable

                title={"รายงานอายุสินค้าสำเร็จรูป พร้อมส่งมอบ  (" + moment().subtract(12, 'months').format("YYYY-MM-DD HH:mm:ss")+")"}
                icons={tableIcons}
                columns={[
                  {
                    title: 'Market', field: 'Market', width: 300,
                    headerStyle: { backgroundColor: colors.lightBlue[100], width: 60 },
                    cellStyle: { backgroundColor: colors.lightBlue[100], width: 60 }
                  },
                  {
                    title: 'Type', field: 'Type', width: 300,
                    headerStyle: { backgroundColor: colors.lightBlue[100], width: 80 },
                    cellStyle: { backgroundColor: colors.lightBlue[100], width: 80 }
                  },
                  { title: 'Today จำนวนเส้น', field: 'Today จำนวนเส้น', type: 'numeric' },
                  { title: 'Today นน.ตัน', field: 'Today นน.ตัน', type: 'numeric' },
                  {
                    title: '1-7 วัน จำนวนเส้น', field: '1-7 วัน จำนวนเส้น', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] },
                  },
                  {
                    title: '1-7 วัน นน.ตัน', field: '1-7 วัน นน.ตัน', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  { title: '8-14 วัน จำนวนเส้น', field: '8-14 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '8-14 วัน นน.ตัน', field: '8-14 วัน นน.ตัน', type: 'numeric' },
                  {
                    title: '15-30 วัน เส้น', field: '15-30 วัน จำนวนเส้น', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  {
                    title: '15-30 วัน นน.ตัน', field: '15-30 วัน นน.ตัน', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  { title: '31-90 วัน เส้น', field: '31-90 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '31-90 วัน นน.ตัน', field: '31-90 วัน นน.ตัน', type: 'numeric' },
                  {
                    title: '91-180 วัน เส้น', field: '91-180 วัน จำนวนเส้น', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  {
                    title: '91-180 วัน นน.ตัน', field: '91-180 วัน นน.ตัน', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  { title: '181-365 วัน จำนวนเส้น', field: '181-365 วัน จำนวนเส้น', type: 'numeric' },
                  { title: '181-365 วัน นน.ตัน', field: '181-365 วัน นน.ตัน', type: 'numeric' },
                  {
                    title: '366-730 วัน จำนวนเส้น', field: '1-2 ปี จำนวนเส้น', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  {
                    title: '366-730 วัน นน.ตัน', field: '1-2 ปี วัน นน.ตัน', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  { title: '>2 ปี จำนวนเส้น', field: '>2 ปี จำนวนเส้น', type: 'numeric' },
                  { title: '>2 ปี วัน นน.ตัน', field: '>2 ปี วัน นน.ตัน', type: 'numeric' },
                  {
                    title: 'รวม เส้น', field: 'รวม จำนวนเส้น', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                  {
                    title: 'รวม นน.ตัน', field: 'รวม นน.ตัน', type: 'numeric',
                    headerStyle: { backgroundColor: colors.lightBlue[50], width: 130 },
                    cellStyle: { backgroundColor: colors.lightBlue[50] }
                  },
                ]}
                data={DataReportProductFinish}
                components={{
                  Toolbar: props => (
                    <div>
                      <MTableToolbar {...props} />
                      <div style={{ padding: '0px 10px' }}>
                        <Chip
                          aria-controls="customized-menu"
                          aria-haspopup="true"
                          variant="contained"
                          color="primary"
                          onClick={handleClick}
                          label={"รายงานจำแนกโดยชนิดท่อ"}
                        >
                        </Chip>
                        <MenuChip label="Today" daystart="0" dayend="0" />
                        <MenuChip label="1-7 วัน" daystart="1" dayend="7" />
                        <MenuChip label="8-14 วัน" daystart="8" dayend="14" />
                        <MenuChip label="15-30 วัน" daystart="15" dayend="30" />
                        <MenuChip label="31-90 วัน" daystart="31" dayend="90" />
                        <MenuChip label="91-180 วัน" daystart="91" dayend="180" />
                        <MenuChip label="181-365 วัน" daystart="181" dayend="365" />
                        <MenuChip label="366-730 วัน" daystart="366" dayend="730" />
                        <MenuChip label="มากกว่า 2 ปี" daystart="731" dayend="3000" />
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
            </ThemeProvider>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ReportProductFinish;
