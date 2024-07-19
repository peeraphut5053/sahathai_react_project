import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';
import { addComma } from 'src/utils/getInitials';

const RPT_DO = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
      รายงาน DO ที่ยังไม่เปิด INV
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD'),
                  Do_num: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'http://localhost/sts_web_center/module/RPTDO_PENDING_1/data.php',
                      {
                        params: {
                          load: 'RPTDO_PENDING_1',
                          txtFromDate: values.StartDate,
                          txtToDate: values.EndDate,
                        }
                      }
                    );

                    const newData = response.data.map(item => {
                      return {
                        ...item,
                        qty_shipped: addComma(item.qty_shipped),
                        price: addComma(item.price),
                        do_value: addComma(item.do_value),
                        qty_invoiced: addComma(item.qty_invoiced),
                        price_conv: addComma(item.price_conv),
                        qty_ordered_conv: addComma(item.qty_ordered_conv),
                        Total_qty_inv: addComma(item.Total_qty_inv),
                      };
                    });

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
                {({ values, handleBlur, handleSubmit, handleChange, setFieldValue, touched, errors }) => (
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
                      {/*<Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.Do_num && errors.Do_num)}
                                helperText={touched.Do_num && errors.Do_num}
                                label="Do Num"
                                name="Do_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Do_num}
                              />
                      </Grid>*/}
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
                title={`รายงาน DO ที่ยังไม่เปิด INV (${data.length} รายการ) `}
                columns={[
                  { title: 'Do Num', field: 'do_num', type: 'string' },
                  { title: 'Do Line', field: 'do_line', type: 'number' },
                  {
                    title: 'Do Seq',
                    field: 'do_seq',
                    type: 'number'
                  },
                  { title: 'Do Status', field: 'do_status', type: 'string' },
                  { title: 'co num', field: 'co_num', type: 'string' },
                  { title: 'co_line', field: 'co_line', type: 'number'},
                  { title: 'cust_num', field: 'cust_num', type: 'string'},
                  { title: 'cust_name', field: 'cust_name', type: 'string'},
                  { title: 'Item', field: 'item', type: 'string' },
                  { title: 'item_name', field: 'item_name', type: 'string' },
                  { title: 'Ship Date', field: 'ship_date.date', type: 'date' },
                  { title: 'date_seq', field: 'date_seq', type: 'number' },
                  { title: 'qty_shipped', field: 'qty_shipped', type: 'number' },
                  { title: 'price', field: 'price', type: 'number' },
                  { title: 'do_value', field: 'do_value', type: 'number' },
                  { title: 'u_m', field: 'u_m', type: 'string' },
                  { title: 'qty_invoiced', field: 'qty_invoiced', type: 'number' },
                  { title: 'price_conv', field: 'price_conv', type: 'number' },
                  { title: 'qty_ordered_conv', field: 'qty_ordered_conv', type: 'number' },
                  { title: 'Total_qty_inv', field: 'Total_qty_inv', type: 'number' },
                  { title: 'ship UM', field: 'inv_UM', type: 'string' },
                  { title: 'cust_po', field: 'cust_po', type: 'number' },
                  { title: 'Lot', field: 'lot', type: 'number' },
                ]}
                data={data}
                options={{
                  exportButton: true,
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  maxBodyHeight: '70vh',
                  minBodyHeight: '70vh',
                  exportButton: true,
                  doubleHorizontalScroll: true,
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

export default RPT_DO;
