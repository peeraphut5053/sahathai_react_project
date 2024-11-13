import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
// import Logo from 'src/components/Logo';
import { useNavigate, useLocation } from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: {
    height: 40
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  UserData,
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token');
  }

  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <>
      {/* {JSON.stringify(location.pathname)} */}
      {(location.pathname !== "/app/ExecutiveReportPresentation") ?
        <AppBar
          className={clsx(classes.root, className)}
          elevation={0}
          {...rest}

        >
          <Toolbar>
            <RouterLink to="/">
              {/* <Logo style={{marginBottom:25}} /> */}

              <Typography variant="h3" component="h2" style={{ marginTop: '-20px', color: '#FFFFFF' }}>
              <span style={{color: '#00BFFF'}}>SAHA</span><span style={{color: 'red'}}>THAI</span>
          </Typography>


            </RouterLink>
            <Box flexGrow={1} />
            {/* <Hidden xlUp> </Hidden> */}
            <Typography variant="h5" component="h5" style={{ paddingBottom: 25, color: '#FFFFFF' }}>
              {token?.username}
            </Typography>
            <IconButton color="inherit" style={{ marginBottom: 25 }}>
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" style={{ marginBottom: 25 }} onClick={logout}>
              <InputIcon />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
              style={{ marginBottom: 25 }}
            >
              <MenuIcon />
            </IconButton>


          </Toolbar>
        </AppBar> : null}
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
