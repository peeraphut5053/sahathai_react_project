import React, { useState } from 'react';
import { Grid, IconButton, Modal, Paper, Snackbar } from '@material-ui/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake-thai/build/vfs_fonts";
import moment from "moment";
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import CButton from '../../../components/Input/CButton';
import { Formik } from 'formik';
import CTextField from '../../../components/Input/CTextField';
import API from '../../../components/API';
import { Alert, AlertTitle } from '@material-ui/lab';
import CAutocomplete from '../../../components/Input/CAutocomplete ';

import customStyles from "./customStyles.js";
import ProductionDailyReportTable from './ProductionDailyReportTable';

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";



moment.locale("th");
const useStyles = customStyles

const Stock_mthly = () => {
  const classes = useStyles();
  const [data, setdata] = useState([])
  const [isLoadingData, setisLoadingData] = useState(false)
  const [openModalItem, setOpenModalItem] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [itemModal, setitemModal] = useState(null)

  const handleOpenModalItem = async (item) => {
    console.log(item)
    setitemModal(item)
    setOpenModalItem(true);
  };



  const setLocalStorageW_c = (w_c) => {
    localStorage.setItem("w_c", w_c);
  }

  const SearchFn = async (load, values) => {
    setLocalStorageW_c(values.w_c)
    setisLoadingData(true)
    let spilt_monthyear = values.yearmonth.split("-")
    try {
      const response = await API.get("API_STS_Stock_mthly/data.php", {
        params: {
          load: load,
          month: spilt_monthyear[1],
          year: spilt_monthyear[0],
        }
      });
      setdata(response.data)
      setisLoadingData(false)
    } 
    catch (error) {
      alert(error)
      console.log("error", error);
    }
  }

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const pdfDocGenerator = pdfMake.createPdf("");
  pdfDocGenerator.getDataUrl((dataUrl) => {
    const targetElement = document.querySelector('#iframeContainer');
    const iframe = document.createElement('iframe');
    iframe.src = dataUrl;
    targetElement.appendChild(iframe);
  });






  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    alert()
    setAnchorEl(null);
  };


  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM'));

  const handleDateChange = (Date) => {
    setSelectedDate(Date);
  };

  return (
    <Paper className={classes.paper}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error" variant="filled">
          <AlertTitle>Error</AlertTitle>
          กรุณเลือก work center
        </Alert>
      </Snackbar>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <Formik
            initialValues={
              {
                startdate: moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                enddate: moment('17:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                yearmonth:moment('17:00:', 'HH:mm').format('YYYY-MM')
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
                <Grid container spacing={2}>

                  <Grid item lg={12} >
                    <Grid container spacing={2}>
                      <Grid item lg={2} >

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <DatePicker
                              variant="outlined"
                              openTo="year"
                              views={["year", "month"]}
                              label="Year and Month"
                              // helperText="Start from year selection"
                              value={values.yearmonth}
                              name = "yearmonth"
                              onChange={e => { setFieldValue('yearmonth', moment(e).format('YYYY-MM')) }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              inputVariant="outlined"
                              size="small"
                              type="text"
                              fullWidth
                            />
                            {/* <DateTimePicker
                            label="วันเวลาสิ้นสุด"
                            name={"enddate"}
                            value={values.enddate}
                            onBlur={handleBlur}
                            onChange={e => { setFieldValue('enddate', moment(e).format('YYYY-MM-DD HH:mm:ss')) }}
                          /> */}
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>


                      <Grid item lg={1}>
                        <CButton label={"Search"} onClick={() => { SearchFn("API_STS_Stock_mthly", values) }} />
                      </Grid>
                      <Grid item lg={2}>
                        {JSON.stringify(selectedDate)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </form>
            )}
          </Formik>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProductionDailyReportTable
                isLoading={isLoadingData}
                data={data}
                setdata={setdata}
                handleOpenModalItem={handleOpenModalItem}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Stock_mthly;