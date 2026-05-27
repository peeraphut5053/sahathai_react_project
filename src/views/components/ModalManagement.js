import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    '@media (max-width: 600px)': {
        padding: '12px',
    },
});

const Paper = styled('div', {
    shouldForwardProp: (prop) => !['clean', 'modalWidth'].includes(prop),
})(({ clean, modalWidth }) => ({
    position: 'relative',
    width: modalWidth || 'clamp(320px, 70vw, 1120px)',
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: clean ? 0 : '20px',
    backgroundColor: clean ? 'transparent' : "#e6e6e6",
    borderBottom: clean ? 'none' : '6px solid #3f51b5',
    borderRadius: clean ? 0 : '5px',
    boxShadow: `0 0 0 50vmax rgba(0,0,0,.5)`,
    outline: 'none',
    '@media (max-width: 1200px)': {
        width: modalWidth || 'calc(100vw - 48px)',
    },
    '@media (max-width: 600px)': {
        maxHeight: 'calc(100vh - 24px)',
        padding: clean ? 0 : '12px',
        width: 'calc(100vw - 24px)',
    },
}));


export default function ModalManagement(props) {
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
                <Paper clean={props.clean} modalWidth={props.width}>
                    {props.modalDetail}
                </Paper>
            </Fade>
        </StyledModal>

    );
}
