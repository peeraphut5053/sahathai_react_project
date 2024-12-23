import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, Modal, Paper,  Snackbar, Typography } from '@material-ui/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake-thai/build/vfs_fonts";
import { ReportCheckPackingDiary } from './ReportCheckPackingDiary'
import { ReportCheckProductionDiary } from './ReportCheckProductionDiary'
import { ReportMovingProductReport } from './ReportMovingProductReport'
import { ReportPackingDiary } from './ReportPackingDiary';
import { ReportProductionDaily } from './ReportProductionDaily';
import { ReportForming } from './ReportForming';
import { ReportStamping } from './ReportStamping';
import moment from "moment";
import DateTimePicker from '../../../components/Input/CDateTimePicker';
import CButton from '../../../components/Input/CButton';
import { Formik } from 'formik';
import CTextField from '../../../components/Input/CTextField';
import API from '../../../components/API';
import { Alert, AlertTitle } from '@material-ui/lab';
import CAutocomplete from '../../../components/Input/CAutocomplete ';
import ReasonStopMachineTableEditable from './ReasonStopMachineTableEditable';
import ReasonStopMachineDetailTableEditable from './ReasonStopMachineDetailTableEditable';

import ReasonRecordStopMachineTableEditable from './ReasonRecordStopMachineTableEditable';
import ReasonRecordStopMachineMetersTableEditable from './ReasonRecordStopMachineMetersTableEditable';
import customStyles from "./customStyles.js";
// import SearchFn from "./SearchFn"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProductionDailyReportTable from './ProductionDailyReportTable';
import ShiftSelect from './ShiftSelect';
import ItemDetail from './ItemDetail';
import ModalManagement from './ModalManagement';
import ReasonAddNewReason from './ReasonAddNewReason';
import ReasonAddNewMeter from './ReasonAddNewMeter';
import ModalFinishing from './ModalFinishing';
import WorkCenter from 'src/views/reports/DashboardView/WorkCenter';
import ModalPassword from './ModalPassword';
import ModalMachineRecord from './ModalMachineRecord';


moment.locale("th");
const useStyles = customStyles

