import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import CTextField from 'src/views/components/Input/CTextField';


import { Formik } from 'formik';
import moment from "moment";
import CAutocompleteReason from '../../components/Input/CAutocompleteReason';
import CAutocompleteReasonDetail from '../../components/Input/CAutocompleteReasonDetail';
import DateTimePicker from '../../components/Input/CDateTimePicker';
import CButton from 'src/views/components/Input/CButton';
import TransferEmployeeList from './TransferEmployeeList';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CAutocompleteDepartment from 'src/views/components/Input/CAutocompleteDepartment';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '90%',
    width: '95%',
    marginTop: '1%',
    marginLeft: '2.5%',
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



const CreateOTReport = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false} style={{ paddingTop: 10 }}>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
          >
            <Formik
              initialValues={
                {
                  reason_id: '',
                  reason_detail_id: '',
                  time_stopped: moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                  time_used: '',
                  w_c: '',
                  remark: '',
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
                  {/* {JSON.stringify(values)} */}
                  <Paper style={{ padding: 10 }}>
                    <Grid container spacing={1}>
                      {/* <Grid item lg={12}> ใบขออนุมัติทำงานล่วงเวลา(OT) </Grid> */}

                      <Grid item lg={6}>
                        <Paper style={{ padding: 10 }}>

                          <Grid container spacing={1}>

                            <Grid item lg={4}>
                              <TextField
                                id="date"
                                label="วันที่"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={4}>
                              <CAutocompleteDepartment
                                onBlur={handleBlur}
                                name="reason_id"
                                value={values.reason_id}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item lg={4}>
                              <TextField
                                id="outlined-read-only-input"
                                label="Create by"
                                defaultValue="Hello World"
                                InputProps={{
                                  readOnly: true,
                                }}
                                variant="outlined"
                                size="small"

                              />
                            </Grid>
                            <Grid item lg={12} >
                              <FormControl component="fieldset" style={{ fontSize: 10 }}>
                                <FormLabel component="legend"><span style={{ fontSize: '0.8rem' }}>ประเภทของ OT</span></FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                  <FormControlLabel value="OT" control={<Radio color="primary" />} label={<span style={{ fontSize: '0.8rem' }}>{"วันปกติ"}</span>} />
                                  <FormControlLabel value="oliday" control={<Radio color="primary" />} label={<span style={{ fontSize: '0.8rem' }}>{"ทำงานวันหยุด"}</span>} />
                                  <FormControlLabel value="holidayOT" control={<Radio color="primary" />} label={<span style={{ fontSize: '0.8rem' }}>{"ล่วงเวลาวันหยุด"}</span>} />
                                </RadioGroup>
                              </FormControl>
                            </Grid>

                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item lg={6}>
                        <Paper style={{ padding: 10 }}>
                          <TextField
                            style={{ width: '100%' }}
                            error={Boolean(touched.remark && errors.remark)}
                            helperText={touched.remark && errors.remark}
                            id="outlined-multiline-static"
                            label="สรุปรายงานผลการทำ OT: ปริณาณงานที่ทำได้ / สาเหตุที่ไม่สามารถทำงานได้ตามเป้าหมายได้กำหนด"
                            name="remark"
                            multiline
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.remark}
                            rows={3}
                            defaultValue="Default Value"
                            variant="outlined"
                          />
                        </Paper>
                      </Grid>


                      {/* <Grid item lg={12}>
                      <CButton label={"123"} onClick={() => alert(values)} disabled={false} />
                    </Grid> */}
                    </Grid>
                  </Paper>


                </form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: 10 }}>
              <TransferEmployeeList />
            </Paper>

          </Grid>
          <Grid item xs={12} style={{ alignItems: 'center' }}>
            <Paper className={classes.paper}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}

              >Save
            </Button>
              <Button
                size="small"
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CancelPresentationIcon />}
                style={{ marginLeft: 10 }}
                onClick={props.handleCloseModalItem}
              >Cancel
            </Button>
            </Paper>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateOTReport;
