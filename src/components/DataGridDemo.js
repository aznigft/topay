import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(1),
//     [theme.breakpoints.down('sm')]: {
//        height: 400, width: '100%' ,
//     },
//     [theme.breakpoints.up('md')]: {
//        height: 400, width: 800 ,
//     },
//     [theme.breakpoints.up('lg')]: {
//        height: 400, width: 800 ,
//     },
//   },
// }));

const windowWidth = (window.screen.width - 60 -90 - 70)/5;

const columns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: "",
    headerName: "Button",
    sortable: false,
    width: 90,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
      <div>
        <Button 
          onClick={() => console.log(params)}
          variant="contained"
          size ='small'>
            Pay
        </Button>
      </div>
      )
    }
  },
  {
    field: 'recipent',
    headerName: 'Recipent',
    editable: true,
    // width: windowWidth*2
  },
  {
    field: 'description',
    headerName: 'Description',
    editable: true,
    flexGrow: 1 ,
    // width: windowWidth*2
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    editable: true,
    width: windowWidth
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 70,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
      <div>
        <IconButton aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      )
    }
  }
];

const rows = [
  { id: 1, recipent: 'Enea Sp. z o.o.', description: 'Electric bill for april', amount: '40 Eur' },
  { id: 2, recipent: 'Cersei Lannister', description: 'Restaurant split', amount: '12 Eur' },
  { id: 3, recipent: 'Spotify media', description: 'Spotify subscription ', amount: '40 Eur' },
  { id: 4, recipent: 'Microsoft', description: 'Microsoft 365 subscription', amount: '10 Eur' },
  { id: 5, recipent: 'Daenerys Targaryen', description: 'Birthday gift for Cersei', amount: '4 Eur' },
  { id: 6, recipent: 'Zalando', description: '2 pairs of shoes', amount: '50 Eur' },
];

export default function DataGridDemo() {
  // const classes = useStyles();

  return (
  //  <div className={classes.root}>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}