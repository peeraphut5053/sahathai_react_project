import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import moment from "moment";


const ShiftSelect = (props) => {

 

    return (
        <Menu
            id="long-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                style: {
                    maxHeight: 48 * 4.5,
                    width: '30ch',
                },
            }}
        >
            <MenuItem onClick={
                e => {
                    props.setFieldValue('startdate', moment('08:00:00', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
                    props.setFieldValue('enddate', moment('17:00:00', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
                    props.setAnchorEl(null);
                }
            }>กะเช้า(Morning shift)</MenuItem>
            <MenuItem onClick={
                e => {
                    props.setFieldValue('startdate', moment('08:00:00', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
                    props.setFieldValue('enddate', moment('21:00:00', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
                    props.setAnchorEl(null);
                }
            }>กะเช้า(Morning shift + overtime)</MenuItem>
            <MenuItem onClick={
                e => {
                    props.setFieldValue('startdate', moment('17:00:00', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
                    props.setFieldValue('enddate', moment('23:59:59', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
                    props.setAnchorEl(null);
                }
            }>กะดึก(Night shift)</MenuItem>
        </Menu>
    );
};
export default ShiftSelect
