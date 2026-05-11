import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootAppBar = styled(AppBar)({});

const TopBar = ({ className, ...rest }) => {
  return (
    <RootAppBar
      className={clsx(className)}
      elevation={0}
      {...rest}
    >
      {/* <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar> */}
    </RootAppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
