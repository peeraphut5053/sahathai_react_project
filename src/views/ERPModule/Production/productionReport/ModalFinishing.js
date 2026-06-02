import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import styles from './ProductionReport.module.css';
import moment from 'moment';
import DataTable from 'src/components/DataTable';
import { Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CAutocompleteReason from '../../../components/Input/CAutocompleteReason';
import CTextField from 'src/views/components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';
import API from 'src/views/components/API';

const ModalFinishing = ({ values, openModal, handleCloseModal }) => {
  const [types, setTypes] = useState(1);
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});
  const [open, setOpen] = useState(false);
  const [latestFinishingRows, setLatestFinishingRows] = useState([]);
  const [latestActiveFinishingRows, setLatestActiveFinishingRows] = useState([]);
  const [loadingLatestFinishingStatus, setLoadingLatestFinishingStatus] = useState(false);
  const [openActiveFinishingModal, setOpenActiveFinishingModal] = useState(false);

  const normalizeFinishingRows = (rows) => (Array.isArray(rows) ? rows : []).map((item) => {
    const stoppedDate = item.time_stopped?.date || item.time_stopped;
    const endDate = item.time_end?.date || item.time_end;
    const createDate = item.create_date?.date || item.create_date;

    return {
      ...item,
      time_stopped: stoppedDate ? moment(stoppedDate).format('DD/MM/YYYY') : '',
      start: stoppedDate ? moment(stoppedDate).format('HH:mm:ss') : '',
      time_end: endDate ? moment(endDate).format('DD/MM/YYYY') : '',
      end: endDate ? moment(endDate).format('HH:mm:ss') : '',
      time_stop: stoppedDate,
      create_date_raw: createDate
    };
  }).sort((a, b) => {
    const timeA = a.create_date_raw ? new Date(a.create_date_raw).getTime() : 0;
    const timeB = b.create_date_raw ? new Date(b.create_date_raw).getTime() : 0;

    return timeB - timeA;
  });

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

    setData(normalizeFinishingRows(response.data));
  };

  const loadLatestFinishingStatus = async () => {
    if (!values.w_c) {
      setLatestFinishingRows([]);
      setLatestActiveFinishingRows([]);
      return;
    }

    setLoadingLatestFinishingStatus(true);

    try {
      const response = await API.get("RPT_JOBPACKING/data.php", {
        params: {
          load: "SelectFinishingLatest",
          wc: values.w_c,
        }
      });

      const latestRows = normalizeFinishingRows(response.data);
      const latestRow = latestRows[0];
      setLatestFinishingRows(latestRow ? [latestRow] : []);
      setLatestActiveFinishingRows(latestRow && latestRow.down_time === null ? [latestRow] : []);
    } catch (error) {
      console.log("load latest finishing status error", error);
      setLatestFinishingRows([]);
      setLatestActiveFinishingRows([]);
    } finally {
      setLoadingLatestFinishingStatus(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      loadFinishingReason(1);
      loadLatestFinishingStatus();
    }
  }, [openModal, values.w_c]);

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
      loadLatestFinishingStatus();
    } catch (error) {
      if (error.response.status === 400) {
        alert('Work Center นี้มีการบันทึกสาเหตุการหยุดเครื่องแล้ว');
      }
    }
  }

  const handleOpen = (type) => {
    if (type === 'Add') {
      if (latestActiveFinishingRows.length > 0) {
        alert('Work Center นี้มีสถานะกำลังดำเนินการอยู่ ไม่สามารถเพิ่มสาเหตุใหม่ได้');
        return;
      }

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
          className={styles.paperModal}
          style={{
            width: '80vw',
            height: '98vh',
            marginLeft: '10vw',
            marginTop: '1vh'
          }}
        >
          <DataTable
            title={`บันทึกสาเหตุการหยุดเครื่อง : ${values.w_c}`}
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
                    backgroundColor: rowData.down_time === null ? '#ff6666' : '#99ff99',
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
                field: 'down_time_total',
                type: 'numeric',
                width: 100,
                render: rowData => rowData.down_time,
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
            search={false}
            sorting={false}
            exportButton
            maxBodyHeight="80vh"
            minBodyHeight="80vh"
            rowStyle={{
              fontSize: 12,
              padding: 0
            }}
            onRowClick={(rowData) => {
              if (rowData.down_time !== null) {
                alert('สาเหตุการหยุดเครื่องนี้เป็นสถานะเสร็จสิ้นแล้ว');
                return false;
              }
              handleOpen('Edit');
              setReason(rowData);
            }}
            toolbar={(
              <div style={{ padding: '0px 10px' }}>
                <Chip
                  label={<AddCircleIcon />}
                  color="default"
                  disabled={latestActiveFinishingRows.length > 0 || loadingLatestFinishingStatus}
                  style={{ marginRight: 5 }}
                  title={latestActiveFinishingRows.length > 0 ? 'รายการล่าสุดยังมีสถานะกำลังดำเนินการอยู่ ไม่สามารถเพิ่มสาเหตุใหม่ได้' : 'เพิ่มสาเหตุใหม่'}
                  onClick={() => handleOpen('Add')}
                />
                <Chip
                  label={`สถานะล่าสุด: ${loadingLatestFinishingStatus ? '...' : latestActiveFinishingRows.length > 0 ? 'กำลังดำเนินการ' : 'เสร็จสิ้น/ไม่มีรายการค้าง'}`}
                  color={latestActiveFinishingRows.length > 0 ? "warning" : "success"}
                  style={{ marginRight: 5 }}
                  title="ดูรายการล่าสุด"
                  onClick={() => setOpenActiveFinishingModal(true)}
                />
                <Chip
                  label="แสดงทุก Work Center"
                  color="default"
                  style={{ marginRight: 5 }}
                  onClick={() => loadFinishingReason(2)}
                />
              </div>
            )}
          />
        </Grid>
      </Modal>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openActiveFinishingModal}
        onClose={() => setOpenActiveFinishingModal(false)}
      >
        <DialogTitle>
          รายการล่าสุด : {values.w_c}
        </DialogTitle>
        <DialogContent dividers>
          {latestFinishingRows.length > 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>วันที่เริ่มต้น</TableCell>
                  <TableCell>เวลาเริ่มต้น</TableCell>
                  <TableCell>สาเหตุหลัก</TableCell>
                  <TableCell>หมายเหตุ</TableCell>
                  <TableCell>work center</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestFinishingRows.map((row) => (
                  <TableRow key={row.id || `${row.w_c}-${row.time_stop}`}>
                    <TableCell>
                      <Chip
                        color={row.down_time === null ? "warning" : "success"}
                        label={row.down_time === null ? "กำลังดำเนินการ" : "เสร็จสิ้น"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.time_stopped || '-'}</TableCell>
                    <TableCell>{row.start || '-'}</TableCell>
                    <TableCell>{row.reason_description || '-'}</TableCell>
                    <TableCell>{row.remark || '-'}</TableCell>
                    <TableCell>{row.w_c || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography color="textSecondary" variant="body2">
              รายการล่าสุดไม่ได้อยู่ในสถานะกำลังดำเนินการ
            </Typography>
          )}
        </DialogContent>
      </Dialog>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Grid container spacing={0} className={styles.paperModalSM}>
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
