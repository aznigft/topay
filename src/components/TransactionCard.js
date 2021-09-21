import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    // margin: 'auto',
    maxWidth: 500,
    padding: 10,
    margin: 10
  },
  ButtonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function TransactionCard({transaction}) {
  const classes = useStyles();
  const {deleteTransaction} = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {transaction.recivingAccount}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {transaction.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Due date: {new Date(transaction.dueDate).toLocaleDateString()}
                </Typography>
              </Grid>

            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{transaction.amount} {transaction.currency}</Typography>
            </Grid>
            <Grid item xs={12}>
                     <ButtonGroup variant="text"  size="small" fullWidth = {true}  aria-label="text primary button group">
                        <Button component={Link} to={'/editTransaction/' + transaction.id}>Edit</Button>
                        <Button color="primary">Pay</Button>
                        <Button color="secondary" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                    </ButtonGroup>
              </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}