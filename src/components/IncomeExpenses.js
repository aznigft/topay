import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import AuthService from '../services/AuthService';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const useStyles = makeStyles((theme) => ({
    layout: {
        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 130px)',

    }
}));

const actions = [
    { icon: <AccountBalanceIcon />, name: 'Account' , path: "/my-profile/accounts"},
  ];

export const IncomeExpenses = ({setNavState}) => {

    useEffect(() => {
        setNavState(0);
      }, [setNavState]);

    const {transactions} = useContext(GlobalContext);
    const transactionsAmounts = transactions.map(tr => tr.amount);
    const income = transactionsAmounts.filter(amount => amount > 0).reduce((a,b) => a + b, 0).toFixed(2);
    let history = useHistory();
    const classes = useStyles();

    function logout() {
        AuthService.logout();
        history.push("/signIn");
    }

    function goToAction(actionPath) {
        history.push(actionPath);
    }

    return (
        <div className={classes.layout}>
            <div className="inc-exp-container">
                <div>
                    <h4>Total amount in transactions</h4>
                    <p className="money minus">{income}</p>
                </div>
            </div>
                <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SettingsIcon />}
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick = {() => goToAction(action.path)}
                        />
                        ))}
                    </SpeedDial>
                </Box>
            <div>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick= {logout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}
