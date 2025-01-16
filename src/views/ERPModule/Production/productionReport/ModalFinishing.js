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
import CTextField from 'src/views/components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';
import API from 'src/views/components/API';
import { useEffect } from 'react';

const useStyles = customStyles;
const ModalFinishing = ({values, openModal,handleCloseModal }) => {
  const classes = useStyles();
  const [types, setTypes] = useState(1);
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});
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
        time_stopped: moment(item.time_stopped.date).format('DD/MM/YYYY'),
        start: moment(item.time_stopped.date).format('HH:mm:ss'),
        time_end: item.time_end ? moment(item.time_end?.date).format('DD/MM/YYYY') : '',
        end: item.time_end ? moment(item.time_end?.date).format('HH:mm:ss') : '',
        time_stop: item.time_stopped.date
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

  if (values.w_c === '' && types === 1) {
    alert('กรุณาเลือก Work Center');
    return false;
  }

  if (values.reason_id === '' && types === 1) {
    alert('กรุณาเลือกสาเหตุการหยุดเครื่อง');
    return false;
  }

  try {
    await API.get("RPT_JOBPACKING/data.php", {
      params: {
        load: types === 1 ? 'AddNewReasonFinishing' : 'UpdateReasonFinishing',
        time_stopped: types === 2 ? reason.time_stop : '',
        w_c: values.w_c,
        reason_id: values.reason_id,
        remark: values.remark,
        id: types === 2 ? reason.id : ''
      }
    });
    setOpen(false);
    loadFinishingReason(1);
  } catch (error) {
    if (error.response.status === 400) {  
      alert('Work Center นี้มีการบันทึกสาเหตุการหยุดเครื่องแล้ว');
    }
  }
}

const handleOpen = (type) => {
  if (type === 'Add') {
    setTypes(1);
  } else {
    setTypes(2);
  }
  
  setOpen(true);
};

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
            selectable={true}
            columns={[
              {
                title: 'Status',
                field: 'down_time',
                type: 'text',
                render: rowData => {
                  return rowData.down_time === null ? 'กําลังดําเนินการ' : 'เสร็จสิ้น';
                },
                cellStyle: (rowData) => {
                  return {
                    backgroundColor: rowData === null ? '#ff6666' : '#99ff99',
                    textAlign: 'center',
                  };
                },
                headerStyle: {
                  textAlign: 'center'
                }
                
              },
              {
                title: 'วันที่เริ่มต้น',
                field: 'time_stopped',
                type: 'date',
              },
              {
                title: 'วันที่สิ้นสุด',
                field: 'time_end',
                type: 'date',
              },
              {
                title: 'เวลาเริ่มต้น',
                field: 'start',
                type: 'date',
              },
              {
                title: 'เวลาสิ้นสุด',
                field: 'end',
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
              maxBodyHeight: '80vh',
              minBodyHeight: '80vh',
              exportButton: true,
              filtering: false,
              rowStyle: (rowData) => ({
                fontSize: 12,
                padding: 0
              }),
            }}
            onRowClick={(event, rowData) => {
              if (rowData.down_time !== null) {
                alert('สาเหตุการหยุดเครื่องนี้เป็นสถานะเสร็จสิ้นแล้ว');
                return false;
              }
              handleOpen('Edit');
              setReason(rowData);
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
                      onClick={() => handleOpen('Add')}
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
                    <Grid item lg={12}>
                        <CTextField
                            error={Boolean(touched.time_used && errors.time_used)}
                            helperText={touched.time_used && errors.time_used}
                            label="Work center"
                            name="w_c"
                            onBlur={handleBlur}
                            value={types === 1 ? values.w_c : reason.w_c}
                            Autocomplete={false}
                            disabled={types === 2}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        {types === 1 ? (
                          <CAutocompleteReason
                          onBlur={handleBlur}
                          name="reason_description"
                          value={values.reason_description}
                          setFieldValue={setFieldValue}
                          type="FinishingReason"
                          wc={values.w_c}
                      />
                        ) : (
                          <CTextField
                          error={Boolean(touched.reason_description && errors.reason_description)}
                          helperText={touched.reason_description && errors.reason_description}
                          label="สาเหตุการหยุดเครื่อง"
                          name="reason_description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={reason.reason_description}
                          Autocomplete={false}
                          disabled
                          />
                        )}
                    </Grid>
                    <Grid item lg={12}>
                        <CTextField
                            error={Boolean(touched.remark && errors.remark)}
                            helperText={touched.remark && errors.remark}
                            label="หมายเหตุ"
                            name="remark"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={types === 1 ? values.remark : reason.remark}
                            Autocomplete={false}
                            disabled={types === 2}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <CButton label={types === 1 ? 'บันทึกสาเหตุการหยุดเครื่อง' : 'เสร็จสิ้นการหยุดเครื่อง'} onClick={() => AddNewReason(values)} disabled={false} />
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
