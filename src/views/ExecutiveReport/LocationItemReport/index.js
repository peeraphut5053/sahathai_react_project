import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import API from 'src/views/components/API';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Button,
    makeStyles,
    Chip,
    Box,
    Typography,
    Paper,
    colors,
    CircularProgress,
    Collapse,
    IconButton,
} from '@material-ui/core';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    ArrowUpward,
    ArrowDownward,
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage,
    KeyboardArrowDown,
    KeyboardArrowRight,
    UnfoldLess,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
    card: {
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e8ecef',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            borderRadius: 8,
        },
    },
    header: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: theme.spacing(4),
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.5px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
    },
    contentWrapper: {
        padding: theme.spacing(4),
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    tableContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #e8ecef',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        [theme.breakpoints.down('sm')]: {
            borderRadius: 8,
            overflowX: 'auto', // เพิ่มการเลื่อนแนวนอนเฉพาะบนมือถือ
        },
    },
    table: {
        width: '100%',
        tableLayout: 'fixed',
        minWidth: 600, // กำหนดความกว้างขั้นต่ำเพื่อให้เลื่อนได้บนมือถือ
        '& thead': {
            backgroundColor: '#f8f9fa',
        },
        '& th': {
            color: '#2d3748',
            fontWeight: 700,
            fontSize: '1.5rem',
            padding: theme.spacing(3.5),
            borderBottom: '2px solid #e8ecef',
            cursor: 'pointer',
            userSelect: 'none',
            textAlign: 'center',
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: '#edf2f7',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
                padding: theme.spacing(2),
            },
        },
        '& td': {
            padding: theme.spacing(3.5),
            fontSize: '1.3rem',
            fontWeight: 500,
            textAlign: 'center',
            color: '#1a2a47ff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 600,
            borderBottom: '1px solid #f0f0f0',
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.9rem',
                padding: theme.spacing(2),
            },
        },
        '& tbody tr': {
            transition: 'all 0.2s ease',
            '&:hover': {
                backgroundColor: '#f7fafc',
                transform: 'translateX(4px)',
            },
            '&:last-child td': {
                borderBottom: 'none',
            },
        },
    },
    sortIcon: {
        marginLeft: theme.spacing(0.5),
        fontSize: '1.1rem',
        verticalAlign: 'middle',
        color: '#667eea',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(3),
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e8ecef',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            flexDirection: 'column',
            gap: theme.spacing(2),
        },
    },
    paginationButtons: {
        display: 'flex',
        gap: theme.spacing(1),
        '& button': {
            minWidth: 40,
            height: 40,
            borderRadius: 8,
            transition: 'all 0.2s ease',
            '&:not(:disabled)': {
                backgroundColor: '#ffffff',
                border: '1px solid #e8ecef',
                color: '#667eea',
                '&:hover': {
                    backgroundColor: '#667eea',
                    color: '#ffffff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.25)',
                },
            },
            '&:disabled': {
                backgroundColor: '#f0f0f0',
                color: '#cbd5e0',
                border: '1px solid #e8ecef',
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: 32,
                height: 32,
            },
        },
    },
    paginationText: {
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#4a5568',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
            textAlign: 'center',
        },
    },
    emptyState: {
        padding: theme.spacing(10),
        textAlign: 'center',
        color: '#a0aec0',
    },
    locationCell: {
        fontWeight: 700,
        color: '#667eea',
        fontSize: '1.3rem',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
        },
    },
    quantityCell: {
        fontWeight: 600,
        color: '#2d3748',
    },
    weightCell: {
        fontWeight: 600,
        color: '#1a2a47ff',
    },
    expandButton: {
        padding: 4,
        transition: 'transform 0.2s ease',
        color: '#667eea',
        '&:hover': {
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
        },
        [theme.breakpoints.down('sm')]: {
            padding: 2,
        },
    },
    expandedRow: {
        backgroundColor: '#f8f9fa',
    },
    detailContainer: {
        padding: theme.spacing(3),
        backgroundColor: '#ffffff',
        borderTop: '2px solid #e8ecef',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    detailTable: {
        width: '100%',
        marginTop: theme.spacing(2),
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #e8ecef',
        tableLayout: 'fixed', // กำหนดให้ใช้ fixed layout เพื่อควบคุมความกว้างคอลัมน์
        '& thead': {
            backgroundColor: '#edf2f7',
        },
        '& th': {
            padding: theme.spacing(2),
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#4a5568',
            borderBottom: '1px solid #e8ecef',
            textAlign: 'center',
            '&:first-child': {
                width: '40%', // คอลัมน์ Item ใช้ 60% ของความกว้าง
                textAlign: 'left',
            },
            '&:nth-child(2)': {
                width: '30%', // คอลัมน์ Quantity ใช้ 20%
            },
            '&:nth-child(3)': {
                width: '30%', // คอลัมน์ Weight ใช้ 20%
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.85rem',
                padding: theme.spacing(1.5),
            },
        },
        '& td': {
            padding: theme.spacing(2),
            fontSize: '1rem',
            color: '#2d3748',
            borderBottom: '1px solid #f0f0f0',
            textAlign: 'center',
            wordWrap: 'break-word', // ให้ข้อความยาวๆ ขึ้นบรรทัดใหม่
            '&:first-child': {
                textAlign: 'left',
                paddingLeft: 24,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.8rem',
                padding: theme.spacing(1.5),
                '&:first-child': {
                    paddingLeft: 12,
                },
            },
        },
        '& tbody tr': {
            '&:hover': {
                backgroundColor: '#f7fafc',
            },
            '&:last-child td': {
                borderBottom: 'none',
            },
        },
    },
    floatingButton: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: theme.spacing(2, 3),
        borderRadius: 50,
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        fontWeight: 600,
        fontSize: '0.7rem',
        border: 'none',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
        },
        '&:active': {
            transform: 'translateY(-2px)',
        },
        [theme.breakpoints.down('sm')]: {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            padding: theme.spacing(1.5, 2),
            fontSize: '0.65rem',
            gap: theme.spacing(0.5),
            '& .MuiButton-startIcon': {
                marginRight: 4,
                '& > *:first-child': {
                    fontSize: '1rem',
                },
            },
        },
    },
}));

