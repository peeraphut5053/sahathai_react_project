import React,{ useState} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import MaterialTable from 'material-table';
import tableIcons from '../../../components/table/tableIcons';
import { Formik } from 'formik';
import moment from 'moment';
import CTextField from 'src/views/components/Input/CTextField';
import { SearchOutlined } from '@material-ui/icons';
import DateTimePicker from 'src/views/components/Input/CDatePicker';
import { toast } from 'react-toastify';
import API from 'src/views/components/API';
moment.locale('th');

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    minHeight: '95%',
    paddingBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1)
  }
}));

const DomesticBacklogView = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Page className={classes.root} title="Customers">
      <Typography variant="h4" style={{ margin: '10px', textAlign: 'center' }}>
        รายงานค้างส่งในประเทศ
      </Typography>
      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            StartDate: moment().format('YYYY-MM-DD'),
            EndDate: moment().format('YYYY-MM-DD'),
            item: '',
            co_start: '',
            co_end: '',
            cus_no: '',
          }}
          onSubmit={ async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                console.log(values);
                const response = await API.get(
                  'http://localhost/sts_web_center/module/RPTINV_OUTSTANDING/data.php',
                  {
                    params: {
                      load: 'ajax',
                      txtFromDate_start: values.StartDate,
                      txtFromDate_end: values.EndDate,
                      txtFromItemOrDes: values.item,
                      txtFromCoNum_start: values.co_start,
                      txtFromCoNum_end: values.co_end,
                      txtFromCusnumOrName: values.cus_no,
                    }
                  }
                );
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
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <DateTimePicker
                        label="วันเวลาเริ่ม"
                        name={'StartDate'}
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
                    <Grid item xs={3}>
                      <DateTimePicker
                        label="วันเวลาสิ้นสุด"
                        name={'EndDate'}
                        value={values.EndDate}
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setFieldValue(
                            'EndDate',
                            moment(e).format('YYYY-MM-DD')
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <CTextField
                        error={Boolean(touched.Item && errors.Item)}
                        helperText={touched.Item && errors.Item}
                        label="Item"
                        name="Item"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.Item}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <CTextField
                        error={Boolean(touched.co_start && errors.co_start)}
                        helperText={touched.co_start && errors.co_start}
                        label="Co Start"
                        name="co_start"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.co_start}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <CTextField
                        error={Boolean(touched.co_end && errors.co_end)}
                        helperText={touched.co_end && errors.co_end}
                        label="Co End"
                        name="co_end"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.co_end}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <CTextField
                        error={Boolean(touched.cus_no && errors.cus_no)}
                        helperText={touched.cus_no && errors.cus_no}
                        label="Cus No/Name"
                        name="cus_no"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cus_no}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container spacing={2}>
                    <Grid item lg={5}>
                      <Button
                        startIcon={<SearchOutlined />}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Search
                      </Button>
                    </Grid>
                    <Grid item lg={5}>
                      <Button variant="contained" color="inherit">
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>

      <MaterialTable
        title={`รายงานค้างส่งในประเทศ ${data.length} รายการ`}
        icons={tableIcons}
        style={{ width: '99%', margin: 5, overflowX: 'scroll', fontSize: 13 }}
        columns={[
          { title: 'order date', field: 'order_date' },
          { title: 'co number', field: 'co_num' },
          { title: 'cust po', field: 'cust_po' },
          { title: 'cust number', field: 'cust_num' },
          { title: 'name', field: 'name' },
          { title: 'item', field: 'item' },
          { title: 'description', field: 'description' },
          { title: 'qty order', field: 'qty_order' },
          { title: 'qty shipped', field: 'qty_shipped' },
          { title: 'qty pending', field: 'qty_pending' }
        ]}
        data={data}
        options={{
          search: false,
          paging: false,
          maxBodyHeight: '70vh',
          minBodyHeight: '70vh',
          exportButton: true,
          filtering: false
        }}
      />
    </Page>
  );
};

export default DomesticBacklogView;
