import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Table, TableCell, TableRow, TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 400,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferEmployeeList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    // const [left, setLeft] = React.useState([0, 1, 2, 3]);
    // const [right, setRight] = React.useState([4, 5, 6, 88]);
    const employee = [
        { id: 101, name: 'Peeraphut punsuwan', department: 'เคลือบ/พิมพ์ตรา', barnch: 'วังน้อย' },
        { id: 102, name: 'Sasipa', department: 'มัดท่อ', barnch: 'ปู่เจ้า' },
        { id: 103, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 104, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 105, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 106, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 107, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 108, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 109, name: 'Ponlawat', department: 'ชุบ', barnch: 'ปู่เจ้า' },
        { id: 110, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 111, name: 'Ponlawat', department: 'ชุบ', barnch: 'ปู่เจ้า' },
        { id: 112, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' },
        { id: 113, name: 'Ponlawat', department: 'ชุบ', barnch: 'ปู่เจ้า' },
        { id: 114, name: 'Ponlawat', department: 'ชุบ', barnch: 'วังน้อย' }
    ]
    const employeeSelected = [
        { id: 115, name: 'Peeraphut', department: 'A', startTime: '', endTime: '', task: '' },
        { id: 116, name: 'Ponlawat', department: 'B', startTime: '', endTime: '', task: '' }
    ]
    const [left, setLeft] = React.useState(employee);
    const [right, setRight] = React.useState(employeeSelected);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };


    const theme = createMuiTheme({
        overrides: {
            MuiTableCell: {
                root: {
                    paddingTop: 8,
                    paddingBottom: 4,
                    "&:last-child": {
                        paddingRight: 5
                    }
                }
            },
        },
    });


    //const [search, setSearch] = React.useState("");








    const customList = (title, items, btnTransfer) => (
        <Card style={{width:'100%'}}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            {/* {title == 'เลือกรายชื่อเข้ารายการ' ? <TableCell component="th" scope="row">
                <TextField
                    type="text"
                    onChange={e => {
                        const test = employee.filter(team => {
                            return team.name.toLowerCase().includes(e.target.value.toLowerCase());
                        });
                        console.log("test: ", test);
                        console.log("test: ", e.target.value);
                        setTeams(test);
                        setSearch(e.target.value);
                    }}
                    value={search}
                    hidden={true}
                ></TextField>
                <div className="App" hidden>
                    
                    {teams.map(team => (
                    <p>{team.name}</p>
                ))}
                </div>
            </TableCell> : ''} */}

            <List style={{
                // width: title == 'เลือกรายชื่อเข้ารายการ' ? 450 : 920,
                height: 280,
                overflow: 'auto',
            }} dense component="div" role="list">
                <ThemeProvider theme={theme}></ThemeProvider>
                <Table size="small" >
                    {items.map((value) => {
                        const labelId = `transfer-list-all-item-${value}-label`;
                        return (
                            <TableRow key={value.id}>
                                <TableCell component="th" scope="row" style={{ padding: 0 }} >
                                    <ListItem key={value} role="listitem" button >
                                        <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            onClick={handleToggle(value)}
                                            style={{ padding: 1 }}
                                        />
                                    </ListItem>
                                </TableCell>
                                
                                <TableCell component="th" scope="row" style={{ fontSize: '1vw', padding: 1 }}>
                                    {value.name}({value.id})
                                </TableCell>
                                <TableCell component="th" scope="row" style={{ fontSize: '0.8vw', paddingLeft: 0,textAlign:'center' }}>
                                    {value.department}
                                </TableCell>
                                <TableCell component="th" scope="row" style={{ fontSize: '0.8vw', paddingLeft: 0 }}>
                                    {value.barnch}
                                </TableCell>
                                {title !== 'เลือกรายชื่อเข้ารายการ' ? <TableCell component="th" scope="row" style={{  padding: 0 }}>
                                    <TextField
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.textField}
                                        label="เวลาเข้า"
                                        onChange={(e) => {
                                            const elementsIndex = right.findIndex(element => element.id == value.id)
                                            let newArray = [...right]
                                            newArray[elementsIndex] = { ...newArray[elementsIndex], startTime: e.target.value }
                                            setRight(newArray)
                                        }}
                                        inputProps={{ style: { fontSize: 10 } }}
                                    ></TextField>

                                </TableCell> : ''}
                                {title !== 'เลือกรายชื่อเข้ารายการ' ? <TableCell component="th" scope="row" style={{ fontSize: 10, padding: 0 }} >
                                    <TextField
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.textField}
                                        label="เวลาออก"
                                        onChange={(e) => {
                                            const elementsIndex = right.findIndex(element => element.id == value.id)
                                            let newArray = [...right]
                                            newArray[elementsIndex] = { ...newArray[elementsIndex], endTime: e.target.value }
                                            setRight(newArray)
                                        }}
                                        inputProps={{ style: { fontSize: 10 } }}
                                    ></TextField>
                                </TableCell> : ''}
                                {title !== 'เลือกรายชื่อเข้ารายการ' ?
                                    <TableCell component="th" scope="row" style={{ width: 210 }}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            label="ระบุงานที่ทำ"
                                            onChange={(e) => {
                                                const elementsIndex = right.findIndex(element => element.id == value.id)
                                                let newArray = [...right]
                                                newArray[elementsIndex] = { ...newArray[elementsIndex], task: e.target.value }
                                                setRight(newArray)
                                            }}
                                            inputProps={{ style: { fontSize: 10 } }}
                                            style={{width:'100%'}}
                                        >
                                        </TextField>
                                    </TableCell> : ''}

                            </TableRow>

                        );
                    })}
                </Table>

                <ListItem />
            </List>
            <List dense >
                <Grid container >
                    <Grid item xs={12}>
                        {btnTransfer}
                    </Grid>
                    {/* <Grid item>
                        {title !== 'เลือกรายชื่อเข้ารายการ' ?
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
                              </Button> : ''}
                    </Grid> */}
                </Grid>


            </List>



        </Card>
    );

    return (
        <Grid container spacing={1} justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={4}>
                <Grid item  >
                    
                    {customList('เลือกรายชื่อเข้ารายการ', left,
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                            style={{ marginLeft: '15%' }}
                            color="primary"
                        >
                            เลือกรายชื่อเข้ารายการ
                        </Button>
                    )}
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <div style={{ width: 300 }}>
                    {/* {JSON.stringify(right)} */}
                </div>
                {customList('เลือกรายชื่อออกรายการ', right,
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                        style={{ marginLeft: '15%' }}
                        color="default"
                    >
                        นำรายชื่อออกจากรายการ
                    </Button>
                    
                )}
            </Grid>
        </Grid>
    );
}
