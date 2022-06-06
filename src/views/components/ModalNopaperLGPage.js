import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Backdrop, Button, Fade, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


export default function ModalNopaperLGPage(props) {

    // const classes = makeStyles((theme) => ({
    //     paper: {
    //         position: 'absolute',
    //         width: props.width,
    //         height: props.height,
    //         backgroundColor: theme.palette.background.paper,
    //         border: '0px solid #000',
    //         boxShadow: theme.shadows[5],
    //         padding: theme.spacing(2, 4, 3),
    //     },
    // }));

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 60 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            width: '95vw',
            height: '85vh',
            marginLeft:'20vw',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(0, 0, 0),
        },
    }));

    const classes = useStyles();

    return (

        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
                width: '80%',
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
            className={classes.modal}
        >

            <Fade in={props.open}>
                <div className={classes.paper}>
                    <Grid container justify="space-between" spacing={0}>
                        <Grid item xs={12}>
                            {props.modalDetail}
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </Modal>

    );
}
