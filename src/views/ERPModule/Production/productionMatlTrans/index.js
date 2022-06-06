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



moment.locale("th");
const useStyles = customStyles

const ProductionMatlTrans = () => {
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
    try {
      const response = await API.get("RPT_JOB_MATLTRANS/data.php", {
        params: {
          load: load,
          txtFromDate: values.startdate,
          txtToDate: values.enddate,
          txtItem: values.item,
          txtlot: values.lot,
          txttrans_type: values.trans_type,
          txtref_type: values.ref_type,
          txtwc: values.wc,
          txtloc: values.loc,
          txtsts_no: values.sts_no
        }
      });
      // console.log("------------------------------------")

      setdata(response.data)
      setisLoadingData(false)
    } catch (error) {
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
    setAnchorEl(null);
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
                startdate: moment('2020-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                enddate: moment('2020-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                // startdate: moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                // enddate: moment('17:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
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
                  <Grid container spacing={2}>
                    <Grid item lg={12} >
                      <Grid container spacing={2}>
                        <Grid item lg={2} >
                          <DateTimePicker
                            label="วันเวลาเริ่ม"
                            name={"startdate"}
                            value={values.startdate}
                            onBlur={handleBlur}
                            onChange={e => setFieldValue('startdate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                          />
                        </Grid>
                        <Grid item lg={2}>
                          <DateTimePicker
                            label="วันเวลาสิ้นสุด"
                            name={"enddate"}
                            value={values.enddate}
                            onBlur={handleBlur}
                            onChange={e => { setFieldValue('enddate', moment(e).format('YYYY-MM-DD HH:mm:ss')) }}
                          />
                        </Grid>
                        <Grid item lg={2}>
                          <CTextField
                            error={Boolean(touched.item && errors.item)}
                            helperText={touched.item && errors.item}
                            label="item"
                            name="item"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.item}
                            Autocomplete={false}
                          />
                        </Grid>
                        <Grid item lg={2}>
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
                        <Grid item lg={2}>
                          <CAutocomplete
                            onBlur={handleBlur}
                            name="w_c"
                            value={values.w_c}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item lg={1}>
                          <CTextField
                            error={Boolean(touched.sts_no && errors.sts_no)}
                            helperText={touched.sts_no && errors.sts_no}
                            label="STS NO"
                            name="sts_no"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.sts_no}
                          />
                        </Grid>
                        <Grid item lg={1}>
                          <CButton label={"Search"} onClick={() => { SearchFn("ajax2", values) }} />
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

export default ProductionMatlTrans;