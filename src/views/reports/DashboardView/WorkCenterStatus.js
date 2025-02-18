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


const WorkCenterStatus = ({wc, status, sum,piece, reason, name,time, size, onClose,totalTime,totalStop,operationSpeed, operationTime}) => {
 const classes = useStyles();
 
 const timeDiff = Math.abs(moment(time?.date).diff(moment(), 'minutes'));

 const total =timeDiff + totalTime;

 const stop = status === 'yellow' ? totalStop + 1 : totalStop;

  return (
    <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom: '20px', borderRadius: '10px'}}>
      <div style={{ cursor: 'pointer', position: 'absolute', top: '0px', right: '0px',color: 'red' }}><CloseIcon onClick={onClose} style={{ fontSize: '50px' }} /></div>
      <h1 style={{ marginTop: '10px' }}>{wc} ({name})</h1>
      <p style={{ margin: '10px', fontSize: '30px', color: `red` }} id="simple-modal-description">
        สถานะเครื่อง : {status === 'green' ? 'เปิด' : status === 'red' ? 'ปิด' : `${reason} (หยุดไปแล้ว ${timeDiff} นาที)`} 
      </p>
      <p style={{ margin: '10px', fontSize: '30px', color: `red` }} id="simple-modal-description">
        รวมหยุดวันนี้ {total} นาที {stop ? stop: 0} ครั้ง 
      </p>
      <div style={{ margin: '5px', fontSize: '30px' }}>Size: {size}</div>
      <div className={classes.root}>
        <div>
           <p style={{ margin: '15px', fontSize: '35px', fontWeight: 'bold', color: `blue` }} id="simple-modal-description">
            Daily Production : {sum} Tons { wc !== 'P1SL03' && wc !== 'P1SL05' && wc !== 'W1SL04' && <span>| {piece} Pieces</span>}
          </p>
      
           <p style={{fontSize: '30px', fontWeight: 'bold', }} id="simple-modal-description">
            { wc == 'P2FM01' || wc == 'P2FM05' || wc == 'P2FM06' || wc == 'P2FM08' || wc == 'P2FM09' || wc == 'W2FM02' || wc == 'W2FM04' || wc == 'W2FM07' || wc == 'W2FMC1' ? <span>ความเร็วในการเดินเครื่อง : {operationSpeed} | เดินเครื่องจริง: {operationTime}</span> : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WorkCenterStatus