const LocationItemReport = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [expanded, setExpanded] = useState({});
    const [detailData, setDetailData] = useState({});
    const [loadingDetails, setLoadingDetails] = useState({});

    const addComma = num => {
        return parseFloat(num)
            .toFixed(3)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    useEffect(() => {
        const fetchLocationData = async () => {
            setLoading(true);
            try {
                const response = await API.get('API_ExecutiveReport/data.php?load=GetLocationStock');
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching location data:', error);
            }
        };
        fetchLocationData();
    }, []);

    // Fetch detail data for a specific location
    const fetchLocationDetails = async (locGroup) => {
        if (detailData[locGroup]) {
            return; // Already loaded
        }

        setLoadingDetails(prev => ({ ...prev, [locGroup]: true }));
        try {
            const response = await API.get(`API_ExecutiveReport/data.php?load=GetLocationStockDetail&loc=${encodeURIComponent(locGroup)}`);
            setDetailData(prev => ({ ...prev, [locGroup]: response?.data || [] }));
            setLoadingDetails(prev => ({ ...prev, [locGroup]: false }));
        } catch (error) {
            console.error('Error fetching location details:', error);
            setDetailData(prev => ({ ...prev, [locGroup]: [] }));
            setLoadingDetails(prev => ({ ...prev, [locGroup]: false }));
        }
    };

    // Define table columns
    const columns = useMemo(
        () => [
            {
                id: 'expander',
                header: '',
                cell: ({ row }) => (
                    <IconButton
                        className={classes.expandButton}
                        onClick={() => {
                            const isExpanded = row.getIsExpanded();
                            row.toggleExpanded();
                            if (!isExpanded) {
                                fetchLocationDetails(row.original.loc_group);
                            }
                        }}
                        size="small"
                    >
                        {row.getIsExpanded() ? (
                            <KeyboardArrowDown />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </IconButton>
                ),
                size: 60,
            },
            {
                accessorKey: 'loc_group',
                header: 'Location',
                cell: ({ getValue, row }) => (
                    <span 
                        className={classes.locationCell}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            const isExpanded = row.getIsExpanded();
                            row.toggleExpanded();
                            if (!isExpanded) {
                                fetchLocationDetails(row.original.loc_group);
                            }
                        }}
                    >
                        {getValue()}
                    </span>
                ),
            },
            {
                accessorKey: 'qty',
                header: 'Quantity',
            },
            {
                accessorKey: 'weight_ton',
                header: 'Weight (Ton)',
                cell: ({ row }) => {
                    const value = row.original.weight_ton;
                    return (
                        <span className={classes.weightCell}>
                            {addComma(value)}
                        </span>
                    );
                },
            }
        ],
        [classes]
    );

    // Initialize table
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
            expanded,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                {/* Header */}
                <div className={classes.header}>
                    <Typography className={classes.title}>
                        สต๊อกท่อคงคลัง
                    </Typography>
                </div>

                {/* Content */}
                <div className={classes.contentWrapper}>
                    {data.length > 0 ? (
                        <div className={classes.tableContainer}>
                            <table className={classes.table}>
                                <thead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <th
                                                    key={header.id}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getIsSorted() ? (
                                                            header.column.getIsSorted() === 'desc' ? (
                                                                <ArrowDownward className={classes.sortIcon} />
                                                            ) : (
                                                                <ArrowUpward className={classes.sortIcon} />
                                                            )
                                                        ) : null}
                                                    </Box>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <React.Fragment key={row.id}>
                                            <tr className={row.getIsExpanded() ? classes.expandedRow : ''}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                            {row.getIsExpanded() && (
                                                <tr>
                                                    <td colSpan={row.getVisibleCells().length} style={{ padding: 0 }}>
                                                        <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
                                                            <Box className={classes.detailContainer}>
                                                                <Typography variant="h6" style={{ marginBottom: 16, color: '#667eea', fontWeight: 600 }}>
                                                                    รายละเอียดสินค้าใน {row.original.loc_group}
                                                                </Typography>
                                                                {loadingDetails[row.original.loc_group] ? (
                                                                    <Box display="flex" justifyContent="center" padding={3}>
                                                                        <CircularProgress size={40} style={{ color: '#667eea' }} />
                                                                    </Box>
                                                                ) : detailData[row.original.loc_group] && detailData[row.original.loc_group].length > 0 ? (
                                                                    <table className={classes.detailTable}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Item</th>
                                                                                <th>Quantity</th>
                                                                                <th>Weight (Ton)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {detailData[row.original.loc_group].map((item, idx) => (
                                                                                <tr key={idx}>
                                                                                    <td>{item.item}</td>
                                                                                    <td>{item.qty}</td>
                                                                                    <td>{addComma(item.weight_ton)}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                ) : (
                                                                    <Typography style={{ textAlign: 'center', color: '#a0aec0', padding: 16 }}>
                                                                        ไม่มีข้อมูลรายละเอียด
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <Box className={classes.pagination}>
                                <Typography className={classes.paginationText}>
                                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                                    {Math.min(
                                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                        table.getFilteredRowModel().rows.length
                                    )}{' '}
                                    of {table.getFilteredRowModel().rows.length} entries
                                </Typography>
                               
                            </Box>
                        </div>
                    ) : (
                        <Box className={classes.emptyState}>
                            {loading ? (
                                <>
                                    <CircularProgress size={60} style={{ color: '#667eea' }} />
                                    <Typography variant="h6" style={{ marginTop: 16, color: '#4a5568' }}>
                                        Loading...
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h6">
                                    No data available
                                </Typography>
                            )}
                        </Box>
                    )}
                </div>
            </Card>

            {/* Floating Button to Collapse All */}
            {Object.keys(expanded).length > 0 && (
                <Button
                    className={classes.floatingButton}
                    onClick={() => setExpanded({})}
                    startIcon={<UnfoldLess />}
                >
                    Back to Summary
                </Button>
            )}
        </div>
    );
};

export default LocationItemReport;
