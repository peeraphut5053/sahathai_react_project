import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    FormControl,
    Grid,
    makeStyles,
    MenuItem,
    NativeSelect,
    Paper,
    Select,
    TextField,
    Modal
} from '@material-ui/core';

import Page from 'src/components/Page';

import CardBoatHeader from './CardBoatHeader';
import CardBoatLine from './CardBoatLine';
import API from '../../../components/API';
import ModalManagementFullPage from '../../../components/ModalManagementFullPage';
import CAutocompleteWorkCenter from '../../../components/Input/CAutocompleteWorkCenter';
import CAutocompleteDoctypeShipping from '../../../components/Input/CAutocompleteDoctypeShipping';
import CAutocompleteLocation from '../../../components/Input/CAutocompleteLocation';
import CAutocompleteListOfDoGroup from '../../../components/Input/CAutocompleteListOfDoGroup';

import { Field, Formik } from 'formik';
import moment from "moment";
import CTextField from '../../../components/Input/CTextField';
import CButton from 'src/views/components/Input/CButton';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';
import CAutocompleteBoatList from 'src/views/components/Input/CAutocompleteBoatList';
import SaveIcon from '@material-ui/icons/Save';
import ModalProgressSaving from './ModalProgressSaving';
import ModalSelectDOList from './ModalSelectDOList';

import { positions } from '@material-ui/system';
import { ReportMoveInternal } from './ReportMoveInternal';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake-thai/build/vfs_fonts";

