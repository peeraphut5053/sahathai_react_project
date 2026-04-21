import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    CircularProgress
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import thLocale from 'date-fns/locale/th';
import moment from 'moment';
import { useQuery } from 'react-query';
import API from 'src/views/components/API';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    denseTable: {
        '& th, & td': {
            fontSize: '0.75rem !important',
            padding: '4px 6px !important',
            whiteSpace: 'nowrap'
        }
    }
});

const getHeaderStyles = (headerContext) => {
    const defaultStyle = {
        border: '1px solid #aaa',
        textAlign: 'center',
        padding: '4px',
        fontSize: '0.85rem',
        fontWeight: 'bold'
    };

    let bgColor = '#f5f5f5';
    let textColor = '#000';

    const headerTitle = headerContext.column.columnDef.header;
    const parentTitle = headerContext.column.parent?.columnDef.header;
    const rootTitle = headerContext.column.parent?.parent?.columnDef.header;

    const checkTitle = (title) => title === 'ปูเจ้า' || title === 'A' ? '#c9daf8'
        : title === 'วังน้อย' ? '#d0e0e3'
            : title === 'เป้าหมายรวม' ? '#ea9999'
                : title === 'วันที่' ? '#fff2cc'
                    : null;

    bgColor = checkTitle(headerTitle) || checkTitle(parentTitle) || checkTitle(rootTitle) || '#f5f5f5';

    if (headerTitle === 'เป้าหมายรวม') {
        textColor = '#c00';
    }

    return { ...defaultStyle, backgroundColor: bgColor, color: textColor };
};

