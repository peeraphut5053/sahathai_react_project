import React from 'react';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import { Chip } from '@mui/material';
import ModalNopaperLGPage from 'src/views/components/ModalNopaperLGPage';
import STS_execRpt_W_byType_Live from './STS_execRpt_W_byType_Live';
import STS_execRpt_W_bySize_Live from './STS_execRpt_W_bySize_Live';
import STS_execRpt_W_bySizeType_Live from './STS_execRpt_W_bySizeType_Live';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))({
    '& .MuiPaper-root': {
        border: '1px solid #d3d4d5',
    },
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        },
    },
}));

export default function MenuChip(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openModalItem, setOpenModalItem] = React.useState(false);
    const [openModalItem2, setOpenModalItem2] = React.useState(false);
    const [openModalItem3, setOpenModalItem3] = React.useState(false);

    const handleCloseModalItem = async () => {
        setOpenModalItem(false);
        setOpenModalItem2(false);
        setOpenModalItem3(false);
    };

    return (
        <span style={{ padding: '0px 3px' }}>
            <ModalNopaperLGPage
                modalHeader={
                    <>รายงาน {`${props.label} By Type`}</>
                }
                modalDetail={
                    <STS_execRpt_W_byType_Live
                        title={`${props.label} By Type`}
                        daystart={props.daystart}
                        dayend={props.dayend}
                    />
                }
                open={openModalItem}
                onClose={handleCloseModalItem}
            />
            <ModalNopaperLGPage
                modalHeader={
                    <>รายงาน {`${props.label} By Size`}</>
                }
                modalDetail={
                    <STS_execRpt_W_bySize_Live
                        title={`${props.label} By Size`}
                        daystart={props.daystart}
                        dayend={props.dayend}
                    />
                }
                open={openModalItem2}
                onClose={handleCloseModalItem}
            />
            <ModalNopaperLGPage
                modalHeader={
                    <>รายงาน {`${props.label} By SizeType`}</>
                }
                modalDetail={
                    <STS_execRpt_W_bySizeType_Live
                        title={`${props.label} By SizeType`}
                        daystart={props.daystart}
                        dayend={props.dayend}
                    />
                }
                open={openModalItem3}
                onClose={handleCloseModalItem}
            />
            <Chip
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
                label={props.label}
            >
            </Chip>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={() => setOpenModalItem(true)}>
                    <ListItemIcon>
                        <Filter1Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={`${props.label} By Type`} />
                </StyledMenuItem >
                <StyledMenuItem onClick={() => setOpenModalItem2(true)}>
                    <ListItemIcon>
                        <Filter2Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={`${props.label} By Size`} />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => setOpenModalItem3(true)}>
                    <ListItemIcon>
                        <Filter3Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={`${props.label} By SizeType`} />
                </StyledMenuItem>
            </StyledMenu>
        </span>
    );
}
