import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField, TableCell, TableHead, TableRow, TableBody, Paper, TableContainer, Table, } from '@material-ui/core';
import MaterialTable from 'material-table'
import tableIcons from '../tableIcons'
import Modal from '@material-ui/core/Modal';
import Axios from 'axios';
import ComponentDocumentHeader from '../ComponentDocumentHeader';
import ImportExcel from '../ImportExcel';
import ComponentDialogConfirm from '../ComponentDialogConfirm';

const ExportModule = props => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '90%',
      height: '70vh',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflowY: 'scroll'
    },
  }));
  const classes = useStyles();
  const [modalStyle] = React.useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  });
  const [open, setOpen] = React.useState(false);
  const [moveQty, setmoveQty] = useState("")
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const { className, ...rest } = props;
  const [exportItemSelect, setexportItemSelect] = useState([])

  useEffect(() => {
    Axios({
      method: 'get',
      url: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/data.php?load=exportItemSelect`,
    })
      .then(function (response) {
        setexportItemSelect(response.data)
      })
  }, [])

  const [SelectItemTmp, setSelectItemTmp] = useState([])
  const [itemName, setitemName] = useState("")
  const [itemdoc_hdr, setitemdoc_hdr] = useState(null)
  const [itemRefNum, setitemRefNum] = useState(null)
  const [itemQty, setitemQty] = useState(null)
  const [values, setValues] = useState({
    doc_hdr: '', name: '', address: '', phone: '', tax: '', doc_type: '', doc_po: '', tax_ex: '', inv_num: '', create_date: '', states: '', docLine: [],
  });
  const [DocLine, setDocLine] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);



  const SelectItemToModal = (rowData) => {
    handleOpen()
    Axios({ method: 'get', url: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/data.php?load=exportPoItemSelect&item=${rowData.item}`, })
      .then(function (response) {
        setSelectItemTmp(response.data)
      })
  }

  const SelectItemToList = () => {
    const ItemToList = SelectItemTmp.map((item) => {
      return {
        item: item.item,
        doc_hdr: itemdoc_hdr,
        ref_num: itemRefNum,
        item_qty: moveQty
      }
    })
    setDocLine(qtyMoveList => [...qtyMoveList, ItemToList[0]])
    setmoveQty("")
    setitemdoc_hdr("")
    setitemRefNum("")
    setitemQty("")
    handleClose()
  }

  const handleSelectDocRef = (items) => {
    setitemName(items.item)
    setitemdoc_hdr(items.doc_hdr)
    setitemRefNum(items.ref_num)
    setitemQty(items.item_qty)
  }

  const handleQtyListChange = (event) => {
    setmoveQty(event.target.value)
  }

  const getValueComponentDocumentHeader = (values) => {
    setValues(values)
  }


  const PostCreateDocument = () => {
    setValues({ ...values, docLine: DocLine });
    Axios({
      method: 'post',
      url: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/data.php?load=PostCreateDocument`,
      data: values, headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response);
      })
    handleConfirmClose()
    setDocLine([])
    setValues([])
  }

  const ConfirmPost = () => { setValues({ ...values, docLine: DocLine }); PostCreateDocument() }
  const handleConfirmClickOpen = () => { setValues({ ...values, docLine: DocLine }); setOpenDialog(true); };
  const handleConfirmClose = () => { setOpenDialog(false); };

  const body = (
    <Paper style={modalStyle} className={classes.paper}>
      <Grid container spacing={2}  >
        <Grid item xs={4}>
          <MaterialTable
            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
            icons={tableIcons}
            title="เลือก item "
            columns={[
              { title: 'item', field: 'item' },
              { title: 'qty', field: 'item_qty', type: 'numeric', filtering: false, width: 5 },
            ]}
            onRowClick={(event, rowData) => {
              SelectItemToModal(rowData)
            }}
            data={exportItemSelect}
            options={{
              search: false,
              paging: false,
              maxBodyHeight: '55vh',
              minBodyHeight: '55vh',
              filtering: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <MaterialTable
            style={{ width: '100%', margin: 5, overflowX: "scroll" }}
            icons={tableIcons}
            title="เลือกเอกสาร PO "
            columns={[
              { title: 'Doc num', field: 'doc_hdr' },
              { title: 'ref_num', field: 'ref_num' },
              { title: 'item_qty', field: 'item_qty' },
            ]}
            onRowClick={(event, rowData) => {
              handleSelectDocRef(rowData)
            }}
            data={SelectItemTmp}
            options={{
              search: false,
              paging: false,
              maxBodyHeight: '55vh',
              minBodyHeight: '55vh',
              filtering: false,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">Item</TableCell>
                  <TableCell align="right">{itemName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">เลขที่ใบขนสินค้า</TableCell>
                  <TableCell align="right">{itemdoc_hdr}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">PO number</TableCell>
                  <TableCell align="right">{itemRefNum}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">จำนวน</TableCell>
                  <TableCell align="right">{itemQty}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <TextField fullWidth label="จำนวนที่ย้าย" type="number" onChange={handleQtyListChange} margin="dense" name="moveQty" autoComplete="off" variant="outlined" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <Button color="primary" variant="contained" onClick={() => { SelectItemToList() }}  >Select Item</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
      <Grid container spacing={2}  >

        <Grid item xs={12}>
          <Card {...rest} className={clsx(classes.root, className)} >
            <form autoComplete="off" noValidate>
              <CardHeader subheader="รายละเอียดเอกสาร (การนำสินค้าออกเขต Free Zone)" title="Document Header" />
              <Divider />
              <CardContent>
                <ComponentDocumentHeader 
                getValueComponentDocumentHeader={getValueComponentDocumentHeader}
                docTypeDefault = {"export"}
                />
              </CardContent>
              <Divider />
              <CardContent>
                <Button variant="contained" color="primary" onClick={SelectItemToModal} > Select Item by Doc num</Button>
                <ImportExcel
                  doc_type="export"
                  setDocLine={setDocLine}
                  data={DocLine}
                  columns={
                    [
                      { title: 'item', field: 'item' },
                      { title: 'ref_num', field: 'ref_num' },
                      { title: 'item_size', field: 'item_size' },
                      { title: 'item_grade', field: 'item_grade' },
                      { title: 'item_schedule', field: 'item_schedule' },
                      { title: 'item_length', field: 'item_length' },
                      { title: 'item_type', field: 'item_type' },
                      { title: 'item_qty', field: 'item_qty', type: 'numeric' },
                    ]
                  }
                />
              </CardContent>
              <Divider />
              <CardActions style={{ placeContent: "center" }}>
                <Button variant="contained" color="primary" onClick={handleConfirmClickOpen}> Save</Button>
                <ComponentDialogConfirm openDialog={openDialog} keepMounted handleConfirmClose={handleConfirmClose} ConfirmPost={ConfirmPost} />
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

ExportModule.propTypes = {
  className: PropTypes.string
};

export default ExportModule;
