import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconExpandLess from '@mui/icons-material/ExpandLess';
import IconExpandMore from '@mui/icons-material/ExpandMore';
import NavItem from './NavItems';
import { useNavigate } from "react-router-dom";

// React runtime PropTypes
export const MenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  submenu: PropTypes.array,
};

const RootListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontSize: '0.9em',
    paddingLeft: 15
  }
});

const MenuItems = (props) => {
  const { Icon, submenu, menutitle, href = [] } = props;
  const isExpandable = submenu && submenu.length > 0;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = (href) => {
    (submenu) ? setOpen(!open) : navigate(href);
  };

  const MenuItemRoot = (
    <RootListItem
      button
      onClick={() => handleClick(href)}
      disableGutters
    >
      {!!Icon && (
        <Icon />
      )}
      <StyledListItemText
        primary={menutitle}
        inset={!Icon}
      />

      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </RootListItem>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {submenu.map((item, index) => (
          <NavItem
            href={item.href}
            key={item.href || item.title || index}
            title={item.title}
            icon={item.icon || item.Icon}
          />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

MenuItems.propTypes = MenuItemPropTypes;

export default MenuItems;
