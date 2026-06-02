import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {   Button, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const ACTIVE_CLASS_NAME = 'active';

const RouterNavLink = React.forwardRef(({ className, ...props }, ref) => (
  <RouterLink
    ref={ref}
    {...props}
    className={({ isActive }) => clsx(className, {
      [ACTIVE_CLASS_NAME]: isActive
    })}
  />
));

const RootListItem = styled(ListItem)({
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0
});

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
  justifyContent: 'flex-start',
  letterSpacing: 0,
  padding: '10px 8px',
  textTransform: 'none',
  width: '100%',
  '&:hover': {
    color: theme.palette.primary.main
  },
  [`&.${ACTIVE_CLASS_NAME}`]: {
    color: theme.palette.primary.main
  }
}));

const IconWrapper = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  marginRight: theme.spacing(1),
  [`.${ACTIVE_CLASS_NAME} &`]: {
    color: theme.palette.primary.main
  }
}));

const Title = styled('span')(({ theme }) => ({
  marginRight: 'auto',
  [`.${ACTIVE_CLASS_NAME} &`]: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  return (
    <RootListItem
      className={clsx(className)}
      disableGutters
      {...rest}
    >
      <NavButton
        component={RouterNavLink}
        to={href}
      >
        {Icon && (
          <IconWrapper>
            <Icon size="20" />
          </IconWrapper>
        )}
        <Title>
          {title}
        </Title>
      </NavButton>
    </RootListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
