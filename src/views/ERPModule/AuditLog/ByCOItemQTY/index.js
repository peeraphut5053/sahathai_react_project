import React, { useEffect, useState } from 'react';
import { Card, CardContent, Container, Grid } from '@mui/material';
import Page from 'src/components/Page';
import { isMobile } from "react-device-detect";
import clsx from 'clsx';
import { Formik } from 'formik';
import moment from "moment";
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import CButton from '../../../components/Input/CButton';
import API from '../../../components/API';
import DataTable from 'src/components/DataTable';
import styles from './ByCOItemQTY.module.css';

const ByCOItemQTY = ({ className, ...rest }) => {
  const [data, setdata] = useState([])
  useEffect(() => {
    if (isMobile == true) {
      setTimeout(() => {
        document.documentElement.webkitRequestFullScreen();
      }, 5000);
    }
  }, [])

  const SearchFn = async (load, values) => {
    const response = await API.get("API_ExecutiveReport/data.php", {
      params: {
        load: load,
        startDate: values.startdate,
        endDate: values.enddate,
      }
    })
    setdata(response.data)
  }

  const columns = [
    { title: 'username', field: 'username' },
    { title: 'CreateDate.date', field: 'CreateDate.date', type: 'datetime' },
    { title: 'COnumLine', field: 'COnumLine', type: 'string' },
    { title: 'oldvalue', field: 'oldvalue', type: 'string' },
    { title: 'newvalue', field: 'newvalue', type: 'string' },
  ];

  const rowStyle = () => ({
    fontSize: 12,
    padding: 0,
    width: 500,
    fontFamily: 'sans-serif'
  });


  return (
    <Page className={styles.root} title="Dashboard" >
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid item sm={12} xl={12} xs={12} lg={12} >
            <Card className={clsx(styles.root, className)} {...rest} style={{ backgroundColor: '#FFFFFF' }} >
              <CardContent >
                <Grid container spacing={3} >
                  <Grid item style={{ width: '100%', overflowX: "auto" }}>
                    <Formik
                      initialValues={
                        {
                          // startdate: moment('2021-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                          // enddate: moment('2021-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                          startdate: moment().format('YYYY-MM-DD'),
                          enddate: moment().format('YYYY-MM-DD'),
                          start_co_num: '',
                          end_co_num: '',
                          // startdate: moment('08:00:', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                          // enddate: moment('21:00', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                          item: '',
                          refnum: '',
                          w_c: localStorage.getItem("w_c")
                        }
                      }
                      validate={values => {
                        const warnings = {};
                        if (!values.w_c) { warnings.w_c = 'แนะนำให้ใส่'; }
                        // return { errors: {}, warnings: {} };
                        return warnings;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          setSubmitting(false);
                        }, 400);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <Grid item xs={3} >
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={3} >
                              <DateTimePicker
                                label="วันเวลาเริ่ม"
                                name={"enddate"}
                                value={values.startdate}
                                onBlur={handleBlur}
                                onChange={e => setFieldValue('startdate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <DateTimePicker
                                label="วันเวลาสิ้นสุด"
                                name={"enddate"}
                                value={values.enddate}
                                onBlur={handleBlur}
                                onChange={e => { setFieldValue('enddate', moment(e).format('YYYY-MM-DD HH:mm:ss')) }}
                              />
                            </Grid>
                            {/* <Grid item xs={2}>
                              <CTextField
                                error={Boolean(touched.item && errors.item)}
                                helperText={touched.item && errors.item}
                                label="CO start"
                                name="start_co_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.start_co_num}
                                Autocomplete={false}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <CTextField
                                error={Boolean(touched.refnum && errors.refnum)}
                                helperText={touched.refnum && errors.refnum}
                                label="CO end"
                                name="end_co_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.end_co_num}
                              />
                            </Grid> */}
                            <Grid item xs={2}>
                              <CButton label={"Search"} onClick={() => { SearchFn("auditlog", values, "") }} />
                            </Grid>
                          </Grid>

                        </form>
                      )}
                    </Formik>
                  </Grid>


                  <Grid item style={{ width: '100%', margin: 5, overflowX: "auto" }}>
                    <DataTable
                      title={`Audit Log By CO Item QTY (${data.length} รายการ) `}
                      columns={columns}
                      data={data}
                      maxBodyHeight="60vh"
                      search={false}
                      sorting={false}
                      exportButton
                      exportFileName="audit-log-by-co-item-qty.csv"
                      rowStyle={rowStyle}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};



export default ByCOItemQTY;
