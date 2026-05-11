import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Container, Dialog, DialogTitle, Grid, List, ListItem, ListItemText, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import * as colors from '@mui/material/colors';
import Page from 'src/components/Page';
import { isMobile } from "react-device-detect";
import clsx from 'clsx';
import { Formik } from 'formik';
import moment from "moment";
import CDatePicker from '../../../components/Input/CDatePicker';
import CButton from '../../../components/Input/CButton';
import API from '../../../components/API';
import CTextField from '../../../components/Input/CTextField';
import DataTable from 'src/components/DataTable';
import ModalManagementFullPage from 'src/views/components/ModalManagementFullPage';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import styles from './COItemSummary.module.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: colors.indigo[500],
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));
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

  const rowStyle = () => ({
    fontSize: 12,
    padding: 0,
    width: 500,
    fontFamily: 'sans-serif'
  });

  const tableHeaderStyle = {
    backgroundColor: colors.indigo[500],
    color: '#FFF',
    padding: '0.1'
  };

  const tableCellStyle = { padding: '0.1' };

  const detailColumns = [
    {
      title: 'Order Date',
      field: 'order_date.date',
      type: 'date',
      render: rowData => moment(rowData.validated_at).format('DD/MM/YYYY')
    },
    { title: 'Type', field: 'Type', type: 'string' },
    { title: 'CO line', field: 'co_line', type: 'numeric' },
    { title: 'Item', field: 'item', type: 'numeric' },
    { title: 'Unit', field: 'u_m', type: 'numeric' },
    {
      title: 'CO Qty Ordered',
      field: 'qty_ordered',
      type: 'numeric',
      cellStyle: { ...tableCellStyle, backgroundColor: colors.lightBlue[50] }
    },
    { title: 'Co Price', field: 'co_price', type: 'numeric' },
    { title: 'Total Weight', field: 'totalWeight', type: 'numeric' },
    {
      title: 'DO Qty Shipped',
      field: 'qty_shipped',
      width: 250,
      cellStyle: { ...tableCellStyle, backgroundColor: colors.lightBlue[50] },
      render: rowData => (
        <Button variant="outlined" onClick={() => SelectMenuDoItem(rowData.co_num, rowData.co_line)}>
          {rowData.qty_shipped}
        </Button>
      )
    },
    { title: 'DO Price', field: 'do_price', type: 'numeric' },
    {
      title: 'Qty Invoiced',
      field: 'qty_invoiced',
      width: 250,
      cellStyle: { ...tableCellStyle, backgroundColor: colors.lightBlue[50] },
      render: rowData => (
        <Button variant="outlined" onClick={() => SelectMenuInvItem(rowData.co_num, rowData.co_line)}>
          {rowData.qty_invoiced}
        </Button>
      )
    },
    { title: 'Inv Price', field: 'inv_price', type: 'numeric' },
    { title: 'Inv Weight', field: 'inv_weight', type: 'numeric' },
    { title: 'Diff CO DO', field: 'Diff_CO_DO', type: 'numeric' },
  ].map((column) => ({
    ...column,
    headerStyle: tableHeaderStyle,
    cellStyle: {
      ...tableCellStyle,
      ...column.cellStyle,
    },
  }));

  const summaryColumns = [
    { title: 'CO Num', field: 'co_num' },
    {
      title: 'Order Date',
      field: 'order_date.date',
      type: 'date',
      render: rowData => moment(rowData.validated_at).format('DD/MM/YYYY')
    },
    {
      title: 'CO Age Days',
      field: 'COage_Days',
      type: 'numeric',
    },
    { title: 'Type', field: 'Type', type: 'string' },
    { title: 'Created By', field: 'createdby', type: 'string' },
    { title: 'Cust Num', field: 'cust_num', type: 'string' },
    { title: 'Cust Name', field: 'cust_name', type: 'string' },
    {
      title: 'CO Qty Ordered',
      field: 'qty_ordered',
      type: 'numeric',
      cellStyle: { ...tableCellStyle, backgroundColor: colors.lightBlue[50] }
    },
    { title: 'CO price', field: 'co_price', type: 'numeric' },
    { title: 'Total Weight', field: 'totalWeight', type: 'numeric' },
    {
      title: 'DO Qty Shipped',
      field: 'qty_shipped',
      type: 'numeric',
      cellStyle: { ...tableCellStyle, backgroundColor: colors.lightBlue[50] }
    },
    { title: 'DO Price', field: 'do_price', type: 'numeric' },
    {
      title: 'Qty Invoiced',
      field: 'qty_invoiced',
      type: 'numeric',
      cellStyle: { ...tableCellStyle, backgroundColor: colors.lightBlue[50] }
    },
    { title: 'Inv Price', field: 'inv_price', type: 'numeric' },
    { title: 'Inv Weight', field: 'inv_weight', type: 'numeric' },
    { title: 'Diff CO DO', field: 'Diff_CO_DO', type: 'numeric' },
  ].map((column) => ({
    ...column,
    headerStyle: tableHeaderStyle,
    cellStyle: {
      ...tableCellStyle,
      ...column.cellStyle,
    },
  }));




  return (
    <Page className={styles.root} title="Dashboard" >
      <Dialog onClose={handleCloseModalItemDo} aria-labelledby="simple-dialog-title" open={openModalItemMenuDoItem}>
        <DialogTitle id="simple-dialog-title">Data</DialogTitle>
        <List>
          {MenuDoItem.map((data) => (
            <ListItem button key={data.do_num}>
              <ListItemText primary={data.do_num} />
            </ListItem>
          ))}
        </List>
      </Dialog>

      <Dialog onClose={handleCloseModalItemInv} aria-labelledby="simple-dialog-title" open={openModalItemMenuInvItem}>
        <DialogTitle id="simple-dialog-title">Data</DialogTitle>
        <List>
          {MenuInvItem.map((data) => (
            <ListItem button key={data.inv_num}>
              <ListItemText primary={data.inv_num} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <ModalManagementFullPage
        modalHeader={
          <></>
        }
        modalDetail={
          <>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Co number</StyledTableCell>
                      <StyledTableCell align="right">Customer Number</StyledTableCell>
                      <StyledTableCell align="right">Customer Name</StyledTableCell>
                      <StyledTableCell align="right">CreatedBy</StyledTableCell>
                      <StyledTableCell align="right">Sum Qty Ordered</StyledTableCell>
                      <StyledTableCell align="right">Sum Qty Shipped</StyledTableCell>
                      <StyledTableCell align="right">Sum Qty Invoiced</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">{Co_numSelected} </StyledTableCell>
                      <StyledTableCell align="right">{Cust_nameSelected}</StyledTableCell>
                      <StyledTableCell align="right">{Cust_numSelected}</StyledTableCell>
                      <StyledTableCell align="right">{CreatedBy}</StyledTableCell>
                      <StyledTableCell align="right">{Qty_coSelected}</StyledTableCell>
                      <StyledTableCell align="right">{Qty_doSelected}</StyledTableCell>
                      <StyledTableCell align="right">{Qty_invSelected}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <DataTable
              title={` จำนวนข้อมูล (${dataCoItem.length} รายการ) `}
              columns={detailColumns}
              data={dataCoItem}
              onRowClick={handleClickSelectDoc}
              maxBodyHeight="60vh"
              search={false}
              sorting={false}
              exportButton
              exportFileName="co-item-detail.csv"
              rowStyle={rowStyle}
            />
          </>
        }

        open={openModalItem}
        onClose={handleCloseModalItem}
      />
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid item sm={12} xl={12} xs={12} lg={12} >
            <Card className={clsx(styles.root, className)} {...rest} style={{ backgroundColor: '#FFFFFF' }} >
              <CardContent >
                <Grid container spacing={3} >
                  <Grid item style={{ width: '100%', overflowX: "auto" }}>
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
                          <Grid item xs={3} >
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={3} >
                              <CDatePicker
                                label="วันเวลาเริ่ม"
                                name={"enddate"}
                                value={values.startdate}
                                onBlur={handleBlur}
                                onChange={e => setFieldValue('startdate', moment(e).format('YYYY-MM-DD'))}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <CDatePicker
                                label="วันเวลาสิ้นสุด"
                                name={"enddate"}
                                value={values.enddate}
                                onBlur={handleBlur}
                                onChange={e => { setFieldValue('enddate', moment(e).format('YYYY-MM-DD')) }}
                              />
                            </Grid>
                            {/* <Grid item xs={2}>
                              <CTextField
                                error={Boolean(touched.item && errors.item)}
                                helperText={touched.item && errors.item}
                                label="CO start"
                                name="start_co_num"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.start_co_num}
                                Autocomplete={false}
                              />
                            </Grid>
                             */}
                            <Grid item xs={2}>
                              <CTextField
                                error={Boolean(touched.cust_num && errors.cust_num)}
                                helperText={touched.cust_num && errors.cust_num}
                                label="cust num"
                                name="cust_num"
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


                  <Grid item style={{ width: '100%', margin: 5, overflowX: "auto" }}>
                    <DataTable
                      title={` CO Item summary (${data.length} รายการ) `}
                      columns={summaryColumns}
                      data={data}
                      onRowClick={handleClickSelectDoc}
                      maxBodyHeight="60vh"
                      search={false}
                      sorting={false}
                      exportButton
                      exportFileName="co-item-summary.csv"
                      rowStyle={rowStyle}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};



export default ByCOItemQTY;
