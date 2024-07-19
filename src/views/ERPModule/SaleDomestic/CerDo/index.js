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

const CerDo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        สร้างใบ Cer Do
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
                      'http://localhost/sts_web_center/module/CER_DO/data.php',
                      {
                        params: {
                          load: 'ajax2',
                          txtCerDate: values.StartDate,
                          txtShipDate: values.EndDate,
                          txtDoNum: values.Do_num,
                        }
                      }
                    );
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
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.Do_num && errors.Do_num)}
                                helperText={touched.Do_num && errors.Do_num}
                                label="Do Num"
                                name="Do_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Do_num}
                              />
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
                title={`Cer Do (${data.length} รายการ) `}
                columns={[
                  { title: 'Pickup Date', field: 'pickup_date_conv', type: 'date' },
                  { title: 'เลขที่ใบกำกับ', field: 'do_num', type: 'string' },
                  {
                    title: 'Do Seq',
                    field: 'do_seq',
                    type: 'string'
                  },
                  { title: 'ลูกค้า', field: 'cust_name', type: 'string' },
                  { title: 'รายการ', field: 'item_desc', type: 'string' },
                  { title: 'จำนวนเส้น', field: 'qty_conv', type: 'number'},
                  { title: 'คลัง', field: 'Loc', type: 'string'},
                  { title: 'Lot', field: 'lots', type: 'string'},
                  { title: 'Lot Qty', field: 'QtyBundle', type: 'number' },
                  { title: 'Qty Shipping', field: 'qty_shipped', type: 'number' },
                  { title: 'Ship Date', field: 'ship_date_conv', type: 'date' },
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

export default CerDo;
