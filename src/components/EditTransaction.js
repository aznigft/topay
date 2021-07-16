import React, {useState, useContext, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GlobalContext } from '../context/GlobalState';
import { useHistory, useParams } from "react-router-dom";

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditTransaction() {
  const classes = useStyles();

  const {transactionId} = useParams();

  useEffect(() => {

    if(transactionId !== "new") {
      const transaction = transactions.filter(trans => +trans.id === +transactionId)[0];

      console.log(transaction);

      setPayingAccount(transaction.payingAccount);
      setRecivingAccount(transaction.recivingAccount);
      setDescription(transaction.description);
      setDeadline(formatDate(transaction.deadLine));
      setAmount(transaction.amount);
      setCurrency(transaction.currency);
    }
  }, [transactionId])

  const [payingAccount, setPayingAccount] = useState('Myself');
  const [recivingAccount, setRecivingAccount] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(formatDate(new Date()));
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');

  const {addTransaction,editTransaction, transactions} = useContext(GlobalContext);

  let history = useHistory();

  function generateID() {
    return( Math.max(...transactions.map(o => o.id), 0) + 1 )
  }

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: '',
      payingAccount: payingAccount,
      recivingAccount: recivingAccount,
      description: description,
      deadLine: deadline,
      amount: +amount,
      currency: currency
  }

    if( transactionId !== "new") {
      newTransaction.id = transactionId;
      editTransaction(newTransaction);
    } else {
      newTransaction.id = generateID();
      addTransaction(newTransaction);
    }

    history.push('/transactionList');
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Transaction
        </Typography>
        <form className={classes.form} noValidate onSubmit = {onSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                value={payingAccount || ''} 
                onChange={(e) => setPayingAccount(e.target.value)}
                name="payingAccount"
                variant="outlined"
                required
                fullWidth
                id="payingAccount"
                label="Paying Account"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={recivingAccount || ''} 
                onChange={(e) => setRecivingAccount(e.target.value)}
                name="recivingAccount"
                variant="outlined"
                required
                fullWidth
                id="recivingAccount"
                label="Reciving Account"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={description || ''} 
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={amount || 0} 
                onChange={(e) => setAmount(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={currency || ''} 
                onChange={(e) => setCurrency(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="currency"
                label="Currency"
                name="currency"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={deadline } 
                onChange={(e) => setDeadline(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="deadline"
                name="deadline"
                type="date"
                label="Due date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to mark it as urgent."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            New transaction
          </Button>
        </form>
      </div>
    </Container>
  );
}