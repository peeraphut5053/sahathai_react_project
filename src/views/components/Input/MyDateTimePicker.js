import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import moment from "moment";
import MomentUtils from "@date-io/moment";

moment.locale("th");

const MyDateTimePicker = (props) => {

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            <KeyboardDateTimePicker
            variant="outlined"
            inputVariant="outlined"
            size="small"
                ampm={false}
                label={props.label}
                name={props.name}
                value={props.value}
                onBlur={props.handleBlur}
                onChange={props.onChange}
                onError={console.log}
                style={{fontSize:5}}
                format="DD/MM/YYYY HH:mm:ss"
                type="text"
                fullWidth
                disabled={props.disabled}
            />
        </MuiPickersUtilsProvider>


    );
};
export default MyDateTimePicker;