import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import CTextField from '../../../components/Input/CTextField';
import ItemDetailTabNavigation from './ItemDetailTabNavigation';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



const ItemDetail = (props) => {

  
  const classes = useStyles();

  return (
    <Paper style={{ height: '100%', width: '100%', marginTop: 20, padding: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Item
        </Grid>
        <Grid item xs={4}>
        <CTextField
            label="Item"
            name="refnum"
            value={props.itemModal}
          />
        </Grid>
        <Grid item xs={8}>
        <CTextField
            label="Item Description"
            name="refnum"
            value={''}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ItemDetailTabNavigation />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemDetail;