const formatNumber = (num) => {
    if (num === null || num === undefined || num === '') return '';
    const parsed = parseFloat(num);
    if (isNaN(parsed) || parsed === 0) return '';
    return parsed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const ProductionReportByMonth = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;

    // Fetch data using React Query
    const { data: apiData, isLoading } = useQuery(
        ['productionReportByMonth', year, month],
        async () => {
            try {
                // รอการเปลี่ยน endpoint / parameter เป็น API ของจริง
                const response = await API.get(`API_ExecutiveReport/data.php?load=GetProductionReportByMonth&year=${year}&month=${month}&volume="PCS"`);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching report data:", error);
                return [];
            }
        },
        {
            staleTime: 5 * 60 * 1000,
        }
    );

    const { data: targetData, isLoading: targetIsLoading } = useQuery(
        ['productionReportTarget', year, month],
        async () => {
            try {
                // รอการเปลี่ยน endpoint / parameter เป็น API ของจริง
                const response = await API.get(`STS_Planning/data.php?load=GetTarget&year=${year}&month=${month}`);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching report target data:", error);
                return [];
            }
        },
        {
            staleTime: 5 * 60 * 1000,
        }
    );

    const monthTargets = useMemo(() => {
        let t = {
            FM1: 0, FM5: 0, FM6: 0, FM8: 0, FM9: 0, FM10: 0,
            FM2: 0, FM4: 0, FM7: 0, FM11: 0, FC: 0
        };
        if (apiData) {
            const processArray = (arr) => {
                if (Array.isArray(arr)) {
                    arr.forEach(item => {
                        const dateStr = item.date && typeof item.date === 'object' ? item.date.date : item.date;
                        if (dateStr === 'เป้าหมาย') {
                            const parseVal = (val) => parseFloat(String(val || '').replace(/,/g, '')) || 0;
                            if (item.P2FM01 !== undefined && item.P2FM01 !== null) t.FM1 = parseVal(item.P2FM01);
                            if (item.P2FM05 !== undefined && item.P2FM05 !== null) t.FM5 = parseVal(item.P2FM05);
                            if (item.P2FM06 !== undefined && item.P2FM06 !== null) t.FM6 = parseVal(item.P2FM06);
                            if (item.P2FM08 !== undefined && item.P2FM08 !== null) t.FM8 = parseVal(item.P2FM08);
                            if (item.P2FM09 !== undefined && item.P2FM09 !== null) t.FM9 = parseVal(item.P2FM09);
                            if (item.P2FM10 !== undefined && item.P2FM10 !== null) t.FM10 = parseVal(item.P2FM10);

                            if (item.W2FM02 !== undefined && item.W2FM02 !== null) t.FM2 = parseVal(item.W2FM02);
                            if (item.W2FM04 !== undefined && item.W2FM04 !== null) t.FM4 = parseVal(item.W2FM04);
                            if (item.W2FM07 !== undefined && item.W2FM07 !== null) t.FM7 = parseVal(item.W2FM07);
                            if (item.W2FM11 !== undefined && item.W2FM11 !== null) t.FM11 = parseVal(item.W2FM11);
                            if (item.W2FMC1 !== undefined && item.W2FMC1 !== null) t.FC = parseVal(item.W2FMC1);
                        }
                    });
                }
            };
            processArray(apiData.P);
            processArray(apiData.W);
        }

        t.puChaoTargetPerDay = t.FM1 + t.FM5 + t.FM6 + t.FM8 + t.FM9 + t.FM10;
        t.wangNoiTargetPerDay = t.FM2 + t.FM4 + t.FM7 + t.FM11 + t.FC;
        t.totalTargetPerDay = t.puChaoTargetPerDay + t.wangNoiTargetPerDay;

        return t;
    }, [apiData]);

    const dailyTargets = useMemo(() => {
        let t = {
            FM1: 0, FM5: 0, FM6: 0, FM8: 0, FM9: 0, FM10: 0,
            FM2: 0, FM4: 0, FM7: 0, FM11: 0, FC: 0
        };

        if (targetData && Array.isArray(targetData)) {
            const getVal = (wc) => {
                const target = targetData.find(x => x.wc === wc);
                return target && target.weight ? parseFloat(target.weight) || 0 : 0;
            };
            t.FM1 = getVal('P2FM01');
            t.FM5 = getVal('P2FM05');
            t.FM6 = getVal('P2FM06');
            t.FM8 = getVal('P2FM08');
            t.FM9 = getVal('P2FM09');
            t.FM10 = getVal('P2FM10');

            t.FM2 = getVal('W2FM02');
            t.FM4 = getVal('W2FM04');
            t.FM7 = getVal('W2FM07');
            t.FM11 = getVal('W2FM11');
            t.FC = getVal('W2FMC1');
        }

        t.puChaoTargetPerDay = t.FM1 + t.FM5 + t.FM6 + t.FM8 + t.FM9 + t.FM10;
        t.wangNoiTargetPerDay = t.FM2 + t.FM4 + t.FM7 + t.FM11 + t.FC;
        t.totalTargetPerDay = t.puChaoTargetPerDay + t.wangNoiTargetPerDay;

        return t;
    }, [targetData]);

    const columns = useMemo(() => {
        const getTarget = (wc) => {
            if (!targetData || !Array.isArray(targetData)) return '-';
            const target = targetData.find(t => t.wc === wc);
            return target && target.weight ? target.weight.toString() : '-';
        };

        const getTargetVal = (wc) => {
            if (!targetData || !Array.isArray(targetData)) return 0;
            const target = targetData.find(t => t.wc === wc);
            return target && target.weight ? parseFloat(target.weight) || 0 : 0;
        };

        const puChaoTotalTarget = getTargetVal('P2FM01') + getTargetVal('P2FM05') + getTargetVal('P2FM06') + getTargetVal('P2FM08') + getTargetVal('P2FM09') + getTargetVal('P2FM10');
        const wangNoiTotalTarget = getTargetVal('W2FM02') + getTargetVal('W2FM04') + getTargetVal('W2FM07') + getTargetVal('W2FM11') + getTargetVal('W2FMC1');
        const overallTotalTarget = puChaoTotalTarget + wangNoiTotalTarget;

        const formatHeaderTotal = (val) => val > 0 ? val.toString() : '-';

        return [
            {
                header: 'วันที่',
                columns: [
                    { header: ' ', columns: [{ header: ' ', accessorKey: 'day' }] }
                ]
            },
            {
                header: 'ปูเจ้า',
                columns: [
                    { header: 'FM1', columns: [{ header: getTarget('P2FM01'), accessorKey: 'FM1' }] },
                    { header: 'FM5', columns: [{ header: getTarget('P2FM05'), accessorKey: 'FM5' }] },
                    { header: 'FM6', columns: [{ header: getTarget('P2FM06'), accessorKey: 'FM6' }] },
                    { header: 'FM8', columns: [{ header: getTarget('P2FM08'), accessorKey: 'FM8' }] },
                    { header: 'FM9', columns: [{ header: getTarget('P2FM09'), accessorKey: 'FM9' }] },
                    { header: 'FM10', columns: [{ header: getTarget('P2FM10'), accessorKey: 'FM10' }] },
                    { header: 'ตัน/วัน', columns: [{ header: formatHeaderTotal(puChaoTotalTarget), accessorKey: 'puChaoTonPerDay', meta: { isTarget: true } }] },
                    { header: 'เป้าหมาย/วัน', columns: [{ header: formatHeaderTotal(puChaoTotalTarget), accessorKey: 'puChaoTargetPerDay' }] },
                    { header: 'ผล', columns: [{ header: '-', accessorKey: 'puChaoResult' }] },
                ]
            },
            {
                header: 'วังน้อย',
                columns: [
                    { header: 'FM2', columns: [{ header: getTarget('W2FM02'), accessorKey: 'FM2' }] },
                    { header: 'FM4', columns: [{ header: getTarget('W2FM04'), accessorKey: 'FM4' }] },
                    { header: 'FM7', columns: [{ header: getTarget('W2FM07'), accessorKey: 'FM7' }] },
                    { header: 'FM11', columns: [{ header: getTarget('W2FM11'), accessorKey: 'FM11' }] },
                    { header: 'FC', columns: [{ header: getTarget('W2FMC1'), accessorKey: 'FC' }] },
                    { header: 'ตัน/วัน', columns: [{ header: formatHeaderTotal(wangNoiTotalTarget), accessorKey: 'wangNoiTonPerDay', meta: { isTarget: true } }] },
                    { header: 'เป้าหมาย/วัน', columns: [{ header: formatHeaderTotal(wangNoiTotalTarget), accessorKey: 'wangNoiTargetPerDay' }] },
                    { header: 'ผล', columns: [{ header: '-', accessorKey: 'wangNoiResult' }] },
                ]
            },
            {
                header: 'A',
                columns: [
                    { header: 'ผลิตได้', columns: [{ header: formatHeaderTotal(overallTotalTarget), accessorKey: 'aProduced' }] },
                ]
            },
            {
                header: 'เป้าหมายรวม',
                columns: [
                    { header: 'ผลิตได้', columns: [{ header: formatHeaderTotal(overallTotalTarget), accessorKey: 'totalProduced' }] },
                    { header: 'เป้า/วัน', columns: [{ header: formatHeaderTotal(overallTotalTarget), accessorKey: 'totalTargetPerDay' }] },
                    { header: 'ผล', columns: [{ header: '-', accessorKey: 'totalResult' }] },
                ]
            }
        ];
    }, [targetData]);

    const data = useMemo(() => {
        const rows = [];
        const daysInMonth = new Date(year, month, 0).getDate();

        let monthDataMap = {};
        if (apiData) {
            const processArray = (arr) => {
                if (Array.isArray(arr)) {
                    arr.forEach(item => {
                        const dateStr = item.date && typeof item.date === 'object' ? item.date.date : item.date;
                        if (!dateStr) return;

                        const dateObj = moment(dateStr);
                        if (dateObj.isValid() && dateObj.month() + 1 === month && dateObj.year() === year) {
                            const d = dateObj.date();
                            if (!monthDataMap[d]) monthDataMap[d] = {};
                            monthDataMap[d] = { ...monthDataMap[d], ...item };
                        }
                    });
                }
            };

            processArray(apiData.P);
            processArray(apiData.W);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month - 1, i);
            const isSunday = currentDate.getDay() === 0;
            const rowData = monthDataMap[i] || {};

            const parseVal = (val) => parseFloat(String(val || '').replace(/,/g, '')) || 0;

            const FM1 = parseVal(rowData.P2FM01);
            const FM5 = parseVal(rowData.P2FM05);
            const FM6 = parseVal(rowData.P2FM06);
            const FM8 = parseVal(rowData.P2FM08);
            const FM9 = parseVal(rowData.P2FM09);
            const FM10 = parseVal(rowData.P2FM10);

            const FM2 = parseVal(rowData.W2FM02);
            const FM4 = parseVal(rowData.W2FM04);
            const FM7 = parseVal(rowData.W2FM07);
            const FM11 = parseVal(rowData.W2FM11);
            const FC = parseVal(rowData.W2FMC1);

            const activePuChaoTarget = isSunday ? 0 : dailyTargets.puChaoTargetPerDay;
            const activeWangNoiTarget = isSunday ? 0 : dailyTargets.wangNoiTargetPerDay;
            const activeTotalTarget = isSunday ? 0 : dailyTargets.totalTargetPerDay;

            const puChaoTonPerDay = FM1 + FM5 + FM6 + FM8 + FM9 + FM10;
            const puChaoTargetPerDay = activePuChaoTarget > 0 ? activePuChaoTarget : '';
            const puChaoResult = puChaoTonPerDay !== 0 ? puChaoTonPerDay - activePuChaoTarget : '';

            const wangNoiTonPerDay = FM2 + FM4 + FM7 + FM11 + FC;
            const wangNoiTargetPerDay = activeWangNoiTarget > 0 ? activeWangNoiTarget : '';
            const wangNoiResult = wangNoiTonPerDay !== 0 ? wangNoiTonPerDay - activeWangNoiTarget : '';

            const aProduced = puChaoTonPerDay + wangNoiTonPerDay;
            const totalProduced = aProduced;
            const totalTargetPerDay = activeTotalTarget > 0 ? activeTotalTarget : '';
            const totalResult = totalProduced !== 0 ? totalProduced - activeTotalTarget : '';

            rows.push({
                day: i,
                FM1: formatNumber(FM1),
                FM5: formatNumber(FM5),
                FM6: formatNumber(FM6),
                FM8: formatNumber(FM8),
                FM9: formatNumber(FM9),
                FM10: formatNumber(FM10),
                puChaoTonPerDay: puChaoTonPerDay !== 0 ? formatNumber(puChaoTonPerDay) : '',
                puChaoTargetPerDay: puChaoTargetPerDay !== '' ? formatNumber(puChaoTargetPerDay) : '',
                puChaoResult: puChaoResult !== '' ? formatNumber(puChaoResult) : '',

                FM2: formatNumber(FM2),
                FM4: formatNumber(FM4),
                FM7: formatNumber(FM7),
                FM11: formatNumber(FM11),
                FC: formatNumber(FC),
                wangNoiTonPerDay: wangNoiTonPerDay !== 0 ? formatNumber(wangNoiTonPerDay) : '',
                wangNoiTargetPerDay: wangNoiTargetPerDay !== '' ? formatNumber(wangNoiTargetPerDay) : '',
                wangNoiResult: wangNoiResult !== '' ? formatNumber(wangNoiResult) : '',

                aProduced: aProduced !== 0 ? formatNumber(aProduced) : '',
                totalProduced: totalProduced !== 0 ? formatNumber(totalProduced) : '',
                totalTargetPerDay: totalTargetPerDay !== '' ? formatNumber(totalTargetPerDay) : '',
                totalResult: totalResult !== '' ? formatNumber(totalResult) : ''
            });
        }
        return rows;
    }, [selectedDate, apiData, year, month, dailyTargets]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const summaryData = useMemo(() => {
        let sum = {
            FM1: 0, FM5: 0, FM6: 0, FM8: 0, FM9: 0, FM10: 0,
            puChaoTonPerDay: 0, puChaoTargetPerDay: 0, puChaoResult: 0,
            FM2: 0, FM4: 0, FM7: 0, FM11: 0, FC: 0,
            wangNoiTonPerDay: 0, wangNoiTargetPerDay: 0, wangNoiResult: 0,
            aProduced: 0, totalProduced: 0, totalTargetPerDay: 0, totalResult: 0
        };
        data.forEach(row => {
            const getVal = (val) => parseFloat(String(val).replace(/,/g, '')) || 0;
            sum.FM1 += getVal(row.FM1);
            sum.FM5 += getVal(row.FM5);
            sum.FM6 += getVal(row.FM6);
            sum.FM8 += getVal(row.FM8);
            sum.FM9 += getVal(row.FM9);
            sum.FM10 += getVal(row.FM10);
            sum.puChaoTonPerDay += getVal(row.puChaoTonPerDay);
            sum.puChaoTargetPerDay += getVal(row.puChaoTargetPerDay);
            sum.puChaoResult += getVal(row.puChaoResult);

            sum.FM2 += getVal(row.FM2);
            sum.FM4 += getVal(row.FM4);
            sum.FM7 += getVal(row.FM7);
            sum.FM11 += getVal(row.FM11);
            sum.FC += getVal(row.FC);
            sum.wangNoiTonPerDay += getVal(row.wangNoiTonPerDay);
            sum.wangNoiTargetPerDay += getVal(row.wangNoiTargetPerDay);
            sum.wangNoiResult += getVal(row.wangNoiResult);

            sum.aProduced += getVal(row.aProduced);
            sum.totalProduced += getVal(row.totalProduced);
            sum.totalTargetPerDay += getVal(row.totalTargetPerDay);
            sum.totalResult += getVal(row.totalResult);
        });
        return sum;
    }, [data]);

    const monthNameTH = new Intl.DateTimeFormat('th-TH', { month: 'long', year: 'numeric' }).format(selectedDate);
    const daysInMonth = new Date(year, month, 0).getDate();


    return (
        <Box p={2}>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: 16 }}>
                <Grid item xs={12} sm={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={thLocale}>
                        <DatePicker
                            variant="inline"
                            inputVariant="outlined"
                            views={["year", "month"]}
                            label="เลือกเดือน/ปี"
                            value={selectedDate}
                            onChange={setSelectedDate}
                            format="MM/yyyy"
                            fullWidth
                            size="small"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                {isLoading && (
                    <Grid item>
                        <CircularProgress size={24} />
                    </Grid>
                )}
            </Grid>

            <TableContainer component={Paper} style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                <Table size="small" className={classes.denseTable} style={{ minWidth: 1600, borderCollapse: 'collapse' }}>
                    <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
                        <TableRow>
                            <TableCell colSpan={24} style={{ border: '1px solid #aaa', textAlign: 'center', backgroundColor: '#fbbf00', fontWeight: 'bold', fontSize: '1rem', padding: '8px' }}>
                                ปริมาณการผลิตวันที่ 1-{daysInMonth} {monthNameTH}
                            </TableCell>
                        </TableRow>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const styles = getHeaderStyles(header);
                                    if (header.column.columnDef.meta?.isTarget) {
                                        styles.backgroundColor = '#f6b26b';
                                    }

                                    return (
                                        <TableCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={styles}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} hover>
                                {row.getVisibleCells().map(cell => {
                                    const value = cell.getValue();
                                    const strVal = String(value || '').trim();
                                    const isNegative = strVal.startsWith('-');

                                    let cellColor = 'inherit';
                                    if (isNegative) {
                                        cellColor = 'red';
                                    } else if (cell.column.id.includes('Result') && strVal !== '' && strVal !== '-') {
                                        const parsedVal = parseFloat(strVal.replace(/,/g, ''));
                                        if (parsedVal > 0) {
                                            cellColor = 'blue';
                                        } else if (parsedVal < 0) {
                                            cellColor = 'red';
                                        }
                                    }

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            style={{
                                                border: '1px solid #aaa',
                                                textAlign: 'right',
                                                padding: '2px 4px',
                                                fontSize: '0.8rem',
                                                color: cellColor
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}

                        {/* Summary Rows */}
                        <TableRow>
                            <TableCell style={{ border: '1px solid #aaa', fontWeight: 'bold', backgroundColor: '#ffff00', textAlign: 'center' }}>ผลิตได้</TableCell>
                            {/* Puchao */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM1)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM5)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM6)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM8)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM9)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM10)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00', fontWeight: 'bold' }}>{formatNumber(summaryData.puChaoTonPerDay)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00', fontWeight: 'bold' }}>{formatNumber(monthTargets.puChaoTargetPerDay)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00', color: 'red', fontWeight: 'bold' }}>{formatNumber(summaryData.puChaoTonPerDay - monthTargets.puChaoTargetPerDay)}</TableCell>

                            {/* Wang Noi */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM2)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM4)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM7)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FM11)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00' }}>{formatNumber(summaryData.FC)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00', fontWeight: 'bold' }}>{formatNumber(summaryData.wangNoiTonPerDay)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00', fontWeight: 'bold' }}>{formatNumber(monthTargets.wangNoiTargetPerDay)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#ffff00', color: 'red', fontWeight: 'bold' }}>{formatNumber(summaryData.wangNoiTonPerDay - monthTargets.wangNoiTargetPerDay)}</TableCell>

                            {/* A & Total */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', fontWeight: 'bold', color: '#e69138' }}>{formatNumber(summaryData.aProduced)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red', fontWeight: 'bold' }}>{formatNumber(summaryData.totalProduced)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'gray', fontWeight: 'bold' }}>{formatNumber(monthTargets.totalTargetPerDay)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red', fontWeight: 'bold' }}>{formatNumber(summaryData.totalProduced - monthTargets.totalTargetPerDay)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ border: '1px solid #aaa', fontWeight: 'bold', backgroundColor: '#d9ead3', textAlign: 'center' }}>เป้าหมาย</TableCell>
                            {/* Puchao */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM1)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM5)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM6)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM8)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM9)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM10)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#e69138', color: '#fff', fontWeight: 'bold' }}>{formatNumber(monthTargets.puChaoTargetPerDay)}</TableCell>
                            <TableCell colSpan={2} style={{ border: '1px solid #aaa', textAlign: 'center', backgroundColor: '#eee', fontWeight: 'bold' }}>
                                -
                            </TableCell>

                            {/* Wang Noi */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM2)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM4)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM7)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FM11)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#d9ead3' }}>{formatNumber(monthTargets.FC)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', backgroundColor: '#e69138', color: '#fff', fontWeight: 'bold' }}>{formatNumber(monthTargets.wangNoiTargetPerDay)}</TableCell>
                            <TableCell colSpan={2} style={{ border: '1px solid #aaa', textAlign: 'center', backgroundColor: '#eee', fontWeight: 'bold' }}>
                                -
                            </TableCell>

                            {/* A & Total */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ border: '1px solid #aaa', fontWeight: 'bold', textAlign: 'center' }}>ขาดผลิต</TableCell>
                            {/* Puchao */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM1 - monthTargets.FM1)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM5 - monthTargets.FM5)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM6 - monthTargets.FM6)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM8 - monthTargets.FM8)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM9 - monthTargets.FM9)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM10 - monthTargets.FM10)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red', fontWeight: 'bold' }}>{formatNumber(summaryData.puChaoTonPerDay - monthTargets.puChaoTargetPerDay)}</TableCell>
                            <TableCell colSpan={2} style={{ border: '1px solid #aaa', textAlign: 'center', color: '#000' }}>-</TableCell>

                            {/* Wang Noi */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM2 - monthTargets.FM2)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM4 - monthTargets.FM4)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM7 - monthTargets.FM7)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FM11 - monthTargets.FM11)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red' }}>{formatNumber(summaryData.FC - monthTargets.FC)}</TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right', color: 'red', fontWeight: 'bold' }}>{formatNumber(summaryData.wangNoiTonPerDay - monthTargets.wangNoiTargetPerDay)}</TableCell>
                            <TableCell colSpan={2} style={{ border: '1px solid #aaa', textAlign: 'center', color: '#000' }}>-</TableCell>

                            {/* A & Total */}
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                            <TableCell style={{ border: '1px solid #aaa', textAlign: 'right' }}></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProductionReportByMonth;