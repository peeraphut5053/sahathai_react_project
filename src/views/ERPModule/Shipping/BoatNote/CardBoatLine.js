import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip
} from '@material-ui/core';
import ModalManagement from '../../../components/ModalManagement';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import { ReportMoveInternal } from './ReportMoveInternal';
import { ReportMoveBoatNote } from './ReportMoveBoatNote';
import API from 'src/views/components/API';
import CTextField from 'src/views/components/Input/CTextField';
import CAutocompleteNameOfDoGroup from '../../../components/Input/CAutocompleteNameOfDoGroup';
import CAutocompleteLocation from '../../../components/Input/CAutocompleteLocation2';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const CardBoatLine = (props, { className, ...rest }) => {
  const classes = useStyles();

  const [openModalItem, setOpenModalItem] = React.useState(false); // Boat NOte
  const [do_group_name, setdo_group_name] = useState("")
  const [loc, set_loc] = useState("")
  const [boatPosition, setBoatPosition] = useState("");

  const printReportMove = async (doc_type) => {
    if (props.doc_num) {

      if (doc_type == "Internal") {
        const response = await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: 'STS_QTY_MOVE_REPORT',
            doc_num: props.doc_num
          }
        })
        const response2 = await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: 'STS_QTY_MOVE_REPORT_header',
            doc_num: props.doc_num
          }
        })
        console.log(response2.data);
        ReportMoveInternal(response2.data, response.data)
      } else if (doc_type == "BoatNote") {
        const response = await API.get("RPT_JOBPACKING/data.php", {
          params: {
            load: 'STS_QTY_MOVE_REPORT',
            doc_num: props.doc_num
          }
        })
        ReportMoveBoatNote(response.data, response.data, response.data, response.data)
      }
    } else if (doc_type == "BoatNoteSelectByDoGroup") {
      const response = await API.get("RPT_JOBPACKING/data.php", {
        params: {
          load: 'BoatNoteSelectByDoGroup',
          do_group_name: do_group_name,
          loc : loc,
          boatPosition : boatPosition
        }
      })
      ReportMoveBoatNote(response.data, response.data, response.data, response.data)

    } else {
      alert("เลือกใบส่งของ")
    }
  }

  const printReportMoveBarcode = async (doc_type) => {
    const response = await API.get("RPT_JOBPACKING/data.php", {
      params: {
        load: 'STS_QTY_MOVE_REPORT',
        doc_num: props.doc_num
      }
    })
  }


  const openEditPage = () => {
    props.handlesetEditStatus()
  }

  const setBoatPositionState = (event) => {
    setBoatPosition(event.target.value)
  }

  const handleCloseModalItem = async () => {
    setOpenModalItem(false);
  };
  return (
    <Card

    >
      <ModalManagement
        modalHeader={
          <></>
        }
        modalDetail={
          <div>

            <>
              <Grid container spacing={2}>

                <Grid item xs={12} >
                  <CAutocompleteNameOfDoGroup
                    // onBlur={handleBlur}
                    name="do_group_name"
                    value={do_group_name}
                    setdo_group_name={setdo_group_name}
                  />
                </Grid>
                <Grid item xs={12} >
                  <FormControl style={{ width: 100 + '%' }} variant="outlined" size="small">
                    <InputLabel>ระวางเรือ</InputLabel>
                    <Select
                      value={boatPosition}
                      variant="outlined"
                      label="ระวางเรือ"
                      size="small"
                      onChange={setBoatPositionState}
                    >
                      <MenuItem value="ไม่ระบุตำแหน่ง">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'หัวเรือ'}>หัวเรือ</MenuItem>
                      <MenuItem value={'กลางหัว'}>กลางหัว</MenuItem>
                      <MenuItem value={'กลางท้าย'}>กลางท้าย</MenuItem>
                      <MenuItem value={'ท้ายเรือ'}>ท้ายเรือ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <CAutocompleteLocation
                    name="loc"
                    value={loc}
                    setFieldValue={set_loc}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Button variant="contained" label={""} color="primary"
                    onClick={() => printReportMove("BoatNoteSelectByDoGroup")} >
                    พิมพ์ BoatNote {do_group_name}
                  </Button>
                </Grid>
              </Grid>
            </>
          </div>
        }

        open={openModalItem}
        onClose={handleCloseModalItem}
      />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid item>
            <div>
              <div style={{ padding: '0px 10px' }}>

                {/* <CTextField
                  error={Boolean(touched.item && errors.item)}
                  helperText={touched.item && errors.item}
                  label="DO num"
                  name="do_num"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.do_num}
                  Autocomplete={false}
                /> */}
                {/* <Chip label={"พิมพ์ใบส่งสินค้า"} color="primary" style={{ marginRight: 5 }} onClick={() => setOpenModalItem(true)} /> */}
                {
                  (props.doc_type == "Ship") ?
                    <>
                      <Chip label={"พิมพ์ใบสรุปการส่งสินค้า"} color="primary" style={{ marginRight: 5 }} onClick={() => printReportMove("Internal")} />
                      <Chip label={"พิมพ์ Boat Note"} color="primary" style={{ marginRight: 5 }} onClick={() => printReportMove("BoatNote")} />
                      <Chip label={"พิมพ์รายละเอียด Barcode"} color="primary" style={{ marginRight: 5 }} onClick={() => printReportMoveBarcode("BoatNote")} />
                    </>
                    :
                    <>
                      <Chip label={"พิมพ์ Boat Note Demo"} color="primary" style={{ marginRight: 5 }} onClick={() => setOpenModalItem(true)} />
                      <Chip label={"พิมพ์ใบสรุปการส่งสินค้า"} color="primary" style={{ marginRight: 5 }} onClick={() => printReportMove("Internal")} />
                      <Chip label={"พิมพ์รายละเอียด Barcode"} color="primary" style={{ marginRight: 5 }} onClick={() => printReportMove("BoatNote")} />
                    </>
                }


                <Chip label={"แก้ไขใบส่งสินค้า"} color="primary" style={{ marginRight: 5 }} onClick={openEditPage} />
              </div>
            </div>

            <MaterialTable
              style={{ width: '62vw', margin: 5, overflowX: "scroll" }}
              icons={tableIcons}
              title={"Quantity Move List (" + props.doc_num + ") : " + props.STS_qty_move_line.length + " รายการ"}
              columns={[
                { title: 'id', field: 'id' },
                { title: 'lot', field: 'lot', width: 200 },
                { title: 'From loc', field: 'loc', width: 100 },
                { title: 'item', field: 'item', width: 300 },
                { title: 'qty', field: 'qty1', type: 'numeric' },
                { title: 'unit', field: 'u_m' },
                { title: 'boat position', field: 'boat_position' },
              ]}
              data={props.STS_qty_move_line}
              options={{
                search: false,
                paging: false,
                maxBodyHeight: '65vh',
                minBodyHeight: '65vh',
                filtering: false,
                rowStyle: rowData => ({
                  // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                  fontSize: '0.7em',
                  padding: 0,
                  fontFamily: 'sans-serif'
                })
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CardBoatLine.propTypes = {
  className: PropTypes.string
};

export default CardBoatLine;
