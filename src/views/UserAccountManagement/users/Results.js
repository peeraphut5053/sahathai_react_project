import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  makeStyles
} from '@material-ui/core';
import MaterialTable from 'material-table';
import tableIcons from '../../components/table/tableIcons'
import { useEffect } from 'react';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([
    {
      imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
      firstname: '.asd..',
      lastname: '...',
      email: '...',
      position: '...',
      role: '...',
      updated: '...'
    },
  ])

  useEffect(() => {
    Shearch()

  }, [])



  const Shearch = () => {
    const instance = Axios.create({
      baseURL: `http://172.18.1.194:99/STS_web_api/api/`,
      timeout: 1000,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });

    instance.get(`member?startPage=1&limitPage=100`)
      .then(response => {
        const userData = response.data;
        setData(userData.items)
        console.log(userData)
      })
  }

  const Register = (values) => {
    const instance = Axios.create({
      baseURL: `http://172.18.1.194:99/STS_web_api/api/`,
      timeout: 1000,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });

    instance.post(`account/register`,values)
      .then(response => {
        const userData = response.data;
        setData(userData.items)
        console.log(userData)
      })
  }



  return (
    <Card className={clsx(classes.root)}>
      <PerfectScrollbar>
        <MaterialTable
          title="Users"
          icons={tableIcons}
          columns={[
            { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'firstname', field: 'firstname' },
            { title: 'lastname', field: 'lastname' },
            { title: 'email', field: 'email' },
            { title: 'password', field: 'password' },
            { title: 'cpassword', field: 'cpassword' },
            { title: 'position', field: 'position' },
            { title: 'role', field: 'role' },
            { title: 'updated', field: 'updated' },

          ]}
          data={data}
          options={{
            search: false,
            paging: false,
            maxBodyHeight: '77vh',
            minBodyHeight: '77vh',
            exportButton: true,
            filtering: false,
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  console.log(newData)
                  Register(newData)
                  
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000)
              }),
          }}
        />
      </PerfectScrollbar>

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
