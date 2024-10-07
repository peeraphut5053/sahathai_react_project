import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';

const RPTCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComma = num => {
    return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
         Customer Order
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  StartDate: moment().format('YYYY-MM-DD'),
                  EndDate: moment().format('YYYY-MM-DD')
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'RPT_Customer_report_order/data.php',
                      {
                        params: {
                          load: 'form',
                          txtStartDate: values.StartDate,
                          txtToDate: values.EndDate
                        }
                      }
                    );

                    if (response.data.length === 0) {
                      toast.error('ไม่พบข้อมูล');
                       setSubmitting(false);
                        return;
                    }

                    const newData = response.data.map(item => {
                        return {
                            ...item,
                            OrderDate: moment(item.OrderDate.date).format('YYYY-MM-DD'),
                            NetPrice: addComma(item.NetPrice),
                            UnitPrice: addComma(item.UnitPrice),

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
                  { title: 'Order Date', field: 'OrderDate', type: 'date' },
                  { title: 'Order', field: 'co_num', type: 'string' },
                  {
                    title: 'Customer',
                    field: 'custName',
                    type: 'string'
                  },
                  { title: 'Ship To', field: 'ShipName', type: 'string' },
                  { title: 'Cust PO', field: 'cust_po', type: 'string' },
                  { title: 'Terms', field: 'terms_code', type: 'string' },
                  { title: 'Line', field: 'co_line', type: 'string' },
                  { title: 'Item', field: 'item', type: 'string' },
                  { title: 'QTY(PSC)', field: 'qty_ordered_conv', type: 'string' },
                  { title: 'SALE by PCS/KG', field: 'uf_um2', type: 'string' },
                  { title: 'Price/PCS', field: 'UnitPrice', type: 'string' },
                  { title: 'Price/KG', field: 'Uf_PricePerKG', type: 'string' },
                  { title: 'Net Price', field: 'NetPrice', type: 'string' },
                ]}
                data={data}
                options={{
                 
                  maxBodyHeight: '70vh',
                  minBodyHeight: '70vh',
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

export default RPTCustomer;
