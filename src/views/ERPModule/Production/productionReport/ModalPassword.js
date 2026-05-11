import React from 'react'
import { Button, Modal, TextField } from '@mui/material';
import styles from './ProductionReport.module.css';

const ModalPassword = ({open, onClose,setStatusModal}) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

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
  }
  return (
      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
      >
          <div className={styles.passwordPaper}>
		  <h2 className={styles.passwordTitle}>กรุณาใส่ Password</h2>
		  <form onSubmit={handlePassword}>
			<TextField variant='outlined' fullWidth label="Password" name="password" type="password" error={error} value={password}  autoFocus
			  onChange={(e) => setPassword(e.target.value)}
			 />
			<Button
			  className={styles.passwordButton}
			  type="submit"
			  variant="contained"
			  color="primary"
			  size="meldium"
			>
			  Confirm
			</Button>
			<Button className={styles.passwordButton} variant="contained" size="meldium" onClick={onClose} >
			  Cancel
			</Button>
		  </form>
		</div>
      </Modal>
  )
}

export default ModalPassword;
