import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import Select from 'react-select';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import useCustomer from './useCustomer';

const CollectionDay = () => {
  const { data: Customer, isLoading, error } = useCustomer();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
    
  }
  
  const addComma = num => {
    return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  const options = Customer.map(item => ({
      value: item.cust_num,
      label: item.cust_name
  }))

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
        Collection Day Report
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  Customer: null,
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD')
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPTCOLLECTION_DAY/data.php',
                      {
                        params: {
                          load: 'ajax',
                          StartDate: values.StartDate,
                          EndDate: values.EndDate,
                          Cust: values.Customer,
                        }
                      }
                    );

                    if (response.data.length == 0) {
                      toast.error('ไม่พบข้อมูล');
                       setSubmitting(false);
                        return;
                    }
                    console.log(response.data);

                    const newData = response.data.map(item => {
                        return {
                            ...item,
                            amount: addComma(item.amount),
                            sales_tax: addComma(item.sales_tax),
                            remain: addComma(item.remain),
                            inv_date: moment(item.inv_date.date).format('DD/MM/YYYY'),
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
                {({ values, handleBlur, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Select
                            menuPortalTarget={document.body} 
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            options={options}
                            isMulti
                            closeMenuOnSelect={false}
                            value={values.Customer}
                            onChange={e => {
                                setFieldValue('Customer',  e);
                            }}
                            placeholder="Customer"
                         />
                      </Grid>
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
                title={`General Ledger Domestic Invoice (${data.length} รายการ) `}
                columns={[
                  { title: 'cust_num', field: 'cust_num', type: 'string' },
                  { title: 'name', field: 'name', type: 'string' },
                { title: 'inv_num', field: 'inv_num', type: 'string' },
                { title: 'apply_to_inv', field: 'apply_to_inv', type: 'string' },
                { title: 'amount', field: 'amount', type: 'number' },
                { title: 'sales_tax', field: 'sales_tax', type: 'number' },
                { title: 'remain', field: 'remain', type: 'number' },
                { title: 'due_date_day', field: 'due_date_day', type: 'date' },
                { title: 'inv_date', field: 'inv_date', type: 'number' },
                { title: 'due_date', field: 'due_date.date', type: 'date' },
                { title: 'receipt_date', field: 'receipt_date', type: 'string' },
                { title: 'inv_to_due', field: 'inv_to_due', type: 'number' },
                { title: 'inv_to_recpt', field: 'inv_to_receipt', type: 'string' },
                { title: 'due_to_recpt', field: 'due_to_receipt', type: 'string' },
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

export default CollectionDay;
