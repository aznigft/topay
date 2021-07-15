import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

export const AddTransaction = () => {

const classes = useStyles();

const [text, setText] = useState('');

const [payingAccount, setPayingAccount] = useState('Myself');
const [recivingAccount, setRecivingAccount] = useState('');
const [description, setDescription] = useState('');
const [deadline, setDeadline] = useState('');
const [amount, setAmount] = useState(0);
const [currency, setCurrency] = useState('');

const {addTransaction, transactions} = useContext(GlobalContext);

let history = useHistory();

function generateID() {
        return( Math.max(...transactions.map(o => o.id), 0) + 1 )
}

const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
        id: generateID(), 
        text,
        amount: +amount
    }

    addTransaction(newTransaction)
    history.push('/transactionList');
}

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit = {onSubmit}>
                <div className="form-control">
                    <label htmlFor="payingAccount">Paying Account</label>
                    <input type="text" value={payingAccount} onChange={(e) => setPayingAccount(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="recivingAccount">Reciving Account</label>
                    <input type="text" value={recivingAccount} onChange={(e) => setRecivingAccount(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter text..." />
                </div>

                {/* <div className="form-control">
                    <label htmlFor="deadline">Due date</label>
                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Enter text..." />
                </div> */}

                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />



                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
                <div className="form-control">
                    <label htmlFor="currency">Currency</label>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="Enter text..." />
                </div>
                
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
