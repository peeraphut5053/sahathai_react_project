import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Grid } from '@mui/material';
import moment from 'moment';
import DataTable from 'src/components/DataTable';
import styles from './CardBoatHeader.module.css';

const CardBoatHeader = (props, { className, ...rest }) => {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const columns = [
    { title: 'Doc num', field: 'doc_num' },
    {
      title: 'date',
      field: 'create_date.date',
      type: 'date',
      render: rowData => moment(rowData.create_date?.date).format('DD/MM/YYYY')
    },
    { title: 'To location', field: 'loc' },
    { title: 'type', field: 'doc_type' },
    { title: 'round', field: 'round' },
  ];

  return (
    <Card className={clsx(styles.root, className)} {...rest}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} style={{ marginBottom: '10px', justifyContent: 'center', }}>
              <Grid item>
                <Button
                  color="primary"
                  label=""
                  onClick={props.handleOpenModalCreateBoteNote}
                  variant="contained"
                >
                  สร้าง BoatNote
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  label=""
                  onClick={props.handleOpenModalCreateDoGroup}
                  variant="contained"
                >
                  สร้างกลุ่ม DO สำหรับส่งสินค้า
                </Button>
              </Grid>
            </Grid>

            <DataTable
              title=""
              columns={columns}
              data={props.STS_qty_move_hrd_ship}
              maxBodyHeight="70vh"
              minBodyHeight="70vh"
              search
              sorting
              rowStyle={rowData => ({
                backgroundColor: (selectedRow === rowData.doc_num) ? 'skyblue' : '#FFF',
                fontSize: '0.8em',
                padding: 0,
                fontFamily: 'sans-serif'
              })}
              onRowClick={(rowData) => {
                setSelectedRow(rowData.doc_num);
                props.handleClickSelectDoc(rowData);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CardBoatHeader.propTypes = {
  className: PropTypes.string
};

export default CardBoatHeader;
