import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from "moment";
import MomentUtils from "@date-io/moment";

moment.locale("th");

const CYearPicker = (props) => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            <KeyboardDatePicker
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
                format="YYYY"
                views={["year"]}
                type="text"
                fullWidth
            />
        </MuiPickersUtilsProvider>


    );
};
export default CYearPicker;