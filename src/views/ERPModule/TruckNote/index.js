import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    FormControl,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField,
    Modal,
    InputLabel,
} from '@material-ui/core';

import Page from 'src/components/Page';

import CardTruckHeader from './CardTruckHeader';
import CardTruckLine from './CardTruckLine';
import API from '../../components/API';
import ModalManagementFullPage from '../../components/ModalManagementFullPage';
import CAutocompleteWorkCenter from '../../components/Input/CAutocompleteWorkCenter';

import CAutocompleteLocationPTR from '../../components/Input/CAutocompleteLocationPTR';

import CAutocompleteLocationPTRedit from '../../components/Input/CAutocompleteLocationPTRedit';

import CAutocompleteListOfDoGroup from '../../components/Input/CAutocompleteListOfDoGroup';

import { Formik } from 'formik';
import moment from "moment";
import CTextField from '../../components/Input/CTextField';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import CAutocompleteBoatList from 'src/views/components/Input/CAutocompleteBoatList';
import SaveIcon from '@material-ui/icons/Save';
import ModalProgressSaving from './ModalProgressSaving';
import ModalSelectDOList from './ModalSelectDOList';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake-thai/build/vfs_fonts";
import useTruck from './useTruck';





moment.locale("th");

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const BoatNote = () => {
    const classes = useStyles();
    const { data, isLoading, error, refetch } = useTruck();
    const [STS_qty_move_line, setSTS_qty_move_line] = useState([])
    const [STS_qty_move_hrd_Truck, setSTS_qty_move_hrd_Truck] = useState([])
    const [SelectDOList, setSelectDOList] = useState([])
    const [openModalCreateBoteNote, setOpenModalCreateBoteNote] = useState(false);
    const [openModalCreateDoGroup, setOpenModalCreateDoGroup] = useState(false);
    const [openModalSelectDOList, setOpenModalSelectDOList] = useState(false);
    const [toLoc, setToLoc] = useState("")
    const [qtyMoveList, setQtyMoveList] = useState([]);
    const [doctype_shipping, setDoctype_shipping] = useState("");
    const [boatPosition, setBoatPosition] = useState("");
    const [destination, setDestination] = useState("");
    const [docType, setDocType] = useState("Truck");
    let [Search_STS_qty_move_hrd, setSearch_STS_qty_move_hrd] = useState([])
    
    const [editStatus, setEditStatus] = useState(false);

    const [isDisabled, setDisabled] = useState(false);


    const [openModalProcess, setOpenModalProcess] = useState(false);
    const handleCloseProcess = () => { setOpenModalProcess(false); };
    const handleCloseSelectDOList = () => { setOpenModalSelectDOList(false); };

    const [ProcessSuccess, setProcessSuccess] = useState(false)

    const [focusScanTagState, setFocusScanTagState] = useState(false)


    const [doc_num, setDoc_num] = useState("")
    const [doc_type, setDoc_type] = useState("")

    const [do_group_list, setDo_group_list] = useState("")

    const [STS_QtyMoveLotLocation_GEN_Doc_num, setSTS_QtyMoveLotLocation_GEN_Doc_num] = useState("")

console.log(do_group_list, 'do_group_list');

    const handleProcessSuccess = (ProcessSuccess) => {
        setOpenModalProcess(true);
        setProcessSuccess(ProcessSuccess);
    };


    const handleOpenModalCreateBoteNote = () => {
        setOpenModalCreateBoteNote(true);
    };



    const handleOpenModalCreateDoGroup = () => {
        API.get(`API_QuantityMove/data.php?load=STS_list_of_do_group`)
            .then(res => {
                setDataListOfDoGroup(res.data)
            })
        setOpenModalCreateDoGroup(true);
    };

    const handleCloseModalCreateBoteNote = async () => {
        setEditStatus(false)
        setOpenModalCreateBoteNote(false);
        setQtyMoveList([])
    };

    const handleCloseModalCreateDoGroup = async () => {
        setOpenModalCreateDoGroup(false);
    };


   console.log(data, 'truck');


    const handleClickSelectDoc = (row) => {

        API.get(`API_QuantityMove/data.php?load=STS_qty_move_line&doc_num=${row.doc_num}`)
            .then(res => {
                setSTS_qty_move_line(res.data)
            })

        API.get(`API_QuantityMove/data.php?load=checkItemLotLoc&loc=${row.loc}`)
            .then(res => {
                console.log(res.data)
                // handlecheckItemLotLoc(res.data)
            })
        
            API.get(`API_QuantityMove/data.php?load=Search_STS_qty_move_hrd&doc_num=${row.doc_num}`)
            .then(res => {
                console.log(res.data)
                setSearch_STS_qty_move_hrd(res.data)
            })
        setDoc_num(row.doc_num)
        setDoc_type(row.doc_type)
    }

    const setBoatPositionState = (event) => {
        setBoatPosition(event.target.value)
    }

    const setDestinationState = (event) => {
        setDestination(event.target.value)
    }

    // const setActWeightState = (event) => {
    //     setActWeight(event.target.value)
    // }


    const handleScanTag = (event) => {
        if (event.key === 'Enter') {
            API.get(`API_QuantityMove/data.php?load=SearchTagDetail&tag_id=${event.target.value}`)
                .then(res => {
                    const items = res.data
                    if (res.data.length > 0) {
                        setQtyMoveList(qtyMoveList => [...qtyMoveList,
                        {
                            id: items[0].id,
                            lot: items[0].lot,
                            loc: items[0].loc,
                            item: items[0].item,
                            qty1: items[0].qty1,
                            u_m: items[0].u_m,
                            // boat_position: boatPosition,
                        }])
                        removeDuplicatesFromArrayByProperty(qtyMoveList, 'id');
                        setQtyMoveList(qtyMoveList => removeDuplicatesFromArrayByProperty(qtyMoveList, 'id'))

                    } else {
                        alert("ไม่พบ Tags")
                    }
                })
            document.getElementById('tagScan').value = ""
            document.getElementById('tagScan').focus()
            setFocusScanTagState(true)
        }
    }

    const handleScanTagCheckByDO = (event, do_num) => {
       
        if (event.key === 'Enter') {
            if (do_group_list !== '') {
                API.get(`API_QuantityMove/data.php?load=SearchTagDetailCheckByDO&tag_id=${event.target.value}&do_num=${do_group_list.do_group_list}`)
                    .then(res => {
                        const items = res.data
                        if (res.data.length > 0) {
                            setQtyMoveList(qtyMoveList => [...qtyMoveList,
                            {
                                id: items[0].id,
                                lot: items[0].lot,
                                loc: items[0].loc,
                                item: items[0].item,
                                qty1: items[0].qty1,
                                u_m: items[0].u_m,
                                boat_position: boatPosition,
                            }])
                            removeDuplicatesFromArrayByProperty(qtyMoveList, 'id');
                            setQtyMoveList(qtyMoveList => removeDuplicatesFromArrayByProperty(qtyMoveList, 'id'))

                        } else {
                            alert("ไม่พบ Tags")
                        }
                    })
                document.getElementById('tagScan').value = ""
                document.getElementById('tagScan').focus()
                setFocusScanTagState(true)
            } else {
                alert("กรุณาเลือกกลุ่มใบ DO  ที่ต้องการส่ง")
            }
        }
    }

    const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
        if (!accumulator.find(obj => obj[prop] === currentValue[prop])) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, [])


    const saveDocumentBoatNoteOnly = (values, qtyMoveList) => {
        setDisabled(true)

        if (!values.loc || qtyMoveList.length === 0) {
            alert("กรุณากรอก location ปลายทาง หรือ scan barcode อย่างน้อย 1 lot")
            
        } else {
            API.get(`API_QuantityMove/data.php?load=moveqty_create_hdr_BoatNoteOnly&toLoc=${values.loc}&w_c=${values.wc}&doc_type=${docType}&do_num=${values.do_num}&boatList=${values.boatList}&destination=${destination}&ActWeight=${values.ActualWeight}&round=${do_group_list?.id ?? ''}`)
                .then(res => {
                        //   setdocNum(moveqty_hdr.doc_num)
                        //   setToLocation(moveqty_hdr.loc)
                    if (qtyMoveList.length > 0 ) {
                        setEditStatus(false)
                        setOpenModalCreateBoteNote(false)
                        setOpenModalProcess(true)
                        let tagnumArray = []
                        // let boatPositionArray = []
                        
                        for (let i=0; i<qtyMoveList.length; i++){
                            tagnumArray.push(qtyMoveList[i].id)
                            // boatPositionArray.push(qtyMoveList[i].boat_position)
                            }
                        //Insert QTY LINE 
                             API.get(`API_QuantityMove/data.php`, {
                                params: {
                                    load: "moveqty_create_line_Truck",
                                    tagnum: tagnumArray,
                                    toLoc: values.loc,
                                    doc_num: res.data[0].doc_no
                                    // boatPosition: boatPositionArray
                                }
                            }).then(res => {
                                setQtyMoveList([])
                                refetch()
                            })
                    }
                })
        }
        setFocusScanTagState(false)
        setDisabled(false)
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const pdfDocGenerator = pdfMake.createPdf("");
    pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.querySelector('#iframeContainer');
        const iframe = document.createElement('iframe');
        iframe.src = dataUrl;
        targetElement.appendChild(iframe);
    });


    const handlesetEditStatus = () => {
        setEditStatus(true)
        setQtyMoveList(STS_qty_move_line)
        setOpenModalCreateBoteNote(true);
    }


    const body = (
        <div >
            <ModalProgressSaving
                // docNum={docNum}
                docNum={""}
                // toLocation={toLocation}
                toLocation={""}
                qtyMoveList={qtyMoveList}
                handleProcessSuccess={handleProcessSuccess}
            />
        </div >
    );


    const bodySelectDOList = (
        <div >
            <ModalSelectDOList
                // docNum={docNum}
                docNum={""}
                // toLocation={toLocation}
                SelectDOList={SelectDOList}
                toLocation={""}
                qtyMoveList={qtyMoveList}
                handleProcessSuccess={handleProcessSuccess}
            />
        </div >
    );



    const bodyCreateDoGroup = (
        <div >
            <ModalProgressSaving
                // docNum={docNum}
                docNum={""}
                // toLocation={toLocation}
                toLocation={""}
                qtyMoveList={qtyMoveList}
                handleProcessSuccess={handleProcessSuccess}
            />
        </div >
    );

    useEffect(() => {
        setOpenModalProcess(false)

    }, [ProcessSuccess])



    const CRUDfn = async (load, values) => {
        await API.get(`API_QuantityMove/data.php`, {
            params: {
                load: load,
                id: values.id,
                do_group_num: values.do_group_num,
                do_group_name: values.do_group_name,
                do_group_list: values.do_group_list,
                do_group_status: values.do_group_status
            }
        });
        console.log(values)
    }

    const BoatPfn = async (load, values, doc_num) => {
        await API.get(`API_QuantityMove/data.php`, {
            params: {
                load: load,
                id: values.id,
                doc_num: doc_num,
                boat_position: values.boat_position
            }
        });
        console.log(values, doc_num)
    }

    const editActualWeight = (doc_num, eActualWeight) => {


            API.get(`API_QuantityMove/data.php?load=editActualWeight&doc_num=${doc_num}&eActualWeight=${eActualWeight}`, {
            
            });
      

        const timer = setInterval(() => {
            API.get(`API_QuantityMove/data.php?load=Search_STS_qty_move_hrd&doc_num=${doc_num}`)
            .then(res => {
                console.log(res.data)
                setSearch_STS_qty_move_hrd(res.data)
            })
        clearInterval(timer)
    }, 1000)

        
    }

    const Editloc = (doc_num, locEdit) => {
            API.get(`API_QuantityMove/data.php?load=locEdit_Truck&doc_num=${doc_num}&loc=${locEdit}`, {
            
            });
        console.log(doc_num, locEdit)
    }

    const handleBlur = (event) => {
        console.log(event)
        let ev
    }



    const [dataListOfDoGroup, setDataListOfDoGroup] = useState([]);
    return (
        <Page
            className={classes.root}
            title="Dashboard"
        >
            {/* *{JSON.stringify(editStatus)}* */}
            <Modal
                open={openModalProcess}
                onClose={handleCloseProcess}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                zIndex="modal"
            >
                {body}
            </Modal>

            <Modal
                open={openModalSelectDOList}
                onClose={handleCloseSelectDOList}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                zIndex="modal"
            >
                {bodySelectDOList}
            </Modal>



            {/* <ModalManagementFullPage
                modalHeader={
                    <>{boatPosition}</>
                }
                modalDetail={
                    <div style={{ maxWidth: '100%' }}>
                        <MaterialTable
                            icons={tableIcons}
                            title="กลุ่มใบ DO ที่ต้องการขนส่ง"
                            columns={[
                                { title: 'id', field: 'id', editable: 'never' },
                                { title: 'Group name', field: 'do_group_name', type: 'text', validate: rowData => rowData.do_group_name === '' ? 'กรอกชื่อกลุ่มเอกสาร' : '' },
                                { title: 'Group list', field: 'do_group_list', type: 'text', validate: rowData => rowData.do_group_list === '' ? 'กรอกรายการเอกสาร' : '' },
                                {
                                    title: 'สถานะ',
                                    field: 'do_group_status',
                                    lookup: { 0: 'ระหว่างจัดส่ง', 1: 'จัดส่งสำเร็จ' },
                                    validate: rowData => rowData.do_group_status === '' ? 'เลือกสถานะเอกสาร' : ''
                                },
                                { title: 'id', field: 'id', editable: 'never' },
                            ]}
                            onRowClick={(event, rowData) => {

                                API.get(`API_QuantityMove/data.php?load=SelectDOList&do_num=${rowData.do_group_list}`)
                                    .then(res => {
                                        setOpenModalSelectDOList(true)
                                        setSelectDOList(res.data)
                                    })
                            }}
                            data={dataListOfDoGroup}
                            options={{
                                search: false,
                                paging: false,
                                maxBodyHeight: '60vh',
                                minBodyHeight: '60vh',
                                exportButton: true,
                                filtering: false,
                                rowStyle: rowData => ({
                                    // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                    // fontSize: 12,
                                    // padding: 0
                                }
                                ),
                            }}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            setDataListOfDoGroup([...dataListOfDoGroup, newData]);
                                            console.log(newData)
                                            CRUDfn("InsertSTS_list_of_do_group", newData)
                                            resolve();
                                        }, 1000)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...dataListOfDoGroup];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            setDataListOfDoGroup([...dataUpdate]);
                                            CRUDfn("UpdateSTS_list_of_do_group", newData)
                                            resolve();
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataDelete = [...dataListOfDoGroup];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setDataListOfDoGroup([...dataDelete]);
                                            CRUDfn("DeleteSTS_list_of_do_group", oldData)
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                        />
                    </div>
                }
                open={openModalCreateDoGroup}
                onClose={handleCloseModalCreateDoGroup}
            /> */}



            <ModalManagementFullPage
                modalHeader={
                    <>{boatPosition}</>
                }
                modalDetail={
                    <>

                        <Formik
                            onChange={() => {
                                console.log('changing');
                            }}

                            initialValues={
                                {
                                    // startdate: moment('2021-02-27 08:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                    // enddate: moment('2021-02-27 17:00:', 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                    startdate: moment('08:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                    enddate: moment('17:00:', 'HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                    // startdate: moment('08:00:', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                                    // enddate: moment('21:00', 'HH:mm').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                                    item: '',
                                    refnum: '',
                                    wc: '',
                                    tagScan: '',
                                    do_num: '',
                                    loc: '',
                                    doc_type: 'Truck',
                                    wc: '',
                                    round: '',
                                    boatList: '',
                                    ActualWeight: 0,
                                    eActualWeight: 0,
                                }
                            }
                            validate={values => {
                                const warnings = {};
                                if (!values.w_c) { warnings.w_c = 'แนะนำให้ใส่'; }
                                // return { errors: {}, warnings: {} };
                                return warnings;
                            }}
                            // onSubmit={(values, { setSubmitting }) => {
                            //     setTimeout(() => {
                            //         alert(JSON.stringify(values, null, 2));
                            //         setSubmitting(true);

                            //     }, 400);
                            // }}

                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                alert(JSON.stringify(values, null, 2));
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
                                setFieldValue,

                            }) => (
                                <form
                                // onSubmit={handleSubmit}
                                >
                                    {/* <Button color="primary" variant="contained" onClick={() => { handleOpenModalItem(123) }}>1234</Button> */}
                                    {/* {JSON.stringify(values)} */}
                                    
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} >
                                            <Grid container spacing={2}>
                                                <Grid item lg={3} spacing={2}>
                                                    <Grid item lg={12} spacing={2}>
                                                        <Paper className={classes.paper}>
                                                            <Grid container spacing={2}>
                                                                <Grid item lg={12} xs={6}>
                                                                    <FormControl fullWidth variant="outlined" size="small">
                                                                        <InputLabel style={{ paddingLeft: 10}}>ประเภทเอกสารการขนส่ง</InputLabel>
                                                                            <Select
                                                                                style={{ padding: '0px' }}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                label="ประเภทเอกสารการขนส่ง"
                                                                                fullWidth
                                                                                value={docType}
                                                                                onChange={(e) => setDocType(e.target.value)}
                                                                            >
                                                                                <MenuItem value={'Truck'}>Truck</MenuItem>
                                                                                <MenuItem value={'Boat'}>Boat</MenuItem>
                                                                                <MenuItem value={'Cont'}>Cont</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                </Grid>
                                                                {/* <Grid item lg={12} >
                                                                    <CAutocompleteLocationPTR
                                                                        onBlur={handleBlur}
                                                                        name="loc"
                                                                        value={values.loc}
                                                                        setFieldValue={setFieldValue}
                                                                    />
                                                                </Grid> */}
                                                                    

                                                            {(editStatus == true) ?
                                                                <>
                                                                <Grid item lg={12} >
                                                                    <CAutocompleteLocationPTRedit
                                                                            //  onChange={handleChange}
                                                                             name="loc"
                                                                             value={values.loc}
                                                                             setFieldValue={setFieldValue}
                                                                             onChange={Editloc(doc_num, values.loc) }
                                                                         />
                                                                     </Grid>
                                                                     
                                                                <Grid item lg={12} >
                                                                    <CTextField size="small" fullWidth                       
                                                                           
                                                                        error={Boolean(touched.item && errors.item)}
                                                                        helperText={touched.item && errors.item}
                                                                        label="น้ำหนักชั่งจริง"
                                                                        name="ActWeight"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={Search_STS_qty_move_hrd[0]["ActWeight"]}
                                                                                                                                       
                                                                    />
                                                                </Grid>

                                                                <Grid item lg={12} >
                                                                    <TextField size="small" fullWidth                       
                                                                        
                                                                        error={Boolean(touched.item && errors.item)}
                                                                        helperText={touched.item && errors.item}
                                                                        label="แก้ไขน้ำหนักชั่งจริง"
                                                                        name="eActualWeight"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.eActualWeight}                                                                                                                      
                                                                    />
                                                                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ margin: 10 }} onClick={() => editActualWeight(doc_num, values.eActualWeight)} >Save  </Button>
                                                                </Grid>
                                                            
                                                                     </> : 
                                                                     <>
                                                                    <Grid item lg={12} >
                                                                    <CAutocompleteLocationPTR
                                                                             onBlur={handleBlur}
                                                                             name="loc"
                                                                             value={values.loc}
                                                                             setFieldValue={setFieldValue}
                                                                         />
                                                                     </Grid>

                                                                <Grid item lg={12} >
                                                                    <CTextField size="small" fullWidth
                                                                                                                                                                                                                                                                
                                                                        error={Boolean(touched.item && errors.item)}
                                                                        helperText={touched.item && errors.item}
                                                                        label="น้ำหนักชั่งจริง"
                                                                        name="ActualWeight"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.ActualWeight}
                                                                                                              
                                                                    />
                                                                </Grid>
                                                                </>
                                                            }
                                                            </Grid>
                                                        </Paper>
                                                    </Grid>
                                                    <br></br>
                                                    <Grid item lg={12} spacing={2}>
                                                        <Paper className={classes.paper}>
                                                            <Grid container spacing={2}>
                                                                {(values.doc_type == "Internal") ?
                                                                    <>
                                                                        <Grid item xs={12}>
                                                                            <CAutocompleteWorkCenter
                                                                                onBlur={handleBlur}
                                                                                name="wc"
                                                                                value={values.wc}
                                                                                setFieldValue={setFieldValue}
                                                                            />
                                                                        </Grid>
                                                                    </> : ""
                                                                }
                                                                {(docType == "Boat") ?
                                                                    <>
                                                                        <Grid item xs={12} >
                                                                            <CAutocompleteListOfDoGroup
                                                                                onBlur={handleBlur}
                                                                                name="do_group_list"
                                                                                value={do_group_list}
                                                                                setDo_group_list={setDo_group_list}

                                                                            />

                                                                        </Grid>
                                                                        <Grid item xs={12} >
                                                                            <CTextField
                                                                                error={Boolean(touched.item && errors.item)}
                                                                                helperText={touched.item && errors.item}
                                                                                label="DO num"
                                                                                name="do_num"
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={do_group_list.do_group_list}
                                                                                Autocomplete={false}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} >
                                                                            <CAutocompleteBoatList
                                                                                onBlur={handleBlur}
                                                                                name="boatList"
                                                                                value={values.boatList}
                                                                                setFieldValue={setFieldValue}
                                                                            />
                                                                        </Grid>
                                                                        {/*<Grid item xs={12} >
                                                                            <CTextField
                                                                                error={Boolean(touched.item && errors.item)}
                                                                                helperText={touched.item && errors.item}
                                                                                label="รอบส่งของ"
                                                                                name="round"
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.round}
                                                                                Autocomplete={false}
                                                                            />
                                                                        </Grid>*/}
                                                                    </>
                                                                    : ""
                                                                }
                                                            </Grid>
                                                        </Paper>
                                                    </Grid>

                                                </Grid>



                                                <Grid item lg={9} >
                                                    <MaterialTable
                                                        style={{ margin: 5, overflowX: "scroll" }}
                                                        icons={tableIcons}
                                                        title={"Quantity Move List : " + qtyMoveList.length + " รายการ"}
                                                        columns={[
                                                            { title: 'id', field: 'id' },
                                                            { title: 'lot', field: 'lot', width: 200 },
                                                            { title: 'From loc', field: 'loc', width: 100 },
                                                            { title: 'item', field: 'item', width: 300 },
                                                            { title: 'qty', field: 'qty1', type: 'numeric' },
                                                            { title: 'unit', field: 'u_m' },
                                                        ]}
                                                        // onRowClick={(event, rowData) => {
                                                        //   SelectItemToModal(rowData)
                                                        // }}
                                                        data={qtyMoveList}
                                                        options={{
                                                            search: false,
                                                            paging: false,
                                                            maxBodyHeight: '60vh',
                                                            minBodyHeight: '60vh',
                                                            filtering: false,
                                                            rowStyle: rowData => ({
                                                                // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                                fontSize: '0.7em',
                                                                padding: 0,
                                                                fontFamily: 'sans-serif'
                                                            })
                                                        }}

                                                        editable={{
                                                            onRowDelete: oldData =>
                                                                new Promise((resolve, reject) => {
                                                                    setTimeout(() => {
                                                                        const dataDelete = [...qtyMoveList];
                                                                        const index = oldData.tableData.id;
                                                                        dataDelete.splice(index, 1);
                                                                        setQtyMoveList([...dataDelete]);
                                                                        BoatPfn("DeleteTruckQtyMoveLine", oldData, doc_num)
                                                                        resolve()
                                                                    }, 1000)
                                                                }),

                                                                onRowUpdate: (newData, oldData) =>
                                                                new Promise((resolve, reject) => {
                                                                  setTimeout(() => {
                                                                    const dataUpdate = [...qtyMoveList];
                                                                    const index = oldData.tableData.id;
                                                                    dataUpdate[index] = newData;
                                                                    // console.log(doc_num)
                                                                    // console.log(newData)
                                                                    setQtyMoveList([...dataUpdate]);
                                                                    BoatPfn("UpdateBoat_Position", newData, doc_num)
                                                                    resolve();
                                                                  }, 1000)
                                                                }),
                                                        }}

                                                        components={{
                                                            Toolbar: props => (
                                                                <div>
                                                                    <MTableToolbar {...props} />
                                                                    <div style={{ padding: '0px 10px' }}>
                                                                        {/* <TextField style={{ paddingRight: 10 }}
                                                                            size="small"
                                                                            label={"ตำแหน่งบนเรือ"}
                                                                            id={"tagScan"}
                                                                            variant="outlined"
                                                                            className={classes.textField}
                                                                            onKeyUp={setBoatPositionState}
                                                                        /> */}
                                                                        
                                                                        {/* <FormControl style={{ paddingRight: 10 , width: 120}} variant="outlined" size="small">
                                                                        <InputLabel>ระวางเรือ</InputLabel>
                                                                            <Select
                                                                                value={boatPosition}
                                                                                variant="outlined"
                                                                                label="ระวางเรือ"
                                                                                size="small"
                                                                                onChange={setBoatPositionState}
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value={'หัวเรือ'}>หัวเรือ</MenuItem>
                                                                                <MenuItem value={'กลางหัว'}>กลางหัว</MenuItem>
                                                                                <MenuItem value={'กลางท้าย'}>กลางท้าย</MenuItem>
                                                                                <MenuItem value={'ท้ายเรือ'}>ท้ายเรือ</MenuItem>
                                                                            </Select>
                                                                        </FormControl> */}
                                                                      
                                                                        <TextField size="small" label={"Scan tag"} id={"tagScan"}
                                                                            variant="outlined"
                                                                            className={classes.textField}
                                                                            onKeyUp={(e) => (docType == "Boat") ? handleScanTagCheckByDO(e, values.do_num) : handleScanTag(e)}
                                                                            // (values.doc_type == "Ship") ? handleScanTagCheckByDO(e, values.do_num) : handleScanTag(e)}
                                                                            autoFocus={focusScanTagState} />

                                                                        <FormControl style={{ paddingLeft: 10 ,paddingRight: 10, width: 170}} variant="outlined" size="small">
                                                                        <InputLabel style={{ paddingLeft: 10}}>ปลายทางขนส่ง</InputLabel>
                                                                        
                                                                            <Select
                                                                                value={destination}
                                                                                variant="outlined"
                                                                                label="ปลายทางขนส่ง"
                                                                                size="small"
                                                                                onChange={setDestinationState}
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value={'โกดัง A4'}>โกดัง A4</MenuItem>
                                                                                <MenuItem value={'โกดัง A5'}>โกดัง A5</MenuItem>
                                                                                <MenuItem value={'โกดัง A6'}>โกดัง A6</MenuItem>
                                                                                <MenuItem value={'โกดัง A7'}>โกดัง A7</MenuItem>
                                                                                <MenuItem value={'โรงงานวังน้อย'}>โรงงานวังน้อย</MenuItem>
                                                                                <MenuItem value={'โรงงานปู่เจ้าสมิงพราย'}>โรงงานปู้เจ้าสมิงพราย</MenuItem>
                                                                                <MenuItem value={'ลงเรือฉลอม'}>ลงเรือฉลอม</MenuItem>
                                                                            </Select>
                                                                        </FormControl>

                                                                        {/* <TextField size="small" label={"doc_num"} id={"GENDocNum"}
                                                                            disabled
                                                                            variant="outlined"
                                                                            value={STS_QtyMoveLotLocation_GEN_Doc_num.doc_num}
                                                                            // defaultValue={STS_QtyMoveLotLocation_GEN_Doc_num.doc_num}
                                                                            className={classes.textField}
                                                                        /> */}

                                                                    </div>
                                                                </div>
                                                            ),
                                                        }}
                                                    />

                                                </Grid>
                                                {(editStatus == true) ?
                                                ""
                                                : 
                                                <Grid item xs={12}>
                                                    <Paper className={classes.paper}>
                                                        <Button disabled={isDisabled} type="button" variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => saveDocumentBoatNoteOnly(values, qtyMoveList)}>Save</Button>
                                                    </Paper>
                                                    {/* <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ margin: 10 }} onClick={handleSubmit} >Save  </Button> */}
                                                </Grid>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </>
                }

                open={openModalCreateBoteNote}
                onClose={handleCloseModalCreateBoteNote}
            />
            <Container maxWidth={false}>
                <Grid item lg={12}>
                    <Grid container spacing={2}>

                        <Grid item xs={4} >
                        <label style={{ color:'red', fontSize: '36px'}}>***ใช้สำหรับย้ายขึ้นรถเท่านั้น</label>
                            <CardTruckHeader

                                STS_qty_move_hrd_Truck={data}
                                STS_QtyMoveLotLocation_GEN_Doc_num={STS_QtyMoveLotLocation_GEN_Doc_num}
                                handleClickSelectDoc={handleClickSelectDoc}
                                handleOpenModalCreateBoteNote={handleOpenModalCreateBoteNote}
                                handleOpenModalCreateDoGroup={handleOpenModalCreateDoGroup}
                            />
                        </Grid>
                        <Grid item xs={8} >
                            <CardTruckLine
                                STS_qty_move_line={STS_qty_move_line}
                                Search_STS_qty_move_hrd={Search_STS_qty_move_hrd}
                                doc_num={doc_num}
                                doc_type={doc_type}
                                // handleOpenModalCreateDoGroup={handleOpenModalCreateDoGroup}
                                handlesetEditStatus={handlesetEditStatus}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                <CardNext />
              </Grid> */}
                    </Grid>
                </Grid>

            </Container>
        </Page>
    );
};

export default BoatNote;
