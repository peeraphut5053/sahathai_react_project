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
    Paper,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import MaterialTable from 'material-table';
import tableIcons from '../components/table/tableIcons'
import CButton from '../components/Input/CButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateOTReport from './CreateOTReport';
import { DataGrid } from '@material-ui/data-grid';
import CTextField from '../components/Input/CTextField';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',paddingBottom:10
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
    },

}));

const columns = [
    {
        field: 'id', headerName: 'ID', width: 70

    },
    {
        field: 'fullName',
        headerName: 'ชื่อ',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
    { field: 'startTime', headerName: 'เวลาเข้า', width: 130, type: 'number' },
    { field: 'endTime', headerName: 'เวลาออก', width: 130, type: 'number' },
    {
        field: 'allTime', headerName: 'รวมเวลา', width: 130, type: 'number'
        , valueGetter: (params) =>
            `${params.getValue("startTime") - params.getValue("endTime") || 0} `
    },
    {
        field: 'statusShow', headerName: 'สถานะ', width: 130, type: 'number',
        valueGetter: (params) =>
            `${(params.getValue("status")) ? 'อนุมัติ' : 'ไม่อนุมัติ'} `
    },
    {
        field: 'status',
        headerName: 'สถานะ',
        type: 'number',
        width: 130,
        hide: true,
    },

];


const rows = [
    { id: 1, fullName: 'Snow', startTime: 50, endTime: 35, status: true },
    { id: 2, fullName: 'Lannister', startTime: 50, endTime: 42, status: false },
    { id: 3, fullName: 'Lannister', startTime: 50, endTime: 45, status: true },
    { id: 4, fullName: 'Stark', startTime: 50, endTime: 16, status: true },
    { id: 5, fullName: 'Targaryen', startTime: 50, endTime: 15, status: false },
    { id: 6, fullName: 'Melisandre', startTime: 50, endTime: 150, status: true },
    { id: 7, fullName: 'Clifford', startTime: 50, endTime: 44, status: true },
    { id: 8, fullName: 'Frances', startTime: 50, endTime: 36, status: true },
    { id: 19, fullName: 'Roxie', startTime: 50, endTime: 65, status: true },

];



const OTReport = ({ className, ...rest }) => {
    const classes = useStyles();

    const [openModalCreateOTReprot, setopenModalCreateOTReprot] = React.useState(false);

    const handleCloseModalItem = async () => {
        setopenModalCreateOTReprot(false);
    };

    const [select, setSelection] = React.useState([]);

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >

            <Container maxWidth={false} style={{ paddingTop: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} alignContent="center">
                        ใบขออนุมัติทำงานล่วงเวลา (OT)
                    </Grid>
                    <Grid item xs={4} >

                        <CTextField
                            label="ฝ่าย/แผนก ที่ขอทำ OT"
                            name="item"
                            value="พ่นสี"
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item xs={4} >

                        <CTextField
                            label="วันเดือนปี"
                            name="item"
                            value="18/01/2020"
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <CTextField
                            label="ผู้ขออนุมัติ (หัวหน้าแผนก)"
                            name=""
                            value="Mr. หัวหน้าแผนก"
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item xs={4} >

                        <CTextField
                            label="ผู้ขออนุมัติ (ผู้จัดการฝ่าย)"
                            name=""
                            value="Mr. ผู้จัดการฝ่าย"
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item xs={4} >

                        <CTextField
                            label="รอง/ผู้จัดการโรงงาน"
                            name="item"
                            value="Mr. รอง/ผู้จัดการโรงงาน"
                            Autocomplete={false}
                        />
                    </Grid>
                    <Grid item xs={4} >

                        <CTextField
                            label="ฝ่ายบุคคลดำเนินการ Pay Roll"
                            name="item"
                            value="Mr. ฝ่ายบุคคลดำเนินการ Pay Roll"
                            Autocomplete={false}
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <FormControl component="fieldset" style={{ fontSize: 10 }}>
                            <FormLabel component="legend"><span style={{ fontSize: '0.8rem' }}>ประเภทของ OT</span></FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                <FormControlLabel value="OT" control={<Radio color="primary" />} label={<span style={{ fontSize: '0.8rem' }}>{"วันปกติ"}</span>} />
                                <FormControlLabel value="oliday" control={<Radio color="primary" />} label={<span style={{ fontSize: '0.8rem' }}>{"ทำงานวันหยุด"}</span>} />
                                <FormControlLabel value="holidayOT" control={<Radio color="primary" />} label={<span style={{ fontSize: '0.8rem' }}>{"ล่วงเวลาวันหยุด"}</span>} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>


            <CardContent>
                <Grid container spacing={2}>
                    <Grid style={{ height: 380, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={25}
                            checkboxSelection
                            hideFooterPagination
                            onSelectionChange={(newSelection) => {
                                setSelection(newSelection.rowIds);

                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>

            <Grid container spacing={2}>
                <Grid item xs={6} alignContent="center" spacing={2} style={{ textAlign: 'right', padding: 10 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: colors.green[600] }}
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={() => setopenModalCreateOTReprot(true)}
                    >
                        บันทึกข้อมูล
            </Button>
            
                </Grid>
                <Grid item xs={6} alignContent="center" spacing={2} style={{ textAlign: 'left', padding: 10 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: colors.red[600] }}
                        className={classes.button}
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => setopenModalCreateOTReprot(true)}
                    >
                        ยกเลิกเอกสาร
            </Button>
                    {/* <h1>{JSON.stringify(select)}</h1> */}

                </Grid>
            </Grid>

        </Card>
    );
};



export default OTReport;
