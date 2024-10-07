import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import tableIcons from '../../components/table/tableIcons'


export default function ModalSelectDOList(props) {
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: "80%",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            margin: "5%"
        },
    }));

    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Container maxWidth="lg" style={{ padding: 5, }}>
                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <MaterialTable
                        icons={tableIcons}
                        title="Basic Export Preview"
                        columns={[
                            { title: 'id', field: 'id', type: 'numeric' },
                            { title: 'job', field: 'job' },
                            { title: 'lot', field: 'lot', type: 'numeric' },
                            { title: 'item', field: 'item', type: 'numeric' },
                            { title: 'qty1', field: 'qty1', type: 'numeric' },
                            { title: 'do_num', field: 'do_num', type: 'numeric' },
                            { title: 'do_line', field: 'do_line', type: 'numeric' },
                            { title: 'co_num', field: 'co_num', type: 'numeric' },
                            { title: 'co_line', field: 'co_line', type: 'numeric' },
                        ]}
                        data={props.SelectDOList}
                        
                        options={{
                            search: false,
                            paging: false,
                            maxBodyHeight: '60vh',
                            minBodyHeight: '60vh',
                            exportButton: true,
                            filtering: false,
                            rowStyle: rowData => ({
                                // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                // fontSize: 12,
                                // padding: 0
                            }
                            ),
                        }}
                    />
                </Grid>
            </Container >
        </div >
    )
}
