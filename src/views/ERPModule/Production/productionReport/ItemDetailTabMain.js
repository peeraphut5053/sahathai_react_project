import React from 'react';
// import API from '../components/API';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import CTextField from '../../../components/Input/CTextField';
// import ItemDetailTabNavigation from './ItemDetailTabNavigation';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



const ItemDetailTabMain = (props) => {

    // const CRUDfn_reason_description = async (type, values) => {
    //     console.log("function", values)
    //     await API.get("RPT_JOBPACKING/data.php", {
    //         params: {
    //             load: type,
    //             id: values.reason_id,
    //             reason_description: values.reason_description,

    //         }
    //     });
    //     console.log(values)
    // }
    const classes = useStyles();

    return (
        <Paper style={{ height: '100%', width: '100%', marginTop: 0, padding: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                Required
                            </Grid>
                            <Grid item xs={6}>
                                <CTextField label="U/M" value={''} />
                            </Grid>
                            <Grid item xs={6}>
                                <CTextField label="U/M2" value={''} />
                            </Grid>
                            <Grid item xs={12}>
                                <CTextField label="Type" value={''} />
                            </Grid>
                            <Grid item xs={12}>
                                <CTextField label="Market" value={''} />
                            </Grid>
                            <Grid item xs={12}>
                                <CTextField label="Source" value={''} />
                            </Grid>
                            <Grid item xs={12}>
                                <CTextField label="Product Code" value={''} />
                            </Grid>
                        </Grid>


                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                Quantities
                            </Grid>
                            <Grid item xs={6}>
                                <CTextField label="Quantity On Hand" value={''} />
                            </Grid>
                            <Grid item xs={6}>
                                <CTextField label="Quantity On Hand2" value={''} />
                            </Grid>
                            <Grid item xs={12}>
                                <CTextField label="Non-Nettable Stock" value={''} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ItemDetailTabMain;
