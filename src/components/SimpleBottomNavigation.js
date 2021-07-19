import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import List from '@material-ui/icons/List';
import AddCircle from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position: "sticky",
    width: '100vw',
    bottom: 0,
    left: 0,
    right: 0
  },
});

export default function SimpleBottomNavigation({navState, setNavState}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  return (
    <BottomNavigation
      value={navState}
      onChange={(event, newValue) => {
        setNavState(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/"/>
      <BottomNavigationAction label="List" icon={<List />} component={Link} to="/transactionList"/>
      <BottomNavigationAction label="Add New" icon={<AddCircle />} component={Link} to="/editTransaction/new"/>
    </BottomNavigation>
  );
}