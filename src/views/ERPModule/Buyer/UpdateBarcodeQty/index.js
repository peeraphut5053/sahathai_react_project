import React, { useEffect, useState } from 'react';
import { Card, CardContent, Container, Grid } from '@mui/material';
import * as colors from '@mui/material/colors';
import Page from 'src/components/Page';
import { isMobile } from "react-device-detect";
import clsx from 'clsx';
import { Formik } from 'formik';
import moment from "moment";
import CButton from '../../../components/Input/CButton';
import API from '../../../components/API';
import CTextField from '../../../components/Input/CTextField';
import DataTable from 'src/components/DataTable';
import styles from './UpdateBarcodeQty.module.css';
const ByCOItemQTY = ({ className, ...rest }) => {
  const [data, setdata] = useState([])
  const [dataCoItem, setdataCoItem] = useState([])

  const [Co_numSelected, setCo_numSelected] = useState("")
  const [Cust_nameSelected, setCust_nameSelected] = useState("")
  const [Cust_numSelected, setCust_numSelected] = useState("")
  const [Qty_coSelected, setQty_coSelected] = useState("")
  const [Qty_doSelected, setQty_doSelected] = useState("")
  const [Qty_invSelected, setQty_invSelected] = useState("")
  const [CreatedBy, setCreatedBy] = useState("")

  useEffect(() => {
    if (isMobile == true) {
      setTimeout(() => {
        document.documentElement.webkitRequestFullScreen();
      }, 5000);
    }
  }, [])

  const SearchFn = async (load, values) => {
    const response = await API.get("API_ExecutiveReport/data.php", {
      params: {
        load: load,
        startDate: values.startdate,
        endDate: values.enddate,
        start_co_num: values.start_co_num,
        end_co_num: values.end_co_num,
        cust_num: values.cust_num
      }
    })
    setdata(response.data)
  }


  const handleClickSelectDoc = async (row) => {
    setOpenModalItem(true)
    const responseCOitem = await API.get("API_ExecutiveReport/data.php", {
      params: {
        load: 'STS_rpt_COitem',
        co_num: row.co_num,
      }
    })
    setCo_numSelected(row.co_num)
    setCust_nameSelected(row.cust_name)
    setCust_numSelected(row.cust_num)
    setQty_coSelected(row.qty_ordered)
    setQty_doSelected(row.qty_shipped)
    setQty_invSelected(row.qty_invoiced)
    setCreatedBy(row.createdby)
    setdataCoItem(responseCOitem.data)
  }

  const [openModalItem, setOpenModalItem] = React.useState(false);
  const [openModalItemMenuDoItem, setOpenModalItemMenuDoItem] = React.useState(false);
  const [openModalItemMenuInvItem, setOpenModalItemMenuInvItem] = React.useState(false);
  const [MenuDoItem, setMenuDoItem] = React.useState([]);
  const [MenuInvItem, setMenuInvItem] = React.useState([]);

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };






  const SelectMenuDoItem = async (co_num, co_line) => {
    setOpenModalItemMenuDoItem(true)
    const dataMenuDoItem = await API.get("API_ExecutiveReport/data.php", {
      params: {
        load: 'MenuDoItem',
        co_num: co_num,
        co_line: co_line,
      }
    })
    if (dataMenuDoItem) {
      setMenuDoItem(dataMenuDoItem.data)
    }
  }
  const handleCloseModalItemDo = async () => {
    setOpenModalItemMenuDoItem(false);
  };


  const SelectMenuInvItem = async (co_num, co_line) => {
    setOpenModalItemMenuInvItem(true)
    const dataMenuInvItem = await API.get("API_ExecutiveReport/data.php", {
      params: {
        load: 'MenuInvItem',
        co_num: co_num,
        co_line: co_line,
      }
    })
    if (dataMenuInvItem) {
      setMenuInvItem(dataMenuInvItem.data)
    }
  }
  const handleCloseModalItemInv = async () => {
    setOpenModalItemMenuInvItem(false);
  };

  const tableHeaderStyle = {
    backgroundColor: colors.indigo[500],
    color: '#FFF',
    padding: '0.1'
  };

  const tableCellStyle = { padding: '0.1' };

  const rowStyle = () => ({
    fontSize: 12,
    padding: 0,
    width: 500,
    fontFamily: 'sans-serif'
  });

  const lotColumns = [
    { title: 'Lot', field: 'lot' },
    {
      title: 'Create Date',
      field: 'create_date.date',
      type: 'date',
      render: rowData => moment(rowData.validated_at).format('DD/MM/YYYY')
    },
    { title: 'item', field: 'item', type: 'string' },
    { title: 'qty', field: 'qty', type: 'numeric' },
  ].map((column) => ({
    ...column,
    headerStyle: tableHeaderStyle,
    cellStyle: tableCellStyle,
  }));

  const lotLocationColumns = [
    { title: 'Lot', field: 'lot' },
    { title: 'loc', field: 'loc', type: 'string' },
    { title: 'item', field: 'item', type: 'string' },
    { title: 'qty', field: 'qty', type: 'string' },
  ].map((column) => ({
    ...column,
    headerStyle: tableHeaderStyle,
    cellStyle: tableCellStyle,
  }));

  const tagBarcodeColumns = [
    { title: 'Lot', field: 'Lot' },
    {
      title: 'Create Date',
      field: 'create_date.date',
      type: 'date',
      render: rowData => moment(rowData.validated_at).format('DD/MM/YYYY')
    },
    { title: 'item', field: 'item', type: 'string' },
    { title: 'qty', field: 'qty', type: 'numeric' },
  ].map((column) => ({
    ...column,
    headerStyle: tableHeaderStyle,
    cellStyle: tableCellStyle,
  }));




  return (
    <Page className={styles.root} title="Dashboard" >



      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Card className={clsx(styles.root, className)} {...rest} style={{ backgroundColor: '#FFFFFF' }} >
            <CardContent >
              <Grid container spacing={3} >
                <Grid xs={9} item style={{ width: '100%', overflowX: "auto" }}>
                  <Formik
                    initialValues={
                      {
                        // startdate: moment('2021-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                        // enddate: moment('2021-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                        startdate: moment().subtract(3, 'days').format('YYYY-MM-DD'),
                        enddate: moment().format('YYYY-MM-DD'),
                        // startdate: '2021-02-27',
                        // enddate: '2021-02-27',
                        start_co_num: '',
                        end_co_num: '',
                        // startdate: moment('08:00:', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                        // enddate: moment('21:00', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                        item: '',
                        refnum: '',
                        w_c: localStorage.getItem("w_c"),
                        cust_num: '',
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

                        <Grid container spacing={3}>

                          <Grid item xs={9}>
                            <CTextField
                              error={Boolean(touched.lot && errors.lot)}
                              helperText={touched.lot && errors.lot}
                              label="Lot"
                              name="lot"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lot}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CButton label={"Search"} onClick={() => { SearchFn("STS_rpt_COitem_sum", values, "") }} />
                          </Grid>
                        </Grid>

                      </form>
                    )}
                  </Formik>
                </Grid>
                <Grid xs={3} item style={{ width: '100%', overflowX: "auto" }}>
                  <Formik
                    initialValues={
                      {
                        // startdate: moment('2021-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                        // enddate: moment('2021-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                        startdate: moment().subtract(3, 'days').format('YYYY-MM-DD'),
                        enddate: moment().format('YYYY-MM-DD'),
                        // startdate: '2021-02-27',
                        // enddate: '2021-02-27',
                        start_co_num: '',
                        end_co_num: '',
                        // startdate: moment('08:00:', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                        // enddate: moment('21:00', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                        item: '',
                        refnum: '',
                        w_c: localStorage.getItem("w_c"),
                        cust_num: '',
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

                        <Grid container spacing={3}>

                          <Grid item xs={12}>
                            <CTextField
                              error={Boolean(touched.cust_num && errors.cust_num)}
                              helperText={touched.cust_num && errors.cust_num}
                              label="Qty"
                              name="Qty"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.cust_num}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <CTextField
                              error={Boolean(touched.cust_num && errors.cust_num)}
                              helperText={touched.cust_num && errors.cust_num}
                              label="item"
                              name="item"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.cust_num}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <CButton label={"Search"} onClick={() => { SearchFn("STS_rpt_COitem_sum", values, "") }} />
                          </Grid>
                        </Grid>

                      </form>
                    )}
                  </Formik>
                </Grid>

                <Grid xs={4} item style={{ width: '100%', overflowX: "auto" }}>
                  <DataTable
                    title={` Lot (${data.length} รายการ) `}
                    columns={lotColumns}
                    data={data}
                    maxBodyHeight="60vh"
                    search={false}
                    sorting={false}
                    exportButton
                    exportFileName="lot.csv"
                    rowStyle={rowStyle}
                  />
                </Grid>
                <Grid xs={4} item style={{ width: '100%', overflowX: "auto" }}>
                  <DataTable
                    title={` Lot Location (${data.length} รายการ) `}
                    columns={lotLocationColumns}
                    data={data}
                    maxBodyHeight="60vh"
                    search={false}
                    sorting={false}
                    exportButton
                    exportFileName="lot-location.csv"
                    rowStyle={rowStyle}
                  />
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={1}>
          <Card className={clsx(styles.root, className)} {...rest} style={{ backgroundColor: '#FFFFFF' }} >
            <CardContent >

              <Grid xs={12} item style={{ width: '100%', overflowX: "auto" }}>
                <DataTable
                  title={` Tag Barcode (${data.length} รายการ) `}
                  columns={tagBarcodeColumns}
                  data={data}
                  maxBodyHeight="60vh"
                  search={false}
                  sorting={false}
                  exportButton
                  exportFileName="tag-barcode.csv"
                  rowStyle={rowStyle}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>

    </Page>
  );
};



export default ByCOItemQTY;
