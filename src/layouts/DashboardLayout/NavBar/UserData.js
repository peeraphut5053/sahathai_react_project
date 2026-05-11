import React, { Fragment} from 'react';
import { Typography } from '@mui/material';
import MyContext from 'src/views/MyContext';

const UserData = ({ onMobileClose, openMobile }) => {
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
