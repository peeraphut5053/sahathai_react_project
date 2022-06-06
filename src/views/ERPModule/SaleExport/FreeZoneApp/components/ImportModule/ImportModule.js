import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField, Modal, Paper, TableCell, TableRow, TableBody, Table, TableContainer, TableHead,  } from '@material-ui/core';
import ImportExcel from '../ImportExcel'
import axios from 'axios';
import ComponentDocumentHeader from '../ComponentDocumentHeader';
import ComponentDialogConfirm from '../ComponentDialogConfirm';
import Axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import tableIcons from '../tableIcons'

const ImportModule = props => {
  const [DocLine, setDocLine] = useState([])
  const [openDialog, setOpenDialog] = React.useState(false);
  const [values, setValues] = useState({
    doc_hdr: '', name: '', address: '', phone: '', tax: '', doc_type: '', doc_po: '', tax_ex: '', inv_num: '', imp_ref: '', create_date: '', states: '', docLine: [],
  });
  const [SelectItemTmp, setSelectItemTmp] = useState([])
  const [exportItemSelect, setexportItemSelect] = useState([])
  const [itemName, setitemName] = useState("")
  const [itemdoc_hdr, setitemdoc_hdr] = useState(null)
  const [itemdoc_ref_line, setitemdoc_ref_line] = useState(null)

  const [itemRefNum, setitemRefNum] = useState(null)
  const [itemPoNum, setitemPoNum] = useState(null)
  const [itemQty, setitemQty] = useState(null)
  const [moveQty, setmoveQty] = useState("")
  const [itemimp_ref, setitemimp_ref] = useState(null)
  

  const PostCreateDocument = () => {
    setValues({ ...values, docLine: DocLine });
    axios({
      method: 'post',
      url: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/data.php?load=PostCreateDocument`,
      data: values, headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response);
      })
    handleConfirmClose()
    setDocLine([])
  }

  const ConfirmPost = () => { setValues({ ...values, docLine: DocLine }); PostCreateDocument() }
  const handleConfirmClickOpen = () => {
    setValues({ ...values, docLine: DocLine });
    console.log(values.doc_type)
    if (DocLine.length > 0 && values.doc_type !== "") {
      setOpenDialog(true);
    }

  };
  const handleConfirmClose = () => { setOpenDialog(false); };
  const getValueComponentDocumentHeader = (values) => { setValues(values) }

  const SelectItemToModal = (rowData) => {

    Axios({
      method: 'get',
      url: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/data.php?load=exportItemSelect`,
    })
      .then(function (response) {
        setexportItemSelect(response.data)
      })

    handleOpen()
    Axios({ method: 'get', url: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/data.php?load=exportPoItemSelect&item=${rowData.item}`, })
      .then(function (response) {
        setSelectItemTmp(response.data)
      })
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '98%',
      height: '85vh',
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [modalStyle] = React.useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  });

  const handleSelectDocRef = (items) => {
    console.log(items)
    setitemName(items.item)
    setitemdoc_hdr(items.doc_hdr)
    setitemdoc_ref_line(items.doc_ref_line)
    setitemRefNum(items.ref_num)
    setitemPoNum(items.po_num)
    setitemQty(items.item_qty)
    setitemimp_ref(items.doc_hdr)
  }

  const handleQtyListChange = (event) => {
    setmoveQty(event.target.value)
  }

  const SelectItemToList = () => {
    const ItemToList = SelectItemTmp.map((item) => {
      return {
        item: item.item,
        doc_hdr: itemdoc_hdr,
        doc_ref_line: itemdoc_ref_line,
        ref_num: itemRefNum,
        po_num: itemPoNum,
        item_qty: moveQty,
        imp_ref: itemdoc_hdr
      }
    })

    if (itemQty > 0) {
      console.log(ItemToList)
      setDocLine(qtyMoveList => [...qtyMoveList, ItemToList[0]])
      setmoveQty("")
      setitemdoc_hdr("")
      setitemdoc_ref_line("")
      setitemRefNum("")
      setitemQty("")
      handleClose()
    } else {
      alert("ใส่จำนวนมากกว่า 0")
    }

  }

  useEffect(() => {
    
  }, [])

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
              maxBodyHeight: '65vh',
              minBodyHeight: '65vh',
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
              { title: 'po_num', field: 'po_num' },
              { title: 'item_qty', field: 'item_qty' },
            ]}
            onRowClick={(event, rowData) => {
              handleSelectDocRef(rowData)
            }}
            data={SelectItemTmp}
            options={{
              search: false,
              paging: false,
              maxBodyHeight: '65vh',
              minBodyHeight: '65vh',
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
                  <TableCell align="right">ref number</TableCell>
                  <TableCell align="right">{itemRefNum}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">doc ref line number</TableCell>
                  <TableCell align="right">{itemdoc_ref_line}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">PO number</TableCell>
                  <TableCell align="right">{itemPoNum}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">impport ref</TableCell>
                  <TableCell align="right">{itemimp_ref}</TableCell>
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
    <Card>
      <CardHeader subheader="รายละเอียดเอกสาร (การนำสินค้าเข้าเขต Free Zone)" title="Document Header" />
      <Divider />
      <CardContent>
        <ComponentDocumentHeader
          values={values}
          getValueComponentDocumentHeader={getValueComponentDocumentHeader}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
          {body}
        </Modal>
        {/* {(values.doc_type == 'export') ? <Button variant="contained" color="primary" onClick={SelectItemToModal} > Item freezone</Button> : ""} */}
        <ImportExcel
          setDocLine={setDocLine}
          data={DocLine}

       
          columns={
            [
              { title: 'doc_date', field: 'doc_date' },
              { title: 'item', field: 'item' },
              { title: 'item_description', field: 'item_description' },
              { title: 'po_num', field: 'po_num' },
              { title: 'item_qty', field: 'item_qty', type: 'numeric' },
              { title: 'item_unit', field: 'item_unit' },
              { title: 'item_weight', field: 'item_weight' },
              { title: 'item_price', field: 'item_price' },
              { title: 'doc_ref', field: 'doc_ref' },
            ]
          }
        />
      </CardContent>
      <Divider />
      <CardActions style={{ placeContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleConfirmClickOpen}> Save</Button>
        <ComponentDialogConfirm openDialog={openDialog} keepMounted handleConfirmClose={handleConfirmClose} ConfirmPost={ConfirmPost} />
      </CardActions>
    </Card>
  );
};

export default ImportModule;
