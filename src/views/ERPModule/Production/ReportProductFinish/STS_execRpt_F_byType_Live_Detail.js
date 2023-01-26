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


const STS_execRpt_F_byType_Live_Detail = (props) => {
  const classes = useStyles();
  const [DataSTS_execRpt_F_byType_Live_Detail, setDataSTS_execRpt_F_byType_Live_Detail] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)


  const searchSTS_execRpt_F_byType_Live_Detail = (daystart, dayend, country) => {

    API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_F_byType_Live_Detail&daystart=${daystart}&dayend=${dayend}&country=${country}`)
      .then(res => {
        setDataSTS_execRpt_F_byType_Live_Detail(res.data)
        setIsLoadingState(false)

      })
  }

  useEffect(() => {

    searchSTS_execRpt_F_byType_Live_Detail(props.daystart, props.dayend, props.country)
  }, [])


  // const addTotal = (data) => {
  //   let keys = Object.keys(data[0]);
  //   let totalRow = {};
  //   let emptyRow = {};
  //   for (let key of keys) {
  //     if (key === keys[0]) { totalRow[key] = 'Total'; }
  //     else if (key === keys[1]) { totalRow[key] = ''; }
  //     else if (key === keys[2]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[2]]); }, 0);; }
  //     else if (key === keys[3]) { totalRow[key] = data.reduce((acc, el) => { return acc += +(el[keys[3]]); }, 0);; }
  //     else if (key === keys[4]) { totalRow[key] = ''; }
  //     else {
  //       totalRow[key] = '';
  //     }
  //     emptyRow[key] = '';
  //   }
  //   return [...data, emptyRow, totalRow];
  // }


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
          <Grid item xs={12}>
            <ThemeProvider theme={theme}>

              <MaterialTable
                title={`รายงาน ${props.title}`}
                icons={tableIcons}
                isLoading={IsLoadingState} 

                columns={[
                    { title: 'Type', field: `${props.country} Type` },
                    { title: 'Item Code', field: `${props.country} item` },
                    { title: 'Stock', field: 'จำนวนเส้น', type: 'numeric' },
                    { title: 'Weight (Ton)', field: 'นน.ตัน', type: 'numeric' },
                    { title: 'Location', field: 'location', type: 'numeric' },

                ]}
                data={DataSTS_execRpt_F_byType_Live_Detail}

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
      </Container>
    </Page>
  );
};

export default STS_execRpt_F_byType_Live_Detail;
