import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Page from 'src/components/Page';
import DataTable from 'src/components/DataTable';
import API from 'src/views/components/API';
import styles from './ReportProductFinish.module.css';



const STS_execRpt_F_byType_Live_Detail = (props) => {
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
      className={styles.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
          <Grid item xs={12}>
              <DataTable
                title={`รายงาน ${props.title}`}
                isLoading={IsLoadingState} 

                columns={[
                    { title: 'Type', field: `${props.country} Type` },
                    { title: 'Item Code', field: `${props.country} item` },
                    { title: 'Stock', field: 'จำนวนเส้น', type: 'numeric' },
                    { title: 'Weight (Ton)', field: 'นน.ตัน', type: 'numeric' },
                    { title: 'Location', field: 'location', type: 'numeric' },

                ]}
                data={DataSTS_execRpt_F_byType_Live_Detail}                search={false}
                sorting={false}
                exportButton
                maxBodyHeight="65vh"
                minBodyHeight="65vh"
                cellStyle={{ padding: '10px' }}
                headerStyle={{ padding: '10px' }}
                rowStyle={{
                  fontSize: 14,
                  padding: 0,
                  width: 500,
                  fontFamily: 'sans-serif'
                }}
              />
          </Grid>
      </Container>
    </Page>
  );
};

export default STS_execRpt_F_byType_Live_Detail;
