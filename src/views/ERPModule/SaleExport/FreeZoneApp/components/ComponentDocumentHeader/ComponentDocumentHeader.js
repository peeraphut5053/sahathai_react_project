import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';

const ComponentDocumentHeader = props => {
   

    const [values, setValues] = useState({
        doc_hdr: '',name: '',address: '',phone: '', tax: '', doc_type: '',  doc_po: '',tax_ex: '',inv_num: '', create_date: '',states: '',docLine: [],
    });
    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
        props.getValueComponentDocumentHeader({ ...values, [event.target.name]: event.target.value })
    };
    const doc_type = [{ value: '', label: '' },{ value: 'import', label: 'BOND (นำสินค้าเข้าเขต Free Zone)' }, { value: 'export', label: 'FREEZONE (นำสินค้าออกเขต Free Zone)' },];

    return (
        <form autoComplete="off" noValidate  >
            <Grid container spacing={0}  >
                <Grid item xs={5} style={{ border: "solid", borderRadius: 16, padding: 15, margin: 5 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="ชื่อผู้ส่งออก" margin="dense" name="name" onChange={handleChange} required value={values.name} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="ที่อยู่" margin="dense" name="address" onChange={handleChange} required value={values.address} variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="เบอร์โทร" margin="dense" name="phone" onChange={handleChange} required value={values.phone} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="เลขภาษี" margin="dense" name="tax" onChange={handleChange} required value={values.tax} variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{ border: "solid", borderRadius: 16, padding: 15, margin: 5 }} >
                    <Grid container spacing={2}  >
                        <Grid item xs={6}>
                            <TextField fullWidth label="ประเภทใบขน" margin="dense" name="doc_type" onChange={handleChange} required select
                                SelectProps={{ native: true }} value={values.doc_type} variant="outlined">
                                {doc_type.map(option => (<option key={option.value} value={option.value} >{option.label}</option>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="เลขที่ใบขนส่งสินค้า" margin="dense" name="doc_ref" onChange={handleChange} required value={values.doc_ref} variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}  >
                        <Grid item xs={4}>
                            <TextField fullWidth label="เลข PO" margin="dense" name="doc_po" onChange={handleChange} required value={values.doc_po} variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Export Tax" margin="dense" name="tax_ex" onChange={handleChange} required value={values.tax_ex} variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="INV. no" margin="dense" name="inv_num" onChange={handleChange} required value={values.inv_num} variant="outlined" />
                            {/* <Button color="primary" variant="contained" onClick={() => { console.log(values) }} > Save details </Button> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

ComponentDocumentHeader.propTypes = {
    className: PropTypes.string
};

export default ComponentDocumentHeader;
