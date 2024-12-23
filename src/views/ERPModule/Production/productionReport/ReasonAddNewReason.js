import React from 'react';
import API from '../../../components/API';
import { Grid } from '@material-ui/core';
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

        let detail_id = values.reason_detail_id
        if(values.reason_id === 8){
            detail_id = null
        }

        try {
            await API.get("RPT_JOBPACKING/data.php", {
                params: {
                    load: props.types === 1 ? 'CreateForming' : 'UpdateForming',
                    reason_id: values.reason_id,
                    reason_detail_id: detail_id,
                    time_stopped: props.types === 2 ? props.dataReason.time_stopped : '',
                    w_c: values.w_c,
                    remark: values.remark,
                    times_count: values.times_count,
                    id: props.types === 2 ? props.dataReason.id : ''
                    
                }
            });
            props.handleCloseModalAddNewReason()
            // if same id update setDataFormingRecord
            const response = await API.get("RPT_JOBPACKING/data.php", {
                params: {
                    load: "SelectFormingModal",
                    txtFromDate: props.startdate,
                    txtToDate: props.enddate,
                    txtItem: props.item,
                    txtref_num: '',
                    txtw_c: props.w_c,
                }
            });
            props.setDataFormingRecord(response.data)
        } catch (error) {
            if (error.response.status === 400) {  
                alert('Work Center นี้มีการบันทึกสาเหตุการหยุดเครื่องแล้ว');
              }
        }
        
       
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
                                    <Grid item lg={12}>บันทึกสาเหตุการหยุดเครื่อง</Grid>
                                    <Grid item lg={6}>
                                        <CTextField
                                            error={Boolean(touched.w_c && errors.w_c)}
                                            helperText={touched.w_c && errors.w_c}
                                            label="Work center"
                                            name="w_c"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={props.w_c}
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
                                            value={props.types === 2 ? props.dataReason?.times_count : values.times_count}
                                            Autocomplete={false}
                                       disabled
                                        />
                                    </Grid>
                                    {props.types === 1 && 
                                    <Grid item lg={12}>
                                    <CAutocompleteReason
                                        onBlur={handleBlur}
                                        name="reason_description"
                                        value={values.reason_id}
                                        setFieldValue={setFieldValue}
                                    />
                                    </Grid>}
                                    {props.types === 2 && <Grid item lg={12}>
                                    <CTextField
                                            label="สาเหตุการหยุดเครื่อง"
                                            name="reason_description"
                                            value={props.dataReason?.reason_id}
                                            Autocomplete={false}
                                            disabled
                                     />
                                    </Grid>}
                                    {values.reason_id !== 8 && props.types === 1 && <Grid item lg={12}>
                                        <CAutocompleteReasonDetail
                                            reason_id={values.reason_id}
                                            onBlur={handleBlur}
                                            name="description"
                                            value={values.reason_detail_id}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Grid>}
                                    {props.types === 2 && <Grid item lg={12}>
                                    <CTextField
                                            label="รายละเอียดการหยุดเครื่อง"
                                            name="description"
                                            value={props.dataReason?.reason_detail_id}
                                            Autocomplete={false}
                                            disabled
                                     />
                                    </Grid>}
                                    <Grid item lg={12}>
                                     {values.reason_id === 8 && <CTextField
                                            error={Boolean(touched.remark && errors.remark)}
                                            helperText={touched.remark && errors.remark}
                                            label="หมายเหตุ"
                                            name="remark"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={props.types === 1 ? values.remark : props.dataReason?.remark}
                                            Autocomplete={false}
                                            
                                     />}
                                    </Grid>
                                    <Grid item lg={12}>
                                        <CButton label={props.types === 1 ? 'บันทึกสาเหตุการหยุดเครื่อง' : 'เสร็จสิ้นการหยุดเครื่อง'} onClick={() => AddNewReason("CreateForming", values)} disabled={false} />
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
