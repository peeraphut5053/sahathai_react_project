import React, { useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../../../components/table/tableIcons'
import API from '../../../components/API';
import moment from "moment";
import { Chip } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// import AssignmentIcon from '@material-ui/icons/Assignment';

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
    <MaterialTable
      style={{ width: '98%', margin: '0%', overflowX: "scroll" }}
      icons={tableIcons}
      title={`บันทึกสาเหตุการหยุดเครื่อง : ${props.w_c}`}
      columns={[
        {
          title: 'เวลาหยุดเครื่อง', field: 'time_stopped', editable: 'always',
          initialEditValue: moment().format('YYYY-MM-DD HH:mm:ss'), width: 200,
          headerStyle: {
            fontSize: 12,
          }
          // ,type:'datetime'
          // ,dateSetting:{ locale: 'ko-KR'}
        },
        { title: 'สาเหตุหลัก', field: 'reason_id',  width: 100 },
        { title: 'รายละเอียด', field: 'reason_detail_id',  width: 100 },
        { title: 'หมายเหตุ', field: 'remark',  width: 100 },
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

      options={{
        search: false,
        paging: false,
        maxBodyHeight: '30vh',
        minBodyHeight: '30vh',
        exportButton: true,
        filtering: false,
        rowStyle: rowData => ({
          fontSize: 12,
          padding: 0
        }
        ),
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
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataUpdate = [...props.dataFormingRecord];
        //       const index = oldData.tableData.id;
        //       dataUpdate[index] = newData;
        //       props.setDataFormingRecord([...dataUpdate]);
        //       console.log(dataUpdate)
        //       console.log("oldData", oldData)
        //       console.log("newData", newData)

        //       CRUDfn("UpdateForming", newData)
        //       resolve();
        //     }, 1000)
        //   }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...props.dataFormingRecord];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              props.setDataFormingRecord([...dataDelete]);
              console.log(oldData)
              CRUDfn("DeleteForming", oldData)
              resolve()
            }, 1000)
          }),
      }}

      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '0px 10px' }}>
              <Chip label="ทั้งหมด" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal("SelectFormingModal", values, "All")} />
              <Chip label={`wc ทั้งหมด`} color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal("SelectFormingModal", values, "AllWC")} />
              <Chip label={`ตามที่กรอง`} color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal("SelectFormingModal", values, "FollowWC")} />
              <Chip label={`สาเหตุหยุดเครื่อง`} color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalReasonMaster()} />
              <Chip label={`รายละเอียดการหยุด`} color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalReasonMasterDetail()} />
              <Chip label={<AddCircleIcon />} color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalAddnewReason()} />
            </div>
          </div>
        ),
      }}
    />
  );
};

export default ReasonRecordStopMachineTableEditable;
