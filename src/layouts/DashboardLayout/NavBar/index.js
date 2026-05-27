import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  Stack,
  Typography
} from '@mui/material';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { alpha, styled } from '@mui/material/styles';
import ListItems2 from './ListItems2'
import MenuItems from './MenuItems'

const drawerWidth = 286;

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background:
      'linear-gradient(180deg, #ffffff 0%, #f4f9fb 100%)',
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
    boxShadow: `18px 0 44px ${alpha(theme.palette.primary.dark, 0.18)}`,
    overflowX: 'hidden',
    width: drawerWidth
  }
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  '&::before': {
    background:
      `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    content: '""',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 5
  }
}));

const MenuSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.25, 1.25, 1.25, 2),
  '& .MuiListItem-root': {
    borderRadius: 8,
    color: '#244458',
    marginBottom: 4,
    minHeight: 42,
    paddingLeft: theme.spacing(1.25),
    paddingRight: theme.spacing(1),
    transition: theme.transitions.create(['background-color', 'color', 'transform']),
    '& svg': {
      color: theme.palette.primary.main,
      fontSize: 20,
      marginLeft: theme.spacing(0.5),
      minWidth: 22,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.dark,
      transform: 'translateX(2px)',
    }
  },
  '& .MuiCollapse-root .MuiListItem-root': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    marginLeft: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(1)})`,
  },
}));

const FooterPanel = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  borderRadius: 8,
  margin: theme.spacing(1.5, 2, 2, 2.75),
  padding: theme.spacing(1.5),
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <DrawerContent>
      <Divider sx={{ borderColor: 'rgba(0, 150, 214, 0.12)', mx: 2, ml: 2.75 }} />
      <MenuSection>
        {ListItems2.map((item, index) => (
          <MenuItems name='' {...item} key={index}></MenuItems>
        ))}
      </MenuSection>
      <Box flexGrow={1} />
      <FooterPanel>
        <Stack alignItems="center" direction="row" spacing={1}>
          <DashboardCustomizeOutlinedIcon color="primary" fontSize="small" />
          <Box>
            <Typography sx={{ color: '#102f43', fontSize: 13, fontWeight: 800 }}>
              SAHATHAI Dashboard
            </Typography>
          </Box>
        </Stack>
      </FooterPanel>
    </DrawerContent>
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
