import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons'
import API from '../../PackingReport/API';
// import AssignmentIcon from '@material-ui/icons/Assignment';

const PackingReport = (props) => {
    // const [selectedRow, setSelectedRow] = useState(null);
    // const [data, setData] = useState([])


    return (
        <MaterialTable
            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
            icons={tableIcons}
            title={props.title}
            isLoading={props.isLoading}
            columns={props.columns}
            // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            data={props.data}
            // actions={[
            //     {
            //         icon: () => <AssignmentIcon />,
            //         tooltip: 'material transaction',
            //         onClick: (event, rowData) => props.handleOpenModal()
            //     },

            // ]}
            options={{
                search: false,
                paging: false,
                maxBodyHeight: '60vh',
                minBodyHeight: '60vh',
                exportButton: true,
                filtering: false,
                rowStyle: rowData => ({
                    // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                    fontSize: 12,
                    padding: 0
                }
                ),
            }}

            cellEditable={{
                onCellEditApproved: (newValue, oldValue, rowData, columnDef) =>
                    new Promise((resolve, reject) => {
                        API.get("RPT_JOBPACKING/data.php", {
                            params: {
                                load: 'updateRemark',
                                job: rowData.ref_num,
                                remark: newValue,
                            }
                        });

                        console.log('newValue: ' + newValue);
                        console.log('rowData: ', rowData);
                        console.log('columnDef', columnDef)
                        console.log('oldValue', oldValue)
                        setTimeout(() => {
                            const dataUpdate = [...props.data];
                            const index = columnDef.tableData.id;
                            dataUpdate[index] = newValue;
                            console.log('index',index)
                            console.log('dataUpdate',dataUpdate)

                            // props.setdata([...dataUpdate]);
                            

                            // CRUDfn("UpdateForming", newValue)
                            resolve();
                        }, 1000)
                    })

            }}

        />
    );
};

export default PackingReport;
