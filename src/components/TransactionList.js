import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import {Transaction} from './Transaction'
import {Link} from 'react-router-dom'
import TransactionCard from './TransactionCard'
import { Button } from '@material-ui/core'

export const TransactionList = () => {
    const {transactions} = useContext(GlobalContext);
    
    
    return (
        <>
            <h3>Transaction list</h3>
            <ul className="list">
                {/* {transactions.map(transaction => (<Transaction key={transaction.id} transaction = {transaction}/> ))} */}
                {transactions.map(transaction => (<TransactionCard key={transaction.id} transaction = {transaction}/> ))}
            </ul>
            {/* <Link to="/addTransaction"><Button variant="contained" color="primary" disableElevation>Create new transaction</Button></Link> */}
            <Button 
                variant="contained" 
                color="primary"
                component={Link}
                to="/addTransaction" 
                disableElevation>Create new transaction</Button>
        </>
    )
}
