import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';

import ImportExcel from './../ImportExcel'
const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  return (
    <Card  {...rest} className={clsx(classes.root, className)} >
      <form autoComplete="off" noValidate  >
        <CardHeader subheader="รายละเอียดเอกสาร (การนำสินค้าเข้าเขต Free Zone)" title="Document Header" />
        <Divider />
        <CardContent>
          <Grid container spacing={0}  >
            <Grid item xs={5}
              style={{ border: "solid", borderRadius: 16, padding: 15, margin: 5 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="ชื่อผู้ส่งออก" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="ที่อยู่" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="เบอร์โทรศัพท์" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="เลขประจำตัวผู้เสียภาษี" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} style={{ border: "solid", borderRadius: 16, padding: 15, margin: 5 }} >
              <Grid container spacing={2}  >
                <Grid item xs={6}>
                  <TextField fullWidth label="ประเภทใบขน" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="เลขที่ใบขนส่งสินค้า" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}  >
                <Grid item xs={6}>
                  <TextField fullWidth label="AWB" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Tax Incentives ID" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}  >
                <Grid item xs={6}>
                  <TextField fullWidth label="INV. no" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="วันที่" margin="dense" name="firstName" onChange={handleChange} required value={values.firstName} variant="outlined" />
                </Grid>
              </Grid>

              {/* <TextField  fullWidth label="Select State" margin="dense" name="state" onChange={handleChange} required select
                SelectProps={{ native: true }} value={values.state} variant="outlined">
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField> */}

            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <ImportExcel />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => { console.log(values) }}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
