import React, { useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@material-ui/core';
import { Formik } from 'formik';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import CTextField from 'src/views/components/Input/CTextField';

const JobReport = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // ฟังก์ชันสำหรับใส่ลูกน้ำในตัวเลขและตัด 0 ที่ไม่จำเป็น
    const formatNumber = (num) => {
        if (num === null || num === undefined || num === '') return '';
        const number = parseFloat(num);
        if (isNaN(number)) return num;
        // ใช้ string manipulation เพื่อให้แสดงทศนิยมเท่าที่จำเป็น หรือใส่ comma ตามปกติ
        return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 8 });
    };

    const getStatusName = (stat) => {
        switch (stat) {
            case 'F': return 'Firm';
            case 'R': return 'Released';
            case 'S': return 'Stopped';
            case 'C': return 'Complete';
            case 'H': return 'History';
            default: return stat;
        }
    };

    return (
        <Container maxWidth={false}>
            <Typography variant="h4" style={{ margin: '10px', textAlign: 'center' }}>
                Job Report
            </Typography>
            <Grid container spacing={1}>
                <Grid item sm={12} xl={12} xs={12} lg={12}>
                    <Grid container spacing={3}>
                        <Grid item style={{ width: '100%', overflowX: 'auto' }}>
                            <Formik
                                initialValues={{
                                    job: '',
                                    wc: '',
                                    item: '',
                                    status: [],
                                }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    if (!values.job && !values.wc && !values.item && values.status.length === 0) {
                                        toast.warning('กรุณาระบุ Job, WC, Item หรือ Status เพื่อค้นหา');
                                        setSubmitting(false);
                                        return;
                                    }

                                    try {
                                        setSubmitting(true);
                                        setLoading(true);

                                        // TODO: เปลี่ยน URL ตรงนี้ให้ถูกต้องสำหรับ API ของรายงาน Job Report ของคุณ
                                        const response = await API.get(
                                            'STS_REWORK_LINE/data.php',
                                            {
                                                params: {
                                                    load: 'GetJobReport',
                                                    job: values.job,
                                                    wc: values.wc,
                                                    item: values.item,
                                                    status: values.status.join(''),
                                                }
                                            }
                                        );

                                        if (!response.data || response.data.length === 0) {
                                            toast.error('ไม่พบข้อมูล');
                                            setSubmitting(false);
                                            setLoading(false);
                                            setData([]);
                                            return;
                                        }

                                        // format ข้อมูลตัวเลข
                                        const newData = response.data.map((item) => {
                                            const weightCompleteNum = parseFloat(item.weight_complete) || 0;
                                            const weightMatNum = parseFloat(item.weight_mat) || 0;
                                            const diffWeightNum = weightCompleteNum + weightMatNum;

                                            return {
                                                ...item,
                                                stat: getStatusName(item.stat),
                                                qty_released: formatNumber(item.qty_released),
                                                qty_complete: formatNumber(item.qty_complete),
                                                qty_mat: formatNumber(item.qty_mat),
                                                qty_pur: formatNumber(item.qty_pur),
                                                Diff: formatNumber(item.Diff),
                                                weight_complete: formatNumber(item.weight_complete),
                                                weight_mat: formatNumber(item.weight_mat),
                                                diff_weight: formatNumber(diffWeightNum)
                                            };
                                        });

                                        setData(newData);
                                        setLoading(false);
                                        toast.success('ค้นหาเสร็จสิ้น');
                                        setSubmitting(false);
                                    } catch (error) {
                                        console.error(error);
                                        toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
                                        setLoading(false);
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    values,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue,
                                }) => {
                                    const handleStatusChange = (e) => {
                                        const { value, checked } = e.target;
                                        if (checked) {
                                            setFieldValue('status', [...values.status, value]);
                                        } else {
                                            setFieldValue('status', values.status.filter((v) => v !== value));
                                        }
                                    };

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={3} justifyContent="center" alignItems="center">
                                                <Grid item xs={3} sm={2}>
                                                    <CTextField
                                                        error={Boolean(touched.job && errors.job)}
                                                        helperText={touched.job && errors.job}
                                                        label="Job"
                                                        name="job"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.job}
                                                    />
                                                </Grid>
                                                <Grid item xs={3} sm={2}>
                                                    <CTextField
                                                        error={Boolean(touched.item && errors.item)}
                                                        helperText={touched.item && errors.item}
                                                        label="Item"
                                                        name="item"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.item}
                                                    />
                                                </Grid>
                                                <Grid item xs={3} sm={2}>
                                                    <CTextField
                                                        error={Boolean(touched.wc && errors.wc)}
                                                        helperText={touched.wc && errors.wc}
                                                        label="WC"
                                                        name="wc"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.wc}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend" style={{ fontSize: '0.8rem' }}>Status</FormLabel>
                                                        <FormGroup row>
                                                            <FormControlLabel control={<Checkbox size="small" value="F" checked={values.status.includes('F')} onChange={handleStatusChange} />} label={<Typography variant="body2">Firm</Typography>} />
                                                            <FormControlLabel control={<Checkbox size="small" value="R" checked={values.status.includes('R')} onChange={handleStatusChange} />} label={<Typography variant="body2">Released</Typography>} />
                                                            <FormControlLabel control={<Checkbox size="small" value="S" checked={values.status.includes('S')} onChange={handleStatusChange} />} label={<Typography variant="body2">Stopped</Typography>} />
                                                            <FormControlLabel control={<Checkbox size="small" value="C" checked={values.status.includes('C')} onChange={handleStatusChange} />} label={<Typography variant="body2">Complete</Typography>} />
                                                            <FormControlLabel control={<Checkbox size="small" value="H" checked={values.status.includes('H')} onChange={handleStatusChange} />} label={<Typography variant="body2">History</Typography>} />
                                                        </FormGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2} sm={2}>
                                                    <Button
                                                        disabled={loading}
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        size="medium"
                                                    >
                                                        Search
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </Grid>
                        <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
                            <MaterialTable
                                icons={tableIcons}
                                title={`Job Report (${data.length} รายการ) `}
                                columns={[
                                    {
                                        title: 'job',
                                        field: 'job',
                                        type: 'string',
                                    },
                                    {
                                        title: 'item',
                                        field: 'item',
                                        type: 'string',
                                    },
                                    {
                                        title: 'wc',
                                        field: 'wc',
                                        type: 'string',
                                    },
                                    {
                                        title: 'qty_released',
                                        field: 'qty_released',
                                        type: 'string',
                                    },
                                    {
                                        title: 'qty_complete',
                                        field: 'qty_complete',
                                        type: 'string',
                                    },
                                    {
                                        title: 'qty_mat',
                                        field: 'qty_mat',
                                        type: 'string',
                                    },
                                    {
                                        title: 'qty_pur',
                                        field: 'qty_pur',
                                        type: 'string',
                                    },
                                    {
                                        title: 'Diff',
                                        field: 'Diff',
                                        type: 'string',
                                    },
                                    {
                                        title: 'weight_complete',
                                        field: 'weight_complete',
                                        type: 'string',
                                    },
                                    {
                                        title: 'weight_mat',
                                        field: 'weight_mat',
                                        type: 'string',
                                    },
                                    {
                                        title: 'Diff Weight',
                                        field: 'diff_weight',
                                        type: 'string',
                                    },
                                    {
                                        title: 'stat',
                                        field: 'stat',
                                        type: 'string',
                                    },
                                ]}
                                data={data}
                                options={{
                                    maxBodyHeight: '65vh',
                                    minBodyHeight: '65vh',
                                    search: true,
                                    paging: false,
                                    sorting: true,
                                    filtering: false,
                                    exportButton: true,
                                    columnsButton: true,
                                    doubleHorizontalScroll: true,
                                    headerStyle: {
                                        backgroundColor: '#039be5',
                                        color: '#FFF',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center'
                                    },
                                    cellStyle: {
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default JobReport;