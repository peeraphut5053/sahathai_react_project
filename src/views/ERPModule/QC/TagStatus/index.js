import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
    top: '35%',
    left: '38%'
  },
  h2: {
    textAlign: 'center',
    paddingBottom: '20px'

  },
  btn: {
    marginTop: '20px',
    marginRight: '10px'
  }

}));

const TagStatus = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setError(false);
      setOpen(false);
    } else {
      setError(true);
      return false;
    }
  
  }

  const body = (
    <div className={classes.paper}>
      <h2 className={classes.h2}>กรุณาใส่ Password</h2>
      <form onSubmit={handleSubmit}>
        <TextField variant='outlined' fullWidth label="Password" name="password" type="password" value={password} error={error} autoFocus
          onChange={(e) => setPassword(e.target.value)}
         />
        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          size="meldium"
        >
          Confirm
        </Button>
        <Button className={classes.btn} variant="contained" size="meldium" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </form>
    </div>
  );

  return (
    <Container maxWidth={false}>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Typography variant="h4" style={{ margin: '10px', textAlign: 'center' }}>
        Tag Status
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} xl={12} xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item style={{ width: '100%', overflowX: 'auto' }}>
              <Formik
                initialValues={{
                  StartDate: null,
                  status: '',
                  tag_id: '',
                  sts_no: '',
                  job: '',
                  item: '',
                  lot: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const response = await API.get(
                      'REPORT_TagStatus/data.php',
                      {
                        params: {
                          load: 'SearchTagStatus',
                          mfg_date: values.StartDate,
                          tag_id: values.tag_id,
                          sts_no: values.sts_no,
                          job: values.job,
                          item: values.item,
                          lot: values.lot,
                          tag_status: values.status
                        }
                      }
                    );

                    if (response.data.length == 0) {
                      toast.error('ไม่พบข้อมูล');
                      setSubmitting(false);
                      return;
                    }
                    setData(response.data);
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
                {({
                  errors,
                  touched,
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={3}></Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.tag_id && errors.tag_id)}
                          helperText={touched.tag_id && errors.tag_id}
                          label="Tag id"
                          name="tag_id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.tag_id}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.sts_no && errors.sts_no)}
                          helperText={touched.sts_no && errors.sts_no}
                          label="Sts no"
                          name="sts_no"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.sts_no}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.job && errors.job)}
                          helperText={touched.job && errors.job}
                          label="Job"
                          name="job"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.job}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CTextField
                          error={Boolean(touched.item && errors.item)}
                          helperText={touched.item && errors.item}
                          label="item"
                          name="item"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.item}
                        />
                      </Grid>
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>Status</InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="Please Status"
                            fullWidth
                            value={values.status}
                            onChange={(e) =>
                              setFieldValue('status', e.target.value)
                            }
                          >
                            <MenuItem value="Good">Good</MenuItem>
                            <MenuItem value="OnHold">OnHold</MenuItem>
                            <MenuItem value="Follow">Follow</MenuItem>
                            <MenuItem value="Reject">Reject</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <DateTimePicker
                          label="Date"
                          name={'Date'}
                          value={values.StartDate}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            setFieldValue(
                              'StartDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
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
                title={`Tag Status (${data.length} รายการ) `}
                columns={[
                  {
                    title: 'Tag id',
                    field: 'id',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'sts no',
                    field: 'sts_no',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Job',
                    field: 'job',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'item',
                    field: 'item',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Description',
                    field: 'description',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Lot',
                    field: 'lot',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Old Lot',
                    field: 'old_lot',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'Quantity',
                    field: 'qty1',
                    type: 'string',
                    editable: 'never'
                  },
                  {
                    title: 'TagStatus',
                    field: 'tag_status',
                    type: 'string',
                    lookup: {
                      Good: 'Good',
                      OnHold: 'OnHold',
                      Follow: 'Follow',
                      Reject: 'Reject'
                    }
                  },
                  { title: 'Detail', field: 'detail', type: 'string', cellStyle: { width: '30%' }}
                ]}
                data={data}
                cellEditable={{
                  onCellEditApproved: (
                    newValue,
                    oldValue,
                    rowData,
                    columnDef
                  ) => {
                    return new Promise((resolve, reject) => {
                      if (columnDef.field === 'tag_status') {
                        API.get(
                          'REPORT_TagStatus/data.php',
                          {
                            params: {
                              load: 'update_status',
                              id: rowData.id,
                              status_value: newValue
                            }
                          }
                        );
                        const newData = [...data];
                        const index = data.indexOf(rowData);
                        newData[index].tag_status = newValue;
                        setData(newData);
                      } else {
                        API.get(
                          'REPORT_TagStatus/data.php',
                          {
                            params: {
                              load: 'save_detail',
                              detail_id: rowData.id,
                              detail_value: newValue
                            }
                          }
                        );
                        const newData = [...data];
                        const index = data.indexOf(rowData);
                        newData[index].detail = newValue;
                        setData(newData);
                      }
                      setTimeout(resolve, 1000);
                    });
                  }
                }}
                options={{
                  exportButton: true,
                  cellStyle: { padding: '0.1' },
                  headerStyle: { padding: '0.1' },
                  maxBodyHeight: '65vh',
                  minBodyHeight: '65vh',
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  doubleHorizontalScroll: true,
                  headerStyle: {
                    backgroundColor: '#039be5',
                    color: '#FFF',
                    textAlign: 'center'
                  },
                  cellStyle: {
                    textAlign: 'center',
                    fontSize: '14px'
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

export default TagStatus;
