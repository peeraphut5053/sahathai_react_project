import React, { useState } from 'react';
import DataTable from 'src/components/DataTable';
import API from '../../../components/API';
import { Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


// import AssignmentIcon from '@mui/icons-material/Assignment';

const ReasonRecordStopMachineTableEditable = (props) => {
    // const [selectedRow, setSelectedRow] = useState(null);

    const [values] = useState(props.values)

    const CRUDfn_reason_meter = async (type, values) => {
        console.log("function", values)
        await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: type,
            id: values.id,
            meters_minute: values.meters_minute,
            meters_start: values.meters_start,
            meters_end: values.meters_end,
            time_save: values.time_save,
            w_c: values.w_c
          }
        });
      }

      const handleOpenModalAddnewMeter = async () => {
        props.setOpenModalAddNewMeter(true);
      };



    const SearchModal_reason_meter = async (type, values, typeBtn) => {
        let param = {}
        if (typeBtn === "All") {
          param = {
            load: type,
            meters_start: '',
            meters_end: '',
            w_c: '',
          }
        }
        if (typeBtn === "AllWC") {
          param = {
            load: type,
            meters_start: '',
            meters_end: '',
            w_c: values.w_c,
          }
        }
        if (typeBtn === "FollowWC") {
          param = {
            load: type,
            meters_start: values.startdate,
            meters_end: values.enddate,
            w_c: values.w_c,
          }
        }
        const response = await API.get("RPT_JOBPACKING/data.php", {
          params: param
        });
        props.setDataFormingRecord_reason_meter(response.data)
      }

    return (
        <DataTable
            title={`บันทึกเลขมิตเตอร์ : ${props.w_c}  `}
            columns={[
                { title: 'เริ่มต้น', field: 'meters_start', type: 'numeric' },
                { title: 'สิ้นสุด', field: 'meters_end', type: 'numeric'},
                {
                    title: 'เวลาที่บันทึก', field: 'time_save',
                },
                { title: 'work center', field: 'w_c', initialEditValue: values.w_c, editable: 'never' },
            ]}
            data={props.dataFormingRecord_reason_meter}

            search={false}
            sorting={false}
            exportButton
            maxBodyHeight="24vh"
            rowStyle={{
                fontSize: 12,
                padding: 0
            }}

            editable={{
                // onRowAdd: newData =>
                //     new Promise((resolve, reject) => {
                //         setTimeout(() => {
                //             props.setDataFormingRecord_reason_meter([...props.dataFormingRecord_reason_meter, newData]);
                //             CRUDfn_reason_meter("CreateForming_reason_meter", newData)
                //             resolve();
                //         }, 1000)
                //     }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...props.dataFormingRecord_reason_meter];
                            const index = dataDelete.findIndex(item => item.id === oldData.id);
                            if (index >= 0) dataDelete.splice(index, 1);
                            props.setDataFormingRecord_reason_meter([...dataDelete]);
                            CRUDfn_reason_meter("DeleteForming_reason_meter", oldData)
                            resolve()
                        }, 1000)
                    }),
            }}

            toolbar={(
                <div style={{ padding: '0px 10px' }}>
                    <Chip label="ทั้งหมด" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal_reason_meter("SelectFormingModal_reason_meter", values, "All")} />
                    <Chip label="wc ทั้งหมด" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal_reason_meter("SelectFormingModal_reason_meter", values, "AllWC")} />
                    <Chip label="ตามที่กรอง" color="primary" style={{ marginRight: 5 }} onClick={() => SearchModal_reason_meter("SelectFormingModal_reason_meter", values, "FollowWC")} />
                    <Chip label={<AddCircleIcon />} color="default" style={{ marginRight: 5 }} onClick={() => handleOpenModalAddnewMeter()} />
                </div>
            )}
        />
    );
};

export default ReasonRecordStopMachineTableEditable;
