import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Card, CardContent, Grid,  Modal, 
    makeStyles,
} from '@material-ui/core';


import CTextField from '../../../components/Input/CTextField';
import MaterialTable from 'material-table';
import { Formik } from 'formik';
import moment from "moment";
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import CButton from '../../../components/Input/CButton';
import tableIcons from '../../../components/table/tableIcons'
import API from '../../../components/API';
import Page from 'src/components/Page';
import { Backdrop, Fade } from '@material-ui/core';

moment.locale("th");


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        paddingBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        backgroundColor: theme.palette.background.dark,
        margin: '10px'
    },
    cardPage: {
        backgroundColor: '#FFFFFF',
        minHeight: '100%',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(0)
    },
    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const PendingSubmitedReportEX = ({ className, ...rest }) => {
    const classes = useStyles();

    const [data, setdata] = useState([])
    const [dataJob, setdataJob] = useState([])


    const SearchFn = async (load, values) => {
        const response = await API.get("RPTINV_OUTSTANDINGEX/data.php", {
            params: {
                load: load,
                txtFromDate_start: values.txtFromDate_start,
                txtFromDate_end: values.txtFromDate_end,
                txtFromCoNum_start: values.txtFromCoNum_start,
                txtFromCoNum_end: values.txtFromCoNum_end,
                txtFromCusnumOrName: values.txtFromCusnumOrName,
                txtFromItemOrDes: values.txtFromItemOrDes,
                txtCity: values.txtCity,
                txtcustomerpo: ''
            }
        })
        setdata(response.data)
    }

    const [openModalItemMenuDoItem, setOpenModalItemMenuDoItem] = React.useState(true);

    const handleCloseModalItemDo = async () => {
        setOpenModalItemMenuDoItem(false);
    };


    const GetJobDetailModal = async (load, values) => {
        setOpenModalItemMenuDoItem(true)
        const dataMenuDoItem = await API.get("RPTINV_OUTSTANDINGEX/data.php", {
            params: {
                load: 'GetJobDetailModal',
                ord_num: values.co_num,
                ord_line: values.co_line,
            }
        })
        if (dataMenuDoItem) {
            setdataJob(dataMenuDoItem.data)
        }
    }
    return (
        <Page
            className={classes.root}
            title="Pending Submited Report EXport"
        >

            <Modal
                open={openModalItemMenuDoItem}
                onClose={handleCloseModalItemDo}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{
                    width: '100%',
                    margin: '5%'
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}
                className={classes.modal}
            >
                <Fade in={openModalItemMenuDoItem}>
                    <div className={classes.paper}>

                        <Grid container>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                                <MaterialTable

                                    icons={tableIcons}
                                    title={`ข้อมูลการผลิต (${dataJob.length} รายการ) `}
                                    columns={[
                                        {
                                            title: 'job date', field: 'job_date',
                                            headerStyle: { backgroundColor: '#f8f7ff', width: 120 },
                                            cellStyle: { backgroundColor: '#f8f7ff', width: 120 }
                                        },
                                        {
                                            title: 'order num', field: 'ord_num',
                                            headerStyle: { backgroundColor: '#f8f7ff', width: 120 },
                                            cellStyle: { backgroundColor: '#f8f7ff', width: 120 }
                                        },

                                        {
                                            title: 'order line', field: 'ord_line'
                                        },
                                        { title: 'item', field: 'item', type: 'string' },
                                        { title: 'qty released', field: 'qty_released', type: 'numeric' },
                                        { title: 'qty complete', field: 'qty_complete', type: 'numeric' },
                                        { title: 'qty scrapped', field: 'qty_scrapped', type: 'numeric' },
                                    ]}
                                    data={dataJob}

                                    options={{
                                        exportButton: true,
                                        cellStyle: { padding: '4px' },
                                        headerStyle: { padding: '0.1px', fontSize: '12px', textAlign: 'center' },
                                        search: false,
                                        paging: false,
                                        maxBodyHeight: '58vh',
                                        minBodyHeight: '58vh',
                                        sorting: true,
                                        filtering: false,
                                        // width: '100vw',
                                        exportButton: true,
                                        rowStyle: rowData => ({
                                            // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                            fontSize: '12px',
                                            padding: 0,
                                            fontFamily: 'Roboto'
                                        }
                                        ),
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </div>
                </Fade>
            </Modal>




            <Card
                className={clsx(classes.cardPage, className)}
                {...rest}
            >

                <CardContent >
                    <Grid container spacing={1} >
                        <Formik
                            initialValues={
                                {
                                    // startdate: moment('2021-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                    // enddate: moment('2021-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                    txtFromDate_start: moment('2020-02-27', 'YYYY-MM-DD').format('YYYY-MM-DD'),
                                    txtFromDate_end: moment('2021-02-28', 'YYYY-MM-DD').format('YYYY-MM-DD'),
                                    txtFromCoNum_start: 'EX20040027',
                                    txtFromCoNum_end: 'EX20040027',
                                    // startdate: moment('08:00:', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                                    // enddate: moment('21:00', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                                    txtFromCusnumOrName: '',
                                    txtFromItemOrDes: '',
                                    txtCity: ''
                                }
                            }
                            validate={values => {
                                const warnings = {};
                                if (!values.w_c) { warnings.w_c = 'แนะนำให้ใส่'; }
                                // return { errors: {}, warnings: {} };
                                return warnings;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue
                            }) => (
                                <form onSubmit={handleSubmit} style={{ marginRight: '10px' }}>
                                    {/* <Button color="primary" variant="contained" onClick={() => { handleOpenModalItem(123) }}>1234</Button> */}

                                    <Grid container spacing={1} >
                                        <Grid item xs={2}  >
                                            <DateTimePicker
                                                label="วันเวลาเริ่ม"
                                                name={"txtFromDate_start"}
                                                value={values.txtFromDate_start}
                                                onBlur={handleBlur}
                                                onChange={e => setFieldValue('txtFromDate_start', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <DateTimePicker
                                                label="วันเวลาสิ้นสุด"
                                                name={"txtFromDate_end"}
                                                value={values.txtFromDate_end}
                                                onBlur={handleBlur}
                                                onChange={e => { setFieldValue('txtFromDate_end', moment(e).format('YYYY-MM-DD HH:mm:ss')) }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CTextField
                                                error={Boolean(touched.txtFromCoNum_start && errors.txtFromCoNum_start)}
                                                helperText={touched.txtFromCoNum_start && errors.txtFromCoNum_start}
                                                label="CO start"
                                                name="txtFromCoNum_start"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.txtFromCoNum_start}
                                                Autocomplete={false}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CTextField
                                                error={Boolean(touched.txtFromDate_end && errors.txtFromDate_end)}
                                                helperText={touched.txtFromDate_end && errors.txtFromDate_end}
                                                label="CO end"
                                                name="txtFromCoNum_end"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.txtFromCoNum_end}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CTextField
                                                error={Boolean(touched.txtFromCusnumOrName && errors.txtFromCusnumOrName)}
                                                helperText={touched.txtFromCusnumOrName && errors.txtFromCusnumOrName}
                                                label="Cusnum Or Name"
                                                name="txtFromCusnumOrName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.txtFromCusnumOrName}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CTextField
                                                error={Boolean(touched.txtFromItemOrDes && errors.txtFromItemOrDes)}
                                                helperText={touched.txtFromItemOrDes && errors.txtFromItemOrDes}
                                                label="Item Or Des"
                                                name="txtFromItemOrDes"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.txtFromItemOrDes}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CTextField
                                                error={Boolean(touched.txtCity && errors.txtCity)}
                                                helperText={touched.txtCity && errors.txtCity}
                                                label="City"
                                                name="txtCity"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.txtCity}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CTextField
                                                error={Boolean(touched.txtcustomerpo && errors.txtcustomerpo)}
                                                helperText={touched.txtcustomerpo && errors.txtcustomerpo}
                                                label="Customer PO"
                                                name="txtcustomerpo"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.txtcustomerpo}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            ผลิตเสร็จแล้วรอส่ง,ยังผลิตไม่เสร็จ
                                        </Grid>

                                        <Grid item xs={1}>
                                            <CButton label={"Search"} onClick={() => { SearchFn("ajax", values, "") }} />
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Formik>

                        <Grid item style={{ width: '100%', margin: 5, overflowX: "auto" }}>
                            <MaterialTable

                                icons={tableIcons}
                                title={`ราการค้างส่ง (${data.length} รายการ) `}
                                columns={[
                                    {
                                        title: 'order date', field: 'order_date',
                                        headerStyle: { backgroundColor: '#f8f7ff', width: 120 },
                                        cellStyle: { backgroundColor: '#f8f7ff', width: 120 }
                                    },
                                    {
                                        title: 'due date', field: 'due_date',
                                        headerStyle: { backgroundColor: '#f8f7ff', width: 120 },
                                        cellStyle: { backgroundColor: '#f8f7ff', width: 120 }
                                    },

                                    {
                                        title: 'co number', field: 'co_num',
                                        render: row => <span onClick={() => GetJobDetailModal(row.co_num, row.item)} variant="contained">{row.co_num}</span>
                                    },
                                    { title: 'co line', field: 'co_line', type: 'numeric' },
                                    { title: 'cust po', field: 'cust_po', type: 'string' },
                                    { title: 'cust number', field: 'cust_num', type: 'string' },
                                    {
                                        title: 'name', field: 'name', type: 'string',
                                        cellStyle: { fontSize: '10px' }

                                    },
                                    {
                                        title: 'item', field: 'item', type: 'string',
                                        cellStyle: { fontSize: '9px' }
                                    },
                                    {
                                        title: 'description', field: 'description', type: 'string',
                                        cellStyle: { fontSize: '9px' }
                                    },
                                    { title: 'city', field: 'city', type: 'string' },
                                    { title: 'qty order', field: 'qty_order', type: 'numeric' },
                                    { title: 'qty shipped', field: 'qty_shipped', type: 'numeric' },
                                    { title: 'qty pending', field: 'qty_pending', type: 'numeric' },
                                    { title: 'unit weight', field: 'unit_weight', type: 'numeric' },
                                    { title: 'kg/pcs', field: 'unit_weight', type: 'numeric' },
                                    { title: 'Price/KG', field: 'Uf_PricePerKG', type: 'numeric' },
                                    { title: 'Uf pack', field: 'Uf_pack', type: 'numeric' },
                                ]}
                                data={data}
                                onRowClick={(event, rowData) => {
                                    console.log(event)
                                    GetJobDetailModal("GetJobDetailModal", rowData)
                                }}

                                options={{
                                    exportButton: true,
                                    cellStyle: { padding: '4px' },
                                    headerStyle: { padding: '0.1px', fontSize: '12px', textAlign: 'center' },
                                    search: false,
                                    paging: false,
                                    maxBodyHeight: '58vh',
                                    minBodyHeight: '58vh',
                                    sorting: true,
                                    filtering: false,
                                    // width: '100vw',
                                    exportButton: true,
                                    rowStyle: rowData => ({
                                        // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                        fontSize: '12px',
                                        padding: 0,
                                        fontFamily: 'Roboto'
                                    }
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Page>
    );
};

PendingSubmitedReportEX.propTypes = {
    className: PropTypes.string
};

export default PendingSubmitedReportEX;
