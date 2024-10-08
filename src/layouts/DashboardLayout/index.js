import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import MyContext from 'src/views/MyContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 40,
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 256
    // }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));


const DashboardLayout = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(true);
  const [username, setUsername] = useState(null)
  const [userData, setUserData] = useState(null)
  const [user, setuser] = useState(null)
  const checkAuth = () => {
   
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"))
      setUserData(localStorage.getItem("UserData"))
      setuser({
        avatar: '/static/images/avatars/avatar_6.png',
        jobTitle: 'Senior Developer',
        name: localStorage.getItem("username")
      })

    } else {
      setUsername(localStorage.getItem("username"))
      setUserData(localStorage.getItem("UserData"))
      setuser({
        avatar: '/static/images/avatars/avatar_6.png',
        jobTitle: 'Senior Developer',
        name: localStorage.getItem("username")
      })

      // setUsername("")
      // navigate('/app/dashboard')
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <MyContext.Provider
      value={{
        user: user,
      }}
    >
      <div className={classes.root}>
        <TopBar
          username={username}
          onMobileNavOpen={() => setMobileNavOpen(true)}
        />
        <NavBar
          UserData={userData}
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              {/* {JSON.stringify(isMobileNavOpen)} */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </MyContext.Provider>

  );
};

export default DashboardLayout;
