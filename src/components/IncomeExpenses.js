import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

export const IncomeExpenses = ({setNavState}) => {

    setNavState(0)

    const {transactions} = useContext(GlobalContext);

    const transactionsAmounts = transactions.map(tr => tr.amount);

    const income = transactionsAmounts.filter(amount => amount > 0).reduce((a,b) => a + b, 0).toFixed(2);
    const expenses = transactionsAmounts.filter(amount => amount < 0).reduce((a,b) => a + b, 0).toFixed(2);;

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Summary</h4>
                <p className="money minus">{income}</p>
            </div>
            {/* <div>
                <h4>Expense</h4>
                <p className="money minus">{expenses}</p>
            </div> */}
        </div>
    )
}
