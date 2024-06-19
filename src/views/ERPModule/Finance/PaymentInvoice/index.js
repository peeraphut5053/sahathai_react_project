import React, { useState } from 'react';
import { Button, Container, Grid, Typography,FormControl, InputLabel,Select,MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';


const PaymentInvoice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
      Payment Invoice Checking
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                    StartDate: moment().format('YYYY-MM-DD'),
                    EndDate: moment().format('YYYY-MM-DD'),
                    inv_num: '',
                    cust_num: '',
                    date_dif: 0,
                    Credit_term: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_payment_invoice_checking/data.php',
                      {
                        params: {
                          load: 'ajax',
                          InvFromDate: values.StartDate,
                          InvToDate : values.EndDate,
                          inv_num: values.inv_num,
                          cust_num: values.cust_num,
                          date_dif: values.date_dif,
                          credit_term: values.Credit_term,
                          type: ''
                        }
                      }
                    );
                   
                    if (response.data.length == 0) {
                      toast.error('ไม่พบข้อมูล');
                      setSubmitting(false);
                      return;
                    }
                    const newData = response.data.map((item) => {
                    return {
                        ...item,
                        inv_amount: addComma(item.inv_amount),
                    }});
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
                {({ errors, touched,values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
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
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.inv_num && errors.inv_num)}
                                helperText={touched.inv_num && errors.inv_num}
                                label="inv num"
                                name="inv_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.inv_num}
                              />
                      </Grid>
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.cust_num && errors.cust_num)}
                                helperText={touched.cust_num && errors.cust_num}
                                label="cust num"
                                name="cust_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cust_num}
                              />
                      </Grid>
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.cust_num && errors.cust_num)}
                                helperText={touched.cust_num && errors.cust_num}
                                label="date dif [มากกว่า]"
                                name="date_dif"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.date_dif}
                              />
                      </Grid>
                      <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>
                            Credit term
                          </InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="UM"
                            fullWidth
                            value={values.Credit_term}
                            onChange={(e) => setFieldValue('Credit_term', e.target.value)}
                          >
                            <MenuItem value="">---- Credit term ----</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="15">15</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                            <MenuItem value="45">45</MenuItem>
                            <MenuItem value="60">60</MenuItem>
                            <MenuItem value="90">90</MenuItem>
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
                  { title: 'inv_date', field: 'inv_date', type: 'date' },
                  { title: 'inv_num', field: 'inv_num', type: 'string' },
                  { title: 'cust_num', field: 'cust_num', type: 'string' },
                  { title: 'name' , field: 'name', type: 'string'},
                  { title: 'inv_amount', field: 'inv_amount', type: 'number' },
                  { title: 'RECEIVEdate', field: 'RECEIVEdate', type: 'string' },
                  { title: 'Due_date', field: 'Due_date', type: 'date' },
                  { title: 'date dif', field: 'datedif', type: 'date' },
                  { title: 'credit_term', field: 'credit_term', type: 'number'}
                ]}
                data={data}
                options={{
                  exportButton: true,
                  printButton: true,
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
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

export default PaymentInvoice;
