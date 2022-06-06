import React, { useState, useEffect } from 'react';
import { Container, Modal, Switch, Button } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import CMatTable from './view/QuantityMove/CMatTable';
import API from '../../../components/API';
import MaterialTable from 'material-table'
import tableIcons from '../../../components/table/tableIcons'
import ModalProgressSaving from './view/QuantityMove/ModalProgressSaving';
import CGroupTextBoxs from './view/QuantityMove/CGroupTextBoxs';
import SaveIcon from '@material-ui/icons/Save';
import { CPrintDocument } from './view/QuantityMove/CPrintDocument';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';


function App() {

  const [PageState, setPageState] = useState(false)
  const toggleChecked = () => setPageState((prev) => !prev) //State Page Create or View Document
  const [DocNum, setDocNum] = useState("")
  const [STS_qty_move_hdr_loc, setSTS_qty_move_hdr_loc] = useState("")
  const [STS_qty_move_hdr_date, setSTS_qty_move_hdr_date] = useState("")
  const [STS_qty_move_line, setSTS_qty_move_line] = useState([])
  const [STS_qty_move_hrd, setSTS_qty_move_hrd] = useState([])
  const [ItemLoc, setItemLoc] = useState([])
  const handleDocNum = (DocNum) => setDocNum(DocNum) // Set Document Number
  const handleSTS_qty_move_hdr_loc = (loc) => setSTS_qty_move_hdr_loc(loc) //Set Location
  const handleSTS_qty_move_hdr_date = (date) => { setSTS_qty_move_hdr_date(date) } //Set Location
  const handleSTS_qty_move_line = (STS_qty_move_line) => setSTS_qty_move_line(STS_qty_move_line) //
  const handlecheckItemLotLoc = (ItemLoc) => setItemLoc(ItemLoc)
  const handleSetPageState = (pageState) => { setPageState(pageState) }


  useEffect(() => {
    API.get(`API_QuantityMove/data.php?load=STS_qty_move_hrd`)
      .then(res => {
        setSTS_qty_move_hrd(res.data)
      })
  }, [PageState])


  const handleClickSelectDoc = (row) => {
    handleDocNum(row.doc_num)
    handleSTS_qty_move_hdr_loc(row.loc)
    handleSTS_qty_move_hdr_date(row.create_date.date)
    API.get(`API_QuantityMove/data.php?load=STS_qty_move_line&doc_num=${row.doc_num}`)
      .then(res => {
        handleSTS_qty_move_line(res.data)
      })

    API.get(`API_QuantityMove/data.php?load=checkItemLotLoc&loc=${row.loc}`)
      .then(res => {
        console.log(res.data)
        handlecheckItemLotLoc(res.data)
      })


  }


  const [toLocation, setToLocation] = useState()
  const [w_c, setw_c] = useState("")
  const [qtyMoveList, setQtyMoveList] = useState([]);
  const [docNum, setdocNum] = useState("")
  const [openModal, setOpenModal] = useState(false);
  const [ProcessSuccess, setProcessSuccess] = useState(false)
  const handleToLocation = (location) => { setToLocation(location) }
  const handlew_c = (work_center) => {
    setw_c(work_center)
  }
  const handleClose = () => { setOpenModal(false); };
  const handleProcessSuccess = (ProcessSuccess) => {
    setOpenModal(false);
    setProcessSuccess(ProcessSuccess);
    setPageState(ProcessSuccess)
  };


  useEffect(() => {
    setOpenModal(false)
  }, [ProcessSuccess])


  const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
    if (!accumulator.find(obj => obj[prop] === currentValue[prop])) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, [])

  const handleScanTag = (scanTag) => {
    API.get(`API_QuantityMove/data.php?load=SearchTagDetail&tag_id=${scanTag}`)
      .then(res => {
        const items = res.data
        if (res.data.length > 0) {
          setQtyMoveList(qtyMoveList => [...qtyMoveList, { id: items[0].id, lot: items[0].lot, loc: items[0].loc, item: items[0].item, qty1: items[0].qty1, u_m: items[0].u_m, }])
          removeDuplicatesFromArrayByProperty(qtyMoveList, 'id');
          setQtyMoveList(qtyMoveList => removeDuplicatesFromArrayByProperty(qtyMoveList, 'id'))

        } else {
          alert("ไม่พบ Tags")
        }
      })
  }

  const handleSubmit = () => {
    if (!toLocation || qtyMoveList.length === 0) {
      alert("กรุณากรอก location ปลายทาง หรือ scan barcode อย่างน้อย 1 lot")
      setOpenModal(false);
    } else {
      setOpenModal(true);
      //Insert QTY MOVE HEARDER
      API.get(`API_QuantityMove/data.php?load=moveqty_create_hdr&toLoc=${toLocation}&w_c=${w_c}`)
        .then(res => {
          const moveqty_hdr = res.data
          setdocNum(moveqty_hdr.doc_num)
          setToLocation(moveqty_hdr.loc)
          if (qtyMoveList.length > 0) {
            let i = 1;
            //Insert QTY LINE 
            const timer = setInterval(() => {
              API.get(`API_QuantityMove/data.php?load=moveqty_create_line&docnum=${moveqty_hdr.doc_num}&docline=${i}&tagnum=${qtyMoveList[i - 1].id}&toLoc=${toLocation}`)
                .then(res => {
                  console.log("Call API moveqty_create_line")
                })
              if (i === qtyMoveList.length) {
                clearInterval(timer)
                setQtyMoveList([])
                //setOpen(false);
              }
              i = i + 1;
            }, 1000);
          }
        })
    }
  }

  const body = (
    <div >
      <ModalProgressSaving
        docNum={docNum}
        toLocation={toLocation}
        qtyMoveList={qtyMoveList}
        handleProcessSuccess={handleProcessSuccess}
      />
    </div >
  );


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      padding: theme.spacing(2),
    },

    control: {
      padding: theme.spacing(2),
    },
  }));



  const classes = useStyles();


  return (
    <Page
      title="Move QTY"
    >
      <Grid container className={classes.root} spacing={0} >
        <Grid item xs={12}>
          {<Switch checked={PageState} onChange={toggleChecked} />}
          {(PageState) ? "Create" : "View"}

        </Grid>
        <Grid item xs={12}>
          <CGroupTextBoxs
            handleScanTag={handleScanTag}
            handleToLocation={handleToLocation}
            handlew_c={handlew_c}
            DocNum={DocNum}
            STS_qty_move_hdr_loc={STS_qty_move_hdr_loc}
            STS_qty_move_hdr_date={STS_qty_move_hdr_date}
            PageState={PageState}
            qtyMoveList={qtyMoveList}
            ItemLoc={ItemLoc}
            PageState={PageState}
            toggleChecked={toggleChecked}
          />
        </Grid>

        <Grid spacing={2} item xs={5} hidden={(PageState) ? true : false} style={{ textAlign: "center" }}>
          <MaterialTable
            style={{ width: '100%', overflowX: "scroll" }}
            icons={tableIcons}
            title={"รายงานการย้าย Item"}
            columns={[
              { title: 'Doc num', field: 'doc_num' },
              { title: 'date', field: 'create_date.date', type: 'date' },
              { title: 'To location', field: 'loc' },
            ]}
            onRowClick={(event, rowData) => {
              console.log(event)
              handleClickSelectDoc(rowData)
            }}
            data={STS_qty_move_hrd}
            options={{
              actionsColumnIndex: -1,
              search: false,
              paging: false,
              maxBodyHeight: '50vh',
              minBodyHeight: '50vh',
              filtering: true,
              rowStyle: rowData => ({
                // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                fontSize: 13,
                padding: 0,
                width: 500,
                fontFamily: 'sans-serif'
              }
              ),
            }}
          />
        </Grid>
        <Grid item xs={(PageState) ? 12 : 7}>

          <div>
            <Modal open={openModal} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
              {body}
            </Modal>
          </div>
          <CMatTable
            qtyMoveList={(PageState) ? qtyMoveList : STS_qty_move_line}
          />
          <div style={{ width: "100%", padding: 15 }}>
            {(PageState) ?
              <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ margin: 10 }} onClick={handleSubmit} >Save  </Button> :
              <>
                {/* <CPrintDocument
                    DocNum={DocNum}
                    toLocation={STS_qty_move_hdr_loc}
                    qtyMoveList={STS_qty_move_line}
                    STS_qty_move_hdr_date={STS_qty_move_hdr_date}
                  /> */}
              </>
            }
          </div>
        </Grid>
      </Grid>
    </Page>
  );
}
export default App;