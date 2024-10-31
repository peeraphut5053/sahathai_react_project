import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Chip
} from '@material-ui/core';
import moment from 'moment';
import MaterialTable, { MTableToolbar }  from 'material-table';
import tableIcons from '../../../views/components/table/tableIcons';
import API from 'src/views/components/API';
import DateMonthPicker from 'src/views/components/Input/CDatePicker';
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

  const addComma = num => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

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
              <MaterialTable
                icons={tableIcons}
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
                options={{
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  doubleHorizontalScroll: true,
                  maxBodyHeight: '60vh',
                    minBodyHeight: '60vh',
                  headerStyle: {
                    backgroundColor: '#039be5',
                    color: '#FFF',
                    textAlign: 'center',
                  },
                  cellStyle: {
                    textAlign: 'center',
                    fontSize: '14px',
                    padding: '20px',
                  }
                }}
              />
            </Grid>
          </Grid>
    </Container>
  );
};

export default TableGroupDetail;