/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComponentAutocomplete(props) {
    const onSelectChange = (event, values) => {
        props.handleSelectValue(values)
    }
    return (
            < Autocomplete
                id="combo-box-demo"
                options={props.selectValue}
                getOptionLabel={(option) => option.report_description}
                style={{ width: "100%", marginTop: 10 }}
                onChange={onSelectChange}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label={props.label}
                        variant="outlined"
                    />}
                size="small"
            />
    );


}
