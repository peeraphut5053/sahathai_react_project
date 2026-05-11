import React from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import DataTable from 'src/components/DataTable';
import styles from './ModalSelectDOList.module.css';

export default function ModalSelectDOList(props) {
    const columns = [
        { title: 'id', field: 'id', type: 'numeric' },
        { title: 'job', field: 'job' },
        { title: 'lot', field: 'lot', type: 'numeric' },
        { title: 'item', field: 'item', type: 'numeric' },
        { title: 'qty1', field: 'qty1', type: 'numeric' },
        { title: 'do_num', field: 'do_num', type: 'numeric' },
        { title: 'do_line', field: 'do_line', type: 'numeric' },
        { title: 'co_num', field: 'co_num', type: 'numeric' },
        { title: 'co_line', field: 'co_line', type: 'numeric' },
    ];

    return (
        <div className={styles.paper}>
            <Container maxWidth="lg" style={{ padding: 5 }}>
                <Grid container spacing={3} style={{ textAlign: 'center' }}>
                    <DataTable
                        title="Basic Export Preview"
                        columns={columns}
                        data={props.SelectDOList}
                        maxBodyHeight="60vh"
                        minBodyHeight="60vh"
                        search={false}
                        sorting
                        exportButton
                        exportFileName="do-list.csv"
                    />
                </Grid>
            </Container>
        </div>
    );
}
