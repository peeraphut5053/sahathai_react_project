import React, { Fragment} from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {
  Avatar,
  Typography,
  makeStyles
} from '@material-ui/core';

import MyContext from 'src/views/MyContext';




const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const UserData = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();

  return (
    <>
        <MyContext.Consumer>
          {context => (
            <Fragment>
              {/* <Avatar
                className={classes.avatar}
                component={RouterLink}
                src={context.user.avatar}
                to="/app/account"
              /> */}
              <Typography
                className={classes.name}
                color="textPrimary"
                variant="h5"
              >
                {context.user.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {context.user.jobTitle}
              </Typography>
            </Fragment>
          )}
        </MyContext.Consumer>
    </>
  );
};

export default UserData;
