import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    colors,
    makeStyles,
    Container,
    Button,
    Modal,
    Paper
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import MaterialTable from 'material-table';
import tableIcons from '../components/table/tableIcons'
import CButton from '../components/Input/CButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateOTReport from './CreateOTReport';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ModalManagementFullPage from '../components/ModalManagementFullPage';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.red[600],
        height: 56,
        width: 56
    },
    differenceIcon: {
        color: colors.red[900]
    },
    differenceValue: {
        color: colors.red[900],
        marginRight: theme.spacing(1)
    }
}));

const EmployeeList = ({ className, ...rest }) => {
    const classes = useStyles();

 




    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >

            <Container maxWidth={false} style={{ paddingTop: 10 }}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item xs={4}>
                        <MaterialTable
                            title="รายชื่อพนักงาน"
                            icons={tableIcons}
                            columns={[
                                { title: 'id', field: 'id',width:'8%' },
                                { title: 'ชื่อ', field: 'name' },
                                { title: 'แผนก', field: 'branch',width:'12%' },
                            ]}
                            data={[
                                { id: '1842', name: 'พีราพัฒน์ ปัญสุวรรณ์', branch: 'มัดท่อ', status: 'ใช้งาน' },
                                { id: '1843', name: 'พีราพัฒน์ ปัญสุวรรณ์2', branch: 'พ่นสี', status: 'ยกเลิก' },
                            ]}
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

                        />
                    </Grid>
                    <Grid item xs={8}>
                        <MaterialTable
                            title="ประวัติการทำ OT"
                            icons={tableIcons}
                            columns={[
                                { title: 'id', field: 'id' },
                                { title: 'วันที่บันทึก', field: 'create_date' },
                                { title: 'เวลาเข้า', field: 'branch' },
                                { title: 'เวลาออก', field: 'branch' },
                                { title: 'ผู้อนุมัติ 1', field: 'branch' },
                                { title: 'ผู้อนุมัติ 2', field: 'branch' },
                            ]}
                            data={[
                                { id: '1842', create_date: '18/01/2020', branch: 'มัดท่อ', status: 'ใช้งาน' },
                                { id: '1843', name: 'พีราพัฒน์ ปัญสุวรรณ์2', branch: 'พ่นสี', status: 'ยกเลิก' },
                            ]}
                            options={{
                                search: false,
                                paging: false,
                                maxBodyHeight: '60vh',
                                minBodyHeight: '60vh',
                                width: '120vw',
                                exportButton: true,
                                filtering: false,
                                rowStyle: rowData => ({
                                    // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                    fontSize: 12,
                                    padding: 0
                                }
                                ),
                            }}

                        />
                    </Grid>
                </Grid>
            </Container>
        </Card>
    );
};



export default EmployeeList;
