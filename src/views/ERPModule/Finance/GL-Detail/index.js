import React, { useState } from 'react';
import { Button, Container, Grid, Typography,FormControl,Select , InputLabel,MenuItem, Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import { default as ReactSelect } from 'react-select';
import makeAnimated from 'react-select/animated';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import useAccountList from '../GeneralLedger/useAccountList';
import useDepartments from './useDepartment';
import GeneralLedgerMonthly from './GeneralLedgerMonthly';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '15px'
    }
}));

const animatedComponents = makeAnimated();

const GeneralLedgerDetail = () => {
  const classes = useStyles();
  const { data: List, isLoading, error } = useAccountList();
  const { data: List2, isLoading2, error2 } = useDepartments();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  if (isLoading || isLoading2) {
    return <></>;
  }
  
  const addComma = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  // get year 
    const getYear = () => {
        let year = new Date().getFullYear();
        let yearList = [];
        for (let i = 2015 ; i <= year; i++) {
        yearList.unshift(i);
        }
        return yearList;
    };
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const options = List.map((item) => ({
        value: item.acct,
        label: item.acct + ' - ' + item.description
    }));

    const options2 = List2?.map((item) => ({
        value: item.unit1,
        label: item.description
    }));

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
       รายงาน G/L Detail
      </Typography>
      <Paper square>
      <Tabs
        className={classes.root}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="รายงาน G/L Detail" />
        <Tab label="รายงาน G/L MONTHLY"  />
      </Tabs>
    </Paper>
     {value === 0 ? (
         <Grid container spacing={1}>
         <Grid item sm={12} xl={12} xs={12} lg={12}>
           <Grid container spacing={3}>
             <Grid item style={{ width: '100%', overflowX: 'auto' }}>
               <Formik
                 initialValues={{
                     Account : null,
                     Department: null,
                     Year : '2024',
                     StartMonth : '1',
                     EndMonth : '1',
                 }}
                 onSubmit={async (values, { setSubmitting }) => {
                   try {
                     setSubmitting(true);
                     const response = await API.get(
                       'RPTGL_DETAIL/data.php',
                       {
                         params: {
                           load: 'ajax',
                           Acct: values.Account,
                           Unit1: values.Department,
                           selYear: values.Year,
                           selMonth: values.StartMonth,
                           selMonth2: values.EndMonth,
                         }
                       }
                     );
                    
                     if (response.data.length === 0) {
                       toast.error('ไม่พบข้อมูล');
                       setSubmitting(false);
                       return;
                     }

                     setData(response.data);
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
                           onChange={(e) => setFieldValue('Account', e)}
                           options={options}
                         />
                       </Grid>
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
                       <Grid item xs={1}>
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
                       <FormControl fullWidth variant="outlined" size="small">
                           <InputLabel>
                           เดือนเริ่มต้น
                           </InputLabel>
                           <Select
                             variant="outlined"
                             size="small"
                             label="เดือนเริ่มต้น"
                             fullWidth
                             value={values.StartMonth}
                             onChange={(e) => setFieldValue('StartMonth', e.target.value)}
                           >
                             <MenuItem value={'1'}>January</MenuItem>
                             <MenuItem value={'2'}>February</MenuItem>
                             <MenuItem value={'2'}>March</MenuItem>
                             <MenuItem value={'3'}>April</MenuItem>
                             <MenuItem value={'5'}>May</MenuItem>
                             <MenuItem value={'6'}>June</MenuItem>
                             <MenuItem value={'7'}>July</MenuItem>
                             <MenuItem value={'8'}>August</MenuItem>
                             <MenuItem value={'9'}>September</MenuItem>
                             <MenuItem value={'10'}>October</MenuItem>
                             <MenuItem value={'11'}>November</MenuItem>
                             <MenuItem value={'12'}>December</MenuItem>
                           </Select>
                         </FormControl>
                       </Grid>
                       <Grid item xs={2}>
                       <FormControl fullWidth variant="outlined" size="small">
                           <InputLabel>
                             เดือนสิ้นสุด
                           </InputLabel>
                           <Select
                             variant="outlined"
                             size="small"
                             label="เดือนสิ้นสุด"
                             fullWidth
                             value={values.EndMonth}
                             onChange={(e) => setFieldValue('EndMonth', e.target.value)}
                           >
                             <MenuItem value={'1'}>January</MenuItem>
                             <MenuItem value={'2'}>February</MenuItem>
                             <MenuItem value={'2'}>March</MenuItem>
                             <MenuItem value={'3'}>April</MenuItem>
                             <MenuItem value={'5'}>May</MenuItem>
                             <MenuItem value={'6'}>June</MenuItem>
                             <MenuItem value={'7'}>July</MenuItem>
                             <MenuItem value={'8'}>August</MenuItem>
                             <MenuItem value={'9'}>September</MenuItem>
                             <MenuItem value={'10'}>October</MenuItem>
                             <MenuItem value={'11'}>November</MenuItem>
                             <MenuItem value={'12'}>December</MenuItem>
                           </Select>
                         </FormControl>
                       </Grid>
                       <Grid item xs={1}>
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
                   { title: 'trans_date', field: 'trans_date', type: 'string' },
                   { title: 'trans_num', field: 'trans_num', type: 'string' },
                   { title: 'acct', field: 'acct', type: 'string'},
                   { title: 'ref', field: 'ref', type: 'string' },
                   { title: 'check_num', field: 'check_num', type: 'string' },
                   { title: 'for_amount', field: 'for_amount', type: 'number' },
                   { title: 'debit', field: 'debit', type: 'number' },
                   { title: 'credit', field: 'credit', type: 'number' },
                   { title: 'accumulate', field: 'accumulate', type: 'number' },
                   { title: 'note', field: 'note', type: 'string' },
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
     ) : <GeneralLedgerMonthly options2={options2} />}
    </Container>
  );
};

export default GeneralLedgerDetail;