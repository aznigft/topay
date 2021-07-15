import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import Grid from '@material-ui/core/Grid';


export const Transaction = ({transaction}) => {

    const {deleteTransaction} = useContext(GlobalContext);



    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li className={`${transaction.amount > 0 ? "plus" : "minus"}`}>
            {/* {transaction.text} <span>{sign}{Math.abs( transaction.amount)}</span>  */}
            <Grid item xs={9}>
                {transaction.text} <span>Enea Sp. z o.o.</span> 
            </Grid>
            <Grid item xs={3}>
                <span>{sign}{Math.abs( transaction.amount)}</span>
            </Grid>

            
            <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
        </li>
    )
}
