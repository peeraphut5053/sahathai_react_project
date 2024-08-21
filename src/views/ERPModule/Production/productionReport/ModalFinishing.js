import React, { useState } from 'react';
import {
  Grid,
  Modal,
} from '@material-ui/core';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Formik } from 'formik';
import tableIcons from '../../../components/table/tableIcons';
import customStyles from './customStyles.js';
import moment from 'moment';
import { Chip } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CAutocompleteReason from '../../../components/Input/CAutocompleteReason';
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import CTextField from 'src/views/components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';
import API from 'src/views/components/API';
import { useEffect } from 'react';
const useStyles = customStyles;
const ModalFinishing = ({values, openModal,handleCloseModal }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const loadFinishingReason = async (type) => {
    const response = await API.get("RPT_JOBPACKING/data.php", {
      params: {
        load: "SelectFinishing",
        txtw_c: values.w_c,
        startdate: values.startdate,
        enddate: values.enddate,
        type: type

      }
    });

    const newData = response.data.map((item) => {
      return {
        ...item,
        time_stopped: moment(item.time_stopped.date).format('DD-MM-YYYY'),
        time: moment(item.time_stopped.date).format('HH:mm:ss'),
      };
    })
   setData(newData);
  };

  useEffect(() => {
    if (openModal) {
      loadFinishingReason(1);
    }
  }, [openModal]);
  
  const AddNewReason = async (values) => {
  try {
    await API.get("RPT_JOBPACKING/data.php", {
      params: {
          load: 'AddNewReasonFinishing',
          reason_id: values.reason_id,
          time_stopped: values.time_stopped,
          down_time: values.down_time,
          w_c: values.w_c,
          remark: values.remark
      }
    });
    setOpen(false);
    loadFinishingReason(1);
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Grid
          container
          spacing={1}
          className={classes.paperModal}
          style={{
            width: '80vw',
            height: '98vh',
            marginLeft: '10vw',
            marginTop: '1vh'
          }}
        >
          <MaterialTable
            style={{ width: '98%', margin: '0%', overflowX: 'scroll' }}
            icons={tableIcons}
            title={`บันทึกสาเหตุการหยุดเครื่อง : ${values.w_c}`}
            columns={[
              {
                title: 'เวลาหยุดเครื่อง',
                field: 'time_stopped',
                type: 'date',
              },
              {
                title: 'เวลา',
                field: 'time',
                type: 'date',
              },
              { title: 'สาเหตุหลัก', field: 'reason_description', width: 100 },
              { title: 'หมายเหตุ', field: 'remark', width: 100 },
              {
                title: 'รวมเวลา',
                field: 'down_time',
                type: 'numeric',
                width: 100,
                headerStyle: {
                  fontSize: 12
                }
              },
              {
                title: 'work center',
                field: 'w_c',
                editable: 'never',
                width: 115,
                headerStyle: {
                  fontSize: 12
                }
              }
            ]}
            data={data}
            options={{
              search: false,
              paging: false,
              maxBodyHeight: '30vh',
              minBodyHeight: '30vh',
              exportButton: true,
              filtering: false,
              rowStyle: (rowData) => ({
                fontSize: 12,
                padding: 0
              })
            }}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{ padding: '0px 10px' }}>
                    <Chip
                      label={<AddCircleIcon />}
                      color="default"
                      style={{ marginRight: 5 }}
                      onClick={() => setOpen(true)}
                    />
                    <Chip
                      label="แสดงทุก Work Center"
                      color="default"
                      style={{ marginRight: 5 }}
                      onClick={() => loadFinishingReason(2)}
                    />
                  </div>
                </div>
              )
            }}
          />
        </Grid>
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)}>
      <Grid container spacing={0} className={classes.paperModalSM}>
<Grid item xs={12} >
    <Formik
        initialValues={
            {
                reason_id: '',
                time_stopped: values.startdate,
                down_time: '',
                w_c: values.w_c,
                remark: ''
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
                <Grid container spacing={2}>
                    <Grid item lg={12}>บันทึกสาเหตุการหยุดเครื่อง </Grid>
                    <Grid item lg={6}>
                        <CTextField
                            error={Boolean(touched.time_used && errors.time_used)}
                            helperText={touched.time_used && errors.time_used}
                            label="Work center"
                            name="w_c"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.w_c}
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <DateTimePicker
                            label="วันเวลาเริ่ม"
                            name={"time_stopped"}
                            value={values.time_stopped}
                            onBlur={handleBlur}
                            onChange={e => setFieldValue('time_stopped', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <CTextField
                            error={Boolean(touched.down_time && errors.down_time)}
                            helperText={touched.down_time && errors.down_time}
                            label="รวมเวลาหยุดเครื่อง"
                            name="down_time"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.down_time}
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <CAutocompleteReason
                            onBlur={handleBlur}
                            name="reason_description"
                            value={values.reason_id}
                            setFieldValue={setFieldValue}
                            type="FinishingReason"
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <CTextField
                            error={Boolean(touched.remark && errors.remark)}
                            helperText={touched.remark && errors.remark}
                            label="หมายเหตุ"
                            name="remark"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.remark}
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <CButton label={"บันทึกสาเหตุการหยุดเครื่อง"} onClick={() => AddNewReason( values)} disabled={false} />
                    </Grid>
                </Grid>
            </form>
        )}
    </Formik>
</Grid>
</Grid>
      </Modal>
    </>
  );
};

export default ModalFinishing;
