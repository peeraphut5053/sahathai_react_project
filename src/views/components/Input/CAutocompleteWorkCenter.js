// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import APIPath from './APIPath';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function CAutocomplete(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            let response = await fetch(`${APIPath}${props.path_module}`);
            await sleep(1e3);
            const dataOptions = await response.json();
            (active) && setOptions(dataOptions)
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <div>
            <Autocomplete
                defaultValue={{ data: props.value, description: "" }}
                fullWidth
                id="asynchronous-demo"
                style={{ fontSize: 8 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}

                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.data === value.data}
                // getOptionSelected={(option, value) => ()=>{console.log(value)}}
                getOptionLabel={(option) => `${option.data}  ${option.description}`}
                options={options}
                loading={loading}
                onChange={(option, value) => {
                    console.log(value)
                    if (value) {
                        props.setFieldValue('w_c', value.data)
                    } else {
                        props.setFieldValue('w_c', '')
                    }

                }
                }
                // onChange={props.onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            />
        </div>

    );
}
