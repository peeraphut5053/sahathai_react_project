import React, { useEffect, useState,useRef } from 'react';
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
import axios from 'axios';
import DatePicker from 'src/views/components/Input/DatePicker';
import ModalManagement from 'src/views/components/ModalNopaperSmall';

const JobMaterial = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const tableRef = useRef();
  const [step, setStep] = useState(1);
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

  useEffect(() => {
    if (tableRef.current && data.length > 0) {
      // เลือกแถวแรก (index 0)
      tableRef.current.dataManager.changeRowSelected(true, [data.length - 1]);
      selectedRows.push(data[data.length - 1]);
    }
  }, [data]);

  const tagScan = async (job, setFieldValue,jobScan) => {
    try {
      if (step === 1) {
  
        const response = await API.get(
            'APP_JOB_JobMaterialTransactions/data.php',
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

          // job 10 char

          const newJob = job.substring(0, 10);

          setFieldValue('jobScan', job);
          setFieldValue('doc', response.data[0].DocRef);
          setFieldValue('production', response.data[0].QtyOrd);
          setFieldValue('produced', response.data[0].QtyRcvd);
          setFieldValue('job', newJob);
          setFieldValue('wc', response.data[0].wc);
          setFieldValue('resource', response.data[0].rgid);
          setFieldValue('BarCode', '');
          setStep(2);

      } else {
        const check = data.find((item) => item.tag_id === job);

        if (check) {
          alert('Tag ซ้ํา');
          return false;
        }
        const response = await API.get(
          'APP_JOB_JobMaterialTransactions/data.php',
          {
            params: {
              load: 'GetTag',
              tag: job,
              job: jobScan
            }
          }
        );

        if (response.data.length === 0) {
          alert('Tag นี้ถูกใช้งานแล้ว');
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

        setData([...data, {
          ...response.data[0],
          tag_id: job,
          qty2: response.data[0].qty2 !== null ? Number(response.data[0].qty2).toFixed(2) : response.data[0].qty2
        }]);
      }

   
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
      <ModalManagement open={loading} modalDetail={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}><CircularProgress /></div>} />
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
                  if (selectedRows.length === 0) {
                    toast.error('กรุณาเลือก Tag อย่างน้อย 1 Tag');
                    return;
                  }
                  setLoading(true);
                  try {
                    setSubmitting(true);
                    const response = await API.post(
                      'APP_JOB_JobMaterialTransactions/data.php?load=MatProcess',
                      {
                       
                          load: 'MatProcess',
                          job: values.job,
                          suffix: 0,
                          operNum: 10,
                          data: selectedRows
                      },
                    );

                    setLoading(false);
                    setProcess(1);
                    setFieldValue('doc', '');
                    setFieldValue('production', '');
                    setFieldValue('BarCode', '');
                    setFieldValue('jobScan', '');
                    setFieldValue('totalWithdraw', '');
                    setFieldValue('withdraw', '');
                    setFieldValue('produced', '');
                    setFieldValue('date', moment().format('DD/MM/YYYY'));
                    setFieldValue('job', '');
                    setFieldValue('wc', '');
                    setFieldValue('resource', '');
                    setFieldValue('tag', '');
                    setFieldValue('loc', '');
                    setFieldValue('lot', '');
                    setFieldValue('item', '');
                    setFieldValue('item_desc', '');
                    setFieldValue('id', '');
                    setFieldValue('qty1', '');
                    setFieldValue('um', '');
                    setFieldValue('qty2', '');
                    setFieldValue('um2', '');
                    setProcess(1);
                    setStep(1);
                    setData([]);
                    setSelectedRows([]);
                  } catch (error) {
                    console.log(error);
                    setLoading(false);
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
                          onClick={() => {
                            setFieldValue('doc', '');
                            setFieldValue('production', '');
                            setFieldValue('BarCode', '');
                            setFieldValue('jobScan', '');
                            setFieldValue('totalWithdraw', '');
                            setFieldValue('withdraw', '');
                            setFieldValue('produced', '');
                            setFieldValue('date', moment().format('DD/MM/YYYY'));
                            setFieldValue('job', '');
                            setFieldValue('wc', '');
                            setFieldValue('resource', '');
                            setFieldValue('tag', '');
                            setFieldValue('loc', '');
                            setFieldValue('lot', '');
                            setFieldValue('item', '');
                            setFieldValue('item_desc', '');
                            setFieldValue('id', '');
                            setFieldValue('qty1', '');
                            setFieldValue('um', '');
                            setFieldValue('qty2', '');
                            setFieldValue('um2', '');
                            setProcess(1);
                            setStep(1);
                            setData([]);
                            setSelectedRows([]);
                          }}
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
      <hr style={{ margin: '10px' }} />
      <MaterialTable
                      tableRef={tableRef}
                      icons={tableIcons}
                      title={` Tag List (${data.length}) `}
                      columns={[
                      { title: 'Tag ID', field: 'tag_id', type: 'string' },
                      { title: 'Item', field: 'item', type: 'string' },
                      { title: 'Description', field: 'itemName', type: 'string' },
                      { title: 'loc', field: 'loc', type: 'string'},
                      { title: 'lot', field: 'lot', type: 'numerics' },
                      { title: 'qty1', field: 'qty1', type: 'numerics' },
                      { title: 'qty2', field: 'qty2', type: 'numerics' },
                      { title: 'UM', field: 'UM', type: 'string' },
                      { title: 'UM2', field: 'UM2', type: 'string' },
                      { title: 'Doc', field: 'DocRef', type: 'string' },
                      ]}
                      data={data}
                      options={{
                        search: true,
                        paging: false,
                        sorting: false,
                        filtering: false,
                        exportButton: true,
                        selection: true,
                        doubleHorizontalScroll: false,
                        headerStyle: {
                          backgroundColor: '#039be5',
                          color: '#FFF',
                          textAlign: 'center'
                        },
                        cellStyle: {
                          textAlign: 'center',
                          fontSize: '14px',
                          padding: '5px'
                        }
                      }}
                      onSelectionChange={(rows) => {
                        setSelectedRows(rows);
                      }}
                    />
    </Container>
  );
};

export default JobMaterial;
