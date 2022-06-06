import React from 'react';
import { Box, Button, CircularProgress, Menu, MenuItem, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import tableIcons from '../../../components/table/tableIcons'
import API from '../../../components/API';


const ProductionDailyReportTable = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
    };







    return (

        <MaterialTable
            setdata={props.setdata}
            style={{ width: '100%', margin: 2, overflowX: "scroll" }}
            icons={tableIcons}
            title={
                `
                Production Daily Report (${props.data.length} รายการ)
                `}
            isLoading={props.isLoading}
            columns={[

                { title: 'Create Date', field: 'CreateDateCov.date', editable: 'never', type: 'datetime' },
                { title: 'Lot', field: 'lot', editable: 'never' },
                { title: 'trans type', field: 'trans_type', editable: 'never' },
                { title: 'ref type', field: 'ref_type', editable: 'never' },
                { title: 'item', field: 'item', editable: 'never' },
                { title: 'qty', field: 'qty', editable: 'never',type:'numeric' },
                { title: 'wc', field: 'wc', editable: 'never' },
                { title: 'loc', field: 'loc', editable: 'never' },
                { title: 'sts_no', field: 'sts_no', editable: 'never' },
            ]}
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
                maxBodyHeight: '55vh',
                minBodyHeight: '55vh',
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
                        setTimeout(() => {
                            const dataUpdate = [...props.data];
                            const index = columnDef.tableData.id;
                            dataUpdate[index] = newValue;
                            // props.setdata([...dataUpdate]);
                            props.setdata([]);
                            // CRUDfn("UpdateForming", newValue)
                            resolve();
                        }, 1000)
                    })

            }}

        />
    );
};

export default ProductionDailyReportTable;
