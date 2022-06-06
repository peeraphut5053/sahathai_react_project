import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Container,
  Button,
  Modal,
  Paper
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import MaterialTable from 'material-table';
import tableIcons from '../components/table/tableIcons'
import CButton from '../components/Input/CButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateOTReport from './CreateOTReport';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ModalManagementFullPage from '../components/ModalManagementFullPage';
import EmployeeList from './EmployeeList';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const OTReport = ({ className, ...rest }) => {
  const classes = useStyles();

  const [openModalCreateOTReprot, setopenModalCreateOTReprot] = React.useState(false);

  const handleCloseModalItem = async () => {
    setopenModalCreateOTReprot(false);
  };


  const [openModalEmployee, setOpenModalEmployee] = React.useState(false);
  const handleCloseModalEmployee = async () => {
    setOpenModalEmployee(false);
  };



  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Container maxWidth={false} style={{ paddingTop: 10 }}>
        <Grid
          container
          spacing={1}
        >
          <Grid item xs={3} >
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<AddBoxIcon />}
              onClick={() => setopenModalCreateOTReprot(true)}
            >
              สร้างรายงาน
            </Button>

            <Modal open={openModalCreateOTReprot} onClose={handleCloseModalItem} >
              <CreateOTReport
                handleCloseModalItem={handleCloseModalItem}
              />
            </Modal>
          </Grid>
          <Grid item xs={3} >
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: colors.yellow[800] }}
              className={classes.button}
              startIcon={<AccessibilityIcon />}
              onClick={() => setOpenModalEmployee(true)}
            >
              พนักงาน
            </Button>
            <ModalManagementFullPage
              modalHeader={
                <>ข้อมูลพนักงานและประวัติการทำ OT</>
              }
              modalDetail={
                <EmployeeList />
              }

              open={openModalEmployee}
              onClose={handleCloseModalEmployee}
            />

          </Grid>


        </Grid>
      </Container>


      <CardContent>
        <MaterialTable
          title="ใบขออนุมัติทำงานล่วงเวลา (OT)"
          icons={tableIcons}
          columns={[
            { title: 'เลขที่เอกสาร', field: 'name' },
            { title: 'วันที่เอกสาร', field: 'date' },
            { title: 'แผนก', field: 'branch' },
            { title: 'สถานะ', field: 'status' },
          ]}
          data={[
            { name: 'OT21010001', date: '17/01/2020', branch: 'มัดท่อ', status: 'อนุมัติ' },
            { name: 'OT21010002', date: '18/01/2020', branch: 'พ่นสี', status: 'ไม่อนุมัติ' },
          ]}
          options={{
            search: false,
            paging: false,
            maxBodyHeight: '60vh',
            minBodyHeight: '60vh',
            exportButton: true,
            filtering: false,
            rowStyle: rowData => ({
              // backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
              fontSize: 12,
              padding: 0
            }
            ),
          }}
          detailPanel={rowData => {
            return (
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/C0DPdy98e4c"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            )
          }}
        />
      </CardContent>

    </Card>
  );
};



export default OTReport;
