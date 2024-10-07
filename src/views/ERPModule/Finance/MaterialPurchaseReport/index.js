import React, { useState } from 'react';
import { Button, Container, Grid, Typography,FormControl, InputLabel,Select,MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';

const MaterialPurchase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  // get year 
    const getYear = () => {
        let year = new Date().getFullYear();
        let yearList = [];
        for (let i = 2015 ; i <= year; i++) {
        yearList.unshift(i);
        }
        return yearList;
    };
  
    const getMonth = () => {
        let monthList = [];
        for (let i = 1 ; i <= 12; i++) {
        monthList.unshift(i);
        }
    };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        Material Purchase Report
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                    SaleSide : 'All',
                    Month : '1',
                    Year : '2024'
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_MAT_PURCHASE/data.php',
                      {
                        params: {
                          load: 'ajax',
                          Saleside: values.SaleSide,
                          Month : values.Month,
                          Year : values.Year,
                          Type: 'Summary'
                        }
                      }
                    );
                   
                    if (response.data.length === 0) {
                      toast.error('ไม่พบข้อมูล');
                      setSubmitting(false);
                      return;
                    }

                  setData(response.data);
                    setLoading(false);
                    toast.success('ค้นหาเสร็จสิ้น');
                    setSubmitting(false);
                  } catch (error) {
                    console.log(error);
                    toast.error('เกิดข้อผิดพลาด');
                    setLoading(false);
                  }
                }}
              >
                {({ values, handleBlur, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={3}></Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>
                            Sale Side
                          </InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="Sale Side"
                            fullWidth
                            value={'All'}
                            onChange={(e) => setFieldValue('SaleSide', e.target.value)}
                          >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'EX'}>EX</MenuItem>
                            <MenuItem value={'IN'}>IN</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>
                            Month
                          </InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="Month"
                            fullWidth
                            value={'1'}
                            onChange={(e) => setFieldValue('Month', e.target.value)}
                          >
                            <MenuItem value={'1'}>January</MenuItem>
                            <MenuItem value={'2'}>February</MenuItem>
                            <MenuItem value={'2'}>March</MenuItem>
                            <MenuItem value={'3'}>April</MenuItem>
                            <MenuItem value={'5'}>May</MenuItem>
                            <MenuItem value={'6'}>June</MenuItem>
                            <MenuItem value={'7'}>July</MenuItem>
                            <MenuItem value={'8'}>August</MenuItem>
                            <MenuItem value={'9'}>September</MenuItem>
                            <MenuItem value={'10'}>October</MenuItem>
                            <MenuItem value={'11'}>November</MenuItem>
                            <MenuItem value={'12'}>December</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>
                            Year
                          </InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="Year"
                            fullWidth
                            value={'2024'}
                            onChange={(e) => setFieldValue('Year', e.target.value)}
                          >
                            {getYear().map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          disabled={loading}
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="meldium"
                        >
                          Search
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
            <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
              <MaterialTable
                icons={tableIcons}
                title={`Material Purchase (${data.length} รายการ) `}
                columns={[
                  { title: 'vend_num', field: 'vend_num', type: 'string' },
                  { title: 'vend_name', field: 'vend_name', type: 'string' },
                  {
                    title: 'item_group',
                    field: 'item_group',
                    type: 'string'
                  },
                  { title: 'total_amount', field: 'total_amount', type: 'number' },
                ]}
                data={data}
                options={{
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  doubleHorizontalScroll: false,
                  headerStyle: {
                    backgroundColor: '#039be5',
                    color: '#FFF',
                    textAlign: 'center'
                  },
                  cellStyle: {
                    textAlign: 'center'
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MaterialPurchase;
