import React, { useContext} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalContext } from '../context/GlobalState';

export default function FrienRequestDialog({dialogOpen, setDialogOpen}) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const [emailText, setEmailText] = React.useState('');

  const {addContact} = useContext(GlobalContext);

  const handleSendRequest = () => {
    addContact(emailText);
    setDialogOpen(false);
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Friend Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send a friend request please enter their email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={e => setEmailText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendRequest}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}