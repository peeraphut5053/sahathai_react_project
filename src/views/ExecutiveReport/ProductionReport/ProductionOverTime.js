import React, { useState } from 'react';
import { useQuery } from "react-query";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import API from 'src/views/components/API';
import DateTimePicker from 'src/views/components/Input/CDatePicker';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button, CircularProgress } from '@material-ui/core';


const columns = [
    {
        header: 'เครื่อง',
        accessorKey: 'wc',
        size: 150,
    },
    {
        header: 'Description',
        accessorKey: 'description',
        size: 150,
    },
    {
        header: 'Normal Day',
        columns: [
            { header: 'Ton', accessorKey: 'DayTon', size: 80, },
            { header: 'Ton/Hrs.', accessorKey: 'DayTonHrs', size: 80 },
            { header: 'Pcs.', accessorKey: 'DayPcs', size: 80 },
            { header: 'Pcs./Hrs.', accessorKey: 'DayPcsHrs', size: 80 },
        ],
    },
    {
        header: 'OT',
        columns: [
            { header: 'Ton', accessorKey: 'OTton', size: 80 },
            { header: 'Ton/Hrs.', accessorKey: 'OTtonHrs', size: 80 },
            { header: 'Pcs.', accessorKey: 'OTpcs', size: 80 },
            { header: 'Pcs./Hrs.', accessorKey: 'OTpcsHrs', size: 80 },
        ],
    },
    {
        header: 'Total Time (hr:min)',
        accessorKey: 'work_hour',
        size: 40,
    },
    {
        header: 'Downtime (hr:min)',
        accessorKey: 'stop_hour',
        size: 40,
    },
    {
        header: 'Actual Time (hr:min)',
        accessorKey: 'TOT_work_hour',
        size: 40,
    },
];

