import React from 'react';
import API from '../../../components/API';
import {
    Autocomplete,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';
import styles from './ProductionReport.module.css';
import { Formik } from 'formik';
import CAutocompleteReason from '../../../components/Input/CAutocompleteReason';
import CAutocompleteReasonDetail from '../../../components/Input/CAutocompleteReasonDetail';
import CTextField from 'src/views/components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';

// import AssignmentIcon from '@mui/icons-material/Assignment';

const ReasonAddNewReason = (props) => {
    // const [selectedRow, setSelectedRow] = useState(null);
    const [repairIssues, setRepairIssues] = React.useState([]);
    const [repairFiles, setRepairFiles] = React.useState([]);
    const [saving, setSaving] = React.useState(false);

    const getUsername = () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            return token?.username || localStorage.getItem('username') || '';
        } catch (error) {
            return localStorage.getItem('username') || '';
        }
    };

    const getRepairSite = (wc) => {
        return wc && wc.charAt(0) === 'W' ? 'วังน้อย' : 'ปู่เจ้า';
    };

    const getRepairIssueGroup = (wc) => {
        if (['P1SL03', 'P1SL05', 'W1SL04'].includes(wc)) {
            return 'SL';
        }
        if (['P6PT01', 'P6PT0B', 'P6PT0C'].includes(wc)) {
            return 'PT';
        }
        if (['P7PK00', 'P7PKP1', 'P7PKPB', 'P7PKPC'].includes(wc)) {
            return 'PK';
        }
        if (['P6TH01', 'P6TH02', 'P6TH03', 'P6TH05', 'W6TH04'].includes(wc)) {
            return 'TH';
        }
        if (['P6RG01', 'P6RG02'].includes(wc)) {
            return 'RG';
        }
        if (['P6CT01', 'P6CT02', 'P6CT03'].includes(wc)) {
            return 'CT';
        }
        if (wc === 'P6MK01') {
            return 'MK';
        }
        if (wc === 'P6GL01') {
            return 'GL';
        }
        return 'OT';
    };

    const getFilteredRepairIssues = (wc) => {
        const group = getRepairIssueGroup(wc);
        return repairIssues.filter((item) => item.wc === group);
    };

    React.useEffect(() => {
        let active = true;

        const loadRepairIssues = async () => {
            try {
                const response = await API.get("Report_Repair/data.php", {
                    params: {
                        load: "Issue"
                    }
                });

                if (active) {
                    setRepairIssues(response.data || []);
                }
            } catch (error) {
                console.log("load repair issue error", error);
            }
        };

        loadRepairIssues();

        return () => {
            active = false;
        };
    }, []);

    const CreateRepairRequest = async (values) => {
        const response = await API.post("Report_Repair/data.php", null, {
            params: {
                load: "Create",
                doc_no: "",
                r_department: values.w_c,
                r_name: getUsername(),
                r_item: values.repair_type,
                remark: values.repair_remark || values.remark,
                detail_issue: values.repair_issue_num,
                time: "",
                r_site: getRepairSite(values.w_c),
                issue_name: values.repair_requester
            }
        });

        return response.data?.[0]?.DocNo;
    };

    const UploadRepairFiles = async (docNo) => {
        if (!docNo || repairFiles.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append('doc_no', docNo);

        repairFiles.forEach((file) => {
            formData.append('file[]', file);
        });

        const response = await fetch(`${API.defaults.baseURL}Report_Repair_Open/data.php`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload repair files failed');
        }
    };

    const AddNewReason = async (type, values) => {

        let detail_id = values.reason_detail_id
        if (values.reason_id === 8) {
            detail_id = null
        }

        if (values.create_repair && (!values.repair_requester || !values.repair_type || !values.repair_issue_num)) {
            alert('กรุณากรอกข้อมูลแจ้งซ่อมให้ครบ');
            return;
        }

        setSaving(true);

        try {
            let repairDocNo = "";
            if (values.create_repair) {
                repairDocNo = await CreateRepairRequest(values);
            }

            await API.get("RPT_JOBPACKING/data.php", {
                params: {
                    load: props.types === 1 ? 'CreateForming' : 'UpdateForming',
                    reason_id: values.reason_id,
                    reason_detail_id: detail_id,
                    time_stopped: props.types === 2 ? props.dataReason.time_stopped : '',
                    w_c: values.w_c,
                    remark: values.remark,
                    times_count: values.times_count,
                    ref_doc_no: repairDocNo,
                    id: props.types === 2 ? props.dataReason.id : ''

                }
            });
            if (repairDocNo) {
                try {
                    await UploadRepairFiles(repairDocNo);
                } catch (uploadError) {
                    console.log("upload repair files error", uploadError);
                }
            }

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
            if (repairDocNo) {
                alert(`บันทึกสาเหตุและแจ้งซ่อมสำเร็จ : ${repairDocNo}`);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                alert('Work Center นี้มีการบันทึกสาเหตุการหยุดเครื่องแล้ว');
            }
        } finally {
            setSaving(false);
        }


    }

    return (
        <>
            <Grid container spacing={0} className={`${styles.paperModalSM} ${styles.reasonModalShell}`}>

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
                                times_count: '1',
                                create_repair: false,
                                repair_requester: '',
                                repair_type: 'ด่วน',
                                repair_issue_num: '',
                                repair_remark: ''
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
                                    <Grid item xs={12}>
                                        <div className={styles.reasonModalHeader}>
                                            <div>
                                                <Typography className={styles.reasonModalEyebrow}>
                                                    Work Center
                                                </Typography>
                                                <Typography className={styles.reasonModalTitle}>
                                                    บันทึกสาเหตุการหยุดเครื่อง
                                                </Typography>
                                            </div>
                                            <div className={styles.reasonModalBadge}>
                                                {props.w_c || '-'}
                                            </div>
                                        </div>
                                    </Grid>
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
                                    {props.types === 1 && (
                                        <>
                                            <Grid item lg={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={values.create_repair}
                                                            color="primary"
                                                            name="create_repair"
                                                            onChange={(event) => {
                                                                setFieldValue('create_repair', event.target.checked);
                                                                if (!event.target.checked) {
                                                                    setFieldValue('repair_issue_num', '');
                                                                    setRepairFiles([]);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="แจ้งซ่อมด้วย"
                                                />
                                            </Grid>
                                            {values.create_repair && (
                                                <>
                                                    <Grid item lg={12}>
                                                        <Typography variant="subtitle2">
                                                            ข้อมูลแจ้งซ่อม
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={6} xs={12}>
                                                        <CTextField
                                                            label="ชื่อผู้แจ้งพร้อมเบอร์ติดต่อ"
                                                            name="repair_requester"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.repair_requester}
                                                            Autocomplete={false}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="ลักษณะงาน"
                                                            name="repair_type"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            select
                                                            size="small"
                                                            value={values.repair_type}
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        >
                                                            <MenuItem value="ด่วน">ด่วน</MenuItem>
                                                            <MenuItem value="ปกติ">ปกติ</MenuItem>
                                                            <MenuItem value="ล่วงหน้า">ล่วงหน้า</MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <Autocomplete
                                                            fullWidth
                                                            getOptionLabel={(option) => option.issue || ''}
                                                            isOptionEqualToValue={(option, value) => option.issueNum === value.issueNum}
                                                            onChange={(event, value) => {
                                                                setFieldValue('repair_issue_num', value ? value.issueNum : '');
                                                            }}
                                                            options={getFilteredRepairIssues(values.w_c)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="ปัญหาเครื่องจักร"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            )}
                                                            value={getFilteredRepairIssues(values.w_c).find((item) => item.issueNum === values.repair_issue_num) || null}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <CTextField
                                                            label="หมายเหตุแจ้งซ่อม"
                                                            name="repair_remark"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.repair_remark}
                                                            Autocomplete={false}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <TextField
                                                            fullWidth
                                                            inputProps={{
                                                                accept: 'image/jpeg,image/png,image/jpg',
                                                                multiple: true
                                                            }}
                                                            onChange={(event) => {
                                                                const files = Array.from(event.target.files || []);
                                                                const validFiles = files.filter((file) => ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type));

                                                                if (files.length !== validFiles.length) {
                                                                    alert('กรุณาเลือกไฟล์ JPG, JPEG หรือ PNG เท่านั้น');
                                                                    event.target.value = '';
                                                                    setRepairFiles([]);
                                                                    return;
                                                                }

                                                                setRepairFiles(validFiles);
                                                            }}
                                                            type="file"
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={repairFiles.length > 0 ? `เลือกแล้ว ${repairFiles.length} ไฟล์` : 'รองรับ JPG, JPEG, PNG'}
                                                        />
                                                    </Grid>
                                                </>
                                            )}
                                        </>
                                    )}
                                    <Grid item xs={12}>
                                        <div className={styles.reasonModalActions}>
                                            <Button
                                                color="inherit"
                                                onClick={props.handleCloseModalAddNewReason}
                                                variant="outlined"
                                            >
                                                Cancel
                                            </Button>
                                            <div className={styles.reasonModalSubmit}>
                                                <CButton label={props.types === 1 ? 'บันทึกสาเหตุการหยุดเครื่อง' : 'เสร็จสิ้นการหยุดเครื่อง'} onClick={() => AddNewReason("CreateForming", values)} disabled={saving} />
                                            </div>
                                        </div>
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
