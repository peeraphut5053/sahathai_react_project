import React, { useState } from 'react';
import useGetTransType  from './useGetTransType';
import useGetUMList from './useGetUMList';
import { Button, Container, Grid, Typography,FormControl, InputLabel,Select,MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';

const WorkbenchShipping = () => {
  const [data, setData] = useState([]);
  const {data: trans, isLoading } = useGetTransType();
  const {data: um, isLoading: umLoading } = useGetUMList();
  const [loading, setLoading] = useState(false);

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
         Workbench Shipping
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                    StartDate: moment().format('YYYY-MM-DD'),
                    EndDate: moment().format('YYYY-MM-DD'),
                    Lot: '',
                    Ref_num : '',
                    TransType: '',
                    UM : ''
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
                   
                    if (response.data.length == 0) {
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
                                error={Boolean(touched.Lot && errors.Lot)}
                                helperText={touched.Lot && errors.Lot}
                                label="Lot"
                                name="Lot"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Lot}
                              />
                      </Grid>
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>
                            TransType
                          </InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="TransType"
                            fullWidth
                            value={values.TransType}
                            onChange={(e) => setFieldValue('TransType', e.target.value)}
                          >
                            {trans?.map(({id, trans_description}) => (
                              <MenuItem key={id} value={trans_description}>{trans_description}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>
                            U/M
                          </InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="UM"
                            fullWidth
                            value={values.UM}
                            onChange={(e) => setFieldValue('UM', e.target.value)}
                          >
                            {um?.map(({u_m}) => (
                              <MenuItem key={u_m} value={u_m}>{u_m}</MenuItem>
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

export default WorkbenchShipping;
