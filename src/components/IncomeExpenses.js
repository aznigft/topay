import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import AuthService from '../services/AuthService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    layout: {
        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 130px)',

    }
}));

export const IncomeExpenses = ({setNavState}) => {

    setNavState(0)

    const {transactions} = useContext(GlobalContext);

    const transactionsAmounts = transactions.map(tr => tr.amount);

    const income = transactionsAmounts.filter(amount => amount > 0).reduce((a,b) => a + b, 0).toFixed(2);
    const expenses = transactionsAmounts.filter(amount => amount < 0).reduce((a,b) => a + b, 0).toFixed(2);;

    let history = useHistory();

    const classes = useStyles();

    function logout() {
        AuthService.logout();
        history.push("/signIn");
    }

    return (
        <div className={classes.layout}>
            <div className="inc-exp-container">
                <div>
                    <h4>Total amount in transactions</h4>
                    <p className="money minus">{income}</p>
                </div>
                {/* <div>
                    <h4>Expense</h4>
                    <p className="money minus">{expenses}</p>
                </div> */}
            </div>
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
