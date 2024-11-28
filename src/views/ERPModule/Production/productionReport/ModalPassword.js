import React from 'react'
import { Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      borderRadius: '10px',
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2, 4, 3),
      top: '35%',
      left: '38%'
    },
    h2: {
      textAlign: 'center',
      paddingBottom: '20px'
  
    },
    btn: {
      marginTop: '20px',
      marginRight: '10px'
    }
  
}));

const ModalPassword = ({open, onClose,setStatusModal}) => {
  const classes = useStyles();
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
          <div className={classes.paper}>
		  <h2 className={classes.h2}>กรุณาใส่ Password</h2>
		  <form onSubmit={handlePassword}>
			<TextField variant='outlined' fullWidth label="Password" name="password" type="password" error={error} value={password}  autoFocus
			  onChange={(e) => setPassword(e.target.value)}
			 />
			<Button
			  className={classes.btn}
			  type="submit"
			  variant="contained"
			  color="primary"
			  size="meldium"
			>
			  Confirm
			</Button>
			<Button className={classes.btn} variant="contained" size="meldium" onClick={onClose} >
			  Cancel
			</Button>
		  </form>
		</div>
      </Modal>
  )
}

export default ModalPassword;