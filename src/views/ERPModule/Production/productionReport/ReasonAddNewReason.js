import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../../components/table/tableIcons'
import API from '../../../components/API';
import { Grid, IconButton, Modal, Paper, Snackbar } from '@material-ui/core';
import customStyles from "./customStyles.js";
import { Formik } from 'formik';
import moment from "moment";
import CAutocompleteReason from '../../../components/Input/CAutocompleteReason';
import CAutocompleteReasonDetail from '../../../components/Input/CAutocompleteReasonDetail';
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import CTextField from 'src/views/components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';

// import AssignmentIcon from '@material-ui/icons/Assignment';
const useStyles = customStyles

const ReasonAddNewReason = (props) => {
    // const [selectedRow, setSelectedRow] = useState(null);
    const classes = useStyles();




    const AddNewReason = async (type, values) => {
        console.log(values)

        await API.get("RPT_JOBPACKING/data.php", {
            params: {
                load: type,
                reason_id: values.reason_id,
                reason_detail_id: values.reason_detail_id,
                time_stopped: values.time_stopped,
                time_used: values.time_used,
                create_date: values.create_date,
                w_c: values.w_c,
                remark: values.remark,
                times_count: values.times_count,
                
            }
        });
        props.handleCloseModalAddNewReason()
        props.setDataFormingRecord([...props.dataFormingRecord, values])
    }


    return (
        <>
            <Grid container spacing={0} className={classes.paperModalSM}>

                <Grid item xs={12} >

                    <Formik
                        initialValues={
                            {
                                reason_id: '',
                                reason_detail_id: '',
                                time_stopped: props.startdate,
                                time_used: '',
                                w_c: props.w_c,
                                remark: '',
                                times_count: '1'
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
                            <form onSubmit={handleSubmit}>
                                {/* {JSON.stringify(values)} */}
                                <Grid container spacing={2}>
                                    <Grid item lg={12}>บันทึกสาเหตุการหยุดเครื่อง </Grid>
                                    <Grid item lg={6}>
                                        <CTextField
                                            error={Boolean(touched.time_used && errors.time_used)}
                                            helperText={touched.time_used && errors.time_used}
                                            label="Work center"
                                            name="w_c"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={props.w_c}
                                            Autocomplete={false}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <DateTimePicker
                                            label="วันเวลาเริ่ม"
                                            name={"time_stopped"}
                                            value={values.time_stopped}
                                            onBlur={handleBlur}
                                            onChange={e => setFieldValue('time_stopped', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <CTextField
                                            error={Boolean(touched.time_used && errors.time_used)}
                                            helperText={touched.time_used && errors.time_used}
                                            label="รวมเวลาหยุดเครื่อง"
                                            name="time_used"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.time_used}
                                            Autocomplete={false}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <CTextField
                                            error={Boolean(touched.times_count && errors.times_count)}
                                            helperText={touched.times_count && errors.times_count}
                                            label="จำนวนครั้ง"
                                            name="times_count"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.times_count}
                                            Autocomplete={false}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <CAutocompleteReason
                                            onBlur={handleBlur}
                                            name="reason_description"
                                            value={values.reason_id}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <CAutocompleteReasonDetail
                                            reason_id={values.reason_id}
                                            onBlur={handleBlur}
                                            name="description"
                                            value={values.reason_detail_id}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <CTextField
                                            error={Boolean(touched.remark && errors.remark)}
                                            helperText={touched.remark && errors.remark}
                                            label="หมายเหตุ"
                                            name="remark"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.remark}
                                            Autocomplete={false}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <CButton label={"บันทึกสาเหตุการหยุดเครื่อง"} onClick={() => AddNewReason("CreateForming", values)} disabled={false} />
                                    </Grid>
                                </Grid>


                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </>
    );
};

export default ReasonAddNewReason;
