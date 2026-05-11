import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, Select } from '@mui/material';
import DataTable from 'src/components/DataTable';
import { useEffect } from 'react';
import Axios from 'axios';
import styles from './Results.module.css';


const users = [
  {
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    firstname: '.asd..',
    lastname: '...',
    email: '...',
    position: 'admin',
    role: '...',
    updated: '...'
  },
  {
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    firstname: 'Katarina',
    lastname: 'Smith',
    email: '....',
    position: 'user',
    role: 'user',
    updated: '2022-01-01'
  },
  {
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    firstname: 'Katarina',
    lastname: 'Smith',
    email: '....',
    position: 'user',
    role: 'user',
    updated: '2022-01-01'
  },
  {
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    firstname: 'Katarina',
    lastname: 'Smith',
    email: '....',
    position: 'user',
    role: 'user',
    updated: '2022-01-01'
  },
  {
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    firstname: 'Katarina',
    lastname: 'Smith',
    email: '....',
    position: 'user',
    role: 'user',
    updated: '2022-01-01'
  },
  {
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    firstname: 'Katarina',
    lastname: 'Smith',
    email: '....',
    position: 'admin',
    role: 'user',
    updated: '2022-01-01'
  },
]

const Results = (props) => {
  const [data, setData] = useState(users)

  useEffect(() => {
    Shearch()

  }, [])

  const HandleChange = (event) => {
    const position = event.target.value;
    if (position === "all") {
      setData(users)
    } else {
      const filter = users.filter((item) => {
        return item.position === position;
      });
      setData(filter);
    }
  }


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

    instance.post(`account/register`, values)
      .then(response => {
        const userData = response.data;
        setData(userData.items)
        console.log(userData)
      })
  }


  return (
    <Card className={clsx(styles.root)}>
      <PerfectScrollbar>

      </PerfectScrollbar>

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
1