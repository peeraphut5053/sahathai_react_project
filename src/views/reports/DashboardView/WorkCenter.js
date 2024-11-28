import { Button } from '@material-ui/core';
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import API from 'src/views/components/API';
import CloseIcon from '@material-ui/icons/Close';

const WorkCenter = ({wc,onClose}) => {
  const [workCenter, setWorkCenter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = moment().format('YYYY-MM-DD');
        setLoading(true);
        const response = await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=status&date=${date}&wc=${wc}`);
        const data = response.data;
   
        if (data.length > 0) {
            if (data[0].end_date !== null) {
                setStatus(1);
            } else if (data[0].end_date === null) {
                setStatus(2);
            }
            setWorkCenter(data);
        } else {
            setWorkCenter([]);
            setStatus(0);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
  }
fetchData();
  }, [])
  

  const handleMachineStatus = async() => {
    // alert confirm before save
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการเปิดเครื่อง")) {
        try {
            const response = await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=SaveStatus&wc=${wc}`);
            const data = await response.data;
            setWorkCenter(data);
            
            setStatus(2);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
    } 
  }

  const handleMachineClose = async() => {
    // alert confirm before save
    
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการปิดเครื่อง")) {
        try {
            await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=SaveClose&id=${workCenter[0].id}`);
            setStatus(1);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
    } 
  }

  const handleMachineCancel = async() => {
    // alert confirm before save
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการปิดเครื่อง")) {
        try {
            await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=SaveCancel&id=${workCenter[0].id}`);
            setStatus(2);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
    } 
  }
  
    
  return (
    <>
    {!loading ? (
      <div style={{ textAlign: 'center', padding: '20px' }}>
         <div style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px',color: 'red' }}><CloseIcon onClick={onClose} style={{ fontSize: '50px' }} /></div>
      <h1 style={{ marginBottom: '10px' }}>Work Center : {wc}</h1>
      <p style={{ margin: '20px', fontSize: '20px' }} id="simple-modal-description">
        สถานะเครื่อง : {status === 2 ? 'เปิด' : 'ปิด'}
      </p>
      {status === 2 && (
        <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} color="secondary" onClick={handleMachineClose}>ปิดเครื่อง</Button>
      )}
      {status === 0 && (
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} color="primary" onClick={handleMachineStatus}>เปิดเครื่อง</Button>
      )}
      {status === 1 && (
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} color="primary" onClick={handleMachineCancel}>ยกเลิกการปิดเครื่อง</Button>
      )}
    </div>
    ) : (
      <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
    )}
    </>
  )
}

export default WorkCenter