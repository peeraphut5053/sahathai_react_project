import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Page from 'src/components/Page';
import DataTable from 'src/components/DataTable';
import API from 'src/views/components/API';
import moment from 'moment';
import styles from './ReportTagBoatNote.module.css';

moment.locale('th');

const ReportTagBoatNote = () => {
  const [DataReportTagBoatNote, setDataReportTagBoatNote] = useState([]);
  const [IsLoadingState, setIsLoadingState] = useState(true);
  const columns = [
    { title: 'Tag Id', field: 'id', type: 'string' },
    { title: 'Do num', field: 'do_num' },
    { title: 'Lot', field: 'lot' },
    { title: 'Location', field: 'loc' },
    { title: 'Item', field: 'item', minWidth: 400 },
    { title: 'qty_on_hand', field: 'qty_on_hand' },
    { title: 'qty_tag', field: 'tagQTY' },
  ].map((column) => ({
    ...column,
    headerStyle: { padding: '0.1' },
    cellStyle: { padding: '0.1' },
  }));

  const searchReportTagBoatNote = () => {
    API.get('RPT_JOBPACKING/data.php?load=ReportTagBoatNote')
      .then((res) => {
        setDataReportTagBoatNote(res.data);
        setIsLoadingState(false);
      });
  };

  useEffect(() => {
    searchReportTagBoatNote();
  }, []);

  return (
    <Page className={styles.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid item xs={12}>
          <DataTable
            title="รายงาน Tag ลงเรือ"
            isLoading={IsLoadingState}
            columns={columns}
            data={DataReportTagBoatNote}
            maxBodyHeight="66vh"
            minBodyHeight="66vh"
            search={false}
            sorting
            exportButton
            exportFileName="report-tag-boat-note.csv"
            rowStyle={() => ({
              fontSize: '0.8em',
              padding: 0,
              fontFamily: 'sans-serif'
            })}
          />
        </Grid>
      </Container>
    </Page>
  );
};

export default ReportTagBoatNote;
