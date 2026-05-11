import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from 'src/views/components/API';
import { Card, CardContent, CardHeader, Grid, Button, Chip, Box, Typography, Paper, CircularProgress, Collapse, IconButton } from '@mui/material';
import * as colors from '@mui/material/colors';
import { styled } from '@mui/material/styles';
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
} from '@mui/icons-material';

const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

const ReportCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e8ecef',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        borderRadius: 8,
    },
}));

const Header = styled('div')(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: theme.spacing(4),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const ContentWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const TableContainer = styled('div')(({ theme }) => ({
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #e8ecef',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    [theme.breakpoints.down('sm')]: {
        borderRadius: 8,
        overflowX: 'auto',
    },
}));

const ReportTable = styled('table')(({ theme }) => ({
    width: '100%',
    tableLayout: 'fixed',
    minWidth: 600,
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
        fontWeight: 600,
        textAlign: 'center',
        color: '#1a2a47ff',
        fontFamily: 'Arial, sans-serif',
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
}));

const SortDownIcon = styled(ArrowDownward)(({ theme }) => ({
    marginLeft: theme.spacing(0.5),
    fontSize: '1.1rem',
    verticalAlign: 'middle',
    color: '#667eea',
}));

const SortUpIcon = styled(ArrowUpward)(({ theme }) => ({
    marginLeft: theme.spacing(0.5),
    fontSize: '1.1rem',
    verticalAlign: 'middle',
    color: '#667eea',
}));

const Pagination = styled(Box)(({ theme }) => ({
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
}));

const PaginationText = styled(Typography)(({ theme }) => ({
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#4a5568',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
        textAlign: 'center',
    },
}));

const EmptyState = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10),
    textAlign: 'center',
    color: '#a0aec0',
}));

const LocationCell = styled('span')(({ theme }) => ({
    fontWeight: 600,
    color: '#667eea',
    fontSize: '1.3rem',
    fontFamily: 'Arial, sans-serif',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
}));

const QuantityCell = styled('span')({
    fontWeight: 600,
    color: '#2d3748',
});

const WeightCell = styled('span')({
    fontWeight: 600,
    color: '#1a2a47ff',
});

const ExpandButton = styled(IconButton)(({ theme }) => ({
    padding: 4,
    transition: 'transform 0.2s ease',
    color: '#667eea',
    '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: 2,
    },
}));

const DataRow = styled('tr', {
    shouldForwardProp: (prop) => prop !== 'expanded',
})(({ expanded }) => ({
    ...(expanded && {
        backgroundColor: '#f8f9fa',
    }),
}));

const DetailContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#ffffff',
    borderTop: '2px solid #e8ecef',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const DetailTable = styled('table')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(2),
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid #e8ecef',
    tableLayout: 'fixed',
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
            width: '40%',
            textAlign: 'left',
        },
        '&:nth-child(2)': {
            width: '30%',
        },
        '&:nth-child(3)': {
            width: '30%',
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
        wordWrap: 'break-word',
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
}));

const FloatingButton = styled(Button)(({ theme }) => ({
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
            '& > *:first-of-type': {
                fontSize: '1rem',
            },
        },
    },
}));
const LocationItemReport = () => {
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
    const columns = [
            {
                id: 'expander',
                header: '',
                cell: ({ row }) => (
                    <ExpandButton
                        
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
                    </ExpandButton>
                ),
                size: 60,
            },
            {
                accessorKey: 'loc_group',
                header: 'Location',
                cell: ({ getValue, row }) => (
                    <LocationCell
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
                    </LocationCell>
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
                        <WeightCell>
                            {addComma(value)}
                        </WeightCell>
                    );
                },
            },
            {
                accessorKey: 'qty_FIN',
                header: 'Qty FIN',
                cell: ({ row }) => (
                    <QuantityCell>
                        {row.original.qty_FIN}
                    </QuantityCell>
                ),
            },
            {
                accessorKey: 'weight_ton_FIN',
                header: 'Weight FIN (Ton)',
                cell: ({ row }) => (
                    <WeightCell>
                        {addComma(row.original.weight_ton_FIN)}
                    </WeightCell>
                ),
            },
            {
                accessorKey: 'qty_WIP',
                header: 'Qty WIP',
                cell: ({ row }) => (
                    <QuantityCell>
                        {row.original.qty_WIP}
                    </QuantityCell>
                ),
            },
            {
                accessorKey: 'weight_ton_WIP',
                header: 'Weight WIP (Ton)',
                cell: ({ row }) => (
                    <WeightCell>
                        {addComma(row.original.weight_ton_WIP)}
                    </WeightCell>
                ),
            }
        ];

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
        <Root>
            <ReportCard>
                {/* Header */}
                <Header>
                    <Title>
                        สต๊อกท่อคงคลัง
                    </Title>
                </Header>

                {/* Content */}
                <ContentWrapper>
                    {data.length > 0 ? (
                        <TableContainer>
                            <ReportTable>
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
                                                                <SortDownIcon />
                                                            ) : (
                                                                <SortUpIcon />
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
                                            <DataRow expanded={row.getIsExpanded()}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </DataRow>
                                            {row.getIsExpanded() && (
                                                <tr>
                                                    <td colSpan={row.getVisibleCells().length} style={{ padding: 0 }}>
                                                        <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
                                                            <DetailContainer>
                                                                <Typography variant="h6" style={{ marginBottom: 16, color: '#667eea', fontWeight: 600 }}>
                                                                    รายละเอียดสินค้าใน {row.original.loc_group}
                                                                </Typography>
                                                                {loadingDetails[row.original.loc_group] ? (
                                                                    <Box display="flex" justifyContent="center" padding={3}>
                                                                        <CircularProgress size={40} style={{ color: '#667eea' }} />
                                                                    </Box>
                                                                ) : detailData[row.original.loc_group] && detailData[row.original.loc_group].length > 0 ? (
                                                                    <DetailTable>
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
                                                                    </DetailTable>
                                                                ) : (
                                                                    <Typography style={{ textAlign: 'center', color: '#a0aec0', padding: 16 }}>
                                                                        ไม่มีข้อมูลรายละเอียด
                                                                    </Typography>
                                                                )}
                                                            </DetailContainer>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </ReportTable>

                            {/* Pagination */}
                            <Pagination>
                                <PaginationText>
                                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                                    {Math.min(
                                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                        table.getFilteredRowModel().rows.length
                                    )}{' '}
                                    of {table.getFilteredRowModel().rows.length} entries
                                </PaginationText>

                            </Pagination>
                        </TableContainer>
                    ) : (
                        <EmptyState>
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
                        </EmptyState>
                    )}
                </ContentWrapper>
            </ReportCard>

            {/* Floating Button to Collapse All */}
            {Object.keys(expanded).length > 0 && (
                <FloatingButton
                    onClick={() => setExpanded({})}
                    startIcon={<UnfoldLess />}
                >
                    Back to Summary
                </FloatingButton>
            )}
        </Root>
    );
};

export default LocationItemReport;
