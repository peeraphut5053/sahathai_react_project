/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function CSearchSelection(props) {
   
    return (
        < Autocomplete
            id="combo-box-demo"
            options={props.selectValue}
            getOptionLabel={props.getOptionLabel}
            style={{ width: "100%", marginTop: 10 }}
            onChange={(event, values) => {
                console.log(props.onChange())
                props.onChange(values)
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    error={props.error}
                    fullWidth
                    helperText={props.helperText}
                    name={props.name}
                    onBlur={props.onBlur}
                    value={props.value}
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />}

        />
    );
}
