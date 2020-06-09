import React, { useState } from "react";
import TopNav from "./TopNav";
import MenuList from "./MenuList";
import {
  Drawer,
  makeStyles,
  Hidden
} from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  drawer: {
    position: 'fixed',
    width: theme.navbar.width.close,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    zIndex: 1000
  },
  drawerOpen: {
    width: theme.navbar.width.open,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.navbar.width.close,
    overflow: 'hidden',
  }
}));

const NavMenu = () => {
  const [open, setOpen] = useState(false);
  
  const classes = useStyles();

  return (
    <>
      <Hidden smUp>
        <TopNav toggleMenu={() => setOpen(!open)} />
        <Drawer
          variant={ "temporary"}
          open={open}
          onClose={() => setOpen(false)}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: true,
            [classes.drawerClose]: false,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: true,
              [classes.drawerClose]: false,
            }),
          }}
        >
          <MenuList /> 
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant={ "permanent"}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <MenuList /> 
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavMenu;