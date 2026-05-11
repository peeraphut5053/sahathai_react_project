import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const Paper = styled('div')({
    position: 'absolute',
    width: '70%',
    padding: '20px',
    backgroundColor: "#e6e6e6",
    borderBottom: '6px solid #3f51b5',
    borderRadius: '5px',
    boxShadow: `0 0 0 50vmax rgba(0,0,0,.5)`,
    outline: 'none',
});

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
}));


export default function ModalManagement(props) {

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
                    {props.modalDetail}
                </Paper>
            </Fade>
        </StyledModal>

    );
}
