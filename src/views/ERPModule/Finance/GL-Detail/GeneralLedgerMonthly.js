import React, { useState } from 'react';
import moment from 'moment';
import { Button, Grid ,FormControl, InputLabel,Select,MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import { default as ReactSelect } from 'react-select';
import makeAnimated from 'react-select/animated';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';

const animatedComponents = makeAnimated();

const GeneralLedgerMonthly = ({options2}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getYear = () => {
        let year = new Date().getFullYear();
        let yearList = [];
        for (let i = 2015 ; i <= year; i++) {
        yearList.unshift(i);
        }
        return yearList;
    };
  
    const addComma = (num) => {
      return parseFloat(num)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
   
  return (
    <Grid container spacing={1}>
         <Grid item sm={12} xl={12} xs={12} lg={12}>
           <Grid container spacing={3}>
             <Grid item style={{ width: '100%', overflowX: 'auto' }}>
               <Formik
                 initialValues={{
                     Department: null,
                     Year:'2024',
                 }}
                 onSubmit={async (values, { setSubmitting }) => {
                   try {
                    console.log(values);
                     setSubmitting(true);
                     const response = await API.get(
                       'RPTGL_DETAIL/data.php',
                       {
                         params: {
                           load: 'monthly',
                           Unit: values.Department.value,
                           Year: values.Year,
                         }
                       }
                     );
                    
                     if (response.data.length == 0) {
                       toast.error('ไม่พบข้อมูล');
                       setSubmitting(false);
                       return;
                     }

                     const newData = response.data.map(item => {
                            return {
                                ...item,
                                JAN: addComma(item.JAN),
                                FEB: addComma(item.FEB),
                                MAR: addComma(item.MAR),
                                APR: addComma(item.APR),
                                MAY: addComma(item.MAY),
                                JUN: addComma(item.JUN),
                                JUL: addComma(item.JUL),
                                AUG: addComma(item.AUG),
                                SEP: addComma(item.SEP),
                                OCT: addComma(item.OCT),
                                NOV: addComma(item.NOV),
                                DEC: addComma(item.DEC),
                            };
                     });
                     setData(newData);
                     setLoading(false);
                     toast.success('ค้นหาเสร็จสิ้น');
                     setSubmitting(false);
                   } catch (error) {
                     console.log(error);
                     toast.error('เกิดข้อผิดพลาด');
                     setLoading(false);
                   }
                 }}
               >
                 {({ values, handleBlur, handleSubmit, setFieldValue }) => (
                   <form onSubmit={handleSubmit}>
                     <Grid item xs={3}></Grid>
                     <Grid container spacing={3}>
                       <Grid item xs={6}>
                       <ReactSelect
                           menuPortalTarget={document.body} 
                           styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                           closeMenuOnSelect={false}
                           components={animatedComponents}
                           onChange={(e) => setFieldValue('Department', e)}
                            options={options2}
                         />
                       </Grid>
                       <Grid item xs={3}>
                       <FormControl fullWidth variant="outlined" size="small">
                           <InputLabel>
                             Year
                           </InputLabel>
                           <Select
                             variant="outlined"
                             size="small"
                             label="Year"
                             fullWidth
                             value={'2024'}
                             onChange={(e) => setFieldValue('Year', e.target.value)}
                           >
                             {getYear().map((item) => (
                                 <MenuItem value={item}>{item}</MenuItem>
                             ))}
                           </Select>
                         </FormControl>
                       </Grid>
                       <Grid item xs={2}>
                         <Button
                           disabled={loading}
                           type="submit"
                           variant="contained"
                           color="primary"
                           size="meldium"
                         >
                           Search
                         </Button>
                       </Grid>
                     </Grid>
                   </form>
                 )}
               </Formik>
             </Grid>
             <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
               <MaterialTable
                 icons={tableIcons}
                 title={`Material Purchase (${data.length} รายการ) `}
                 columns={[
                   { title: 'acct_unit1', field: 'acct_unit1', type: 'string' },
                   { title: 'Department', field: 'Department', type: 'string' },
                   { title: 'JAN', field: 'JAN', type: 'number' },
                     { title: 'FEB', field: 'FEB', type: 'number' },
                     { title: 'MAR', field: 'MAR', type: 'number' },
                     { title: 'APR', field: 'APR', type: 'number' },
                     { title: 'MAY', field: 'MAY', type: 'number' },
                     { title: 'JUN', field: 'JUN', type: 'number' },
                     { title: 'JUL', field: 'JUL', type: 'number' },
                     { title: 'AUG', field: 'AUG', type: 'number' },
                     { title: 'SEP', field: 'SEP', type: 'number' },
                     { title: 'OCT', field: 'OCT', type: 'number' },
                     { title: 'NOV', field: 'NOV', type: 'number' },
                     { title: 'DEC', field: 'DEC', type: 'number' },
                 ]}
                 data={data}
                 options={{
                   exportButton: true,
                   cellStyle: { padding: '0.1' },
                   headerStyle: { padding: '0.1' },
                   search: true,
                   paging: false,
                   sorting: true,
                   filtering: false,
                   exportButton: true,
                   doubleHorizontalScroll: false,
                   headerStyle: {
                     backgroundColor: '#039be5',
                     color: '#FFF',
                     textAlign: 'center'
                   },
                   cellStyle: {
                     textAlign: 'center'
                   }
                 }}
               />
             </Grid>
           </Grid>
         </Grid>
       </Grid>
  )
}

export default GeneralLedgerMonthly;