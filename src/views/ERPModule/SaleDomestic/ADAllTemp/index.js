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

const ADAllTemp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        AD All Temp
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  StartDate: new Date(),
                  EndDate: new Date(),
                  to_invnum: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'AD_All_Temp/data.php',
                      {
                        params: {
                          load: 'search',
                          from_invnum: values.form_invnum,
                          to_invnum: values.to_invnum,
                          fromDate: values.StartDate,
                          toDate: values.EndDate,
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
                          name={'StartDate'}
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
                          name={'EndDate'}
                          value={values.EndDate}
                          onBlur={handleBlur}
                          onChange={e =>
                            setFieldValue(
                              'EndDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.from_invnum && errors.from_invnum)}
                                helperText={touched.from_invnum && errors.from_invnum}
                                label="From inv_num"
                                name="form_invnum"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.from_invnum}
                              />
                      </Grid>
                      <Grid item xs={3}>
                      <CTextField
                                error={Boolean(touched.to_invnum && errors.to_invnum)}
                                helperText={touched.to_invnum && errors.to_invnum}
                                label="To inv_num"
                                name="to_invnum"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.to_invnum}
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
                  { title: 'inv_num', field: 'inv_num', type: 'string' },
                  { title: 'inv_date', field: 'inv_date', type: 'string' },
                  {
                    title: 'cust_num',
                    field: 'cust_num',
                    type: 'string'
                  },
                  { title: 'terms_code', field: 'terms_code', type: 'string' },
                  { title: 'item', field: 'item', type: 'string' },
                  { title: 'Qty_Shipt', field: 'Qty_Shipt', type: 'string' },
                  { title: 'Amount_US', field: 'Amount_US', type: 'number'},
                  { title: 'AmountUSD2', field: 'AmountUSD2', type: 'string'},
                  { title: 'AmountUSD', field: 'AmountUSD', type: 'string'},
                  { title: "ShippedTerm", field: 'ShippedTerm', type: 'string' },
                  { title: "temp", field: 'temp', type: 'string' },
                  { title: 'sales_term', field: 'sales_term', type: 'string' },
                  { title: 'BL_date', field: 'BL_date', type: 'date' },
                  { title: 'entry_num1', field: 'entry_num1', type: 'number' },
                  { title: 'entry_num2', field: 'entry_num2', type: 'number' },
                  { title: 'entry_type1', field: 'entry_type1', type: 'number' },
                  { title: 'entry_type2', field: 'entry_type2', type: 'string' },
                  { title: 'port_code1', field: 'port_code1', type: 'string' },
                  { title: 'port_code2', field: 'port_code2', type: 'string' },
                  { title: 'ENTDATEU1', field: 'ENTDATEU1', type: 'string' },
                  { title: 'ENTDATEU2', field: 'ENTDATEU2', type: 'string' },
                  { title: 'BL_num1', field: 'BL_num1', type: 'string' },
                  { title: 'BL_num2', field: 'BL_num2', type: 'string' },
                  { title: 'importer1', field: 'importer1', type: 'string' },
                  { title: 'importer2', field: 'importer2', type: 'string' },
                  { title: 'AD_rate1', field: 'AD_rate1', type: 'string' },
                  { title: 'AD_rate2', field: 'AD_rate2', type: 'string' },
                  { title: 'AD_amount1', field: 'AD_amount1', type: 'string' },
                  { title: 'AD_amount2', field: 'AD_amount2', type: 'string' },
                  { title: 'ENTVALUE1', field: 'ENTVALUE1', type: 'string' },
                  { title: 'ENTVALUE2', field: 'ENTVALUE2', type: 'string' },
                  { title: 'amount_FOB', field: 'amount_FOB', type: 'string' },
                  { title: 'N_WT_MT', field: 'N_WT_MT', type: 'string' },
                  { title: 'G_WT_MT', field: 'G_WT_MT', type: 'string' },
                  { title: 'recpt_date', field: 'recpt_date', type: 'string' },
                  { title: 'Uf_Weight_FT', field: 'Uf_Weight_FT', type: 'string' },
                  { title: 'Uf_Weight_metre', field: 'Uf_Weight_metre', type: 'string' },
                  { title: 'Shipped_To', field: 'Shipped_To', type: 'string' },
                  { title: 'AMT_BHT', field: 'AMT_BHT', type: 'string' },
                ]}
                data={data}
                options={{
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

export default ADAllTemp;