const ProductionDailyReport = () => {
	const classes = useStyles();
	const [data, setdata] = useState([])
	const [types, setTypes] = useState(1);
	const [dataReason, setDataReason] = useState({});
	const [isLoadingData, setisLoadingData] = useState(false)
	const [openModal, setOpenModal] = React.useState(false);
	const [statusModal, setStatusModal] = React.useState(false);
	const [passModal, setPassModal] = React.useState(false);
	const [machineRecord, setMachineRecord] = React.useState(false);
	const [openModalReasonMaster, setOpenModalReasonMaster] = React.useState(false);
	const [openModalReasonMasterDetail, setOpenModalReasonMasterDetail] = React.useState(false);
	const [openModalAddNewReason, setOpenModalAddNewReason] = React.useState(false);
	const [openModalAddNewMeter, setOpenModalAddNewMeter] = React.useState(false);
	const [openModalItem, setOpenModalItem] = React.useState(false);
	const [openModalFinishing, setOpenModalFinishing] = React.useState(false);
	const [dataFormingRecord, setDataFormingRecord] = useState([])
	const [dataFormingRecord_reason_meter, setDataFormingRecord_reason_meter] = useState([])
	const [dataFormingRecord_description, setDataFormingRecord_description] = useState([])
	const [dataFormingRecord_description_detail, setDataFormingRecord_description_detail] = useState([])
	const [selectFormingRecordReason, setselectFormingRecordReason] = useState()
	const [openAlert, setOpenAlert] = React.useState(false);
	const [BreakTimeForming, setBreakTimeForming] = React.useState(9);
	const [itemA, setItemA] = React.useState(0);
	const [itemB, setItemB] = React.useState(0);
	const [itemC, setItemC] = React.useState(0);
	

	const [itemModal, setitemModal] = useState(null)

	const handleOpenModal = async (values) => {
		if (!values.w_c) {
			handleClickAlert()
		} else {
			const response = await API.get("RPT_JOBPACKING/data.php", {
				params: {
					load: "SelectFormingModal",
					txtFromDate: values.startdate,
					txtToDate: values.enddate,
					txtItem: values.item,
					txtref_num: values.refnum,
					txtw_c: values.w_c,
				}
			});
			
			const responseFormingOperation = await API.get("RPT_JOBPACKING/data.php", {
				params: {
					load: "getFormingOperation",
					txtFromDate: values.startdate,
					txtToDate: values.enddate,
					txtw_c: values.w_c,
				}
			});
			if (response.data !== null) {
				setDataFormingRecord(response.data)
			}

			// if(!responseFormingOperation.data[0]?.operationWeight){
			// 	setItemA(0);
			// 	setItemB(0);
			// 	setItemC(0);
			// }else{
			// 	setItemA(responseFormingOperation.data[0].operationWeight);
			// 	setItemB(responseFormingOperation.data[0].operationSpeed);
			// 	setItemC(responseFormingOperation.data[0].operationTime);
			// }

			const response2 = await API.get("RPT_JOBPACKING/data.php", {
				params: {
					load: "SelectFormingModal_reason_meter",
					meters_start: values.startdate,
					meters_end: values.enddate,
					w_c: values.w_c,
				}
			});
			if (response2.data !== null) {
				setDataFormingRecord_reason_meter(response2.data)
			}

			const response3 = await API.get("RPT_JOBPACKING/data.php", {
				params: {
					load: "SelectBreakTimeForming",
					meters_start: values.startdate,
					meters_end: values.enddate,
					w_c: values.w_c,
				}
			});
			if (response3.data.length > 0) {
				// setBreakTimeForming(diff_hours(values.startdate, values.enddate))
				// if(response3.data[0].rate < diff_hours(values.startdate, values.enddate)){
				//   setBreakTimeForming(response3.data[0].rate)
				// }else{
				//   setBreakTimeForming(response3.data[0].rate)
				// }
				setBreakTimeForming(response3.data[0].rate)


			} else {
				API.get("RPT_JOBPACKING/data.php", {
					params: {
						load: "CreateBreakTimeForming",
						w_c: values.w_c,
						startdate: values.startdate,
						enddate: values.enddate,
						rate: diff_hours(values.startdate, values.enddate),
					}
				});
				setBreakTimeForming(diff_hours(values.startdate, values.enddate))
			}
			setOpenModal(true);
		}

		const response2 = await API.get("RPT_JOBPACKING/data.php", {
			params: {
				load: "SelectForming_reason_description",
			}
		});

		const obj = {}
		if (response2.data !== null) {
			for (let i = 0; i < response2.data.length; i++) {
				const key = response2.data[i].reason_id;
				obj[key] = response2.data[i].reason_description;
			}
			setselectFormingRecordReason(obj)
		}
	};

	const handleOpenFinishingModal = (values) => {
		if (!values.w_c) {
			handleClickAlert()
			return;
		}
		setOpenModalFinishing(true);
	}

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleCloseModalReasonMaster = async () => {
		setOpenModalReasonMaster(false);
	};

	const handleCloseModalReasonMasterDetail = async () => {
		setOpenModalReasonMasterDetail(false);
	};

	const handleCloseModalAddNewReason = async () => {
		setOpenModalAddNewReason(false);
	};

	const handleCloseModalAddNewMeter = async () => {
		setOpenModalAddNewMeter(false);
	};

	const handleOpenModalItem = async (item) => {
		setitemModal(item)
		setOpenModalItem(true);
	};

	const handleCloseModalItem = async () => {
		setOpenModalItem(false);
	};

	const handleCloseModalFinishing = async () => {
		setOpenModalFinishing(false);
	};

	const handleCloseModalMachine = async () => {
		setMachineRecord(false);
	}

	const setLocalStorageW_c = (w_c) => {
		localStorage.setItem("w_c", w_c);
	}


	const saveOperation = async (values) =>{
		API.get("RPT_JOBPACKING/data.php", {
			params: {
				load: "saveOperation",
				txtFromDate: values.startdate,
				txtToDate: values.enddate,
				operationWeight: values.itemA,
				operationSpeed: values.itemB,
				operationTime: values.itemC,
				w_c: values.w_c,
			}

		});
		
		// setItemA(values.itemA);
		// setItemB(values.itemB);
		// setItemC(values.itemC);

	}

	const SearchFn = async (load, values, wc_group_query, doc_type) => {
		setLocalStorageW_c(values.w_c)
		setisLoadingData(true)
		try {
			const response = await API.get("RPT_JOBPACKING/data.php", {
				params: {
					load: load,
					txtFromDate: values.startdate,
					txtToDate: values.enddate,
					txtItem: values.item,
					txtref_num: values.refnum,
					txtw_c: values.w_c,
					wc_group_query: wc_group_query
				}
				
			})

			const response2 = await API.get("RPT_JOBPACKING/data.php", {
				params: {
					load: 'STS_JOB_REPORT_DIARY_SUB_QUERY',
					txtFromDate: values.startdate,
					txtToDate: values.enddate,
					txtItem: values.item,
					txtref_num: values.refnum,
					txtw_c: values.w_c,
					wc_group_query: wc_group_query
				}
				
			})

			// if(!response.data[0]?.operationWeight){
			// 	setItemA(0);
			// 	setItemB(0);
			// 	setItemC(0);
			// }else{
			// 	setItemA(response.data[0].operationWeight);
			// 	setItemB(response.data[0].operationSpeed);
			// 	setItemC(response.data[0].operationTime);
			// }






			// let kotFromDataO = " 0057(14; 0058(14; 0059(14; 0060(14; 0061(14; 0062(14; 0063(14; 0064(14; 0065(14; 0066(14; 0067(14; 0068(14; 0070(14; 0071(14; 0072(14; 0073(14; 0074(14; 0075(14; 0076(14; 0077(14; 0078(14; 0079(14; 0080(14; 0081(14; 0082(14; 0083(14; 0084(14; 0085(14; 0086(14; 0087(14; 0088(14; 0089(14; 0090(14; 0091(14; 0092(14; 0093(14; 0094(14; 0095(14; 0096(14; 0097(13"
			// console.log(convertAllLotReport("wordslot", kotFromDataO))
			if (doc_type === 'Packing') {
				ReportPackingDiary(response.data, values.startdate, values.enddate)
			} else if (doc_type === 'Production') {
				ReportProductionDaily(response.data, values.startdate, values.enddate)

			} else if (doc_type === 'Forming') {
				if(BreakTimeOne == false && BreakTimeTwo == false && BreakTimeThree == false){
					alert("กรุณาเลือกข้อมูลจำนวนชั่วโมงงาน")
				}
				// else if(itemA == '' || itemB == '' || itemC == ''){
				// 	alert("กรอกข้อมูลการเดินเครื่อง")
				// }
				else{
				if (response.data.length > 0) {
					if (response.data[0].forming_reason_meter.length > 3) {
						ReportForming(response.data, values.startdate, values.enddate,itemA,itemB,itemC)
					} else {
						alert("กรุณากรอกเลขมิตเตอร์")
						// ReportForming(response.data, values.startdate, values.enddate)

					}
				}
				else {

					let temp = [
						{

							AllLot: " ( ",
							qty: " 23; 46; 2,100",
							bundle: " 1; 1; 42",
							pcs_qty: " 23; 46; 50",
							forming_reason: "2)30",
							forming_reason_main: " จานเก็บเหล็ก; ฟอร์มมิ่ง; ฟอร์มมิ่ง; แท่นเลื่อย; ฟอร์มมิ่ง; ฟอร์มมิ่ง; แท่นเลื่อย; ฟอร์มมิ่ง; ฟอร์มมิ่ง; แท่นเลื่อย",
							forming_reason_detail: " เปลี่ยนลูกปืนเพลาลูกกลิ้ง; อื่นๆ; เปลี่ยนสลิงรูดน้ำ ; เปลี่ยนใบเลื่อย ; เปลี่ยนมืดขูดตะเข็บ ; เปลี่ยนโรล ; เปลี่ยนใบเลื่อย ; เปลี่ยนโรล ; เปลี่ยนสลิงรูดน้ำ ; เปลี่ยนใบเลื่อย ",
							forming_reason_remark: " 00; ซ่อมเพลาโมเล่ย์มอเตอร์; 2 ครั้ง; 3ใบ; ปรับODเปลี่ยนควานหนา; 100x50; ; 100x50; ; ",
							forming_reason_meter: " 9489,9512",
						}]
					ReportForming(temp, values.startdate, values.enddate)
					// values.itemA,values.itemB,values.itemC
				}
			}

			} else if (doc_type === 'CheckPacking') {
				ReportCheckPackingDiary(response.data, values.startdate, values.enddate, response2.data)
			} else if (doc_type === 'CheckProduction') {
				ReportCheckProductionDiary(response.data, values.startdate, values.enddate,response2.data)
			} else if (doc_type === 'MovingProductReport') {
				ReportMovingProductReport(response.data, values.startdate, values.enddate)
			} else if (doc_type === 'Stamping') {
				ReportStamping(response.data, values.startdate, values.enddate)
			}
			setdata(response.data)
			setisLoadingData(false)
		} catch (error) {
			alert(error)
			console.log("error", error);
		}
	}

	pdfMake.vfs = pdfFonts.pdfMake.vfs;
	const pdfDocGenerator = pdfMake.createPdf("");
	pdfDocGenerator.getDataUrl((dataUrl) => {
		const targetElement = document.querySelector('#iframeContainer');
		const iframe = document.createElement('iframe');
		iframe.src = dataUrl;
		targetElement.appendChild(iframe);
	});


	const handleClickAlert = () => {
		setOpenAlert(true);
	};

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAlert(false);
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (option) => {
		setAnchorEl(null);
	};




	const [CheckBoxState, setCheckBoxState] = React.useState({
		BreakTimeOne: false,
		BreakTimeTwo: false,
		BreakTimeThree: false,
	});

	const handleCheckboxChange = (w_c, startdate, enddate, event) => {

		let rate = BreakTimeForming;
		setCheckBoxState({ ...CheckBoxState, [event.target.name]: event.target.checked });
		if (event.target.name == 'BreakTimeOne' && event.target.checked == true) {
			setBreakTimeForming(Number(BreakTimeForming) - Number(event.target.value))
			rate = Number(BreakTimeForming) - Number(event.target.value)
		}
		if (event.target.name == 'BreakTimeOne' && event.target.checked == false) {
			setBreakTimeForming(Number(BreakTimeForming) + Number(event.target.value))
			rate = Number(BreakTimeForming) + Number(event.target.value)
		}

		if (event.target.name == 'BreakTimeTwo' && event.target.checked == true) {
			setBreakTimeForming(Number(BreakTimeForming) - Number(event.target.value))
			rate = Number(BreakTimeForming) - Number(event.target.value)
		}
		if (event.target.name == 'BreakTimeTwo' && event.target.checked == false) {
			setBreakTimeForming(Number(BreakTimeForming) + Number(event.target.value))
			rate = Number(BreakTimeForming) + Number(event.target.value)
		}

		if (event.target.name == 'BreakTimeThree' && event.target.checked == true) {
			setCheckBoxState({
				BreakTimeOne: false,
				BreakTimeTwo: false,
				BreakTimeThree: true,
			});
			setBreakTimeForming(diff_hours(startdate, enddate))
			rate = diff_hours(startdate, enddate)
		}

		API.get("RPT_JOBPACKING/data.php", {
			params: {
				load: "CreateBreakTimeForming",
				w_c: w_c,
				startdate: startdate,
				enddate: enddate,
				rate: Number(rate),
			}
		});

	};

	const { BreakTimeOne, BreakTimeTwo, BreakTimeThree } = CheckBoxState;
	const error = [BreakTimeOne, BreakTimeTwo, BreakTimeThree].filter((v) => v).length !== 2;

	function diff_hours(dt2, dt1) {
		dt1 = new Date(dt1);
		dt2 = new Date(dt2);
		var diff = (dt2.getTime() - dt1.getTime()) / 1000;
		diff /= (60 * 60);
		return Math.abs(diff);
	}

	const handlePassModal = (wc) => {
		if (!wc) {
			alert('กรุณาเลือก work center');
			return false;
		}
		setPassModal(true);
	}

	return (
		<Paper className={classes.paper}>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={openAlert}
				autoHideDuration={3000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity="error" variant="filled">
					<AlertTitle>Error</AlertTitle>
					กรุณเลือก work center
				</Alert>
			</Snackbar>
			<Grid container spacing={0}>
				<Grid item xs={12} >
					<Formik
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
								w_c: localStorage.getItem("w_c")
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
								{/* <Button color="primary" variant="contained" onClick={() => { handleOpenModalItem(123) }}>1234</Button> */}
								<ModalManagement
									modalDetail={<ItemDetail itemModal={itemModal} />}
									open={openModalItem}
									onClose={handleCloseModalItem}
								/>

								<Modal open={openModalReasonMaster} onClose={handleCloseModalReasonMaster} >
									<ReasonStopMachineTableEditable
										setDataFormingRecord_description={setDataFormingRecord_description}
										dataFormingRecord_description={dataFormingRecord_description}
									/>
								</Modal>
								<Modal open={openModalReasonMasterDetail} onClose={handleCloseModalReasonMasterDetail} >
									<ReasonStopMachineDetailTableEditable
										setDataFormingRecord_description_detail={setDataFormingRecord_description_detail}
										dataFormingRecord_description_detail={dataFormingRecord_description_detail}
									/>
								</Modal>
								<Modal open={openModalAddNewReason} onClose={handleCloseModalAddNewReason} >
									<ReasonAddNewReason
										handleCloseModalAddNewReason={handleCloseModalAddNewReason}
										w_c={values.w_c}
										dataFormingRecord={dataFormingRecord}
										setDataFormingRecord={setDataFormingRecord}
										startdate={values.startdate}
										enddate={values.enddate}
										item={values.item}
										types={types}
										dataReason={dataReason}
									/>
								</Modal>
								<Modal open={openModalAddNewMeter} onClose={handleCloseModalAddNewMeter} >
									<ReasonAddNewMeter
										handleCloseModalAddNewMeter={handleCloseModalAddNewMeter}
										w_c={values.w_c}
										dataFormingRecord_reason_meter={dataFormingRecord_reason_meter}
										setDataFormingRecord_reason_meter={setDataFormingRecord_reason_meter}
										startdate={values.startdate}
									/>
								</Modal>
								<ModalPassword open={passModal} onClose={() => setPassModal(false)} setStatusModal={setStatusModal} />
								<ModalManagement open={statusModal} onClose={() => setStatusModal(false)} modalDetail={<WorkCenter wc={values.w_c} onClose={() => setStatusModal(false)} />} />
								<ModalFinishing values={values} openModal={openModalFinishing} handleCloseModal={handleCloseModalFinishing} />
								<ModalMachineRecord values={values} openModal={machineRecord} handleCloseModal={handleCloseModalMachine} />
								<Modal open={openModal} onClose={handleCloseModal}  >
									{/* {JSON.stringify(values)} */}
									<Grid container spacing={1} className={classes.paperModal} style={{ width: '80vw', height: '98vh', marginLeft: '10vw', marginTop: '1vh' }}>

										<Grid item xs={4} >
											{/* {values.startdate}
                      {values.enddate} */}
											<Card variant="outlined">
												<CardContent>
													<Typography variant="h4" component="h4"> Work center : {values.w_c} </Typography>
													<Typography >ช่วงเวลางาน <br></br> {values.startdate} - {values.enddate} </Typography>
													<Typography className={classes.pos} color="textSecondary"></Typography>
												</CardContent>
												<CardActions>
													<FormControl component="fieldset">
														{/* <FormLabel >จำนวนชั่วโมงในช่วงเวลาที่เลือก ({diff_hours(values.startdate,values.enddate)})</FormLabel> */}
														<FormLabel >จำนวนชั่วโมงงานที่บันทึก ({BreakTimeForming})</FormLabel>
														<FormControl required error={error} component="fieldset" className={classes.formControl}>
															<FormGroup>
																<FormControlLabel
																	control={<Checkbox checked={BreakTimeOne} value="1" onChange={(event) => handleCheckboxChange(values.w_c, values.startdate, values.enddate, event)} name="BreakTimeOne" />}
																	label="พักเที่ยง(-1)"
																/>
																<FormControlLabel
																	control={<Checkbox checked={BreakTimeTwo} value="0.5" onChange={(event) => handleCheckboxChange(values.w_c, values.startdate, values.enddate, event)} name="BreakTimeTwo" />}
																	label="พักเย็น(-0.5)"
																/>
																<FormControlLabel
																	control={<Checkbox checked={BreakTimeThree} value="0" onChange={(event) => handleCheckboxChange(values.w_c, values.startdate, values.enddate, event)} name="BreakTimeThree" />}
																	label={`เต็มเวลา (${diff_hours(values.startdate, values.enddate)})`}
																/>

															</FormGroup>
															{/* <FormHelperText>You can display an error</FormHelperText> */}
														</FormControl>






														{/* 
                            <RadioGroup aria-label="BreakTimeForming"
                              name="BreakTimeForming"
                              value={BreakTimeForming}
                              onChange={(event) => handleChangeBreakTimeForming(values.w_c, values.startdate, values.enddate, event)}
                            >
                              <FormControlLabel value="9" control={<Radio />} label="ไม่พักพักเที่ยง(+1)" />
                              <FormControlLabel value="8.5" control={<Radio />} label="ไม่พักเย็น(+0.5)" />
                              <FormControlLabel value="8" control={<Radio />} label="ตามเวลาปกติ" />
                            </RadioGroup> */}
													</FormControl>
												</CardActions>
												<CardContent>
													<Button
														color="primary"
														variant="contained"
														style={{ margin: 2 }}
														onClick={() => { SearchFn("ajax2", values, "Forming", "Forming") }} disabled={false} >

														พิมพ์รายงาน Forming
													</Button>
													<Button
														color="primary"
														variant="contained"
														style={{ margin: 2 }}
														onClick={() => alert()} disabled={true} >

														บันทึกรายงาน
													</Button>
												</CardContent>
											</Card>
										</Grid>
										{/* <Grid item xs={2} >
											<Card variant="outlined" margin="2" spacing={2}>
												&nbsp;
												<Grid item lg={12} spacing={2}>
													
												<CTextField 
															error={Boolean(touched.refnum && errors.refnum)}
															helperText={touched.refnum && errors.refnum}
															label="น้ำหนักท่อชั่งจริง"
															name="itemA"
															onBlur={handleBlur}
															onChange={handleChange}
															value={itemA==0? values.itemA: itemA}
														/>
												</Grid>
												&nbsp;
												<Grid item lg={12}>
													<CTextField
															error={Boolean(touched.refnum && errors.refnum)}
															helperText={touched.refnum && errors.refnum}
															label="ความเร็วในการเดินเครื่อง"
															name="itemB"
															onBlur={handleBlur}
															onChange={handleChange}
															value={itemB==0? values.itemB: itemB}
														/>
												</Grid>
												&nbsp;
												<Grid item lg={12}>
												<CTextField
															error={Boolean(touched.refnum && errors.refnum)}
															helperText={touched.refnum && errors.refnum}
															label="เดินเครื่องจริง"
															name="itemC"
															onBlur={handleBlur}
															onChange={handleChange}
															value={itemC==0? values.itemC: itemC}
														/>
												</Grid>
												&nbsp;
												<Grid>
												<Button
														color="primary"
														variant="contained"
														style={{ margin: 2 }}
														onClick={() => { saveOperation(values) }} disabled={false} >
														บันทึกผลการเดินเครื่อง
													</Button>
												</Grid>
										</Card>
										</Grid> */}
										<Grid item xs={6} >
											<Card variant="outlined">
												<ReasonRecordStopMachineMetersTableEditable
													w_c={values.w_c}
													values={values}
													setOpenModalReasonMaster={setOpenModalReasonMaster}
													dataFormingRecord_reason_meter={dataFormingRecord_reason_meter}
													setDataFormingRecord_reason_meter={setDataFormingRecord_reason_meter}
													setOpenModalAddNewMeter={setOpenModalAddNewMeter}

												/>
											</Card>
										</Grid>
										<Grid item xs={12} >
											<ReasonRecordStopMachineTableEditable
												dataFormingRecord={dataFormingRecord}
												setDataFormingRecord={setDataFormingRecord}
												w_c={values.w_c}
												selectFormingRecordReason={selectFormingRecordReason}
												values={values}
												setDataFormingRecord_description={setDataFormingRecord_description}
												setDataFormingRecord_description_detail={setDataFormingRecord_description_detail}
												setOpenModalReasonMaster={setOpenModalReasonMaster}
												setOpenModalReasonMasterDetail={setOpenModalReasonMasterDetail}
												setOpenModalAddNewReason={setOpenModalAddNewReason}
												setTypes={setTypes}
												setDataReason={setDataReason}
											/>
										</Grid>
									</Grid>
								</Modal>
								<Grid container spacing={2}>
									<Grid item lg={12} >
										<Grid container spacing={2}>
											<Grid item lg={4} >
												<Grid container spacing={3}>
													<Grid item lg={6} >
														<DateTimePicker
															label="วันเวลาเริ่ม"
															name={"enddate"}
															value={values.startdate}
															onBlur={handleBlur}
															onChange={e => setFieldValue('startdate', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
														/>
													</Grid>
													<Grid item lg={6}>
														<Grid container spacing={0}>
															<Grid item lg={11}>
																<DateTimePicker
																	label="วันเวลาสิ้นสุด"
																	name={"enddate"}
																	value={values.enddate}
																	onBlur={handleBlur}
																	onChange={e => { setFieldValue('enddate', moment(e).format('YYYY-MM-DD HH:mm:ss')) }}
																/>
															</Grid>
															<Grid item lg={1}>
																<IconButton
																	aria-label="more"
																	aria-controls="long-menu"
																	aria-haspopup="true"
																	onClick={handleClick}
																>
																	<MoreVertIcon />
																</IconButton>
																<ShiftSelect
																	anchorEl={anchorEl}
																	open={Boolean(anchorEl)}
																	onClose={handleClose}
																	setFieldValue={setFieldValue}
																	setAnchorEl={setAnchorEl}
																/>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											<Grid item lg={8} >
												<Grid container spacing={3}>
													<Grid item lg={4}>
														<CTextField
															error={Boolean(touched.item && errors.item)}
															helperText={touched.item && errors.item}
															label="item"
															name="item"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.item}
															Autocomplete={false}
														/>
													</Grid>
													<Grid item lg={2}>
														<CTextField
															error={Boolean(touched.refnum && errors.refnum)}
															helperText={touched.refnum && errors.refnum}
															label="ref num"
															name="refnum"
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.refnum}
														/>
													</Grid>
													<Grid item lg={4}>
														<CAutocomplete
															onBlur={handleBlur}
															name="w_c"
															value={values.w_c}
															setFieldValue={setFieldValue}
														/>
													</Grid>
													<Grid item lg={2}>
														<CButton label={"Search"} onClick={() => { SearchFn("ajax2", values, "") }} />
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item lg={2}>
										<CButton label={"รายงานการมัดท่อ"} onClick={() => { SearchFn("ajax2", values, "Packing", "Packing") }} />
										<CButton label={"ใบตรวจสอบการมัดท่อ"} onClick={() => { SearchFn("ajax2", values, "Packing", "CheckPacking") }} />
									</Grid>
									<Grid item lg={2}>
										<CButton label={"รายงานการผลิต"} onClick={() => { SearchFn("ajax2", values, "Production", "Production") }} />
										<CButton label={"ใบตรวจสอบการผลิต"} onClick={() => { SearchFn("ajax2", values, "Production", "CheckProduction") }} disabled={false} />
									</Grid>
									<Grid item lg={3}>
									    <CButton label={"บันทึกผลิต Forming"} onClick={() => { handleOpenModal(values) }} disabled={false} />
										<CButton label={"บันทึกเวลาหยุดเครื่อง Finishing"} onClick={() => handleOpenFinishingModal(values)} disabled={false} />
									</Grid>
									<Grid item lg={2}>
										<CButton label={"ใบขนย้ายระหว่างสาขา"} onClick={() => { SearchFn("MovingProductReport", values, "", "MovingProductReport") }} disabled={false} />
										<CButton label={"รายงานพิมพ์ตรา"} onClick={() => { SearchFn("StampingReport", values, "Stamping", "Stamping") }} disabled={false} />
									</Grid>
									<Grid item lg={2}>
										<Button variant="contained" color="primary" style={{ width: "100%", backgroundColor: "red", marginTop: '3px' }} onClick={() => handlePassModal(values.w_c)}>ปรับเปลี่ยนสถานะเครื่อง</Button>
										<CButton label={"รายการปรับเปลี่ยนสถานะเครื่อง"} onClick={() => setMachineRecord(true)} disabled={false} />
									</Grid>
								</Grid>
							</form>
						)}
					</Formik>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<ProductionDailyReportTable
								isLoading={isLoadingData}
								data={data}
								setdata={setdata}
								handleOpenModalItem={handleOpenModalItem}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ProductionDailyReport;