import React, { useEffect, useState } from 'react';
import {
  Chip,
  colors,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import API from 'src/views/components/API';
import ModalNopaperLGPage from 'src/views/components/ModalNopaperLGPage';
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



const ReportTagBoatNote = (props) => {
  const classes = useStyles();
  const [DataReportTagBoatNote, setDataReportTagBoatNote] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)


  const searchReportTagBoatNote = () => {

    API.get("RPT_JOBPACKING/data.php?load=ReportTagBoatNote")
      .then(res => {
        setDataReportTagBoatNote(res.data)
        setIsLoadingState(false)
      })
  }

  useEffect(() => {
    searchReportTagBoatNote()
  }, [])


  const excelStyles = [
    {
        id: 'stringType',
        dataType: 'String',
    }
];


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

    <Container maxWidth={false}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <MaterialTable
                title="รายงาน Tag ลงเรือ"
                icons={tableIcons}
                isLoading={IsLoadingState}
                
                columns={[
                  { title: 'Tag Id', field: 'id', type: 'String' },
                  { title: 'Lot', field: 'lot'},
                  { title: 'Location', field: 'loc' },
                  { title: 'Item', field: 'item', width: '400' },
                  { title: 'qty_on_hand', field: 'qty_on_hand', type: 'Integers' },
                  { title: 'qty_tag', field: 'tagQTY', type: 'Integers' },
                  
                ]}
                data={DataReportTagBoatNote}
                options={{
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
                  search: false,
                  paging: false,
                  maxBodyHeight: '66vh',
                  minBodyHeight: '66vh',
                  exportButton: {
                    csv: true,
                    pdf: false,
                 },
                  filtering: false,
                  rowStyle: rowData => ({
                    // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                    fontSize: '0.8em',
                    padding: 0,
                    fontFamily: 'sans-serif'
                  })

                }}
              />
              </ThemeProvider>
           </Grid>
      </Container> 
    </Page>
  );
};

export default ReportTagBoatNote;
