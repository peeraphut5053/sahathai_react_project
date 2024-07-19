import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';

const ARTransactionReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComma = num => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

    const covertData = data => {
    return data.map(item => {
      return {
        ...item,
        inv_date: moment(item.inv_date.date).format('DD/MM/YYYY'),
        amount: addComma(item.amount),
        sales_tax: addComma(item.sales_tax),
        net_amt: addComma(item.net_amt)
      };
    });
    }

    const totalAmount = (res) => {
     const total = res.reduce((acc, item) => {
      return acc + parseFloat(item.amount);
    }, 0);
    return total;
}
    

    

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        AR Transaction Report
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD'),
                  IN: true,
                  CN: true,
                  DN: true,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPTARTRAN/data.php',
                      {
                        params: {
                          load: 'api',
                          StartDate: values.StartDate,
                          EndDate: values.EndDate,
                          IN: values.IN,
                          CN: values.CN,
                          DN: values.DN
                        }
                      });

                    if (response.data.length === 0) {
                      toast.error('ไม่พบข้อมูล');
                      setSubmitting(false);
                      return;
                    }
                    const total = totalAmount(response.data);
                    console.log(total);
                    let newData = covertData(response.data);
                    setData(newData);
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
                        <DateTimePicker
                          label="วันเวลาเริ่ม"
                          name={'enddate'}
                          value={values.StartDate}
                          onBlur={handleBlur}
                          onChange={e =>
                            setFieldValue(
                              'StartDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
                        />
                      </Grid>
                      <Grid item>
                        <DateTimePicker
                          label="วันเวลาสิ้นสุด"
                          name={'enddate'}
                          value={values.EndDate}
                          onBlur={handleBlur}
                          onChange={e => {
                            setFieldValue(
                              'EndDate',
                              moment(e).format('YYYY-MM-DD')
                            );
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.IN}
                                onChange={e => setFieldValue('IN', e.target.checked)}
                                name="IN"
                                color="primary"
                              />
                            }
                            label="IN"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.CN}
                                onChange={e => setFieldValue('CN', e.target.checked)}
                                name="CN"
                                color="primary"
                              />
                            }
                            label="CN"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.DN}
                                onChange={e => setFieldValue('DN', e.target.checked)}
                                name="DN"
                                color="primary"
                              />
                            }
                            label="DN"
                          />
                        </FormGroup>
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
                title={` AR Transaction Report (${data.length} รายการ) `}
                columns={[
                { title: 'inv_date', field: 'inv_date', type: 'date' },
                { title: 'inv_num', field: 'inv_num', type: 'string' },
                { title: 'cust_num', field: 'cust_num', type: 'string' },
                { title: 'cust_name', field: 'cust_name', type: 'string', cellStyle: { minWidth: 300 }},
                { title: 'amount', field: 'amount', type: 'numerics' },
                { title: 'tax', field: 'sales_tax', type: 'numerics' },
                { title: 'net amt', field: 'net_amt', type: 'numerics' },
                { title: 'description', field: 'description', type: 'string' },
                { title: 'apply_to_inv', field: 'apply_to_inv_num', type: 'string' },
                { title: 'post_from_co', field: 'post_from_co', type: 'string' },
                { title: 'co_num', field: 'co_num', type: 'string' }
                ]}
                data={data}
                options={{
                  exportButton: true,
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
                  search: true,
                  paging: false,
                  sorting: false,
                  filtering: false,
                  exportButton: true,
                  doubleHorizontalScroll: false,
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ARTransactionReport;
