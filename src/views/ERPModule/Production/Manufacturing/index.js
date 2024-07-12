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
import CAutocomplete from 'src/views/components/Input/CAutocomplete ';

const ManufacturingReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        Manufacturing Report
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD'),
                  Item: "",
                  Ref_num: "",
                  w_c: ""
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_MANUFACTURING/data.php',
                      {
                        params: {
                          load: 'ajax',
                          txtFromDate: values.StartDate,
                          txtToDate: values.EndDate,
                          txtItem: values.Item,
                          txtref_num: values.Ref_num,
                          txtw_c: values.w_c
                        }
                      }
                    );

                    const newData = response.data.map((item, index) => {
                      return {
                        ...item,  
                        trans_date: moment(item.trans_date).format('DD/MM/YYYY'),
                      }
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
                      <Grid item xs={2}>
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
                      <Grid item xs={2}>
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
                      <Grid item xs={2}>
                      <CTextField
                                error={Boolean(touched.Item && errors.Item)}
                                helperText={touched.Item && errors.Item}
                                label="Item"
                                name="Item"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Item}
                              />
                      </Grid>
                      <Grid item xs={2}>
                      <CTextField
                                error={Boolean(touched.Ref_num && errors.Ref_num)}
                                helperText={touched.Ref_num && errors.Ref_num}
                                label="Ref_num"
                                name="Ref_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Ref_num}
                              />
                      </Grid>
                      <Grid item xs={2}>
                       <CAutocomplete 
                       onBlur={handleBlur}
                       name="w_c"
                       value={values.w_c}
                       setFieldValue={setFieldValue}

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
                title={`Manufacturing Report(${data.length} รายการ) `}
                columns={[
                  { title: 'Transaction Date', field: 'trans_date', type: 'date' },
                  { title: 'Ref Number', field: 'ref_num', type: 'string' },
                  {
                    title: 'Item',
                    field: 'item',
                    type: 'string'
                  },
                  { title: 'Description', field: 'ItemDesc', type: 'string' },
                  { title: 'unit weight', field: 'unit_weight', type: 'number' },
                  { title: 'A', field: 'qty_a', type: 'number', render: rowData => rowData.qty_a ? parseInt(rowData.qty_a) : 0},
                  { title: 'B', field: 'qty_b', type: 'number', render: rowData => rowData.qty_b ? parseInt(rowData.qty_b) : 0},
                  { title: 'C', field: 'qty_c', type: 'number', render: rowData => rowData.qty_c ? parseInt(rowData.qty_c) : 0},
                  { title: 'Work center', field: 'wc', type: 'string' },
                  { title: 'Work center name', field: 'wc_name', type: 'string' },
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

export default ManufacturingReport;
