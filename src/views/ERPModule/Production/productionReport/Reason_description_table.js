import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../components/table/tableIcons'
import API from '../components/API';

const Reason_description_table = (props) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [dataFormingRecord, setDataFormingRecord] = useState([])

    const CRUDfn = async (type, values) => {
        await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: type,
            id: values.id,
            reason_id: values.reason_id,
            time_stopped: values.time_stopped,
            time_used: values.time_used,
            create_date: values.create_date,
            w_c: values.w_c
          }
        });
        console.log(values)
      }

    return (
        <MaterialTable
                          style={{ width: '30%', marginLeft: '30%',marginTop: '7%', overflowX: "scroll" }}
                          icons={tableIcons}
                          title={`สาเหตุที่ต้องหยุดเครื่อง`}
                          columns={[
                            { title: 'id', field: 'id', editable: 'never' },
                            { title: 'สาเหตุ', field: 'reason_id', type: 'string' },
                          ]}
                          data={props.dataFormingRecordReasonDescription}

                          options={{
                            search: false,
                            paging: false,
                            maxBodyHeight: '60vh',
                            minBodyHeight: '60vh',
                            exportButton: true,
                            filtering: false,
                            rowStyle: rowData => ({
                              fontSize: 12,
                              padding: 0
                            }
                            ),
                          }}

                          editable={{
                            onRowAdd: newData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  props.setDataFormingRecord([...dataFormingRecord, newData]);
                                  console.log(newData)
                                  CRUDfn("CreateForming", newData)
                                  resolve();
                                }, 1000)
                              }),
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataUpdate = [...dataFormingRecord];
                                  const index = oldData.tableData.id;
                                  dataUpdate[index] = newData;
                                  props.setDataFormingRecord([...dataUpdate]);
                                  console.log(dataUpdate)
                                  CRUDfn("UpdateForming", oldData)
                                  resolve();
                                }, 1000)
                              }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataDelete = [...dataFormingRecord];
                                  const index = oldData.tableData.id;
                                  dataDelete.splice(index, 1);
                                  props.setDataFormingRecord([...dataDelete]);
                                  console.log(oldData)
                                  CRUDfn("DeleteForming", oldData)
                                  resolve()
                                }, 1000)
                              }),
                          }}

                        />
    );
};

export default Reason_description_table;
