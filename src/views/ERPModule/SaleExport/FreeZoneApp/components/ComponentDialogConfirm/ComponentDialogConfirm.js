import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Slide, } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ComponentDialogConfirm = props => {

    return (
        <div>
            <Dialog open={props.openDialog} TransitionComponent={Transition} keepMounted onClose={props.handleConfirmClickOpen} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description" >
                <DialogTitle id="alert-dialog-slide-title">{"ยืนยันการสร้างใบขนสินค้า"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">*ตรวจสอบรายการให้ถูกต้อง มีผลต่อสต๊อคละจำนวนสินค้า*</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleConfirmClose} color="primary"> ยกเลิก </Button>
                    <Button onClick={props.ConfirmPost} color="secondary" variant="contained"> ยืนยัน</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};


export default ComponentDialogConfirm;
