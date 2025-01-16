import React, {  useState,useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  Chip
} from '@material-ui/core';
import moment from 'moment';
import MaterialTable  from 'material-table';
import tableIcons from '../../../views/components/table/tableIcons';

const titleGroup = [
    {
    group: 'Forming',
    title: ['จานเก็บเหล็ก', 'ฟอร์มมิ่ง', 'แท่นเลื่อย', 'รางคอนเวนเยอร์', 'เครื่องดัดทรง', 'เครื่องคว้านหัว',  'เครื่องเทสน้ำ', 'อื่นๆ']
    },
    {
    group: 'Painting',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'ปรับหัวพ่นสี', 'เปลี่ยนไซส์', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'Threading',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'เปลี่ยน / ปรับใบมีด (ไม่ได้เปลี่ยนไซส์)', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'Slit',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนใบมีดระหว่างรายการ (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'รอเหล็กม้วนเข้าท่าเรือ (มีออเดอร์อยู่แล้ว)', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'HydroTest',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'Galvanize',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'Groove',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'Cuting',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
    {
    group: 'Packing',
    title: ['เครื่องจักรมีปัญหา / เสีย', 'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)', 'เปลี่ยนไซส์', 'ระบบไฟฟ้าภายในโรงงานดับ', 'ทำความสะอาดเครื่องจักร', 'ระบบอินเตอร์เน็ต', 'อื่น ๆ']
    },
];

const TableStopReason = ({reasonData,wc,group, month}) => {
  const [workCenter, setWorkCenter] = useState(wc[0]);
  const [data, setData] = useState(reasonData.filter(item => workCenter.includes(item.w_c)));

  const totalTime = useMemo(() => {
    if (group === 'Forming') {
      const time = data.reduce((acc, item) => acc + item.time_used, 0);
      return time;
    } else {
      const time = data.reduce((acc, item) => acc + item.down_time, 0);
      return time;
    }
  });

  const dailySummary = useMemo(() => {
    const summary = {};
    let startDate;
    
    if(group === 'Forming') {
    data.forEach(item => {
      const date = item.create_date.split(' ')[0];
      startDate = item.create_date.split(' ')[0];
      if (!summary[date]) {
        summary[date] = {};
      }
      
      if (!summary[date][item.reason_id]) {
        summary[date][item.reason_id] = {
          count: 0,
          totalTime: 0,
          details: []
        };
      }
      
      summary[date][item.reason_id].count += 1;
      summary[date][item.reason_id].totalTime += item.time_used;
      summary[date][item.reason_id].details.push({
        detail: item.reason_detail_id,
        time: item.time_used
      });
    });
 } else {
    data.forEach(item => {
        const date = item.created_date.split(' ')[0];
        startDate = item.created_date.split(' ')[0];
        if (!summary[date]) {
          summary[date] = {};
        }
        
        if (!summary[date][item.reason]) {
          summary[date][item.reason] = {
            count: 0,
            totalTime: 0,
            details: []
          };
        }
        
        summary[date][item.reason].count += 1;
        summary[date][item.reason].totalTime += item.down_time;
        summary[date][item.reason].details.push({
          detail: item.reason,
          time: item.down_time
        });
      });
  }

    // fill missing days of the month with empty data in summary
 
    
    const firstDay = moment(startDate).startOf('month');
const lastDay = moment(startDate).endOf('month');

let currentDate = firstDay.clone(); // clone ตัวแรก

while (currentDate.isSameOrBefore(lastDay)) {
    const date = currentDate.format('YYYY-MM-DD');
    if (!summary[date]) {
        summary[date] = {};
    }
    currentDate = currentDate.clone().add(1, 'day'); // clone ก่อน add
}
    return summary;
  }, [data]);
  

    const title = titleGroup.find(t => t.group === group).title;
    

    const handleData = (workCenter) => {
         setWorkCenter(workCenter);
         setData(reasonData.filter(item => workCenter.includes(item.w_c)));
    }

  const newData = Object.keys(dailySummary).map(date => {
    const reasons = dailySummary[date];
    const rowData = {
      date,
      ...reasons
    };
    return rowData;
  })


  return (
    <Container maxWidth={false}>
      <Typography variant="h4" style={{ margin: '10px', textAlign: 'center' }}>
        รายงานบันทึกการหยุดเครื่อง
      </Typography>
      {wc && wc.map((item) => (
         // add onClick event to change workCenter
        <Chip
            key={item}
            label={item}
            color={workCenter.includes(item) ? 'primary' : 'default'}
            style={{ margin: '5px' }}
            clickable
            onClick={() => handleData(item)}
            />
       )
      )}
      <Grid container spacing={1}>
            <Grid item style={{ width: '100%', margin: 5, overflowX: 'auto' }}>
              <MaterialTable
                icons={tableIcons}
                title={<Typography variant="h4">{`เวลารวมนาทีหยุดไป ${Number(totalTime).toLocaleString()} นาที  เวลารวมชั่วโมงหยุดไป ${(totalTime / 60).toFixed(1)} ชั่วโมง`}</Typography>}
                columns={[
                  { title: 'วันที่', field: 'date', type: 'date', defaultSort: 'asc', render: rowData => moment(rowData.date).format('DD/MM/YYYY') },
                  { title: 'รวมเวลาหยุดนาที', field: '', type: 'date',
                     cellStyle: { backgroundColor: '#EEE', padding: '10px',  textAlign: 'center',
                      fontSize: '12px', },
                     render: rowData => {
                        let total = 0;
                        title.forEach(t => {
                            total += rowData[t] ? rowData[t].totalTime : 0;
                        });
                        return total;
                    }},
                    { title: 'รวมเวลาหยุดชั่วโมง', field: '', type: 'date', 
                      cellStyle: { backgroundColor: '#EEE', padding: '10px', textAlign: 'center',
                        fontSize: '12px', },
                      render: rowData => {
                        let total = 0;
                        title.forEach(t => {
                            total += rowData[t] ? rowData[t].totalTime : 0;
                        });
                        return (total / 60).toFixed(1);
                    }},
                    ...title.map((t, index) => ({
                        title: t,
                        field: `${t}.totalTime`,
                        type: 'numeric',
                        render: rowData => rowData[t] ? rowData[t].totalTime : '-'
                    })),
                ]}
                 // how to use dailySummary with MaterialTable
                data={newData}
                options={{
                  search: true,
                  paging: false,
                  sorting: true,
                  filtering: false,
                  exportButton: true,
                  minWidth: 200,
                  doubleHorizontalScroll: true,
                  maxBodyHeight: '70vh',
                  minBodyHeight: '70vh',
                  headerStyle: {
                    backgroundColor: '#039be5',
                    border: '2px solid white',
                    color: '#FFF',
                    textAlign: 'center',
                    fontSize: '12px'
                  },
                  cellStyle: {
                    textAlign: 'center',
                    fontSize: '12px',
                    padding: '5px',
                  },
                  rowStyle: rowData => ({
                    // get current date from moment
                    backgroundColor: rowData.date === moment().format('YYYY-MM-DD') ? '#EEE' : '#FFF',
                  })
                }}
              />
            </Grid>
          </Grid>
    </Container>
  );
};

export default TableStopReason;