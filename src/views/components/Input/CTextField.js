import React from 'react';
import { TextField} from '@material-ui/core';


const CTextField = (props) => {

    return (
        <div>
            {JSON.stringify(props.handleChange)}
            <TextField
            variant="outlined"
            size="small"
                error={props.error}
                fullWidth
                helperText={props.helperText}
                label={props.label}
                name={props.name}
                onBlur={props.onBlur}
                onChange={props.onChange}
                value={props.value}
                type="text"
                InputLabelProps={{
                    shrink: true,
                    readOnly: props.readOnly,
                }}
                autoComplete='off'
            />
        </div>


    );
};
export default CTextField
