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


const columns = [
  {
    header: 'เครื่อง',
    accessorKey: 'wc',
    size: 180,
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
      { header: 'Ton', accessorKey: 'OTTon', size: 80 },
      { header: 'Ton/Hrs.', accessorKey: 'OTTonHrs', size: 80 },
      { header: 'Pcs.', accessorKey: 'OTpcs', size: 80 },
      { header: 'Pcs./Hrs.', accessorKey: 'OTpcsHrs', size: 80 },
    ],
  },
];

export default function ProductionOverTimeTable() {
    const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
    const [dayEnd, setDayEnd] = useState(moment().format('YYYY-MM-DD'));
    const { data:test, isLoading, error } = useQuery({
        queryKey: ["Overtime", day,dayEnd],
        queryFn: async () => {
          try {
            // const y = moment(month).format('YYYY');
            //const date = getFirstAndLastDayOfYear(y);
            const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
              params: {
                load: 'OvertimeReport',
                StartDate: day,
                EndDate: dayEnd,
              }
            });

            const res = response.data.map((item) => {
                return {
                    ...item,
                    wc: item.wc + ' ' + item.description,   
                    DayTon: item.DayTon != null && !isNaN(item.DayTon) && Number(item.DayTon) > 0 ? Number(item.DayTon).toFixed(2) : '-',
                    DayTonHrs: item.DayTonHrs != null && !isNaN(item.DayTonHrs) && Number(item.DayTonHrs) > 0 ? Number(item.DayTonHrs).toFixed(2) : '-',
                    DayPcs: item.DayPcs != null && !isNaN(item.DayPcs) && Number(item.DayPcs) > 0 ? Number(item.DayPcs).toLocaleString() : '-',
                    DayPcsHrs: item.DayPcsHrs != null && !isNaN(item.DayPcsHrs) && Number(item.DayPcsHrs) > 0 ? Number(item.DayPcsHrs).toLocaleString() : '-',
                    OTTon: item.OTTon != null && !isNaN(item.OTTon) && Number(item.OTTon) > 0 ? Number(item.OTTon).toFixed(2) : '-',
                    OTTonHrs: item.OTTonHrs != null && !isNaN(item.OTTonHrs) && Number(item.OTTonHrs) > 0 ? Number(item.OTTonHrs).toFixed(2) : '-',
                    OTpcs: item.OTpcs != null && !isNaN(item.OTpcs) && Number(item.OTpcs) > 0 ? Number(item.OTpcs).toLocaleString(): '-',
                    OTpcsHrs: item.OTpcsHrs != null && !isNaN(item.OTpcsHrs) && Number(item.OTpcsHrs) > 0 ? Number(item.OTpcsHrs).toLocaleString() : '-',
                }
            });

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


  return (
    <div style={{ overflowX: 'auto', background: '#f8f9fa', borderRadius: 8, padding: 8 }}>
        <div style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
               <div>
               <DateTimePicker
                  label="StartDate"
                  name="day"
                  value={day}
                  onChange={(e) => setDay(moment(e).format('YYYY-MM-DD'))}
                />
              
               </div>
               <div>
                <DateTimePicker
                  label="EndDate"
                  name="day"
                  value={dayEnd}
                  onChange={(e) => setDayEnd(moment(e).format('YYYY-MM-DD'))}
                />
               </div>
            </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup, rowIndex) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                console.log(header.column.id,rowIndex);
                
                const isMachineHeader = header.column.id === 'wc' && rowIndex === 0;
                if (header.column.id === 'wc' && rowIndex > 0) return null;
                let customStyle = {};
                if (rowIndex === 1 && (header.column.id === 'DayTon' || header.column.id === 'DayTonHrs' || header.column.id === 'DayPcs' || header.column.id === 'DayPcsHrs')) {
                  customStyle = { background: '#FFE484', color: '#000' };
                } else if (rowIndex === 1 && (header.column.id === 'OTTon' || header.column.id === 'OTTonHrs' || header.column.id === 'OTpcs' || header.column.id === 'OTpcsHrs')) {
                    customStyle = { background: '#DBE9FA', color: '#000' };
                } else if (header.column.columnDef.header == 'OT') {
                    customStyle = { background: '#C2DFFF', color: '#000' };
                } else if (header.column.columnDef.header == 'Normal Day') {
                  customStyle = { background: '#FFCC33', color: '#000' };
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
                      verticalAlign: isMachineHeader ? 'middle' : 'bottom',
                      ...customStyle,
                    }}
                    colSpan={header.colSpan}
                    rowSpan={isMachineHeader ? 2 : 1}
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
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{
                    border: '1px solid #e0e0e0',
                    textAlign: 'center',
                    padding: 6,
                    fontSize: 14,
                  }}
                >
                  {cell.getValue() ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}