"use client";
import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { fade } from '@material-ui/styles';

const sidebarItems = [
  { title: "Dashboard", icon: "dashboard", path: "/dashboard" },
  { title: "Users", icon: "person", path: "/users" },
  { title: "Settings", icon: "settings", path: "/settings" },
];

class Sidebar extends Component {
  state = {
    open: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={this.handleDrawerToggle} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <TransitionGroup>
            <CSSTransition
              in={this.state.open}
              timeout={300}
              classNames="sidebar-transition"
              mountOnEnter
              unmountOnExit
            >
              <div className="sidebar">
                <Menu
                  id="simple-menu"
                  open={this.state.open}
                  onClose={this.handleDrawerToggle}
                >
                  {sidebarItems.map((item, index) => (
                    <MenuItem onClick={this.handleDrawerToggle} key={item.path}>
                      <ListItemIcon style={{ minWidth: 45 }}>
                        <item.icon />
                      </ListItemIcon>
                      <Typography variant="inherit">{item.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Sidebar;