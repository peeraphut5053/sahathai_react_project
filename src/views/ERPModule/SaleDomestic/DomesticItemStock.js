import React from 'react';
import {
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '95%',
        paddingBottom: theme.spacing(0),
        paddingTop: theme.spacing(0)
    }
}));

const DomesticItemStockView = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Customers"
        >
            DomesticItemStock
        </Page>
    );
};

export default DomesticItemStockView;
