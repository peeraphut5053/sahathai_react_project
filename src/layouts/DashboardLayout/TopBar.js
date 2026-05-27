import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import InputIcon from '@mui/icons-material/Input';
import { useNavigate, useLocation } from "react-router-dom";

const RootAppBar = styled(AppBar)(({ theme }) => ({
  background:
    `linear-gradient(90deg, #123447 0%, ${theme.palette.primary.dark} 42%, ${theme.palette.primary.main} 100%)`,
  borderBottom: `1px solid ${alpha('#ffffff', 0.16)}`,
  boxShadow: `0 14px 30px ${alpha(theme.palette.primary.dark, 0.24)}`,
  color: '#ffffff',
  minHeight: 56,
  overflow: 'hidden',
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  '&::after': {
    background:
      `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 94%, ${theme.palette.secondary.main} 94%, ${theme.palette.secondary.main} 100%)`,
    bottom: 0,
    content: '""',
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0
  }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 56,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    minHeight: 56,
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  }
}));

const BrandLink = styled(RouterLink)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha('#ffffff', 0.08),
  border: `1px solid ${alpha('#ffffff', 0.14)}`,
  borderRadius: 10,
  color: 'inherit',
  display: 'inline-flex',
  gap: theme.spacing(1.25),
  minWidth: 0,
  padding: theme.spacing(0.5, 1),
  textDecoration: 'none',
}));

const LogoFrame = styled(Box)({
  alignItems: 'center',
  borderRadius: 7,
  display: 'flex',
  height: 34,
  justifyContent: 'center',
  minWidth: 128,
  padding: '0 12px',
});

const BrandText = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.05,
  minWidth: 126,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  }
}));

const CommandSurface = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background:
    `linear-gradient(180deg, ${alpha('#ffffff', 0.18)} 0%, ${alpha('#ffffff', 0.10)} 100%)`,
  border: `1px solid ${alpha('#ffffff', 0.24)}`,
  borderRadius: 12,
  color: '#ffffff',
  display: 'flex',
  gap: theme.spacing(0.75),
  minHeight: 44,
  padding: theme.spacing(0.4, 0.6, 0.4, 1),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(0.75),
  }
}));

const UserIdentity = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(0.75),
  minWidth: 0,
  paddingRight: theme.spacing(0.75),
}));

const UserAvatarDot = styled(Box)({
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.14)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 10,
  display: 'flex',
  height: 30,
  justifyContent: 'center',
  width: 30,
});

const ActionCluster = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(0.25),
}));

const TopBarIconButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  height: 34,
  width: 34,
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.14),
    color: '#ffffff',
  }
}));

const TopBar = ({
  UserData,
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const location = useLocation();

  const token = JSON.parse(localStorage.getItem('token'));
  return (
    <>
      {(location.pathname !== "/app/ExecutiveReportPresentation") ?
        <RootAppBar
          className={clsx(className)}
          elevation={0}
          {...rest}

        >
          <StyledToolbar>
            <BrandLink to="/app/dashboard">
              <LogoFrame>
                <Typography sx={{ fontSize: 26, fontWeight: 900, letterSpacing: 0 }}>
                  <Box component="span" sx={{ color: '#7ddcff' }}>SAHA</Box>
                  <Box component="span" sx={{ color: '#ff746b' }}>THAI</Box>
                </Typography>
              </LogoFrame>
            </BrandLink>
            <Box flexGrow={1} />
            <CommandSurface>
              <UserIdentity>
                <UserAvatarDot>
                  <AccountCircleOutlinedIcon fontSize="medium" />
                </UserAvatarDot>
                <Box sx={{ minWidth: 0 }}>
                  <Typography noWrap sx={{ fontSize: 16, fontWeight: 800, lineHeight: 1.05 }}>
                    {token?.username || 'User'}
                  </Typography>
                </Box>
              </UserIdentity>
              <Divider flexItem orientation="vertical" sx={{ borderColor: 'rgba(255,255,255,0.16)', my: 0.5 }} />
              <ActionCluster>
                <Tooltip title="Notifications">
                  <TopBarIconButton>
                    <Badge
                      badgeContent={notifications.length}
                      color="error"
                      variant="dot"
    
                    >
                      <NotificationsIcon fontSize="medium" />
                    </Badge>
                  </TopBarIconButton>
                </Tooltip>
                <Tooltip title="Sign out">
                  <TopBarIconButton onClick={logout}>
                    <InputIcon fontSize="medium" />
                  </TopBarIconButton>
                </Tooltip>
                <Tooltip title="Menu">
                  <TopBarIconButton onClick={onMobileNavOpen}>
                    <MenuIcon fontSize="medium" />
                  </TopBarIconButton>
                </Tooltip>
              </ActionCluster>
            </CommandSurface>
          </StyledToolbar>
        </RootAppBar> : null}
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
