import React, { useState } from 'react';

import {
  Button,
  Container,
  Grid,
  FormControl, InputLabel,Select,MenuItem ,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';
import moment from 'moment';
import useGetTransType from '../../Finance/WorkbenchShipping/useGetTransType';
import useGetUMList from '../../Finance/WorkbenchShipping/useGetUMList';

const JobOrder = () => {
  const { data: trans, isLoading } = useGetTransType();
  const { data: um, isLoading: umLoading } = useGetUMList();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '10px', textAlign: 'center' }}>
       Job Order Processing
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  lot: '',
                  ref_num: '',
                  trans_type: '',
                  um: '',
                  location: '',
                  item: '',
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD'),
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_JOBORDERPROCESSING/data.php',
                      {
                        params: {
                          load: 'ajax',
                          txtLot: values.lot,
                          txtref_num: values.ref_num,
                          txttrans_type: values.trans_type,
                          txtu_m: values.um,
                          location: values.location,
                          item: values.item,
                          txtFromDate: values.StartDate,
                          txtToDate: values.EndDate
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
                            
                            qty: addComma(item.qty),
                        };
                    });
    
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
                {({
                  errors,
                  touched,
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={3}></Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <CTextField
                          error={Boolean(touched.item && errors.item)}
                          helperText={touched.item && errors.item}
                          label="Item"
                          name="item"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.item}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          error={Boolean(touched.lot && errors.lot)}
                          helperText={touched.lot && errors.lot}
                          label="Lot"
                          name="lot"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lot}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          error={Boolean(touched.location && errors.location)}
                          helperText={touched.location && errors.location}
                          label="Location"
                          name="location"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.location}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          error={Boolean(touched.ref_num && errors.ref_num)}
                          helperText={touched.ref_num && errors.ref_num}
                          label="Ref num"
                          name="ref_num"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.ref_num}
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
                            value={values.trans_type}
                            onChange={(e) => setFieldValue('trans_type', e.target.value)}
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
                            value={values.um}
                            onChange={(e) => setFieldValue('um', e.target.value)}
                          >
                            {um?.map(({u_m}) => (
                              <MenuItem key={u_m} value={u_m}>{u_m}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
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
                title={`Tag Status (${data.length} รายการ) `}
                columns={[
                  {
                    title: 'Transaction Date',
                    field: 'trans_date.date',
                    type: 'string',
                  },
                  {
                    title: 'Transaction Type',
                    field: 'trans_description',
                    type: 'string',
                  },
                  {
                    title: 'Location',
                    field: 'loc',
                    type: 'string',
                  },
                  {
                    title: 'Lot',
                    field: 'lot',
                    type: 'string',
                  },
                  {
                    title: 'Ref Number',
                    field: 'ref_num',
                    type: 'string',
                  },
                  {
                    title: 'Item',
                    field: 'item',
                    type: 'string',
                  },
                  {
                    title: 'Description',
                    field: 'ItemDesc',
                    type: 'string',
                  },
                  {
                    title: 'Quantity',
                    field: 'qty',
                    type: 'string'
                  },
                  {
                    title: 'U/M',
                    field: 'ItemUM',
                    type: 'string',
                  },
                  {
                    title: 'Date and Time of Transaction',
                    field: 'RecordDate.date',
                    type: 'string',     }
                ]}
                data={data}
                options={{
                  exportButton: true,
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
                  maxBodyHeight: '65vh',
                  minBodyHeight: '65vh',
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  columnsButton: true,
                  doubleHorizontalScroll: true,
                  headerStyle: {
                    backgroundColor: '#039be5',
                    color: '#FFF',
                    textAlign: 'center'
                  },
                  cellStyle: {
                    textAlign: 'center',
                    fontSize: '14px'
                  },
                  
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobOrder;
