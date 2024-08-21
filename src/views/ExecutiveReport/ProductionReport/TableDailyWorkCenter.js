import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip
} from '@material-ui/core';
import moment from 'moment';
import MaterialTable, { MTableToolbar }  from 'material-table';
import tableIcons from '../../../views/components/table/tableIcons';
import API from 'src/views/components/API';
import DateMonthPicker from 'src/views/components/Input/CDateMonthPicker';
import Select from 'react-select';

const TableDailyWorkCenter = () => {
  const [month, setMonth] = useState( moment().format('YYYY-MM'));
  const [wcList, setWcList] = useState([]);
  const [wc, setWc] = useState('P2FM01');
  const [data, setData] = useState([]);
  const [type, setType] = useState('weight');
  const [loading, setLoading] = useState(false);

  const addComma = num => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  function getFirstAndLastDayOfMonth(year, month) {
    // สร้างวันที่แรกของเดือน
    const firstDay = new Date(year, month - 1, 1);
    
    // สร้างวันที่แรกของเดือนถัดไป แล้วลบออก 1 วัน เพื่อได้วันสุดท้ายของเดือนปัจจุบัน
    const lastDay = new Date(year, month, 0);
    
    return {
      firstDay: firstDay,
      lastDay: lastDay
    };
  }

  useEffect(() => {
    const getData = async () => {
     const y = moment(month).format('YYYY');
     const m = moment(month).format('MM');
     const date = getFirstAndLastDayOfMonth(y, m);
     setLoading(true);
     const res =await   API.get('http://localhost/sts_web_center/module/RPT_QC_Lab_Tag_Detail/data.php', {
        params: {
          load: 'DailyWorkCenter',
          StartDate: moment(date.firstDay).format('YYYY-MM-DD'),
          EndDate: moment(date.lastDay).format('YYYY-MM-DD'),
          wc: wc,
          type: type
        }
      });
      const newData = res.data[0].map((item) => {
        return {
          ...item,
          date: moment(item.date.date).format('DD/MM/YYYY'),
          '00:00-04:00': addComma(item['00:00-04:00']),
          '04:00-08:00': addComma(item['04:00-08:00']),
          '08:00-12:00': addComma(item['08:00-12:00']),
          '12:00-13:00': addComma(item['12:00-13:00']),
          '13:00-17:00': addComma(item['13:00-17:00']),
          '17:00-17:30': addComma(item['17:00-17:30']),
          '17:30-18:30': addComma(item['17:30-18:30']),
          '18:30-21:00': addComma(item['18:30-21:00']),
          '21:00-24:00': addComma(item['21:00-24:00']),
        }
      });
      setData(newData);
      setLoading(false);
    }

    const getWcList = async () => {
      const res = await API.get('RPT_JOBPACKING/data.php?load=workcenter');
      const newWcList = res.data.map((item) => {
        return {
          value: item.wc,
          label: item.wc + ' - ' + item.description
        }
      })
      setWcList(newWcList);
      };
  
    getWcList();
    getData();
  }, [month, wc, type]);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
       Production Work Center Daily Report
      </Typography>
      <Grid container spacing={2}>
      <Grid item xs={3}>
        <DateMonthPicker
              label="Date"
              name="Date"
              value={month}
              onChange={(e) => setMonth(moment(e).format('YYYY-MM'))}
      />
      </Grid>
      <Grid item xs={3}>
      <Select
           menuPortalTarget={document.body} 
           styles={{ menuPortal: base => ({ ...base, zIndex: 9999  }) }}
            label="Work center"
            options={wcList}
            value={wcList.filter((item) => item.value === wc)}
            onChange={(e) => setWc(e.value)}
            closeMenuOnSelect={true}
         />
      </Grid>
      </Grid>
      <Grid container spacing={1}>
            <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
              <MaterialTable
                icons={tableIcons}
                title={` Productions Daily Report (${data.length} รายการ) `}
                columns={[
                { title: 'wc', field: 'wc', type: 'string', minWidth: 100 },
                { title: 'Description', field: 'description', type: 'string', minWidth: 200 },
                { title: 'วันที่', field: 'date', type: 'date', minWidth: 100 },
                { title: 'work_hour', field: 'work_hour', type: 'number', minWidth: 150 },
                { title: 'stop_hour', field: 'stop_hour', type: 'number', minWidth: 150 },
                { title: 'TOT_work_hour', field: 'TOT_work_hour', type: 'number', minWidth: 150 },
                { title: '00:00-04:00', field: '00:00-04:00', type: 'number', minWidth: 150 },
                { title: '04:00-08:00', field: '04:00-08:00', type: 'number', minWidth: 150 },
                { title: '08:00-12:00', field: '08:00-12:00', type: 'number', minWidth: 150 },
                { title: '12:00-13:00', field: '12:00-13:00', type: 'number', minWidth: 150 },
                { title: '13:00-17:00', field: '13:00-17:00', type: 'number', minWidth: 150 },
                { title: '17:00-17:30', field: '17:00-17:30', type: 'number', minWidth: 150 },
                { title: '17:30-18:30', field: '17:30-18:30', type: 'number', minWidth: 150 },
                { title: '18:30-21:00', field: '18:30-21:00', type: 'number', minWidth: 150 },
                { title: '21:00-24:00', field: '21:00-24:00', type: 'number', minWidth: 150 },
                ]}
                data={data}
                isLoading={loading}
                options={{
                  exportButton: true,
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  minWidth: 200,
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
                components={{
                    Toolbar: (props) => (
                      <div>
                        <MTableToolbar {...props} />
                        <div style={{ padding: '0px 10px' }}>
                          <Chip
                            label="แสดงแบบ Weight"
                            color="default"
                            style={{ marginRight: 5,border: '1px solid #039be5' ,backgroundColor: `${type === 'weight' ? '#039be5' : 'white'}` }}
                            onClick={() => setType('weight')}
                          />
                          <Chip
                            label="แสดงแบบ Qty"
                            color="default"
                            style={{ marginRight: 5,border: '1px solid #039be5' , backgroundColor: `${type === 'qty' ? '#039be5' : 'white'}` }}
                            onClick={() => setType('qty')}
                          />
                        </div>
                      </div>
                    )
                  }}
              />
            </Grid>
          </Grid>
    </Container>
  );
};

export default TableDailyWorkCenter;
