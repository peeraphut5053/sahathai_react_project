import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../../components/table/tableIcons'
import API from '../../../components/API';
// import AssignmentIcon from '@material-ui/icons/Assignment';

const ReasonStopMachineTableEditable = (props) => {
    // const [selectedRow, setSelectedRow] = useState(null);

    const CRUDfn_reason_description = async (type, values) => {
        console.log("function", values)
        await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: type,
            id: values.reason_id,
            reason_description: values.reason_description,
    
          }
        });
        console.log(values)
      }
      

    return (
        <MaterialTable
            style={{ width: '30%', marginLeft: '30%', marginTop: '7%', overflowX: "scroll" }}
            icons={tableIcons}
            title={`สาเหตุที่ต้องหยุดเครื่อง`}
            columns={[
                // { title: 'id', field: 'id', editable: 'never' },
                { title: 'สาเหตุ', field: 'reason_description', type: 'string' },
            ]}
            data={props.dataFormingRecord_description}

            options={{
                search: false,
                paging: false,
                maxBodyHeight: '65vh',
                minBodyHeight: '65vh',
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
                            props.setDataFormingRecord_description([...props.dataFormingRecord_description, newData]);
                            console.log("newData", newData)
                            console.log("dataFormingRecord", props.dataFormingRecord_description)
                            CRUDfn_reason_description("CreateForming_reason_description", newData)
                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...props.dataFormingRecord_description];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            props.setDataFormingRecord_description([...dataUpdate]);
                            console.log(dataUpdate)
                            console.log("oldData", oldData)
                            console.log("newData", newData)

                            CRUDfn_reason_description("UpdateForming_reason_description", newData)
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...props.dataFormingRecord_description];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            props.setDataFormingRecord_description([...dataDelete]);
                            console.log(oldData)
                            CRUDfn_reason_description("DeleteForming_reason_description", oldData)
                            resolve()
                        }, 1000)
                    }),
            }}
        />
    );
};

export default ReasonStopMachineTableEditable;
