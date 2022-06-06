import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    withStyles,
    colors,
} from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import moment from "moment";
import API from '../components/API';
moment.locale("th");

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.pink[600],
        height: 56,
        width: 56
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: colors.indigo[500],
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const TableExecutiveSummary = ({ className, ...rest }) => {
    const classes = useStyles();
    const [openModalItem, setOpenModalItem] = React.useState(false);
    const navigate = useNavigate();

    const handleCloseModalItem = async () => {
        setOpenModalItem(false);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ExecutiveSummaryData1, setExecutiveSummaryData1] = useState([]);
    const [ExecutiveSummaryData2, setExecutiveSummaryData2] = useState([]);

    const handleDateChange = (date) => {
        alert(date)
        setSelectedDate(date)
    }


    const searchExecutiveSummaryData = () => {
        setTimeout(() => {
            API.get(`API_ExecutiveReport/data.php?load=setExecutiveSummaryData1`)
                .then(res => {
                    (res.data) ? setExecutiveSummaryData1(res.data) : setExecutiveSummaryData1([])
                })

            API.get(`API_ExecutiveReport/data.php?load=setExecutiveSummaryData2`)
                .then(res => {
                    (res.data) ? setExecutiveSummaryData2(res.data) : setExecutiveSummaryData2([])
                })
        }, 2000);

    }

    useEffect(() => {
        searchExecutiveSummaryData()
    }, [])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >

            <CardContent
                onClick={() => setOpenModalItem(true)}
            >
                <Grid
                    container
                    justify="space-between"
                    spacing={1}
                >


                    {/* <Grid item xs={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <span style={{ padding: '0px 4px' }}>
                                <Chip color="primary" onClick={() => { alert() }} label={"Coil"} > </Chip>
                            </span>
                            <span style={{ padding: '0px 4px' }}>
                                <Chip color="primary" onClick={() => { alert() }} label={"Strip"} > </Chip>
                            </span>
                            <span style={{ padding: '0px 4px' }}>
                                <Chip color="primary" onClick={() => { alert() }} label={"Processing Pipe"} > </Chip>
                            </span>
                            <span style={{ padding: '0px 4px' }}>
                                <Chip color="primary" onClick={() => { alert() }} label={"Finshed Pipe"} > </Chip>
                            </span>
                            <span style={{ padding: '0px 4px' }}>
                                <Chip color="primary" onClick={() => { alert() }} label={"Scrap Pipe"} > </Chip>
                            </span>

                        </div>
                    </Grid> */}
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>{moment().subtract(1, 'months').format("MMM-YYYY")}</StyledTableCell>
                                        <StyledTableCell align="right">Coil</StyledTableCell>
                                        <StyledTableCell align="right">Strip</StyledTableCell>
                                        <StyledTableCell align="right">Processing&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Finished&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Scrap&nbsp;Pipe</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {ExecutiveSummaryData1.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.Data_Group}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.Coil}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Strip}</StyledTableCell>
                                            <StyledTableCell align="right">{row.ProcessingPipe}</StyledTableCell>
                                            <StyledTableCell align="right">{row.FinishedPipe}</StyledTableCell>
                                            <StyledTableCell align="right">{row.ScrapPipe}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>{moment().format("MMM")} to date</StyledTableCell>
                                        <StyledTableCell align="right">Coil</StyledTableCell>
                                        <StyledTableCell align="right">Strip</StyledTableCell>
                                        <StyledTableCell align="right">Processing&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Finished&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Scrap&nbsp;Pipe</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ExecutiveSummaryData2.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.Data_Group}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.Coil}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Strip}</StyledTableCell>
                                            <StyledTableCell align="right">{row.ProcessingPipe}</StyledTableCell>
                                            <StyledTableCell align="right">{row.FinishedPipe}</StyledTableCell>
                                            <StyledTableCell align="right">{row.ScrapPipe}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

TableExecutiveSummary.propTypes = {
    className: PropTypes.string
};

export default TableExecutiveSummary;
