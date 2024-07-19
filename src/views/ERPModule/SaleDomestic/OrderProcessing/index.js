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

const OrderProcessing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
         Order Processing
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  cust_po: '',
                  name: '',
                  port: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'http://localhost/sts_web_center/module/RPT_OrderProcessing/data.php',
                      {
                        params: {
                          load: 'V_WebApp_OrderProcessing',
                          cust_po: values.cust_po,
                          name: values.name,
                          Port: values.port,
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
                      <CTextField
                                error={Boolean(touched.cust_po && errors.cust_po)}
                                helperText={touched.cust_po && errors.cust_po}
                                label="Cust PO"
                                name="cust_po"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cust_po}
                              />
                      </Grid>
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                label="Name"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                              />
                      </Grid>
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.port && errors.port)}
                                helperText={touched.port && errors.port}
                                label="Port"
                                name="port"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.port}
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
                title={`Order Processing (${data.length} รายการ) `}
                columns={[
                  { title: 'Customer', field: 'cust_name', type: 'string' },
                  { title: 'PO.No', field: 'cust_po', type: 'number' },
                  {
                    title: 'Port',
                    field: 'Port',
                    type: 'number'
                  },
                  { title: 'Size', field: 'Size', type: 'string' },
                  { title: 'Spec', field: 'Spec', type: 'string' },
                  { title: 'Grade', field: 'Grade', type: 'string' },
                  { title: 'Schedule', field: 'Schedule', type: 'number'},
                  { title: 'Length', field: 'Length', type: 'string'},
                  { title: 'Type', field: 'TypeEnd', type: 'string'},
                  { title: "PCS/B'dle", field: 'PcsPerBndl', type: 'string' },
                  { title: "B'dle", field: 'BndlOrdered', type: 'string' },
                  { title: 'Produce[bundle]', field: 'BndlProduce', type: 'date' },
                  { title: 'Short produced', field: 'BalanceBndl', type: 'number' },
                  { title: 'Balance[bundle]', field: 'end_cust_name', type: 'number' },
                  { title: 'Due Date', field: 'due_date.date', type: 'number' },
                  { title: 'End Customer', field: 'end_cust_name', type: 'number' },
                  { title: 'Process', field: 'Process', type: 'string' },
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

export default OrderProcessing;