export default function ProductionOverTimeTable() {
    const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
    const [dayEnd, setDayEnd] = useState(moment().format('YYYY-MM-DD'));
    const { data: test, isLoading, error } = useQuery({
        queryKey: ["Overtime", day],
        queryFn: async () => {
            try {
                // const y = moment(month).format('YYYY');
                //const date = getFirstAndLastDayOfYear(y);
                const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
                    params: {
                        load: 'OvertimeReport',
                        StartDate: day,
                        EndDate: day,
                    }
                });

                const wcList = [["P2FM01", "สถานี Forming 01"], ["P2FM05", "สถานี Forming 05"], ["P2FM06", "สถานี Forming 06"], ["P2FM08", "สถานี Forming 08"], ["P2FM09", "สถานี Forming 09"],["P2FM10", "สถานี Forming 10"], ["W2FM02", "สถานี Forming 02"], ["W2FM04", "สถานี Forming 04"], ["W2FM07", "สถานี Forming 07"],["W2FM11", "สถานี Forming 11 วังน้อย"], ["W2FMC1", "สถานีตัวซีเครื่อง 1"],["P1SL03", "สถานี Slit 03"], ["P1SL05", "สถานี Slit 05"], ["W1SL04", "สถานี Slit 04 วังน้อย"],["P5HTF2", "สถานีเทสน้ำ F2"], ["P5HTF5", "สถานีเทสน้ำ F5"], ["P5HTO1", " สถานีเทสน้ำ O1 A6"], ["P5HTO2", "สถานีเทสน้ำ O2 A6"], ["W5HT02", "สถานีเทสน้ำ 02 วังน้อย"], ["W5HT04", "สถานีเทสน้ำ 04 วังน้อย"], ["W5HT06", "สถานีเทสน้ำ 06 วังน้อย"],["P6GL01", "สถานีชุป 01"],["P6PT01", "สถานีพ่นสี 01"], ["P6PT0B", "สถานีพ่นสี B"], ["P6PT0C", "สถานีพ่นสี C"],["P6TH01", "สถานนีต๊าป 01"], ["P6TH02", "สถานนีต๊าป 02"], ["P6TH03", "สถานนีต๊าป 03"], ["P6TH05", "สถานนีต๊าป 05"],["P6RG01", "สถานี Groove 1"], ["P6RG02", "สถานี Groove 2"], ["W6RG02", "สถานี Groove 2 วังน้อย"],["P6CT01", "สถานีตัดแบ่งความยาว No.1"], ["P6CT02", "สถานีตัดแบ่งความยาว No.2"], ["P6CT03", "สถานีตัดแบ่งความยาว No.3 เลเซอร์"], ["W6CT01", "สถานีตัดท่อ"],["P7PK00", "สถานีแพ๊ค"], ["P7PKP1", "สถานีแพ๊ค ท้ายเครื่องพ่นสี 1"], ["P7PKPB", "สถานีแพ๊คท้ายเครื่องพ่นสี PB"], ["P7PKPC", "สถานีแพ๊คท้ายเครื่องพ่นสี PC"], ["W7PK01", "สถานีแพ็ควังน้อย"]];

                const res = wcList.map(([wc, description]) => {
                    const foundItem = response.data.find(item => item.wc === wc);
                    
                    if (foundItem) {
                        return {
                            ...foundItem,
                            DayTon: foundItem.DayTon != null && !isNaN(foundItem.DayTon) && Number(foundItem.DayTon) > 0 ? Number(foundItem.DayTon).toFixed(2) : '-',
                            DayTonHrs: foundItem.DayTonHrs != null && !isNaN(foundItem.DayTonHrs) && Number(foundItem.DayTonHrs) > 0 ? Number(foundItem.DayTonHrs).toFixed(2) : '-',
                            DayPcs: foundItem.DayPcs != null && !isNaN(foundItem.DayPcs) && Number(foundItem.DayPcs) > 0 ? Number(foundItem.DayPcs).toLocaleString() : '-',
                            DayPcsHrs: foundItem.DayPcsHrs != null && !isNaN(foundItem.DayPcsHrs) && Number(foundItem.DayPcsHrs) > 0 ? Number(foundItem.DayPcsHrs).toLocaleString() : '-',
                            OTton: foundItem.OTton != null && !isNaN(foundItem.OTton) && Number(foundItem.OTton) > 0 ? Number(foundItem.OTton).toFixed(2) : '-',
                            OTtonHrs: foundItem.OTtonHrs != null && !isNaN(foundItem.OTtonHrs) && Number(foundItem.OTtonHrs) > 0 ? Number(foundItem.OTtonHrs).toFixed(2) : '-',
                            OTpcs: foundItem.OTpcs != null && !isNaN(foundItem.OTpcs) && Number(foundItem.OTpcs) > 0 ? Number(foundItem.OTpcs).toLocaleString() : '-',
                            OTpcsHrs: foundItem.OTpcsHrs != null && !isNaN(foundItem.OTpcsHrs) && Number(foundItem.OTpcsHrs) > 0 ? Number(foundItem.OTpcsHrs).toLocaleString() : '-',
                        };
                    } else {
                        return {
                            wc,
                            description,
                            DayTon: '-',
                            DayTonHrs: '-',
                            DayPcs: '-',
                            DayPcsHrs: '-',
                            OTton: '-',
                            OTtonHrs: '-',
                            OTpcs: '-',
                            OTpcsHrs: '-',
                            work_hour: '08:00',
                            stop_hour: '00:00',
                            TOT_work_hour: '00:00'
                        };
                    }
                });

                res.sort((a, b) => a.wc.localeCompare(b.wc));

                return res;

            } catch (error) {
                console.log('error', error);
            }
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
    const table = useReactTable({
        data: test ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    function exportToExcel() {
        // สร้าง header 2 ชั้น
        const header1 = [
            'เครื่อง',
            'Description',
            'Normal Day', '', '', '',
            'OT', '', '', '',
            'Total Time (hr:min)',
            'Downtime (hr:min)',
            'Total Hour'
        ];
        const header2 = [
            '',
            '',
            'Ton', 'Ton/Hrs.', 'Pcs.', 'Pcs./Hrs.',
            'Ton', 'Ton/Hrs.', 'Pcs.', 'Pcs./Hrs.',
            '',
            '',
            ''
        ];

        // map ข้อมูลแถว
        const rows = (test ?? []).map(item => [
            item.wc,
            item.description,
            item.DayTon,
            item.DayTonHrs,
            item.DayPcs,
            item.DayPcsHrs,
            item.OTton,
            item.OTtonHrs,
            item.OTpcs,
            item.OTpcsHrs,
            item.work_hour,
            item.stop_hour,
            item.TOT_work_hour
        ]);
        // รวม header กับข้อมูล
        const wsData = [header1, header2, ...rows];

        // สร้าง worksheet และ workbook
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');

        // Export
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `ProductionOverTime ${day}-${dayEnd}.xlsx`);
    }

    return (
        <div style={{ overflowX: 'auto', background: '#f8f9fa', borderRadius: 8, padding: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
               <div>
                    <DateTimePicker
                        label="วันที่"
                        name="day"
                        value={day}
                        onChange={(e) => setDay(moment(e).format('YYYY-MM-DD'))}
                    />

                </div>
                {/*<div>
                    <DateTimePicker
                        label="EndDate"
                        name="day"
                        value={dayEnd}
                        onChange={(e) => setDayEnd(moment(e).format('YYYY-MM-DD'))}
                    />
                </div>*/}
               </div>
                <div>
                    <Button variant='contained' style={{backgroundColor: 'green', color: 'white'}} onClick={exportToExcel}>Export to Excel</Button>
                </div>
            </div>
            {isLoading ? (
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                 <CircularProgress style={{ color: 'red' }} />
               </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup, rowIndex) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isMachineHeader = header.column.id === 'wc' && rowIndex === 0;
                                if (header.column.id === 'wc' && rowIndex > 0) return null;
                                const isWorkHeader = header.column.id === 'work_hour' && rowIndex === 0;
                                if (header.column.id === 'work_hour' && rowIndex > 0) return null;
                                const isWorkDes = header.column.id === 'description' && rowIndex === 0;
                                if (header.column.id === 'description' && rowIndex > 0) return null;
                                const isStopHeader = header.column.id === 'stop_hour' && rowIndex === 0;
                                if (header.column.id === 'stop_hour' && rowIndex > 0) return null;
                                const isTotalHeader = header.column.id === 'TOT_work_hour' && rowIndex === 0;
                                if (header.column.id === 'TOT_work_hour' && rowIndex > 0) return null;
                                let customStyle = {};
                                if (rowIndex === 1 && (header.column.id === 'DayTon' || header.column.id === 'OTton')) {
                                    customStyle = { background: 'white', color: 'black' };
                                } else if (rowIndex === 1 && (header.column.id === 'DayTonHrs' || header.column.id === 'OTtonHrs')) {
                                    customStyle = { background: '#fff5ed', color: '#000' };
                                } else if (rowIndex === 1 && (header.column.id === 'DayPcs' || header.column.id === 'OTpcs')) {
                                    customStyle = { background: 'white', color: 'black' };
                                } else if (rowIndex === 1 && (header.column.id === 'DayPcsHrs' || header.column.id === 'OTpcsHrs')) {
                                    customStyle = { background: '#ebece7', color: '#000' };
                                } else if (header.column.columnDef.header == 'OT') {
                                    customStyle = { background: '#C2DFFF', color: '#000' };
                                } else if (header.column.columnDef.header == 'Normal Day') {
                                    customStyle = { background: '#FFCC33', color: '#000' };
                                } else if (header.column.columnDef.header == 'Total Time (hr:min)') {
                                    customStyle = { background: '#92cea8', color: '#000' };
                                } else if (header.column.columnDef.header == 'Downtime (hr:min)') {
                                    customStyle = { background: '#f6c6c7', color: '#000' };
                                }  else if (header.column.columnDef.header == 'Actual Time (hr:min)') {
                                    customStyle = { background: '#8bd2ec', color: '#000' };
                                } else {
                                    customStyle = { background: '#039be5', color: '#fff' };
                                }
                                return (
                                    <th
                                        key={header.id}
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            textAlign: 'center',
                                            padding: 8,
                                            fontWeight: 600,
                                            fontSize: 14,
                                            fontWeight: '900',
                                            minWidth: header.column.columnDef.size,
                                            verticalAlign: isMachineHeader || isWorkHeader || isStopHeader || isTotalHeader || isWorkDes ? 'middle' : 'bottom',
                                            ...customStyle,
                                        }}
                                        colSpan={header.colSpan}
                                        rowSpan={isMachineHeader || isWorkHeader || isStopHeader || isTotalHeader || isWorkDes  ? 2 : 1}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                let customStyle = {};
                                if (cell.column.id === 'DayTonHrs' || cell.column.id === 'OTtonHrs') {
                                    customStyle = { background: '#fff5ed', color: 'red' };
                                } //else if (cell.column.id === 'DayTon' || cell.column.id === 'OTton') {
                                    //customStyle = { background: '#ddff99', color: '#000' };
                                //} //else if (cell.column.id === 'DayPcs' || cell.column.id === 'OTpcs') {
                                   // customStyle = { background: '#99ffff', color: '#000' };
                                 else if (cell.column.id === 'DayPcsHrs' || cell.column.id === 'OTpcsHrs') {
                                    customStyle = { background: '#ebece7', color: 'blue' };
                                } 

                                return (
                                    <td
                                        key={cell.id}
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            textAlign: 'center',
                                            padding: 6,
                                            fontSize: 14,
                                            ...customStyle
                                        }}
                                    >
                                        {cell.getValue() ?? '-'}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
}