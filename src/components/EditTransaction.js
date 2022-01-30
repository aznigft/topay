import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GlobalContext } from "../context/GlobalState";
import { useHistory, useParams } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";

function formatDate(date) {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: "30px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	topContainer: {},
	avatar: {
		margin: "8px",
		//    backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: "24px",
	},
	submit: {
		margin: "24px 0 0",
	},
	cancel: {
		margin: "0 0 0",
	},
}));

export default function EditTransaction() {
	const classes = useStyles();
	const { transactionId } = useParams();

	const [payingAccount, setPayingAccount] = useState("");
	const [receivingProfile, setReceivingProfile] = useState("");
	const [receivingAccount, setReceivingAccount] = useState("");
	const [quickReceiver, setQuickReceiver] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState(formatDate(new Date()));
	const [amount, setAmount] = useState(0);
	const [currency, setCurrency] = useState("");
	const [myProfile, setMyProfile] = useState("");
	const [contacts, setMyContacts] = useState([]);
	const [transaction, setTransaction] = useState("");

	const { saveTransaction, getContacts, getMyProfile, getTransaction } =
		useContext(GlobalContext);

	let history = useHistory();

	useEffect(() => {
		let disposed = false;

		(async () => {
			if (disposed) return;
			const myTempProfile = await getMyProfile();
			setMyProfile(myTempProfile.data);
			const contactsTemp = await getContacts();
			setMyContacts(contactsTemp);

			if (transactionId !== "new") {
				const transactionTemp = await getTransaction(transactionId);
				setTransaction(transactionTemp);
			}
		})();

		return () => (disposed = true);
	}, [transactionId]);

	useEffect(() => {
		if (myProfile !== "" && contacts !== "" && transaction !== "") {
			console.log("dane useEffect");
			console.log(myProfile);
			console.log(contacts);
			console.log(transaction);

			transaction.payingAccount
				? setPayingAccount(
						myProfile.accounts.filter(
							(acc) => acc.id === transaction.payingAccount.id
						)[0]
				  )
				: setPayingAccount("");
			const tempRecivingProfile = contacts
				.map((contactsTemp) => contactsTemp.friend)
				.filter((friend) => friend.id === transaction.receivingProfile.id)[0];
			tempRecivingProfile
				? setReceivingProfile(tempRecivingProfile)
				: setReceivingProfile("");
			tempRecivingProfile
				? setReceivingAccount(
						tempRecivingProfile.accounts.filter(
							(acc) => acc.id === transaction.receivingAccount.id
						)[0]
				  )
				: setReceivingAccount("");
			setQuickReceiver(transaction.quickReceiver);
			setDescription(transaction.description);
			setDueDate(formatDate(transaction.dueDate));
			setAmount(transaction.amount);
			setCurrency(transaction.currency);
		}
	}, [myProfile, contacts, transaction]);

	const onSubmit = (e) => {
		e.preventDefault();

		const newTransaction = {
			id: transactionId !== "new" ? transactionId : "",
			payingAccount: payingAccount === "" ? null : payingAccount,
			receivingProfile: receivingProfile === "" ? null : receivingProfile,
			receivingAccount: receivingAccount === "" ? null : receivingAccount,
			quickReceiver: quickReceiver,
			description: description,
			dueDate: dueDate,
			amount: +amount,
			currency: currency,
		};

		saveTransaction(newTransaction);
		history.push("/payments/transactions");
	};

	return (
		<>
			<h3>New Transaction</h3>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					{myProfile === "" ? (
						<div>Laoding</div>
					) : (
						<form className={classes.form} noValidate onSubmit={onSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										select
										value={payingAccount || ""}
										onChange={(e) => setPayingAccount(e.target.value)}
										name="payingAccount"
										variant="outlined"
										fullWidth
										id="payingAccount"
										label="Paying Account"
										autoFocus
									>
										{myProfile.accounts.map((account) => (
											<MenuItem key={account.id} value={account}>
												{account.name} {account.bankName}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										select
										label="Reciving Profile"
										value={receivingProfile || ""}
										onChange={(e) => setReceivingProfile(e.target.value)}
										name="receivingProfile"
										variant="outlined"
										id="receivingProfile"
										fullWidth
									>
										{contacts
											.map((contact) => contact.friend)
											.map((contact) => (
												<MenuItem key={contact.id} value={contact}>
													{contact.firstName} {contact.lastName}
												</MenuItem>
											))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										select
										label="Reciving Account"
										value={receivingAccount || ""}
										onChange={(e) => setReceivingAccount(e.target.value)}
										name="receivingAccount"
										variant="outlined"
										id="receivingAccount"
										fullWidth
									>
										{receivingProfile !== undefined &&
										receivingProfile !== "" &&
										receivingProfile.accounts !== undefined
											? receivingProfile.accounts.map((account) => (
													<MenuItem key={account.id} value={account}>
														{account.name} {account.bankName}
													</MenuItem>
											  ))
											: ""}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										value={quickReceiver || ""}
										onChange={(e) => setQuickReceiver(e.target.value)}
										name="quickReceiver"
										variant="outlined"
										fullWidth
										id="quickReceiver"
										label="Quick receiver"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										value={description || ""}
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
										value={currency || ""}
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
										value={dueDate}
										onChange={(e) => setDueDate(e.target.value)}
										variant="outlined"
										required
										fullWidth
										id="dueDate"
										name="dueDate"
										type="date"
										label="Due date"
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>

								<Grid item xs={12}>
									<FormControlLabel
										control={
											<Checkbox value="allowExtraEmails" color="primary" />
										}
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
								Save
							</Button>
							<Typography xs={12} align="center">
								Or
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="secondary"
								className={classes.cancel}
								onClick={() => history.push("/payments")}
							>
								Cancel
							</Button>
						</form>
					)}
				</div>
			</Container>
		</>
	);
}
