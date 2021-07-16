import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
                    Due date: {transaction.deadLine.toLocaleDateString()}
                </Typography>
              </Grid>

            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{transaction.amount} {transaction.currency}</Typography>
            </Grid>
            <Grid item xs={12}>
                     <ButtonGroup variant="text"  size="small" fullWidth = {true}  aria-label="text primary button group">
                        <Button>Edit</Button>
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