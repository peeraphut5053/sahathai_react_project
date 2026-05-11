import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const Paper = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '99vw',
    height: '98vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 0.5, 0),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(1),
    zIndex: 2,
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function ModalManagementFullPage(props) {

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
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    return (

        <StyledModal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
                width: '100%',
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
        >

            <Fade in={props.open}>
                <Paper>
                    <CloseButton onClick={props.onClose} color="primary" aria-label="close">
                        <CloseIcon />
                    </CloseButton>
                    <Grid container justifyContent="space-between" spacing={0}>
                        <Grid item>
                            {props.modalHeader}
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" spacing={0}>
                        <Grid item xs={12}>
                            {props.modalDetail}
                        </Grid>

                    </Grid>


                </Paper>
            </Fade>
        </StyledModal>

    );
}
