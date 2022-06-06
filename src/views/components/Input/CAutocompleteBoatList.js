// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React,{useEffect,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function CAutocompleteBoatList(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            let response;
            if (window.location.host == '172.18.1.194:5000' || window.location.host == 'localhost:3001') {
                response = await fetch('http://172.18.1.194/sts_web_center/module/RPT_JOBPACKING/data.php?load=workcenter');
            } else {
                response = await fetch('http://61.90.156.165/sts_web_center/module/RPT_JOBPACKING/data.php?load=workcenter');
            }
            // const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            // const response2 = await API_sts_web_center.get("RPT_JOBPACKING/data.php?load=workcenter");
            await sleep(1e3); // For demo purposes.
            const countries = [
                {
                    boatList: "Ship 1",
                    description: "เรือ A"
                },
                {
                    boatList: "Ship 2",
                    description: "เรือ B"
                },
                {
                    boatList: "Ship 3",
                    description: "เรือ C"
                }
            ];


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
                defaultValue={{ boatList: props.value, description: "" }}
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
                getOptionLabel={(option) => `${option.boatList}  ${option.description}`}
                options={options}
                loading={loading}
                onChange={(option, value) => {
                    console.log(value)
                    if (value) {
                        props.setFieldValue('boatList', value.boatList)
                    } else {
                        props.setFieldValue('boatList', '')
                    }

                }
                }
                // onChange={props.onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="ชื่อเรือที่ใช้ขนส่ง"
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
