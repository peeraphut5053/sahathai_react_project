import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'src/components/DataTable';
import API from '../../../components/API';
import moment from "moment";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// import AssignmentIcon from '@mui/icons-material/Assignment';

const getDateValue = (value) => value?.date || value;

const formatDisplayValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (typeof value === 'object') {
    if (value.date) {
      const parsedDate = moment(value.date);
      return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD HH:mm:ss') : String(value.date);
    }

    return JSON.stringify(value);
  }

  return String(value);
};

const normalizeLatestReasonRows = (rows) => (Array.isArray(rows) ? rows : []).map((row) => ({
  ...row,
  time_stopped_display: formatDisplayValue(row.time_stopped),
  create_date_raw: getDateValue(row.create_date)
})).sort((a, b) => {
  const timeA = a.create_date_raw ? new Date(a.create_date_raw).getTime() : 0;
  const timeB = b.create_date_raw ? new Date(b.create_date_raw).getTime() : 0;

  return timeB - timeA;
});

const ReasonRecordStopMachineTableEditable = (props) => {
  // const [selectedRow, setSelectedRow] = useState(null);

  const [values] = useState(props.values)
  const [latestReasonRows, setLatestReasonRows] = useState([]);
  const [latestActiveReasonRows, setLatestActiveReasonRows] = useState([]);
  const [loadingLatestReasonStatus, setLoadingLatestReasonStatus] = useState(false);
  const [openActiveReasonModal, setOpenActiveReasonModal] = useState(false);
  const allowedDeleteUsers = ['sukanya', 'vorawut', 'admin'];
  const getUsername = () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      return token?.username || localStorage.getItem('username') || '';
    } catch (error) {
      return localStorage.getItem('username') || '';
    }
  };
  const canDeleteRow = allowedDeleteUsers.includes(getUsername().toLowerCase());

  const sortedDataFormingRecord = useMemo(() => {
    return [...(props.dataFormingRecord || [])].sort((a, b) => {
      const timeA = a.time_stopped ? new Date(a.time_stopped).getTime() : 0;
      const timeB = b.time_stopped ? new Date(b.time_stopped).getTime() : 0;

      return timeB - timeA;
    });
  }, [props.dataFormingRecord]);

  useEffect(() => {
    let active = true;

    const loadLatestReasonStatus = async () => {
      if (!props.w_c) {
        setLatestReasonRows([]);
        setLatestActiveReasonRows([]);
        return;
      }

      setLoadingLatestReasonStatus(true);

      try {
        const response = await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: "SelectFormingLatest",
            wc: props.w_c,
          }
        });

        if (active) {
          const rows = normalizeLatestReasonRows(response.data);
          const latestRow = rows[0];
          setLatestReasonRows(latestRow ? [latestRow] : []);
          setLatestActiveReasonRows(latestRow && latestRow.time_used === null ? [latestRow] : []);
        }
      } catch (error) {
        console.log("load latest forming reason status error", error);
        if (active) {
          setLatestReasonRows([]);
          setLatestActiveReasonRows([]);
        }
      } finally {
        if (active) {
          setLoadingLatestReasonStatus(false);
        }
      }
    };

    loadLatestReasonStatus();

    return () => {
      active = false;
    };
  }, [props.w_c, props.dataFormingRecord]);



  const handleOpenModalReasonMaster = async () => {
    props.setOpenModalReasonMaster(true);
    const response = await API.get("RPT_JOBPACKING/data.php", {
      params: {
        load: "SelectForming_reason_description",
      }
    });
    props.setDataFormingRecord_description(response.data)
  };

  const handleOpenModalReasonMasterDetail = async () => {
    props.setOpenModalReasonMasterDetail(true);
    const response = await API.get("RPT_JOBPACKING/data.php", {
      params: {
        load: "SelectForming_reason_description_detail",
        reason_id: ""
      }
    });
    console.log(response)
    props.setDataFormingRecord_description_detail(response.data)
  };




  const handleOpenModalAddnewReason = async () => {
    if (latestActiveReasonRows.length > 0) {
      alert('Work Center นี้มีสถานะกำลังดำเนินการอยู่ ไม่สามารถเพิ่มสาเหตุใหม่ได้');
      return;
    }

    props.setTypes(1);
    props.setOpenModalAddNewReason(true);
  };



  const CRUDfn = async (type, values) => {
    console.log(values)
    await API.get("RPT_JOBPACKING/data.php", {
      params: {
        load: type,
        id: values.id,
        reason_id: values.reason_id,
        reason_detail_id: values.reason_detail_id,
        time_stopped: values.time_stopped,
        time_used: values.time_used,
        create_date: values.create_date,
        w_c: values.w_c
      }
    });
  }

  const SearchModal = async (type, values, typeBtn) => {
    let param = {}
    console.log(values)
    if (typeBtn === "All") {
      param = {
        load: type,
        txtFromDate: '',
        txtToDate: '',
        txtItem: '',
        txtref_num: '',
        txtw_c: '',
      }

    }
    if (typeBtn === "AllWC") {
      param = {
        load: type,
        txtFromDate: '',
        txtToDate: '',
        txtItem: '',
        txtref_num: '',
        txtw_c: values.w_c,
      }
    }
    if (typeBtn === "FollowWC") {
      param = {
        load: type,
        txtFromDate: values.startdate,
        txtToDate: values.enddate,
        txtItem: values.item,
        txtref_num: values.refnum,
        txtw_c: values.w_c,
      }
    }
    const response = await API.get("RPT_JOBPACKING/data.php", {
      params: param
    });
    props.setDataFormingRecord(response.data)
  }


  return (
    <>
    <DataTable
      title={`บันทึกสาเหตุการหยุดเครื่อง : ${props.w_c}`}
      columns={[
        {
          title: 'Status',
          field: 'time_used',
          type: 'numeric',
          render: rowData => {
            return rowData.time_used === null ? 'กําลังดําเนินการ' : 'เสร็จสิ้น';
          },
          cellStyle: (rowData) => {
            return {
              backgroundColor: rowData.time_used === null ? '#ff6666' : '#99ff99',
              textAlign: 'center',
            };
          },
          headerStyle: {
            textAlign: 'center'
          }
        },
        {
          title: 'เวลาหยุดเครื่อง', field: 'time_stopped', editable: 'always',
          initialEditValue: moment().format('YYYY-MM-DD HH:mm:ss'), width: 200,
          headerStyle: {
            fontSize: 12,
          }
          // ,type:'datetime'
          // ,dateSetting:{ locale: 'ko-KR'}
        },
        { title: 'สาเหตุหลัก', field: 'reason_id', width: 100 },
        { title: 'รายละเอียด', field: 'reason_detail_id', width: 100 },
        { title: 'หมายเหตุ', field: 'remark', width: 100 },
        {
          title: 'รวมเวลา', field: 'time_used', type: 'numeric', width: 100,
          headerStyle: {
            fontSize: 12,
          }
        },
        {
          title: 'เวลาที่บันทึก', field: 'create_date', initialEditValue: moment().format('YYYY-MM-DD HH:mm:ss'),
          editable: 'never', hidden: true, width: 200
        },
        {
          title: 'work center', field: 'w_c', initialEditValue: props.w_c, editable: 'never', width: 115,
          headerStyle: {
            fontSize: 12,
          }
        },
        {
          title: 'เลขที่แจ้งซ่อม',
          field: 'ref_doc_no',
          editable: 'never',
        }
      ]}
      data={sortedDataFormingRecord}

      search={false}
      sorting={false}
      exportButton
      maxBodyHeight="42vh"
      rowStyle={{
        fontSize: 12,
        padding: 0
      }}
      onRowClick={(rowData) => {
        if (rowData.time_used !== null) {
          alert('สาเหตุการหยุดเครื่องนี้เป็นสถานะเสร็จสิ้นแล้ว');
          return false;
        }
        props.setDataReason(rowData);
        props.setTypes(2);
        props.setOpenModalAddNewReason(true);
      }}

      editable={canDeleteRow ? {
        // onRowAdd: newData =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       props.setDataFormingRecord([...props.dataFormingRecord, newData]);
        //       CRUDfn("CreateForming", newData)
        //       resolve();
        //     }, 1000)
        //   }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...props.dataFormingRecord];
              const index = dataDelete.findIndex(item => item.id === oldData.id);
              if (index >= 0) dataDelete.splice(index, 1);
              props.setDataFormingRecord([...dataDelete]);
              console.log(oldData)
              CRUDfn("DeleteForming", oldData)
              resolve()
            }, 1000)
          }),
      } : {}}

      toolbar={(
        <div style={{ padding: '0px 10px' }}>
          <Chip label="สาเหตุหยุดเครื่อง" color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalReasonMaster()} />
          <Chip label="รายละเอียดการหยุด" color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalReasonMasterDetail()} />
          <Chip
            label={`สถานะล่าสุด: ${loadingLatestReasonStatus ? '...' : latestActiveReasonRows.length > 0 ? 'กำลังดำเนินการ' : 'เสร็จสิ้น/ไม่มีรายการค้าง'}`}
            color={latestActiveReasonRows.length > 0 ? "warning" : "success"}
            style={{ marginRight: 5 }}
            title="ดูรายการล่าสุด"
            onClick={() => setOpenActiveReasonModal(true)}
          />
          <Chip
            label={<AddCircleIcon />}
            color="default"
            disabled={latestActiveReasonRows.length > 0 || loadingLatestReasonStatus}
            style={{ marginRight: 5 }}
            title={latestActiveReasonRows.length > 0 ? 'รายการล่าสุดยังมีสถานะกำลังดำเนินการอยู่ ไม่สามารถเพิ่มสาเหตุใหม่ได้' : 'เพิ่มสาเหตุใหม่'}
            onClick={() => handleOpenModalAddnewReason()}
          />
        </div>
      )}
    />
    <Dialog
      fullWidth
      maxWidth="md"
      open={openActiveReasonModal}
      onClose={() => setOpenActiveReasonModal(false)}
    >
      <DialogTitle>
        รายการล่าสุด : {props.w_c}
      </DialogTitle>
      <DialogContent dividers>
        {latestReasonRows.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>เวลาหยุดเครื่อง</TableCell>
                <TableCell>สาเหตุหลัก</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>หมายเหตุ</TableCell>
                <TableCell>เลขที่แจ้งซ่อม</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestReasonRows.map((row) => (
                <TableRow key={row.id || `${row.w_c}-${row.time_stopped_display}`}>
                  <TableCell>
                    <Chip color={row.time_used === null ? "warning" : "success"} label={row.time_used === null ? "กำลังดำเนินการ" : "Done"} size="small" />
                  </TableCell>
                  <TableCell>{row.time_stopped_display}</TableCell>
                  <TableCell>{formatDisplayValue(row.reason_id)}</TableCell>
                  <TableCell>{formatDisplayValue(row.reason_detail_id)}</TableCell>
                  <TableCell>{formatDisplayValue(row.remark)}</TableCell>
                  <TableCell>{formatDisplayValue(row.ref_doc_no)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="textSecondary" variant="body2">
            �������¡������ش
          </Typography>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ReasonRecordStopMachineTableEditable;


