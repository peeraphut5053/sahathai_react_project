import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {   Box, Divider, Drawer, Hidden, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListItems2 from './ListItems2'import MenuItems from './MenuItems'import UserData from './UserData';

const MobileDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 256
  }
});

const NavBar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(true)

  function handleClick() {
    setOpen(!open)
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <UserData />
      </Box>
      <Divider />
      {/* <Box p={2}>
        <List>
          {ListItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box> */}


      <Box p={1}>
        {ListItems2.map((item, index) => (
            <MenuItems name='' {...item} key={index}></MenuItems>
        ))}
      </Box>
      <Box flexGrow={1} />

      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          ...
        </Typography>

      </Box>
    </Box>
  );

  return (
    <>
      <Hidden >
        <MobileDrawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </MobileDrawer>
      </Hidden>
      {/* <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden> */}
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
