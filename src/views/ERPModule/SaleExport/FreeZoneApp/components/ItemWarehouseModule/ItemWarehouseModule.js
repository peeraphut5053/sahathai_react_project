import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import tableIcons from '../tableIcons'
import { Grid, TextField, Button, Card, Divider, CardContent, IconButton } from '@material-ui/core';
import ComponentAutocomplete from '../ComponentAutocomplete';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import api from '../api'

const ItemWarehouseModule = props => {
    const [reportDepartment, setreportDepartment] = useState([])
    const [reportDepartmentSelect, setreportDepartmentSelect] = useState({ report_description: "", })
    const [reportList, setreportList] = useState([])
    const [reportSelect, setreportSelect] = useState({ report_name: "", report_description: "", department_name: "", report_get_api: "", report_detail: "", reprot_query: "" })
    const [reportData, setreportData] = useState([])
    const [ColumnData, setColumnData] = useState([])
    const [fieldSearch] = useState([])
    const [values, setValues] = useState({});

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const checkState = () => {
        console.log(reportDepartment);
        console.log(reportList);
        console.log(reportDepartmentSelect);
        console.log(reportSelect);
        console.log(reportData);
        console.log(ColumnData);
        console.log(fieldSearch);
        console.log(values);
    }

    useEffect(() => {
        api.get(`data.php?load=STS_freezone_department`)
            .then(response => {
                setreportDepartment(response.data)
            })
    }, [])

    useEffect(() => {
        if (reportDepartmentSelect != null) {
            api.get(`data.php?load=STS_freezone_report&department_name=${reportDepartmentSelect.report_description}`)
                .then(response => {
                    setreportList(response.data)
                })
        }
    }, [reportDepartmentSelect])

    useEffect(() => {
        setValues({});
        setColumnData([]);
    }, [reportSelect])

    //แสดง Input Search ของแต่ละรายงาน 
    // const SearchInputReport = () => {
    //     api.get(`data.php?load=SearchInputReport&report_name=${reportSelect.report_get_api}`)
    //         .then(response => {
    //             setfieldSearch(response.data)
    //         })
    // }

    //สร้างคอนลัมของรายงานนั้นๆ และแสดงข้อมูลตามที่ค้นหา
    const SearchReport = () => {
        if (reportSelect.report_get_api !== "") {
            api.post(`data.php?load=SQLQueryReport&report_name=${reportSelect.report_get_api}`, values)
                .then(response => {
                    let data = response.data;
                    if (data[0].data.length > 0) {
                        let field = Object.keys(data[0].data[0]);
                        let ColumnData = () => field.map((item) => {
                            return {
                                field: item,
                                title: item
                            }
                        })
                        setColumnData(ColumnData)
                        setreportData(data[0].data)
                    }
                })
        }
    }

    return (
        <Grid container spacing={1}  >
            <Grid item xs={12}>
                <Card spacing={1}>
                    <Card>
                        <Divider />
                        <CardContent>
                            <Grid container spacing={1}  >
                                <Grid item xs={2}>
                                    <ComponentAutocomplete selectValue={reportDepartment} handleSelectValue={setreportDepartmentSelect} />
                                </Grid>
                                <Grid item xs={4}>
                                    <ComponentAutocomplete selectValue={reportList} handleSelectValue={setreportSelect} />
                                </Grid>
                                {fieldSearch.map((item) => (
                                    <Grid key={item.label} item xs={3}>
                                        <TextField key={item.label} fullWidth label={item.label} margin="dense" name={item.name} onChange={handleChange} required variant="outlined" />
                                    </Grid>
                                ))}
                                <Grid item xs={2} style={{ placeSelf: "center", textAlign: "center" }}>
                                    <Grid container spacing={1}  >
                                        <Grid item xs={10}>
                                            <Button startIcon={<SearchIcon />} style={{ marginTop: 10 }} variant="contained" color="primary" onClick={SearchReport}> Search</Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={checkState}>
                                                <SettingsIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <MaterialTable
                    style={{ width: '100%', margin: 5, overflowX: "scroll" }}
                    icons={tableIcons}
                    title={(reportSelect) ? reportSelect.report_name + " " + reportSelect.report_description : ""}
                    columns={ColumnData}
                    data={reportData}
                    options={{
                        search: false,
                        paging: false,
                        maxBodyHeight: '60vh',
                        minBodyHeight: '60vh',
                        exportButton: true,
                        filtering: true

                    }}
                />
            </Grid>
        </Grid>
    );
};
export default ItemWarehouseModule;
