import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';

const useStyles = makeStyles({
  table: {
    
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function createPayment(reciver, description, amount, dueDate) {
    return { reciver, description, amount, dueDate };
  }

// const rows = [
//   createPayment('A')  
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const rows = [
    { id: 1, recipent: 'Enea Sp. z o.o.', description: 'Electric bill for april', amount: '40 Eur' },
    { id: 2, recipent: 'Cersei Lannister', description: 'Restaurant split', amount: '12 Eur' },
    { id: 3, recipent: 'Spotify media', description: 'Spotify subscription ', amount: '40 Eur' },
    { id: 4, recipent: 'Microsoft', description: 'Microsoft 365 subscription', amount: '10 Eur' },
    { id: 5, recipent: 'Daenerys Targaryen', description: 'Birthday gift for Cersei', amount: '4 Eur' },
    { id: 6, recipent: 'Zalando', description: '2 pairs of shoes', amount: '50 Eur' },
    { id: 7, recipent: 'Zalando', description: '2 pairs of shoes', amount: '50 Eur' },
    { id: 8, recipent: 'Zalando', description: '2 pairs of shoes', amount: '50 Eur' },
    { id: 9, recipent: 'Zalando', description: '2 pairs of shoes', amount: '50 Eur' },
  ];

export default function PaymentTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell align="right">Reciver</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Due date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell padding="checkbox">
                {/* <Button 
                    onClick={() => console.log("arr")}
                    variant="contained"
                    size ='small'>
                    Pay
                </Button> */}
                <IconButton aria-label="delete" disabled color="primary">
                    <PaymentOutlinedIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">{row.recipent}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}