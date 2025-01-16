import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import React from 'react'
import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  }
}));


const WorkCenterStatus = ({wc, status, sum,piece, reason, name,time, size, onClose}) => {
 const classes = useStyles();
 
 const timeDiff = Math.abs(moment(time?.date).diff(moment(), 'minutes'));


  return (
    <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom: '20px', borderRadius: '10px'}}>
      <div style={{ cursor: 'pointer', position: 'absolute', top: '0px', right: '0px',color: 'red' }}><CloseIcon onClick={onClose} style={{ fontSize: '50px' }} /></div>
      <h1 style={{ marginTop: '25px' }}>{wc} ({name})</h1>
      <p style={{ margin: '25px', fontSize: '30px', color: `red` }} id="simple-modal-description">
        สถานะเครื่อง : {status === 'green' ? 'เปิด' : status === 'red' ? 'ปิด' : `${reason} (หยุดไปแล้ว ${timeDiff} นาที)`} 
      </p>
      <div style={{ margin: '25px', fontSize: '30px' }}>Size: {size}</div>
      <div className={classes.root}>
        <div>
           <p style={{fontSize: '30px', fontWeight: 'bold', }} id="simple-modal-description">
            Daily Production :
          </p>
        </div>
         <div className={classes.box}>
         <p style={{ fontSize: '30px', fontWeight: 'bold', }} id="simple-modal-description">
            Weight = {sum} Tons
          </p>
           {wc !== 'P1SL03' && wc !== 'P1SL05' && wc !== 'W1SL04' && 
            <p style={{ fontSize: '30px', fontWeight: 'bold', }} id="simple-modal-description"> Pieces = {(Number(piece)).toLocaleString()} Pieces</p>
           }
         </div>
      </div>
    </div>
  )
}

export default WorkCenterStatus