// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function CAutocompleteDepartment(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            // const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            const response = await fetch('http://172.18.1.194/sts_web_center/module/RPT_JOBPACKING/data.php?load=SelectForming_reason_description');
            // const response2 = await API_sts_web_center.get("RPT_JOBPACKING/data.php?load=workcenter");
            console.log("response", response)
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();


            if (active) {
                console.log("countries",countries)
                setOptions(countries)
            }
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

            {/* {
                JSON.stringify(options)
            } */}


            <Autocomplete
                defaultValue={{ reason_id: props.value, reason_description: "" }}
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
                getOptionSelected={(option, value) => option.reason_id === value.reason_id}
                // getOptionSelected={(option, value) => ()=>{console.log(value)}} ${option.reason_id}  
                getOptionLabel={(option) => `${option.reason_description}`}
                options={options}
                loading={loading}
                onChange={(option, value) => {
                    console.log(value)
                    if (value) {
                        props.setFieldValue('reason_id', value.reason_id)
                    } else {
                        props.setFieldValue('reason_id', '')
                    }

                }
                }
                // onChange={props.onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="แผนก"
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
