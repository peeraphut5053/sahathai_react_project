import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Select from 'react-select';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';
import axios from 'axios';
import DatePicker from 'src/views/components/Input/DatePicker';

const JobMaterial = () => {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState([]);
  const [process, setProcess] = useState(1);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await axios.get(
          'http://localhost/sts_web_center/module/APP_JOB_JobReceipt/data.php',
          {
            params: {
              load: 'loc_list'
            }
          }
        );

        const options = response.data.map((item) => ({
          value: item.loc,
          label: item.loc + ' - ' + item.description
        }));
        setOptions(options);
      } catch (error) {
        toast.error('ไม่สามารถเชื่อมต่อ Server ได้');
      }
    };
    loadOptions();
  }, []);

  const tagScan = async (job, setFieldValue,jobScan) => {
    try {
      if (step === 1) {
        const response = await axios.get(
            'http://localhost/sts_web_center/module/APP_JOB_JobMaterialTransactions/data.php',
            {
              params: {
                load: 'GetJob',
                job: job
              }
            }
          );
          console.log(response.data[0]);
          if (response.data.length === 0) {
            toast.error('ไม่พบข้อมูล');
            setProcess(1);
            return;
          }
          setFieldValue('jobScan', job);
          setFieldValue('doc', response.data[0].DocRef);
          setFieldValue('production', response.data[0].QtyOrd);
          setFieldValue('produced', response.data[0].QtyRcvd);
          setFieldValue('job', response.data[0].jobname);
          setFieldValue('wc', response.data[0].wc);
          setFieldValue('resource', response.data[0].rgid);
          setFieldValue('BarCode', '');
          setStep(2);

      } else {
        const response = await axios.get(
          'http://localhost/sts_web_center/module/APP_JOB_JobMaterialTransactions/data.php',
          {
            params: {
              load: 'GetTag',
              tag: job,
              job: jobScan
            }
          }
        );

        if (response.data.length === 0) {
          toast.error('ไม่พบข้อมูล');
          setProcess(1);
          return;
        }

        setFieldValue('totalWithdraw', response.data[0].QtyRem);
        setFieldValue('withdraw', response.data[0].QtyIss);
        setFieldValue('tag', job);
        setFieldValue('loc', response.data[0].loc);
        setFieldValue('lot', response.data[0].lot);
        setFieldValue('item', response.data[0].item);
        setFieldValue('item_desc', response.data[0].itemName);
        setFieldValue('qty1', response.data[0].qty1);
        setFieldValue('um', response.data[0].um);
        setFieldValue('qty2', response.data[0].qty2);
        setFieldValue('um2', response.data[0].um2);
        setFieldValue('BarCode', '');
        setProcess(0);
      }

      setProcess(0);
    } catch (error) {
      toast.error('ไม่สามารถเชื่อมต่อ Server ได้');
    }
  };

  return (
    <Container maxWidth={false}>
      <Paper style={{ padding: '40px', marginTop: '10px' }}>
      <Typography variant="h4" style={{ marginBottom: '10px', textAlign: 'center' }}>
        JobMaterial
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  BarCode: '',
                  jobScan: '',
                  doc: '',
                  production: '',
                  totalWithdraw: '',
                  withdraw: '',
                  produced: '',
                  date: moment().format('DD/MM/YYYY'),
                  job: '',
                  wc: '',
                  resource: '',
                  tag: '',
                  loc: '',
                  lot: '',
                  item: '',
                  item_desc: '',
                  id: '',
                  qty1: '',
                  um: '',
                  qty2: '',
                   um2: '',
                }}
                onSubmit={async (values, { setSubmitting, setFieldValue }) => {

                  if (values.Location === '') {
                    toast.error('กรุณาเลือก Location');
                    return;
                  }
                  try {
                    setSubmitting(true);
                    const response = await axios.get(
                      'http://localhost/sts_web_center/module/APP_JOB_JobMaterialTransactions/data.php',
                      {
                        params: {
                          load: 'MatProcess',
                          job: values.job,
                          suffix: 0,
                          operNum: 10,
                          um: values.um,
                          item: values.item,
                          itemDesc: values.item_desc,
                          wc: values.wc,
                          loc: values.loc,
                          lot: values.lot,
                          qty1: values.qty1,
                          qty2: values.qty2,
                          doc: values.doc,
                        }
                      }
                    );
                    setProcess(1);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {({ values, handleBlur, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <TextField
                          variant="outlined"
                          style={{ backgroundColor: '#99ff99' }}
                          size="small"
                          fullWidth
                          label="Scan Barcode"
                          name={'BarCode'}
                          autoComplete='off'
                          value={values.BarCode}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            setFieldValue('BarCode', e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              tagScan(values.BarCode, setFieldValue, values.jobScan);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          size="meldium"
                          onClick={handleSubmit}
                          disabled={process}
                        >
                          Process
                        </Button>
                        <Button
                          type="button"
                          variant="contained"
                          style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                          size="meldium"
                        >
                          Clear
                        </Button>
                      </Grid>
                    </Grid>
                    <hr style={{ margin: '30px' }} />
                    <Typography
                      variant="h5"
                      style={{
                        margin: '15px',
                        textAlign: 'center',
                        textDecoration: 'underline'
                      }}
                    >
                      Detail
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Doc No."
                          name={'doc'}
                          value={values.doc}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                      <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="ยอดสั่งผลิต"
                          name={'production'}
                          value={values.production}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Date"
                          name={'date'}
                          value={values.date}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="ยอดเบิกทั้งหมด"
                          name={'totalWithdraw'}
                          value={values.totalWithdraw}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="๋Job"
                          name={'Job'}
                          value={values.job}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="เบิกไปแล้ว"
                          name={'withdraw'}
                          value={values.withdraw}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Work Center"
                          name={'wc'}
                          value={values.wc}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="ผลิตไปแล้ว"
                          name={'produced'}
                          value={values.produced}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Resource"
                          name={'Resource'}
                          value={values.resource}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Tag"
                          name={'Tag'}
                          value={values.tag}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Location"
                          name={'Location'}
                          value={values.loc}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Lot"
                          name={'Lot'}
                          value={values.lot}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Item"
                          name={'Item'}
                          value={values.item}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Item Desc"
                          name={'item_desc'}
                          value={values.item_desc}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="รหัสเหล็กม้วน"
                          name={'id'}
                          value={values.id}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Qty1"
                          name={'qty1'}
                          value={values.qty1}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label=""
                          name={'um'}
                          value={values.um}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Qty2"
                          name={'qty2'}
                          value={values.qty2}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label=""
                          name={'um2'}
                          value={values.um2}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
    </Container>
  );
};

export default JobMaterial;
