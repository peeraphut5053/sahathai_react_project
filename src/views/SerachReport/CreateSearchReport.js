import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField,
    Typography,
} from '@material-ui/core';
import Page from 'src/components/Page';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import tableIcons from './SerachReportView/tableIcons';
import api from './api'
import { useEffect } from 'react';
import Axios from 'axios';
import API from '../components/API';
import { Formik } from 'formik';
import * as Yup from 'yup';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1)
    }
}));



const CreateSearchReport = () => {
    const classes = useStyles();

    useEffect(() => {
        api.get(`report/all`)
            .then(response => {
                setreportData(response.data)
            })
    }, [])

    const [department, setDepartment] = useState({ 34: "IT", 35: "Domestic" })


    const [reportColumns, setReportColumns] = useState([
        { title: 'Name', field: 'report_name' },
        { title: 'Description', field: 'report_description', initialEditValue: 'initial edit value' },
        { title: 'Store', field: 'report_store' },
        {
            title: 'Department',
            field: 'report_department',
            lookup: department,
        },
    ]);

    const [reportData, setreportData] = useState([]);
    const [reportDataSelected, setreportDataSelected] = useState([{
        report_name: '',
        report_description: '',
        report_store: '',
        report_department: '',
        report_field: true
    }]);

    const [report_fieldColumns, setReport_fieldColumns] = useState([
        { title: '#', field: 'report_id', initialEditValue: reportDataSelected.report_name, editable: false },
        { title: 'id', field: 'field_id', initialEditValue: "", editable: false, hidden: true },
        { title: 'name', field: 'field_name' },
        { title: 'field type', field: 'field_type' },
        { title: 'default', field: 'field_defaultValue' },
        { title: 'variable', field: 'field_variable' },
    ]);

    const [report_fieldData, setreport_fieldData] = useState([]);

    const SearchReportDetail = (rowData) => {
        console.log(rowData)
        api.get(`report/report_field/${rowData.report_id}`)
            .then(response => {
                console.log(response.data)
                setreport_fieldData(response.data)
            })
        api.get(`report/${rowData.report_id}`)
            .then(response => {
                setreportDataSelected(response.data)
                setReport_fieldColumns([
                    { title: '#', field: 'report_id', initialEditValue: response.data.report_id, editable: false, },
                    { title: 'id', field: 'field_id', editable: false },
                    { title: 'name', field: 'field_name' },
                    { title: 'field type', field: 'field_type' },
                    { title: 'default', field: 'field_defaultValue' },
                    { title: 'variable', field: 'field_variable' },
                ])
                console.log(reportDataSelected)
            })
    }

    const createReport = (values) => {
        console.log(values)
        var bodyFormData = new FormData();
        bodyFormData.append(values, values);
        api.post(`report/createReport`, JSON.stringify(values))
            .then(response => console.log("repsonse", response.status))
        // navigate('/app/dashboard', { replace: true });
    }

    const createReport_field = (values) => {
        console.log(values)
        var bodyFormData = new FormData();
        bodyFormData.append(values, values);
        api.post(`report/createReport_field`, JSON.stringify(values))
            .then(response => console.log("repsonse", response.status))
        // navigate('/app/dashboard', { replace: true });
    }



    return (
        <Page className={classes.root} title="SerachReport">
            <Card spacing={0}>
                <Container maxWidth={false}>
                    <Grid container spacing={2}  >
                        <Grid item xs={5}>
                            <Card spacing={0}>
                                <MaterialTable
                                    icons={tableIcons}
                                    title="Reprot"
                                    columns={reportColumns}
                                    data={reportData}
                                    options={{
                                        search: false,
                                        paging: false,
                                        maxBodyHeight: '74vh',
                                        minBodyHeight: '74vh',
                                        exportButton: true,
                                        filtering: true
                                    }}
                                    onRowClick={(event, rowData) => { SearchReportDetail(rowData) }}
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    setreportData([...reportData, newData]);
                                                    console.log(newData)
                                                    createReport(newData)
                                                    resolve();
                                                }, 1000)
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataUpdate = [...reportData];
                                                    const index = oldData.tableData.id;
                                                    dataUpdate[index] = newData;
                                                    setreportData([...dataUpdate]);

                                                    resolve();
                                                }, 1000)
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataDelete = [...reportData];
                                                    const index = oldData.tableData.id;
                                                    dataDelete.splice(index, 1);
                                                    setreportData([...dataDelete]);

                                                    resolve()
                                                }, 1000)
                                            }),
                                    }}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={7}>
                            <Grid container spacing={0} item xs={12}>
                                <Grid item xs={12}>
                                    <Container maxWidth="md">
                                        <Formik
                                            initialValues={{
                                                report_name: reportDataSelected.report_name,
                                                report_description: reportDataSelected.report_description,
                                                report_store: reportDataSelected.report_store,
                                                report_department: reportDataSelected.report_department,
                                                report_field: true
                                            }}
                                            enableReinitialize={true}
                                            validationSchema={
                                                Yup.object().shape({
                                                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                                    report_name: Yup.string().max(255).required('Email name is required'),
                                                    report_description: Yup.string().max(255).required('First name is required'),
                                                    report_store: Yup.string().max(255).required('Last name is required'),
                                                    report_department: Yup.string().max(255).required('password is required'),
                                                    report_field: Yup.boolean().oneOf([true], 'This field must be checked')
                                                })
                                            }
                                            onSubmit={(values) => { createReport(values) }}
                                        >
                                            {({
                                                errors,
                                                handleBlur,
                                                handleChange,
                                                handleSubmit,
                                                isSubmitting,
                                                touched,
                                                values
                                            }) => (

                                                    <form onSubmit={handleSubmit}>
                                                        {/* <Box mb={3}>
                                                            <Typography color="textPrimary" variant="h2">Create Report</Typography>
                                                            <Typography color="textSecondary" gutterBottom variant="body2" >Create report by connect with stored procedure</Typography>
                                                        </Box> */}
                                                        {/* {JSON.stringify(values)} */}
                                                        {/* {JSON.stringify(reportDataSelected)} */}

                                                        <Grid container spacing={1} >
                                                            <Grid item md={4} xs={12}>
                                                                <TextField
                                                                    error={Boolean(touched.report_name && errors.report_name)}
                                                                    fullWidth
                                                                    helperText={touched.report_name && errors.report_name}
                                                                    label="name"
                                                                    name="report_name"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={values.report_name}
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item md={4} xs={12}>
                                                                <TextField
                                                                    error={Boolean(touched.lastName && errors.lastName)}
                                                                    fullWidth
                                                                    helperText={touched.lastName && errors.lastName}
                                                                    label="Last name"
                                                                    margin="normal"
                                                                    name="report_description"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={values.report_description}
                                                                    variant="outlined" label="description" margin="dense"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item md={4} xs={12}>
                                                                <TextField
                                                                    // error={Boolean(touched.email && errors.email)}
                                                                    fullWidth
                                                                    helperText={touched.email && errors.email}
                                                                    label="store name"
                                                                    margin="normal"
                                                                    name="report_store"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    // type="email"
                                                                    value={values.report_store}
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item md={4} xs={12}>
                                                                <TextField
                                                                    error={Boolean(touched.password && errors.password)}
                                                                    fullWidth
                                                                    helperText={touched.password && errors.password}
                                                                    label="department"
                                                                    margin="normal"
                                                                    name="report_department"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.report_department}
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item md={8} xs={12}>
                                                                <Grid container spacing={1} >
                                                                    <Grid item md={8} xs={8}>
                                                                        <Checkbox
                                                                            checked={values.report_field}
                                                                            name="report_field"
                                                                            onChange={handleChange}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item md={4} xs={4}>
                                                                         <Button color="primary" fullWidth={false} size="medium" type="submit" variant="contained">Save</Button>
                                                                        <Button color="default" fullWidth={false} size="medium" onClick={() => { alert() }} variant="contained">DELETE</Button> 

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Box alignItems="center" display="flex" ml={-1} >

                                                        </Box>
                                                    </form>
                                                )}
                                        </Formik>
                                    </Container>

                                </Grid>

                            </Grid>


                            <Grid container spacing={3} item xs={12}>
                                <Grid item xs={12}>
                                    {/* {JSON.stringify(reportDataSelected)} */}
                                    <MaterialTable
                                        title="Parameters"
                                        icons={tableIcons}
                                        columns={report_fieldColumns}
                                        data={report_fieldData}
                                        options={{
                                            search: false,
                                            paging: false,
                                            maxBodyHeight: '58vh',
                                            minBodyHeight: '58vh',
                                            exportButton: false,
                                            filtering: false

                                        }}
                                        editable={{
                                            onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        setreport_fieldData([...report_fieldData, newData]);
                                                        createReport_field(newData)
                                                        resolve();
                                                    }, 1000)
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataUpdate = [...report_fieldData];
                                                        const index = oldData.tableData.id;
                                                        dataUpdate[index] = newData;
                                                        setreport_fieldData([...dataUpdate]);

                                                        resolve();
                                                    }, 1000)
                                                }),
                                            onRowDelete: oldData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataDelete = [...report_fieldData];
                                                        const index = oldData.tableData.id;
                                                        dataDelete.splice(index, 1);
                                                        setreport_fieldData([...dataDelete]);

                                                        resolve()
                                                    }, 1000)
                                                }),
                                        }}
                                    />
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>

                </Container>
            </Card>
        </Page>
    );
};

export default CreateSearchReport;
