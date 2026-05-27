import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ReplayIcon from '@mui/icons-material/Replay';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import moment from 'moment';
import API from 'src/views/components/API';
import styles from './WorkCenter.module.css';

const getStatusMeta = (status) => {
  if (status === 2) {
    return {
      actionLabel: 'ปิดเครื่อง',
      buttonClass: styles.stopButton,
      icon: <StopCircleOutlinedIcon />,
      label: 'เปิด',
      panelClass: styles.open,
      subtitle: 'เครื่องกำลังเปิดใช้งาน'
    };
  }

  if (status === 1) {
    return {
      actionLabel: 'ยกเลิกการปิดเครื่อง',
      buttonClass: styles.startButton,
      icon: <ReplayIcon />,
      label: 'ปิด',
      panelClass: styles.closed,
      subtitle: 'เครื่องถูกปิดแล้ว'
    };
  }

  return {
    actionLabel: 'เปิดเครื่อง',
    buttonClass: styles.startButton,
    icon: <PowerSettingsNewIcon />,
    label: 'ยังไม่เปิด',
    panelClass: styles.idle,
    subtitle: 'ยังไม่มีสถานะการเปิดเครื่องวันนี้'
  };
};

const WorkCenter = ({ wc, onClose }) => {
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
    };

    fetchData();
  }, [wc]);

  const handleMachineStatus = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการเปิดเครื่อง')) {
      try {
        const response = await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=SaveStatus&wc=${wc}`);
        const data = await response.data;
        setWorkCenter(data);
        setStatus(2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleMachineClose = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการปิดเครื่อง')) {
      try {
        await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=SaveClose&id=${workCenter[0].id}`);
        setStatus(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleMachineCancel = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการปิดเครื่อง')) {
      try {
        await API.get(`RPT_QC_Lab_Tag_Detail/data.php?load=SaveCancel&id=${workCenter[0].id}`);
        setStatus(2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const statusMeta = getStatusMeta(status);

  const handleAction = () => {
    if (status === 2) {
      handleMachineClose();
      return;
    }

    if (status === 1) {
      handleMachineCancel();
      return;
    }

    handleMachineStatus();
  };

  return (
    <section>
      <IconButton
        aria-label="close"
        className={styles.closeButton}
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          color: 'text.secondary',
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {loading ? (
        <div className={styles.loading}>
          <CircularProgress size={32} />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              {statusMeta.icon}
            </div>
            <div className={styles.headerCopy}>
              <p className={styles.eyebrow}>Machine status</p>
              <h2 className={styles.title}>ปรับเปลี่ยนสถานะเครื่อง</h2>
              <p className={styles.description}>Work Center {wc}</p>
            </div>
          </div>

          <div className={`${styles.statusCard} ${statusMeta.panelClass}`} id="simple-modal-description">
            <div>
              <p className={styles.statusLabel}>สถานะเครื่อง : {statusMeta.label}</p>
              <p className={styles.statusSubtext}>{statusMeta.subtitle}</p>
            </div>
            <div className={styles.wcBadge}>
              <span>WC</span>
              <strong>{wc}</strong>
            </div>
          </div>

          <div className={styles.actionArea}>
            <p>ระบบจะขอให้ยืนยันก่อนบันทึกสถานะเครื่อง</p>
            <Button
              className={statusMeta.buttonClass}
              fullWidth
              onClick={handleAction}
              startIcon={statusMeta.icon}
              variant="contained"
            >
              {statusMeta.actionLabel}
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default WorkCenter;
