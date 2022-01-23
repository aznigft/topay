import React, { useState, useContext, useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalContext } from '../context/GlobalState';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddBankAccountDialog({dialogOpen, setDialogOpen, bankAcccountDetails, setSelectedBankAccount, setMyProfile}) {

  const [id, setId] = useState(bankAcccountDetails.id)
  const [name, setName] = useState(bankAcccountDetails.name);
  const [number, setNumber] = useState(bankAcccountDetails.number);
  const [bankName, setBankName] = useState(bankAcccountDetails.bankName);
  const [isVisibleToOthers, setIsVisibleToOthers] = useState(bankAcccountDetails.visibleToOthers);

  const {saveBankAccount} = useContext(GlobalContext);

  useEffect(() => {
    setId(bankAcccountDetails.id);
    setName(bankAcccountDetails.name);
    setNumber(bankAcccountDetails.number);
    setBankName(bankAcccountDetails.bankName);
    setIsVisibleToOthers(bankAcccountDetails.visibleToOthers);
  }, [bankAcccountDetails])

  const handleSendRequest = () => {
    hendleSavingAccount();
    handleClose();
  }

  async function hendleSavingAccount ()  {
    const myTempAcc = await saveBankAccount({
      id: id,
      name: name,
      number: number,
      bankName: bankName,
      visibleToOthers: isVisibleToOthers
    });
    setMyProfile(myTempAcc.data);
  }

  const handleClose = () => {
    setSelectedBankAccount({
      id: '',
      name: '', 
      number: '', 
      bankName: '', 
      visibleToOthers: true
    });
    setDialogOpen(false);
  };

  const handleChangeVisible = () => {
    setIsVisibleToOthers(!isVisibleToOthers);
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>New Bank Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill bank account details:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Account name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setName(e.target.value)}
            value = {name}
          />
          <TextField
            margin="dense"
            id="number"
            label="Account number"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setNumber(e.target.value)}
            value = {number}
          />
          <TextField
            margin="dense"
            id="bankName"
            label="Bank name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setBankName(e.target.value)}
            value = {bankName}
          />
          <FormGroup style={{ paddingLeft: 0, marginTop: '10px' }} >
            <FormControlLabel 
              control={
                <Checkbox 
                  checked = {isVisibleToOthers}
                  onChange={handleChangeVisible}
                  value={isVisibleToOthers}
                  
                />} 
              label="Visible to others"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendRequest}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}