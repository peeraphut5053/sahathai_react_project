import React, { useState, useEffect } from 'react';
import API from '../../../components/API';
import { Grid } from '@material-ui/core';
import customStyles from "./customStyles.js";
import { Formik } from 'formik';
import moment from "moment";
import CTextField from 'src/views/components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';

// import AssignmentIcon from '@material-ui/icons/Assignment';
const useStyles = customStyles

const ReasonAddNewMeter = (props) => {
    // const [selectedRow, setSelectedRow] = useState(null);
    const classes = useStyles();

    const [meters_start, setMeters_start] = useState("")


    useEffect(() => {
        



        API.get("RPT_JOBPACKING/data.php", {
            params: {
                load: "getForming_last_meter",
                w_c: props.w_c,
            }
        })
            .then(res => {
                if(res.data[0]){
                    setMeters_start(res.data[0].meters_end)
                }else{
                    setMeters_start(0)
                }
            })
    }, [])

    const AddNewMeter = async (type, values) => {
        console.log(values)

        await API.get("RPT_JOBPACKING/data.php", {
            params: {
                load: "CreateForming_reason_meter",
                meters_start: meters_start,
                meters_end: values.meters_end,
                time_save: values.time_save,
                w_c: values.w_c
            }
        });
        props.handleCloseModalAddNewMeter()
        props.setDataFormingRecord_reason_meter([...props.dataFormingRecord_reason_meter, values])
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
                                meters_start: meters_start,
                                time_stopped: props.startdate,
                                time_save: props.startdate,
                                w_c: props.w_c,
                                remark: '',
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
                                    <Grid item lg={12}>บันทึกเลขมิตเตอร์ </Grid>
                                    <Grid item lg={12}>
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
                                    <Grid item lg={12}>
                                        <CTextField
                                            error={Boolean(touched.time_used && errors.time_used)}
                                            helperText={touched.time_used && errors.time_used}
                                            label="เวลาที่บันทึก"
                                            name="time_save"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.time_save}
                                            Autocomplete={false}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <CTextField
                                            error={Boolean(touched.time_used && errors.time_used)}
                                            helperText={touched.time_used && errors.time_used}
                                            label="เลขมิตเตอร์ปัจจุบัน"
                                            name="meters_start"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={meters_start}
                                            Autocomplete={false}
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <CTextField
                                            error={Boolean(touched.time_used && errors.time_used)}
                                            helperText={touched.time_used && errors.time_used}
                                            label="เลขมิตเตอร์ล่าสุด"
                                            name="meters_end"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.meters_end}
                                            Autocomplete={false}
                                        />
                                    </Grid>

                                    <Grid item lg={12}>
                                        <CButton label={"บันทึกเลขมิตเตอร์"} onClick={() => AddNewMeter("CreateForming", values)} disabled={false} />
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

export default ReasonAddNewMeter;
