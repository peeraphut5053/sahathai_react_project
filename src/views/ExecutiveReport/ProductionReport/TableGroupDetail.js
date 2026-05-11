import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import DataTable from 'src/components/DataTable';
import API from 'src/views/components/API';
import { useQuery } from 'react-query';

const TableGroupDetail = ({day,wc}) => {
  const [month, setMonth] = useState(moment().format('YYYY-MM-DD'));
  const [type, setType] = useState('weight');
  const { data, isLoading, error } = useQuery({
    queryKey: ["TableDailyReport",day, wc],
    queryFn: async () => {
      try {
        const res =await   API.get('RPT_QC_Lab_Tag_Detail/data.php', {
          params: {
            load: 'TableDetail',
            StartDate: moment(day).format('YYYY-MM-DD'),
            EndDate: moment(day).format('YYYY-MM-DD'),
            wc: wc
          }
        });

        const newData = res.data[0].map((item) => {
            return {
                sum: (item.sumA / 1000).toFixed(2),
                ...item,
                
            }
        })

        const sortData = newData.sort((a, b) => {
          return a.wc.localeCompare(b.wc);
        });
        
          return sortData;
       } catch (error) {
        console.log('error', error);
       }

    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, 
});


  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
       Production Daily Report
      </Typography>
      <Typography variant="h4" style={{ margin: '15px', width: '15%', textAlign: 'center' }}>
      {/*<DateMonthPicker
              label="Date"
              name="Date"
              value={month}
              onChange={(e) => setMonth(moment(e).format('YYYY-MM-DD'))}
      />*/}
      </Typography>
      <Grid container spacing={1}>
            <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
              <DataTable
                isLoading={isLoading}
                title={` Productions Daily Report (${data?.length} รายการ) `}
                columns={[
                  { title: 'Work Center', field: 'wc', type: 'string', minWidth: 100},
                  { title: 'Size', field: 'uf_nps', type: 'string', minWidth: 100 },
                  { title: 'Spec', field: 'uf_class', type: 'string', minWidth: 150 },
                  { title: 'SCH.', field: 'uf_schedule', type: 'string', minWidth: 150 },
                  { title: 'Length', field: 'uf_length', type: 'string', minWidth: 150 },
                  { title: 'Type', field: 'uf_typeend', type: 'string', minWidth: 150 },
                  { title: 'Total Weight (Tons)', field: 'sum', type: 'string', minWidth: 150 },
                ]}
                data={data}
                search
                sorting
                exportButton
                maxBodyHeight="60vh"
                minBodyHeight="60vh"
              />
            </Grid>
          </Grid>
    </Container>
  );
};

export default TableGroupDetail;
