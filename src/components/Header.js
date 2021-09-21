import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    
    borderRadius: 5
  },
  toolbar: {
    minHeight: '0px',
  }
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export const Header = ({title}) => {
    const classes = useStyles();

    return (
      <AppBar position="static" className={classes.appBar} color="transparent">
          <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                size="large">
                  <MenuIcon />
              </IconButton>
              <Typography color="textPrimary">{title}</Typography>
                  {/* <Typography variant="h6" className={classes.title}>
                      News
                  </Typography> */}
          </Toolbar>
      </AppBar>
    );
}
