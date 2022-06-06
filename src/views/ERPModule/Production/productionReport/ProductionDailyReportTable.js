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
                {
                    title: 'job', field: 'ref_num', width: 100, editable: 'never',align: 'center', render: rowData =>
                        <Button variant="outlined"
                            onClick={() => window.open(
                                `http://172.18.1.194/sts_tag/?tag_history_finishing&jobno=${rowData.ref_num}%2B0%2B10&act=start`,
                                "_blank")}
                        >
                            {rowData.ref_num}
                        </Button>
                    // <Link
                    //     variant="body2"
                    //     onClick={() => window.open(
                    //         `http://172.18.1.194/sts_tag/?tag_history_finishing&jobno=${rowData.ref_num}%2B0%2B10&act=start`,
                    //         "_blank")}
                    // >
                    //     {rowData.ref_num}
                    // </Link>

                },
                {
                    title: 'item', field: 'item', width: 250, editable: 'never', render: rowData =>
                        <Button variant="outlined" onClick={() => props.handleOpenModalItem(rowData.item)} >{rowData.item}</Button>
                },
                {
                    title: 'Total PCS', field: 'Total_PCS', type: 'numeric', width: 120, editable: 'never', render: rowData =>
                        <>

                            <Button onClick={handleClick} >{rowData.Total_PCS}</Button>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={anchorEl}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '40ch',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => alert()} >
                                    item
                        </MenuItem>
                            </Menu>
                        </>
                },
                // { title: 'work center', field: 'wc', width: 120 },
                { title: 'work center name', field: 'WCname2', width: 200, editable: 'never' },
                { title: 'customer', field: 'cust_num', width: 120, editable: 'never' },
                {
                    title: 'finsh', field: 'job_percent_finish', width: 100, editable: 'never', render: rowData =>
                        <Box position="relative" display="inline-flex">
                            <CircularProgress variant="static" value={rowData.job_percent_finish} />
                            <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" >
                                <Typography variant="caption" component="div" color="textSecondary">
                                    {`${Math.round(rowData.job_percent_finish,)}%`}
                                </Typography>
                            </Box>
                        </Box>
                },
                { title: 'remark', field: 'remark', width: 120 },

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
