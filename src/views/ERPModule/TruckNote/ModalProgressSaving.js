import React from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import LinearProgressWithLabel from './LinearProgressWithLabel'
import styles from './ModalProgressSaving.module.css';


export default function ModalProgressSaving(props) {
    return (
        <div className={styles.paper}>
            <Container maxWidth="lg" style={{ padding: 5, }}>
                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={4} style={{ textAlign: "center" }}>  เลขเอกสาร:{props.docNum}</Grid>
                    <Grid item xs={4} style={{ textAlign: "center" }}>  Location ปลายทาง:{props.toLocation}</Grid>
                    <Grid item xs={4} style={{ textAlign: "center" }}>  ทำการย้าย Location {props.qtyMoveList.length} รายการ</Grid>
                </Grid>
                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <LinearProgressWithLabel
                            listLength={props.qtyMoveList.length}
                            handleProcessSuccess={props.handleProcessSuccess}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        {/* <CPrintDocument /> */}
                    </Grid>
                </Grid>
            </Container >
        </div >
    )
}
