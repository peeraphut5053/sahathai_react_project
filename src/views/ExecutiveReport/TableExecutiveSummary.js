import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
// import { Link as  useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import API from '../components/API';
moment.locale("th");

const RootCard = styled(Card)({
    height: '100%'
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: colors.indigo[500],
        color: theme.palette.common.white,
    },
    '&.MuiTableCell-body': {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));


const TableExecutiveSummary = ({ className, ...rest }) => {
    const [openModalItem, setOpenModalItem] = React.useState(false);
    // const navigate = useNavigate();

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
        var timerID = setInterval(() => searchExecutiveSummaryData(), 900000);


        return function cleanup() {
            clearInterval(timerID);
        };
    }, [])

    return (
        <RootCard
            className={clsx(className)}
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
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ width: 180 }}>{moment().subtract(1, 'months').format("MMM-YYYY")}</StyledTableCell>
                                        <StyledTableCell align="right">Coil</StyledTableCell>
                                        <StyledTableCell align="right">Strip</StyledTableCell>
                                        <StyledTableCell align="right">Processing&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Finished&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Scrap&nbsp;Pipe</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {ExecutiveSummaryData1.map((row, index) => (
                                        <StyledTableRow key={row.Data_Group || index}>
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
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ width: 180 }}>{moment().format("MMM")} to date</StyledTableCell>
                                        <StyledTableCell align="right">Coil</StyledTableCell>
                                        <StyledTableCell align="right">Strip</StyledTableCell>
                                        <StyledTableCell align="right">Processing&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Finished&nbsp;Pipe</StyledTableCell>
                                        <StyledTableCell align="right">Scrap&nbsp;Pipe</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ExecutiveSummaryData2.map((row, index) => (
                                        <StyledTableRow key={row.Data_Group || index}>
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
        </RootCard>
    );
};

TableExecutiveSummary.propTypes = {
    className: PropTypes.string
};

export default TableExecutiveSummary;
