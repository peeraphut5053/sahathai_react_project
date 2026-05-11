import React, { useState } from 'react';
import DataTable from 'src/components/DataTable';
import API from '../../../components/API';
import moment from "moment";
import { Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// import AssignmentIcon from '@mui/icons-material/Assignment';

const ReasonRecordStopMachineTableEditable = (props) => {
  // const [selectedRow, setSelectedRow] = useState(null);

  const [values] = useState(props.values)



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
              backgroundColor: rowData === null ? '#ff6666' : '#99ff99',
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
      ]}
      data={props.dataFormingRecord}

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

      editable={{
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
      }}

      toolbar={(
        <div style={{ padding: '0px 10px' }}>
          <Chip label="ทั้งหมด" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal("SelectFormingModal", values, "All")} />
          <Chip label="wc ทั้งหมด" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal("SelectFormingModal", values, "AllWC")} />
          <Chip label="ตามที่กรอง" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal("SelectFormingModal", values, "FollowWC")} />
          <Chip label="สาเหตุหยุดเครื่อง" color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalReasonMaster()} />
          <Chip label="รายละเอียดการหยุด" color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalReasonMasterDetail()} />
          <Chip label={<AddCircleIcon />} color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalAddnewReason()} />
        </div>
      )}
    />
  );
};

export default ReasonRecordStopMachineTableEditable;
