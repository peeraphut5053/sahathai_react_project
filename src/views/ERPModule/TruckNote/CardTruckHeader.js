import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  colors,
  makeStyles,
  Button,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import tableIcons from 'src/views/components/table/tableIcons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const CardTruckHeader = (props, { className, ...rest }) => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = React.useState(null);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}

    >
      <CardContent >

        <Grid
          container
          spacing={3}
        >
          <Grid item >
            <Grid
              container
              justify='center'
              spacing={4}
            >
              <Grid item >
                
                <Button variant="contained" label={""} color="primary"
                  onClick={props.handleOpenModalCreateBoteNote} >
                  สร้างใบผ่านรถ
                </Button>
              </Grid>
              {/* <Grid item >
                <Button variant="contained" label={""} color="primary"
                  onClick={props.handleOpenModalCreateDoGroup} >
                  สร้างกลุ่ม DO สำหรับส่งสินค้า
                </Button>
              </Grid> */}
              
            </Grid>
            



            <MaterialTable
              style={{ width: '29vw', margin: 5, overflowX: "scroll" }}
              icons={tableIcons}
              title=""
              columns={[
                { title: 'Doc num', field: 'doc_num' },
                { title: 'date', field: 'create_date.date', type: 'date' },
                { title: 'To location', field: 'loc' },
                { title: 'type', field: 'doc_type' },
              ]}
              // onRowClick={(event, rowData) => {
              //   SelectItemToModal(rowData)
              // }}
              data={props.STS_qty_move_hrd_Truck}
              options={{
                search: false,
                paging: false,
                maxBodyHeight: '65vh',
                minBodyHeight: '65vh',
                filtering: true,
                rowStyle: rowData => ({
                  backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                  fontSize: '0.8em',
                  padding: 0,
                  fontFamily: 'sans-serif'
                })

              }}
              onRowClick={(event, rowData) => {
                setSelectedRow(rowData.tableData.id);
                props.handleClickSelectDoc(rowData)
              }}



            //   components={{
            //     Toolbar: props => (
            //         <div>
            //             <MTableToolbar {...props} />
            //             <div style={{ padding: '0px 10px' }}>
            //                  <Chip label={"สร้างใบส่งสินค้า"} color="primary" style={{ marginRight: 5 }} 
            //                  onClick={props.handleOpenModalCreateBoteNote} />
            //             </div>
            //         </div>
            //     ),
            // }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CardTruckHeader.propTypes = {
  className: PropTypes.string
};

export default CardTruckHeader;
