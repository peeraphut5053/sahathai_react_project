import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from 'src/mui/MuiPickersCompat';
import moment from "moment";
import MomentUtils from "@date-io/moment";

moment.locale("th");

const compactDateTimeTextField = {
    fullWidth: true,
    size: 'small',
    sx: {
        minWidth: 230,
        '& .MuiOutlinedInput-root': {
            height: 40,
            paddingRight: '6px',
        },
        '& .MuiOutlinedInput-input': {
            minWidth: 0,
            padding: '8.5px 4px 8.5px 12px',
            fontSize: 14,
        },
        '& .MuiInputAdornment-root': {
            marginLeft: 0,
        },
        '& .MuiIconButton-root': {
            padding: 4,
        },
        '& .MuiSvgIcon-root': {
            fontSize: 20,
        },
    },
};

const DateTimePicker = (props) => {

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            <KeyboardDateTimePicker
                variant="outlined"
                inputVariant="outlined"
                ampm={false}
                label={props.label}
                name={props.name}
                value={props.value}
                onBlur={props.handleBlur}
                onChange={props.onChange}
                onError={console.log}
                slotProps={{
                    textField: compactDateTimeTextField,
                }}
                format="YYYY-MM-DD HH:mm:ss"
                type="text"
                fullWidth
            />
        </MuiPickersUtilsProvider>


    );
};
export default DateTimePicker
