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

export default function CAutocompleteLocationByDo(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            let response = await fetch(`${APIPath}/RPT_JOBPACKING/data.php?load=LocationByDo&do=${props.do_group_name}`);

            // const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            // const response2 = await API_sts_web_center.get("RPT_JOBPACKING/data.php?load=workcenter");
            console.log("response", response)
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();


            if (active) {
                console.log("countries", countries)
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
                defaultValue={{ loc: props.value, description: "" }}
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
                getOptionSelected={(option, value) => option.loc === value.loc}
                // getOptionSelected={(option, value) => ()=>{console.log(value)}}
                getOptionLabel={(option) => `${option.loc}  ${option.description}`}
                options={options}
                loading={loading}
                onChange={(option, value) => {
                    console.log(value)
                    if (value) {
                        props.setFieldValue('loc', value.loc)
                    } else {
                        props.setFieldValue('loc', '')
                    }

                }
                }
                // onChange={props.onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="To Location"
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
