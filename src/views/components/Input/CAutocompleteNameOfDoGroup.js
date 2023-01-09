// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React,{useEffect,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import APIPath from './APIPath';
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function CAutocompleteNameOfDoGroup(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            let response = await fetch(`${APIPath}/API_QuantityMove/data.php?load=STS_list_of_do_group`);

            // const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');111
            // const response2 = await API_sts_web_center.get("RPT_JOBPACKING/data.php?load=workcenter");
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

    useEffect(() => {
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
                defaultValue={{ id: props.value, do_group_name: "" }}
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
                getOptionSelected={(option, value) => option.boatList === value.boatList}
                // getOptionSelected={(option, value) => ()=>{console.log(value)}}
                getOptionLabel={(option) => `${option.id}  ${option.do_group_name}`}
                options={options}
                loading={loading}
                onChange={(option, value) => {
                    console.log(value)
                    if (value) {
                        props.setdo_group_name(value.do_group_name)
                    } else {
                        props.setdo_group_name('')
                    }

                }
                }
                // onChange={props.onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="กลุ่มใบ DO ที่ต้องการขนส่ง"
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
