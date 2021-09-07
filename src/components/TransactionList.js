import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'
import {Link} from 'react-router-dom'
import TransactionCard from './TransactionCard'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
  }));

export const TransactionList = ({setNavState}) => {
    const {transactions, getTransactions} = useContext(GlobalContext);
    const classes = useStyles();
    
    useEffect(() => {
        getTransactions();
        // eslint-disable-netx-line react-hooks/exhaustive-deps
    }, []);
    
    setNavState(1)

    return (
        <>
            <h3>Transaction list</h3>
            <ul className="list">
                {/* {transactions.map(transaction => (<Transaction key={transaction.id} transaction = {transaction}/> ))} */}
                {transactions.map(transaction => (<TransactionCard key={transaction.id} transaction = {transaction}/> ))}
            </ul>
            {/* <Link to="/addTransaction"><Button variant="contained" color="primary" disableElevation>Create new transaction</Button></Link> */}
            {/* <Button 
                className={classes.button}
                variant="contained" 
                color="primary"
                component={Link}
                to="/editTransaction/new" 
                disableElevation>Create new transaction</Button> */}
        </>
    )
}
