import React from 'react';
import { Button, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './ProductionReport.module.css';

const ModalPassword = ({ open, onClose, setStatusModal }) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleClose = () => {
    setError(false);
    setPassword('');
    onClose();
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setError(false);
      onClose();
      setStatusModal(true);
      setPassword('');
    } else {
      setError(true);
      setPassword('');
      return false;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="password-modal-title"
      aria-describedby="password-modal-description"
      className={styles.passwordModal}
    >
      <div className={styles.passwordPaper}>
        <IconButton
          aria-label="close"
          className={styles.passwordCloseButton}
          onClick={handleClose}
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
        <div className={styles.passwordHeader}>
          <div className={styles.passwordIcon}>
            <LockOutlinedIcon />
          </div>
          <div>
            <Typography className={styles.passwordEyebrow}>
              Security check
            </Typography>
            <Typography className={styles.passwordTitle} id="password-modal-title">
              กรุณาใส่ Password
            </Typography>
            <Typography className={styles.passwordDescription} id="password-modal-description">
              ยืนยันสิทธิ์ก่อนปรับเปลี่ยนสถานะเครื่อง
            </Typography>
          </div>
        </div>
        <form className={styles.passwordForm} onSubmit={handlePassword}>
          <TextField
            autoFocus
            error={error}
            fullWidth
            helperText={error ? 'Password ไม่ถูกต้อง' : ' '}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            label="Password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) {
                setError(false);
              }
            }}
            size="small"
            type="password"
            value={password}
            variant="outlined"
          />
          <div className={styles.passwordActions}>
            <Button color="inherit" onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button color="primary" disabled={!password} type="submit" variant="contained">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalPassword;
