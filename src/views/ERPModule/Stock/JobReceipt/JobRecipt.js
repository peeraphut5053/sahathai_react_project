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
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';
import ModalManagement from 'src/views/components/ModalNopaperSmall';

const JobRecicpt = () => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [process, setProcess] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await API.get(
          'APP_JOB_JobReceipt/data.php',
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

  const tagScan = async (tag_id, setFieldValue) => {
    try {
      const response = await API.get(
        'APP_JOB_JobReceipt/data.php',
        {
          params: {
            load: 'tag_scan',
            tag_id: tag_id
          }
        }
      );

      if (response.data.length === 0) {
        toast.error('ไม่พบข้อมูล');
        setFieldValue('BarCode', '');
        setFieldValue('suffix', '');
        setFieldValue('Job', '');
        setFieldValue('Item', '');
        setFieldValue('ItemDesc', '');
        setFieldValue('oper_num', '');
        setFieldValue('qty1', '');
        setFieldValue('lot', '');
        setFieldValue('uf_sts_job', '');
        setProcess(1);
        return;
      }

      if (response.data[0].receipt == 1) {
        toast.error('Tag นี้ถูกใช้งานแล้ว');
        setFieldValue('BarCode', '');
        setFieldValue('suffix', '');
        setFieldValue('Job', '');
        setFieldValue('Item', '');
        setFieldValue('ItemDesc', '');
        setFieldValue('oper_num', '');
        setFieldValue('qty1', '');
        setFieldValue('lot', '');
        setFieldValue('uf_sts_job', '');
        setProcess(1);
        return;
      }
      
      setFieldValue('Job', response.data[0].job);
      setFieldValue('suffix', '');
      setFieldValue('suffix', response.data[0].suffix);
      setFieldValue('Item', response.data[0].item);
      setFieldValue('ItemDesc', response.data[0].description);
      setFieldValue('oper_num', response.data[0].oper_num);
      setFieldValue('qty1', response.data[0].qty1);
      setFieldValue('lot', response.data[0].lot);
      setFieldValue('uf_sts_job', response.data[0].uf_sts_job)
      setData(response.data[0]);
      setProcess(0);
    } catch (error) {
      toast.error('ไม่สามารถเชื่อมต่อ Server ได้');
    }
  };

  return (
    <Container maxWidth={false}>
      <Paper style={{ padding: '40px', marginTop: '10px' }}>
      <Typography variant="h4" style={{ marginBottom: '10px', textAlign: 'center' }}>
        JobRecicpt
      </Typography>
       <ModalManagement open={loading} modalDetail={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}><CircularProgress /></div>} />
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  Location: '',
                  suffix: '',
                  BarCode: '',
                  Job: '',
                  Item: '',
                  ItemDesc: '',
                  oper_num: '',
                  trans_date: moment().format('DD/MM/YYYY'),
                  qty1: '',
                  lot: '',
                  uf_sts_job: ''
                }}
                onSubmit={async (values, { setSubmitting, setFieldValue }) => {
              
                  if (values.Location === '') {
                    toast.error('กรุณาเลือก Location');
                    return;
                  }

                  setProcess(1);
                  setLoading(true);

                  // want delay 2sec
                  await new Promise((resolve) => setTimeout(resolve, 2000));

                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'APP_JOB_JobReceipt/data.php',
                      {
                        params: {
                          load: 'process_job_receipt',
                          job: data.job,
                          item: data.item,
                          suffix: data.suffix,
                          operNum: data.oper_num,
                          transDate: values.trans_date,
                          qty: values.qty1,
                          qty2: data.qty2,
                          lot: data.lot,
                          loc: values.Location.value,
                          tag_id: values.BarCode
                        }
                      }
                    );
                    setFieldValue('BarCode', '');
                    setFieldValue('suffix', '');
                    setFieldValue('Job', '');
                    setFieldValue('Item', '');
                    setFieldValue('ItemDesc', '');
                    setFieldValue('oper_num', '');
                    setFieldValue('qty1', '');
                    setFieldValue('lot', '');
                    setFieldValue('uf_sts_job', '');
                    alert('บันทึกเรียบร้อยแล้ว');
                    setLoading(false);
                  } catch (error) {
                    console.log(error);
                    setLoading(false);
                  }
                }}
              >
                {({ values, handleBlur, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <Select
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused ? 'grey' : 'red',
                            }),

                          }}
                          options={options}
                          closeMenuOnSelect={true}
                          value={values.Location}
                          onChange={(e) => {
                            setFieldValue('Location', e);
                          }}
                          placeholder="Location *"
                        />
                      </Grid>
                      <Grid item xs={2}>
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
                              tagScan(values.BarCode, setFieldValue);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Job *"
                          name={'Job'}
                          value={values.Job}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="*"
                          name={'suffix'}
                          value={values.suffix}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
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
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <TextField
                          variant="filled"
                          size="small"
                          fullWidth
                          label="Item"
                          name={'Item'}
                          value={values.Item}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          variant="filled"
                          size="small"
                          fullWidth
                          label="Item Description"
                          name={'ItemDesc'}
                          value={values.ItemDesc}
                          onBlur={handleBlur}
                          disabled
                        />
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
                          label="Operations *"
                          name={'Item'}
                          value={values.oper_num}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                      <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Transaction Date *"
                          name={'trans_date'}
                          value={values.trans_date}
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
                          label="Quantity *"
                          name={'Item'}
                          value={values.qty1}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="System Location"
                          name={'System Location'}
                          value={values.Location.value}
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
                          label="Lot *"
                          name={'Item'}
                          value={values.lot}
                          onBlur={handleBlur}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <CTextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Document Number"
                          name={'Item'}
                          value={values.uf_sts_job}
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

export default JobRecicpt;
