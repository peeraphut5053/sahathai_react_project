import React, { useState } from 'react';
import { Button, Container, Grid, Typography,FormControl,Select , InputLabel,MenuItem, Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import { default as ReactSelect } from 'react-select';
import makeAnimated from 'react-select/animated';
import tableIcons from '../../../components/table/tableIcons';
import API from '../../../components/API';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import GeneralLedgerDaily from './GeneralLedgerDaily';
import useAccountList from './useAccountList';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '15px'
    }
}));

const animatedComponents = makeAnimated();

const GeneralLedger = () => {
  const classes = useStyles();
  const { data: List, isLoading, error } = useAccountList();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  if (isLoading) {
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

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '15px', textAlign: 'center' }}>
       รายงาน G/L
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
        <Tab label="รายงาน G/L" />
        <Tab label="รายงาน G/L เล่มบัญชีรายวัน"  />
      </Tabs>
    </Paper>
     {value === 0 ? (
         <Grid container spacing={1}>
         <Grid item sm={12} xl={12} xs={12} lg={12}>
           <Grid container spacing={3}>
             <Grid item style={{ width: '100%', overflowX: 'auto' }}>
               <Formik
                 initialValues={{
                     Account : [],
                     Year : '2024',
                     StartMonth : '1',
                     EndMonth : '1',
                 }}
                 onSubmit={async (values, { setSubmitting }) => {
                   try {
                     setSubmitting(true);
                     const response = await API.get(
                       'RPTGL/data.php',
                       {
                         params: {
                           load: 'ajax',
                           Acct: values.Account.join(','),
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

                     const newData = response.data.map(item => {
                        return {
                            ...item,
                            trans_date: moment(item.trans_date).format('DD/MM/YYYY'),
                            for_amount: addComma(item.for_amount),
                            debit: addComma(item.debit),
                            credit: addComma(item.credit),
                            accumulate: addComma(item.accumulate),
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
                           isMulti
                           onChange={(e) => setFieldValue('Account', e.map((item) => item.value))}
                           options={options}
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
     ) : <GeneralLedgerDaily />}
    </Container>
  );
};

export default GeneralLedger;