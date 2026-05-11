import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Page from 'src/components/Page';
import DataTable from 'src/components/DataTable';
import API from 'src/views/components/API';
import styles from './ReportProductForming.module.css';



const STS_execRpt_W_bySize_Live_Detail = (props) => {
  const [DataSTS_execRpt_W_bySize_Live_Detail, setDataSTS_execRpt_W_bySize_Live_Detail] = useState([])
  const [IsLoadingState, setIsLoadingState] = useState(true)


  const searchSTS_execRpt_W_bySize_Live_Detail = (daystart, dayend, country) => {

    API.get(`API_ExecutiveReport/data.php?load=STS_execRpt_W_bySize_Live_Detail&daystart=${daystart}&dayend=${dayend}&country=${country}`)
      .then(res => {
        setDataSTS_execRpt_W_bySize_Live_Detail(res.data)
        setIsLoadingState(false)

      })
  }

  useEffect(() => {

    searchSTS_execRpt_W_bySize_Live_Detail(props.daystart, props.dayend, props.country)
  }, [])


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
                    { title: 'Size', field: `${props.country} Size` },
                    { title: 'Item Code', field: `${props.country} item` },
                    { title: 'Stock', field: 'จำนวนเส้น', type: 'numeric' },
                    { title: 'Weight (Ton)', field: 'นน.ตัน', type: 'numeric' },
                    { title: 'Location', field: 'location', type: 'numeric' },

                ]}
                data={DataSTS_execRpt_W_bySize_Live_Detail}                search={false}
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

export default STS_execRpt_W_bySize_Live_Detail;
