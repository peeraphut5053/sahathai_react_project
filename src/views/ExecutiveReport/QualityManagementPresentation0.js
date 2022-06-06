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
        fontSize: '2vh',
        padding:'1vh'
    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const QualityManagementPresentation0 = ({ className, ...rest }) => {
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
                    spacing={3}
                >


                    <Grid item xs={12} style={{padding:'2vw'}}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Data @ {moment().subtract(2, 'months').format("MMM-YYYY")} </StyledTableCell>
                                        <StyledTableCell align="center">Head Quarter</StyledTableCell>
                                        <StyledTableCell align="center">Wang-Noi</StyledTableCell>
                                        <StyledTableCell align="center">Total</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">Quarantined</StyledTableCell>
                                        <StyledTableCell align="center">1,528 PCS. (46 MT)</StyledTableCell>
                                        <StyledTableCell align="center">4,471 PCS. (601 MT)</StyledTableCell>
                                        <StyledTableCell align="center">5,999 PCS. (647 MT)</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">Wait for Processing</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">61 PCS. (80 MT)</StyledTableCell>
                                        <StyledTableCell align="center">61 PCS. (80 MT)</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">Processed</StyledTableCell>
                                        <StyledTableCell align="center">528 PCS. (11 MT)</StyledTableCell>
                                        <StyledTableCell align="center">4,410 PCS. (521 MT)</StyledTableCell>
                                        <StyledTableCell align="center">4,938 PCS. (532 MT)</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">Exempted</StyledTableCell>
                                        <StyledTableCell align="center">1,000 PCS. (35 MT)</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">1,000 PCS. (35 MT)</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">On-Hold</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">Rejected to Scrap</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} style={{padding:'2vw'}}>
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

QualityManagementPresentation0.propTypes = {
    className: PropTypes.string
};

export default QualityManagementPresentation0;
