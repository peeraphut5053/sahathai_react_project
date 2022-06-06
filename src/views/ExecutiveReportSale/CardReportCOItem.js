import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, Modal, Paper, Radio, RadioGroup, Snackbar, Typography, Avatar,
  Box,
  colors,
  makeStyles
} from '@material-ui/core';


import CTextField from '../components/Input/CTextField';
import MaterialTable from 'material-table';
import { Formik } from 'formik';
import moment from "moment";
import DateTimePicker from '../components/Input/CDateTimePicker';
//import CAutocomplete from '../../../components/Input/CAutocomplete ';
import CAutocomplete from '../components/Input/CAutocomplete ';
import CButton from '../components/Input/CButton';
import tableIcons from '../components/table/tableIcons'
import API from '../components/API';

moment.locale("th");


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();

  const [data, setdata] = useState([])


  const SearchFn = async (load, values) => {
    const response = await API.get("API_ExecutiveReport/data.php", {
      params: {
        load: load,
        startDate: values.startdate,
        endDate: values.enddate,
        start_co_num: values.start_co_num,
        end_co_num: values.end_co_num,
      }
    })
    setdata(response.data)
  }
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}

    >

      <CardContent >
        <Grid container spacing={3} >









          <Formik
            initialValues={
              {
                // startdate: moment('2021-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                // enddate: moment('2021-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                startdate: moment('2021-02-27', 'YYYY-MM-DD').format('YYYY-MM-DD'),
                enddate: moment('2021-02-28', 'YYYY-MM-DD').format('YYYY-MM-DD'),
                start_co_num:'',
                end_co_num:'',
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
                {/* <Button color="primary" variant="contained" onClick={() => { handleOpenModalItem(123) }}>1234</Button> */}


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
                  <Grid item xs={2}>
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
                  </Grid>
                  <Grid item xs={2}>
                    <CButton label={"Search"} onClick={() => { SearchFn("STS_rpt_COitem", values, "") }} />
                  </Grid>
                </Grid>

              </form>
            )}
          </Formik>





          <Grid item style={{ width: '100%', margin: 5, overflowX: "auto" }}>
            <MaterialTable

              icons={tableIcons}
              title={`Customer Order Line (${data.length} รายการ) `}
              columns={[
                { title: 'co_num', field: 'co_num' },
                { title: 'Type', field: 'Type' },
                { title: 'createdby', field: 'createdby', type: 'string' },
                { title: 'cust_num', field: 'cust_num', type: 'string' },
                { title: 'co_line', field: 'co_line', type: 'string' },
                { title: 'item', field: 'item', type: 'string' },
                { title: 'qty_ordered', field: 'qty_ordered', type: 'string' },
                { title: 'u_m', field: 'u_m', type: 'string' },
                { title: 'co_price', field: 'co_price', type: 'string' },
                { title: 'totalWeight', field: 'totalWeight', type: 'string' },
                { title: 'do_num', field: 'do_num', type: 'string' },
                { title: 'qty_shipped', field: 'qty_shipped', type: 'string' },
                { title: 'do_price', field: 'do_price', type: 'string' },
                { title: 'actualWeight', field: 'actualWeight', type: 'string' },
                { title: 'inv_num', field: 'inv_num', type: 'string' },
                { title: 'qty_invoiced', field: 'qty_invoiced', type: 'string' },
                { title: 'inv_price', field: 'inv_price', type: 'string' },
                { title: 'inv_weight', field: 'inv_weight', type: 'string' },
              ]}
              data={data}


              options={{
                exportButton: true,
                cellStyle: { padding: '0.1' },
                headerStyle: { padding: '0.1' },
                search: false,
                paging: false,
                maxBodyHeight: '65vh',
                minBodyHeight: '65vh',
                sorting: false,
                filtering: false,
                // width: '100vw',
                exportButton: true,
                rowStyle: rowData => ({
                  // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                  fontSize: 12,
                  padding: 0,
                  width: 500,
                  fontFamily: 'sans-serif'
                }
                ),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
