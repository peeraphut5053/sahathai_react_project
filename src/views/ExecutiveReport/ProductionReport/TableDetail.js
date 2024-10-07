import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import moment from 'moment';
import MaterialTable from 'material-table';
import tableIcons from '../../../views/components/table/tableIcons';


const TableDetail = ({data}) => {
  const [values, setValues] = useState(false);

  const addComma = num => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

 let tableData = values === false ? data.currentMonth : data.lastMonth;
    
  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
       Production Report
      </Typography>
      <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values}
                                onChange={e => setValues(e.target.checked)}
                                name="Last Month"
                                color="primary"
                              />
                            }
                            label="Last Month"
                          />
                        </FormGroup>
      <Grid container spacing={1}>
            <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
              <MaterialTable
                icons={tableIcons}
                title={` Productions Report (${tableData?.length} รายการ) `}
                columns={[
                { title: 'wc', field: 'wc', type: 'string' },
                { title: 'wcGroup', field: 'wcGroup', type: 'string' },
                { title: 'start time', field: 'start_time', type: 'string' },
                { title: 'end time', field: 'end_time', type: 'string', },
                { title: 'work hour', field: 'work_hour', type: 'string' },
                { title: 'day break', field: 'day_break', type: 'string' },
                { title: 'stop hour', field: 'stop_hour', type: 'string' },
                { title: 'TOT work hour', field: 'TOT_work_hour', type: 'string' },
                { title: 'Stop Reason', field: 'stop_reason', type: 'string', cellStyle: { minWidth: 300 }},
                { title: 'Date', field: 'date.date', type: 'date', render: rowData => moment(rowData.date.date).format('DD/MM/YYYY')},
                { title: 'sumA', field: 'sumA', type: 'number' },
                { title: 'sumB', field: 'sumB', type: 'number' },
                { title: 'sumC', field: 'sumC', type: 'number' },
                ]}
                data={tableData}
                options={{
                  search: true,
                  paging: false,
                  sorting: false,
                  filtering: false,
                  exportButton: true,
                  doubleHorizontalScroll: true,
                  maxBodyHeight: '60vh',
                    minBodyHeight: '60vh',
                  headerStyle: {
                    backgroundColor: '#039be5',
                    color: '#FFF',
                    textAlign: 'center'
                  },
                  cellStyle: {
                    textAlign: 'center',
                    fontSize: '14px',
                    padding: '5px'
                  }
                }}
              />
            </Grid>
          </Grid>
    </Container>
  );
};

export default TableDetail;
