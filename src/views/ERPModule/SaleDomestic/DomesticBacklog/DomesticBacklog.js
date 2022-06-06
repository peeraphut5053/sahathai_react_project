import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import MaterialTable from 'material-table';
import tableIcons from '../../../components/table/tableIcons'
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import { Formik } from 'formik';
import moment from "moment";
import CTextField from 'src/views/components/Input/CTextField';
import { SearchOutlined } from '@material-ui/icons';
import NavItem from 'src/layouts/DashboardLayout/NavBar/NavItems';
moment.locale("th");


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFF',
        minHeight: '95%',
        paddingBottom: theme.spacing(1),
        padding: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
}));

const textSearch = [
    {
        label: "Start date",
        type: "DateTime",
        name: "startdate",
        defaultValue: moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')
    },
    {
        label: "End date",
        type: "DateTime",
        name: "enddate",
        defaultValue: moment('17:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss')
    },
    {
        label: "Item",
        type: "text",
        name: "item",
        defaultValue: "item"
    },
    {
        label: "Ref Num",
        type: "text",
        name: "refnum",
        defaultValue: "refnum1"
    },
    {
        label: "Ref Num2",
        type: "text",
        name: "refnum2",
        defaultValue: "refnum2"
    },
]

const initialValues = (textSearch) => {
    let a = {}
    for (let i = 0; i < textSearch.length; i++) {
        a[[textSearch[i].name]] = textSearch[i].defaultValue;
    }
    return a
}

const data =
    [{
        order_date_conv: "2020-11-18",
        order_date: "2020-11-18",
        co_num: "JL20110004",
        cust_po: "งานจ้างชุบ",
        cust_num: "TT00007",
        name: "บจก.โรจน์ไพบูลย์อีควิ๊ปเม้นท์",
        item: "JFC071N0001200-M2AS080M06000N",
        description: "JFCGPE1/2 ASTM A53AxSCH80x6.000 จ้างชุบ",
        qty_order: "3",
        qty_shipped: "0",
        qty_pending: "3",
        city: null,
        country: "Thailand",
        wc_description: "สถานีชุป 01",
        due_date: {
            date: "2020-12-18 00:00:00.000000",
            timezone_type: 3,
            timezone: "Asia/Bangkok"
        },
        Uf_pack: null,
        asm_run: ".00000000",
        unit_weight: ".00000",
        Uf_PricePerKG: ".00000",
        co_line: 1,
        wc: "P6GL01",
        Expr1: "สถานีชุป 01",
        qty_ready: ".00000000"
    }]


const DomesticBacklogView = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Customers"
        >

            <Paper className={classes.paper} >
                <Formik
                    initialValues={initialValues(textSearch)}
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
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>{JSON.stringify(values)}</Paper>
                                    </Grid>
                                    <Grid item xs={10} >
                                        <Paper className={classes.paper}>
                                            <Grid container spacing={1}>
                                                {textSearch.map((item, index) => {
                                                    return item.type == "DateTime" ?
                                                        <Grid item xs={3} >
                                                            <DateTimePicker
                                                                label={item.label}
                                                                name={item.name}
                                                                value={item.defaultValue}
                                                                onBlur={handleBlur}
                                                                onChange={e => setFieldValue(item.name, moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                                                            />
                                                        </Grid> :
                                                        <Grid item xs={3} >
                                                            {/* <CTextField
                                                                error={Boolean(touched.item && errors.item)}
                                                                helperText={touched.item && errors.item}
                                                                label={item.label}
                                                                name={item.name}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={item.defaultValue}
                                                                Autocomplete={false}
                                                            /> */}
                                                            {/* <CTextField
                                                                error={Boolean(touched.item && errors.item)}
                                                                helperText={touched.item && errors.item}
                                                                label="item"
                                                                name="refnum"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.item.defaultValue}
                                                                Autocomplete={false}
                                                            /> */}
                                                            <TextField
                                                                variant="outlined"
                                                                size="small"
                                                                error={Boolean(touched.item && errors.item)}
                                                                fullWidth
                                                                helperText={touched.item && errors.item}
                                                                label="item"
                                                                name="refnum"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.refnum}
                                                                type="text"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                autoComplete='off'
                                                            />
                                                        </Grid>
                                                }
                                                )}

                                                <CTextField
                                                    error={Boolean(touched.item && errors.item)}
                                                    helperText={touched.item && errors.item}
                                                    label="item"
                                                    name="refnum"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.refnum}
                                                    Autocomplete={false}
                                                />
                                                {/* <Grid item xs={3} >
                                                    <DateTimePicker
                                                        label="วันเวลาเริ่ม"
                                                        name={"startdate"}
                                                        value={values.startdate}
                                                        onBlur={handleBlur}
                                                        onChange={e => setFieldValue('startdate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                                                    />
                                                </Grid>
                                                <Grid item xl={3} >
                                                    <DateTimePicker
                                                        label="วันเวลาเริ่ม"
                                                        name={"enddate"}
                                                        value={values.enddate}
                                                        onBlur={handleBlur}
                                                        onChange={e => setFieldValue('enddate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                                                    />
                                                </Grid>
                                                <Grid item xs={3} >
                                                    <CTextField
                                                        error={Boolean(touched.item && errors.item)}
                                                        helperText={touched.item && errors.item}
                                                        label="item"
                                                        name="item"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.item}
                                                        Autocomplete={false}
                                                    />
                                                </Grid>
                                                <Grid item xs={3} >
                                                    <CTextField
                                                        error={Boolean(touched.item && errors.item)}
                                                        helperText={touched.item && errors.item}
                                                        label="item"
                                                        name="refnum"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.refnum}
                                                        Autocomplete={false}
                                                    />
                                                </Grid> */}

                                            </Grid>


                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <Paper className={classes.paper}>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6} >
                                                    <Button startIcon={<SearchOutlined />} variant="contained" color="primary">Search</Button>
                                                </Grid>
                                                <Grid item lg={6} >
                                                    <Button variant="contained" color="inherit">Clear</Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </form>
                        )}

                </Formik>

            </Paper>


            <MaterialTable
                title="DomesticBacklog"
                icons={tableIcons}
                style={{ width: '99%', margin: 5, overflowX: "scroll", fontSize: 13 }}

                columns={[
                    { title: 'order date', field: 'order_date' },
                    { title: 'co number', field: 'co_num' },
                    { title: 'cust po', field: 'cust_po' },
                    { title: 'cust number', field: 'cust_num' },
                    { title: 'name', field: 'name' },
                    { title: 'item', field: 'item' },
                    { title: 'description', field: 'description' },
                    { title: 'qty order', field: 'qty_order' },
                    { title: 'qty shipped', field: 'qty_shipped' },
                    { title: 'qty pending', field: 'qty_pending' },
                ]}
                data={data}
                options={{
                    search: false,
                    paging: false,
                    maxBodyHeight: '70vh',
                    minBodyHeight: '70vh',
                    exportButton: true,
                    filtering: false,
                }}
            />
        </Page>
    );
};

export default DomesticBacklogView;
