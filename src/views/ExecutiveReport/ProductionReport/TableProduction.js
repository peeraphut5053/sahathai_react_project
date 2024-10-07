import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import moment from 'moment';
import MaterialTable from 'material-table';
import tableIcons from '../../../views/components/table/tableIcons';

const TableProduction = ({ data }) => {
  const [type, setType] = useState('sumA');

  const transformData = (data, type) => {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // แปลงแต่ละ group
    const result = [];

    // วนลูปผ่านทุก key ของ object (slit, forming, packing, etc.)
    for (let groupName in data) {
      const groupData = data[groupName];

      const groupResult = {
        wcGroup: groupName
      };

      // เพิ่มข้อมูลแต่ละเดือน
      groupData.forEach((item) => {
        const monthIndex = item.month - 1;
        groupResult[months[monthIndex]] = parseFloat(item[type]);
      });

      result.push(groupResult);
    }

    return result;
  };

  const newData = transformData(data, type);

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        Production Report
      </Typography>
      <FormGroup>
        <FormControlLabel style={{ marginLeft: 10 }}
          
          control={
            <Select variant='outlined' value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="sumA">Grade A</MenuItem>
              <MenuItem value="sumBC">Grade B + C</MenuItem>
            </Select>
          }
        />
      </FormGroup>
      <Grid container spacing={1}>
        <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
          <MaterialTable
            icons={tableIcons}
            title={`Monthly Production Volumes by Department (Grade A)`}
            columns={[
              { title: 'wcGroup', field: 'wcGroup', type: 'string' },
              {
                title: 'Jan',
                field: '1',
                type: 'number',
                render: (row) => {
                  const val = row['1'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Feb',
                field: '2',
                type: 'number',
                render: (row) => {
                  const val = row['2'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Mar',
                field: '3',
                type: 'number',
                render: (row) => {
                  const val = row['3'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Apr',
                field: '4',
                type: 'number',
                render: (row) => {
                  const val = row['4'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'May',
                field: '5',
                type: 'number',
                render: (row) => {
                  const val = row['5'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Jun',
                field: '6',
                type: 'number',
                render: (row) => {
                  const val = row['6'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Jul',
                field: '7',
                type: 'number',
                render: (row) => {
                  const val = row['7'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Aug',
                field: '8',
                type: 'number',
                render: (row) => {
                  const val = row['8'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Sep',
                field: '9',
                type: 'number',
                render: (row) => {
                  const val = row['9'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Oct',
                field: '10',
                type: 'number',
                render: (row) => {
                  const val = row['10'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Nov',
                field: '11',
                type: 'number',
                render: (row) => {
                  const val = row['11'] / 1000;
                  return addComma(val ? val : 0);
                }
              },
              {
                title: 'Dec',
                field: '12',
                type: 'number',
                render: (row) => {
                  const val = row['12'] / 1000;
                  return addComma(val ? val : 0);
                }
              }
            ]}
            data={newData}
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
                padding: '10px'
              }
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TableProduction;
