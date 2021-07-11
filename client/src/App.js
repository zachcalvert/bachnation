import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, CssBaseline, Grid, Hidden, Link, ThemeProvider, makeStyles } from '@material-ui/core';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

import { DraftResults } from "./components/Draft/DraftResults";
import { League } from './components/League/League';
import { TableOfContents } from './components/TableOfContents/TableOfContents';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
    background: '#e57373',
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginLeft: drawerWidth,
    },
  },
  home: {
    fontSize: 24,
    paddingRight: theme.spacing(2),
    textDecoration: 'none'
  },
  darkModeToggle: {
    marginLeft: 'auto'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  loginForm: {
    margin: '200px auto',
    display: 'grid'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
  },
}));

export const App = () => {
  const classes = useStyles();
  const [prefersDarkMode, setPrefersDarkMode] = React.useState(localStorage.getItem('dark-mode') === 'true');
  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <TableOfContents />
    </div>
  );

  const handleDarkModeChange = () => {
    setPrefersDarkMode(!prefersDarkMode);
    localStorage.setItem('dark-mode', !prefersDarkMode)
  }

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
            <a href="/" style={{ color: '#F0F0F0',textDecoration: 'none' }}>
              <img height='32px' src='favicon.ico' />
            </a>

          <IconButton style={{"outline": "none"}} className={classes.darkModeToggle} edge="end" color="inherit" onClick={handleDarkModeChange} aria-label="dark-mode-toggle">
            <Brightness4Icon style={{"fill": prefersDarkMode ? "#ffeb3b" : ""}} />
          </IconButton>
        </Toolbar>
      </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor='left'
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Route path="/draft/" component={DraftResults} />
            <Route path="/" exact component={League} />
        </main>
    </div>
    </ThemeProvider>
    </BrowserRouter>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;