import Web3 from 'web3';




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

    const [STS_qty_move_line, setSTS_qty_move_line] = useState([])
    const [STS_qty_move_hrd, setSTS_qty_move_hrd] = useState([])
    const [SelectDOList, setSelectDOList] = useState([])
    const [openModalCreateBoteNote, setOpenModalCreateBoteNote] = useState(false);
    const [openModalCreateDoGroup, setOpenModalCreateDoGroup] = useState(false);
    const [openModalSelectDOList, setOpenModalSelectDOList] = useState(false);
    const [wc, setWc] = useState("")
    const [toLoc, setToLoc] = useState("")
    const [qtyMoveList, setQtyMoveList] = useState([]);
    const [doctype_shipping, setDoctype_shipping] = useState("");
    const [boatPosition, setBoatPosition] = useState("");
    const [destination, setDestination] = useState("");
    
    const [editStatus, setEditStatus] = useState(true);


    const [openModalProcess, setOpenModalProcess] = useState(false);
    const handleCloseProcess = () => { setOpenModalProcess(false); };
    const handleCloseSelectDOList = () => { setOpenModalSelectDOList(false); };

    const [ProcessSuccess, setProcessSuccess] = useState(false)

    const [focusScanTagState, setFocusScanTagState] = useState(false)


    const [doc_num, setDoc_num] = useState("")
    const [doc_type, setDoc_type] = useState("")

    const [do_group_list, setDo_group_list] = useState("")


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


    useEffect(() => {
        API.get(`API_QuantityMove/data.php?load=STS_qty_move_hrd`)
            .then(res => {
                setSTS_qty_move_hrd(res.data)
            })
    }, [])



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

        setDoc_num(row.doc_num)
        setDoc_type(row.doc_type)
    }

    const setBoatPositionState = (event) => {
        setBoatPosition(event.target.value)
    }

    const setDestinationState = (event) => {
        setDestination(event.target.value)
    }


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
                            boat_position: boatPosition,
                        }])
                        removeDuplicatesFromArrayByProperty(qtyMoveList, 'id');
                        setQtyMoveList(qtyMoveList => removeDuplicatesFromArrayByProperty(qtyMoveList, 'id'))

                    } else {
                        alert("??????????????? Tags")
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
                API.get(`API_QuantityMove/data.php?load=SearchTagDetailCheckByDO&tag_id=${event.target.value}&do_num=${do_group_list}`)
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
                            alert("??????????????? Tags")
                        }
                    })
                document.getElementById('tagScan').value = ""
                document.getElementById('tagScan').focus()
                setFocusScanTagState(true)
            } else {
                alert("??????????????????????????????????????????????????? DO  ???????????????????????????????????????")
            }
        }
    }

    const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
        if (!accumulator.find(obj => obj[prop] === currentValue[prop])) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, [])


    const saveDocument = (values, qtyMoveList) => {

        console.log(qtyMoveList)
        console.log(values)

        if (!values.loc || qtyMoveList.length === 0) {
            alert("??????????????????????????? location ????????????????????? ???????????? scan barcode ??????????????????????????? 1 lot")
            //   setOpenModal(false);
            // } else {
            //   setOpenModal(true);
            //   //Insert QTY MOVE HEARDER
        } else {
            API.get(`API_QuantityMove/data.php?load=moveqty_create_hdr&toLoc=${values.loc}&w_c=${values.wc}&doc_type=${values.doc_type}&do_num=${values.do_num}&boatList=${values.boatList}&destination=${destination}`)
                .then(res => {
                    const moveqty_hdr = res.data
                    //       setdocNum(moveqty_hdr.doc_num)
                    //       setToLocation(moveqty_hdr.loc)
                    if (qtyMoveList.length > 0) {
                        setOpenModalCreateBoteNote(false)
                        setOpenModalProcess(true)
                        let i = 1;
                        //Insert QTY LINE 
                        const timer = setInterval(() => {
                            API.get(`API_QuantityMove/data.php?load=moveqty_create_line&docnum=${moveqty_hdr.doc_num}&docline=${i}&tagnum=${qtyMoveList[i - 1].id}&toLoc=${values.loc}&boatPosition=${qtyMoveList[i - 1].boat_position}`)
                                .then(res => {
                                    console.log("Call API moveqty_create_line")
                                })
                            if (i === qtyMoveList.length) {
                                clearInterval(timer)
                                setQtyMoveList([])
                                setOpenModalProcess(false)
                                API.get(`API_QuantityMove/data.php?load=STS_qty_move_hrd`)
                                    .then(res => {
                                        setSTS_qty_move_hrd(res.data)
                                    })
                            }
                            i = i + 1;
                        }, 1000)

                    }
                })
        }
        setFocusScanTagState(false)
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



            <ModalManagementFullPage
                modalHeader={
                    <>{boatPosition}</>
                }
                modalDetail={
                    <div style={{ maxWidth: '100%' }}>
                        <MaterialTable
                            icons={tableIcons}
                            title="????????????????????? DO ?????????????????????????????????????????????"
                            columns={[
                                { title: 'id', field: 'id', editable: 'never' },
                                { title: 'Group name', field: 'do_group_name', type: 'text', validate: rowData => rowData.do_group_name === '' ? '?????????????????????????????????????????????????????????' : '' },
                                { title: 'Group list', field: 'do_group_list', type: 'text', validate: rowData => rowData.do_group_list === '' ? '????????????????????????????????????????????????' : '' },
                                {
                                    title: '???????????????',
                                    field: 'do_group_status',
                                    lookup: { 0: '???????????????????????????????????????', 1: '????????????????????????????????????' },
                                    validate: rowData => rowData.do_group_status === '' ? '????????????????????????????????????????????????' : ''
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
            />



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
                                    doc_type: 'Internal',
                                    wc: '',
                                    round: '',
                                    boatList: ''
                                }
                            }
                            validate={values => {
                                const warnings = {};
                                if (!values.w_c) { warnings.w_c = '?????????????????????????????????'; }
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

                                                                <Grid item lg={12} >
                                                                    <CAutocompleteDoctypeShipping
                                                                        onBlur={handleBlur}
                                                                        name="doc_type"
                                                                        value={values.doc_type}
                                                                        setFieldValue={setFieldValue}
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={12} >
                                                                    <CAutocompleteLocation
                                                                        onBlur={handleBlur}
                                                                        name="loc"
                                                                        value={values.loc}
                                                                        setFieldValue={setFieldValue}
                                                                    />
                                                                </Grid>
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

                                                                {(values.doc_type == "Ship") ?
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
                                                                                value={do_group_list}
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
                                                                        <Grid item xs={12} >
                                                                            <CTextField
                                                                                error={Boolean(touched.item && errors.item)}
                                                                                helperText={touched.item && errors.item}
                                                                                label="???????????????????????????"
                                                                                name="round"
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.round}
                                                                                Autocomplete={false}
                                                                            />
                                                                        </Grid>
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
                                                        title={"Quantity Move List : " + qtyMoveList.length + " ??????????????????"}
                                                        columns={[
                                                            { title: 'id', field: 'id' },
                                                            { title: 'lot', field: 'lot', width: 200 },
                                                            { title: 'From loc', field: 'loc', width: 100 },
                                                            { title: 'item', field: 'item', width: 300 },
                                                            { title: 'qty', field: 'qty1', type: 'numeric' },
                                                            { title: 'unit', field: 'u_m' },
                                                            { title: 'boat position', field: 'boat_position' },
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

                                                                        resolve()
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
                                                                            label={"???????????????????????????????????????"}
                                                                            id={"tagScan"}
                                                                            variant="outlined"
                                                                            className={classes.textField}
                                                                            onKeyUp={setBoatPositionState}
                                                                        /> */}
                                                                        {/* <FormControl style={{ paddingRight: 10 }} variant="filled" size="small">
                                                                            <Select



                                                                                value={boatPosition}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={setBoatPositionState}
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value={'?????????????????????'}>?????????????????????</MenuItem>
                                                                                <MenuItem value={'?????????????????????'}>?????????????????????</MenuItem>
                                                                                <MenuItem value={'????????????????????????'}>????????????????????????</MenuItem>
                                                                                <MenuItem value={'????????????????????????'}>????????????????????????</MenuItem>
                                                                            </Select>
                                                                        </FormControl> */}

                                                                        <TextField size="small" label={"Scan tag"} id={"tagScan"}
                                                                            variant="outlined"
                                                                            className={classes.textField}
                                                                            onKeyUp={(e) => (values.doc_type == "Ship") ? handleScanTagCheckByDO(e, values.do_num) : handleScanTag(e)}
                                                                            autoFocus={focusScanTagState} />

                                                                        <FormControl style={{ paddingRight: 10 }} variant="filled" size="small">
                                                                            <Select
                                                                                value={destination}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={setDestinationState}
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value={'??????????????? A4'}>??????????????? A4</MenuItem>
                                                                                <MenuItem value={'??????????????? A5'}>??????????????? A5</MenuItem>
                                                                                <MenuItem value={'??????????????? A6'}>??????????????? A6</MenuItem>
                                                                                <MenuItem value={'??????????????? A7'}>??????????????? A7</MenuItem>
                                                                                <MenuItem value={'???????????????????????????????????????'}>???????????????????????????????????????</MenuItem>
                                                                                <MenuItem value={'???????????????????????????????????????????????????????????????'}>???????????????????????????????????????????????????????????????</MenuItem>
                                                                                <MenuItem value={'??????????????????????????????'}>??????????????????????????????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>

                                                                    </div>
                                                                </div>
                                                            ),
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Paper className={classes.paper}>
                                                        <Button type="button" variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => saveDocument(values, qtyMoveList)}  >Save</Button>
                                                    </Paper>
                                                    {/* <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ margin: 10 }} onClick={handleSubmit} >Save  </Button> */}




                                                </Grid>
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
                            <CardBoatHeader
                                STS_qty_move_hrd={STS_qty_move_hrd}
                                handleClickSelectDoc={handleClickSelectDoc}
                                handleOpenModalCreateBoteNote={handleOpenModalCreateBoteNote}
                                handleOpenModalCreateDoGroup={handleOpenModalCreateDoGroup}
                            />
                        </Grid>
                        <Grid item xs={8} >
                            <CardBoatLine
                                STS_qty_move_line={STS_qty_move_line}
                                doc_num={doc_num}
                                doc_type={doc_type}
                                handleOpenModalCreateDoGroup={handleOpenModalCreateDoGroup}
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
