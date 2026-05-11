import React from 'react';
import { Grid, Paper } from '@mui/material';
import CTextField from '../../../components/Input/CTextField';
import ItemDetailTabNavigation from './ItemDetailTabNavigation';
import styles from './ProductionReport.module.css';


const ItemDetail = (props) => {
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
          <Paper className={styles.detailPaperCompact}>
            <ItemDetailTabNavigation />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemDetail;
