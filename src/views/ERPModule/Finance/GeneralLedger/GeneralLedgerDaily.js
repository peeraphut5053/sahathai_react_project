import React, { useState } from 'react';
import moment from 'moment';
import DateTimePicker from '../../../components/Input/CDatePicker';
import { Button, Grid ,FormControl, InputLabel,Select,MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';

const GeneralLedgerDaily = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
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
                     Account : 'JV',
                     StartDate: moment().format('YYYY-MM-DD'),
                     EndDate: moment().format('YYYY-MM-DD'),
                 }}
                 onSubmit={async (values, { setSubmitting }) => {
                   try {
                     setSubmitting(true);
                     const response = await API.get(
                       'RPTGL/data.php',
                       {
                         params: {
                           load: 'diary',
                           AcctDiary: values.Account,
                           txtStartDate: values.StartDate,
                            txtEndDate: values.EndDate,
                         }
                       }
                     );
                    
                     if (response.data.length === 0) {
                       toast.error('ไม่พบข้อมูล');
                       setSubmitting(false);
                       return;
                     }
                     const newData = response.data.map(item => {
                        return {
                            ...item,
                            Debit_Domestic: addComma(item.Debit_Domestic),
                            Credit_Domestic: addComma(item.Credit_Domestic),
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
                       <Grid item xs={3}>
                         <FormControl fullWidth variant="outlined" size="small">
                           <InputLabel>
                             Account
                           </InputLabel>
                           <Select
                             variant="outlined"
                             size="small"
                             label="Account"
                             fullWidth
                             value={values.Account}
                             onChange={(e) => setFieldValue('Account', e.target.value)}
                           >
                             <MenuItem value={'JV'}>JV</MenuItem>
                             <MenuItem value={'PV'}>PV</MenuItem>
                             <MenuItem value={'AR'}>AR</MenuItem>
                           </Select>
                         </FormControl>
                       </Grid>
                       <Grid item xs={3}>
                       <DateTimePicker
                          label="วันเวลาเริ่ม"
                          name={'StartDate'}
                          value={values.StartDate}
                          onBlur={handleBlur}
                          onChange={e =>
                            setFieldValue(
                              'StartDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
                        />
                       </Grid>
                       <Grid item xs={3}>
                       <DateTimePicker
                          label="วันเวลาสิ้นสุด"
                          name={'EndDate'}
                          value={values.EndDate}
                          onBlur={handleBlur}
                          onChange={e =>
                            setFieldValue(
                              'EndDate',
                              moment(e).format('YYYY-MM-DD')
                            )
                          }
                        />
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
                   { title: 'Sequence', field: 'trans_num', type: 'string' },
                   { title: 'Account', field: 'acct', type: 'string' },
                   {
                     title: 'Description',
                     field: 'description',
                     type: 'string'
                   },
                   { title: 'Date', field: 'trans_date', type: 'date' },
                   { title: 'Site', field: 'site_ref', type: 'string' },
                   { title: 'Debit[Domestic]', field: 'Debit_Domestic', type: 'string' },
                   { title: 'Credit[Domestic]', field: 'Credit_Domestic', type: 'string' },
                   { title: 'ref', field: 'ref', type: 'string' },
                   { title: 'Note Content', field: 'NoteContent', type: 'string' },
                 ]}
                 data={data}
                 options={{
                 
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

export default GeneralLedgerDaily;