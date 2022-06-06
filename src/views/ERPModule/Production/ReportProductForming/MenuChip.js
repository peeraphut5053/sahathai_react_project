import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';

import {
    Button,
    Chip,
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import ModalNopaperLGPage from 'src/views/components/ModalNopaperLGPage';
import STS_execRpt_W_byType_Live from './STS_execRpt_W_byType_Live';
import STS_execRpt_W_bySize_Live from './STS_execRpt_W_bySize_Live';
import STS_execRpt_W_bySizeType_Live from './STS_execRpt_W_bySizeType_Live';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
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
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

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
                        title={`${props.label} By TypeSize`}
                        daystart={props.daystart}
                        dayend={props.dayend}
                    />
                }
                open={openModalItem2}
                onClose={handleCloseModalItem}
            />
            <ModalNopaperLGPage
                modalHeader={
                    <>รายงาน {`${props.label} By Type3`}</>
                }
                modalDetail={
                    <STS_execRpt_W_bySizeType_Live
                        title={`${props.label} By Type3`}
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
