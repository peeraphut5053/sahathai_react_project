import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import NavBar from '.'
import NavItem from './NavItems'
import InboxIcon from '@material-ui/icons/Inbox';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';
import { Button } from '@material-ui/core'


// React runtime PropTypes
export const MenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  submenu: PropTypes.array,
}

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  listItemText: {
    fontSize: '0.9em',//Insert your required size
    paddingLeft: 15
  }
}));

const MenuItems = (props) => {
  const { Icon, submenu, menutitle, href = [] } = props
  const classes = useStyles()
  const isExpandable = submenu && submenu.length > 0
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate();

  const handleClick = (href) => {
    (submenu) ? setOpen(!open) : navigate(href);
  }

  const MenuItemRoot = (
    <ListItem
      button
      onClick={() => handleClick(href)}
      // className={clsx(classes.item, className)}
      // activeClassName={classes.active}
      disableGutters
    // style={{ backgroundColor: "red" }}
    // className={classes.active}
    >

      {/* Display an icon if any */}

      {!!Icon && (
        <Icon />
      )}
      <ListItemText
        classes={{ primary: classes.listItemText }}
        activeClassName={classes.active}
        primary={menutitle}
        inset={!Icon}
      />

      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </ListItem>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {submenu.map((item, index) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            Icon={() => IconExpandLess}
          />
        ))}
      </List>
    </Collapse>
  ) : null

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

MenuItems.propTypes = MenuItemPropTypes



export default MenuItems
