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
		marginTop: "64px",
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

export default function EditTransactionRequest() {
	const classes = useStyles();
	const { transactionRequestId } = useParams();

	const [userRequestingPayment, setUserRequestingPayment] = useState("");
	const [accountPaymentTo, setAccountPaymentTo] = useState("");
	const [userApprovingPayment, setUserApprovingPayment] = useState("");

	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState(formatDate(new Date()));
	const [amount, setAmount] = useState(0);
	const [currency, setCurrency] = useState("");
	const [myProfile, setMyProfile] = useState("");
	const [contacts, setMyContacts] = useState([]);
	const [transactionRequest, setTransactionRequest] = useState("");

	const {
		saveTransactionRequest,
		getTransactionRequest,
		getContacts,
		getMyProfile,
	} = useContext(GlobalContext);

	let history = useHistory();

	useEffect(() => {
		let disposed = false;

		(async () => {
			if (disposed) return;
			const myTempProfile = await getMyProfile();
			setMyProfile(myTempProfile.data);
			const contactsTemp = await getContacts();
			setMyContacts(contactsTemp);

			if (transactionRequestId !== "new") {
				console.log("Request not new");
				console.log(transactionRequestId);

				const transactionRequestTemp = await getTransactionRequest(
					transactionRequestId
				);
				setTransactionRequest(transactionRequestTemp);
			}
		})();

		return () => (disposed = true);
	}, [transactionRequestId]);

	useEffect(() => {
		if (myProfile !== "" && contacts !== "" && transactionRequest !== "") {
			//setUserRequestingPayment(transactionRequest.userRequestingPayment);
			// setAccountPaymentTo(myProfile.accounts.filter(acc => acc.id === transactionRequest.accountPaymentTo.id)[0]);

			// const tempRecivingProfile = contacts.map(contactsTemp => contactsTemp.friend)
			//                                     .filter(friend => friend.id === transactionRequest.userApprovingPayment.id)[0];
			// setUserApprovingPayment(tempRecivingProfile)

			setDescription(transactionRequest.description);
			setDueDate(formatDate(transactionRequest.dueDate));
			setAmount(transactionRequest.amount);
			setCurrency(transactionRequest.currency);
		}
	}, [myProfile, contacts, transactionRequest]);

	const onSubmit = (e) => {
		e.preventDefault();

		const newTransactionRequest = {
			id: transactionRequestId !== "new" ? transactionRequestId : "",

			userRequestingPayment:
				userRequestingPayment === "" ? null : userRequestingPayment,
			userApprovingPayment:
				userApprovingPayment === "" ? null : userApprovingPayment,
			accountPaymentTo: accountPaymentTo === "" ? null : accountPaymentTo,
			description: description,
			dueDate: dueDate,
			amount: +amount,
			currency: currency,
		};

		saveTransactionRequest(newTransactionRequest);
		history.push("/payments");
	};

	return (
		<>
			<h3>New Transaction Request</h3>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					{myProfile === "" ? (
						<div>Laoding</div>
					) : (
						<form className={classes.form} noValidate onSubmit={onSubmit}>
							<Grid container spacing={2}>
								{transactionRequestId !== "new" && (
									<Grid item xs={12}>
										<TextField
											select
											label="User requesting payments"
											value={userRequestingPayment || ""}
											onChange={(e) => setUserRequestingPayment(e.target.value)}
											name="userRequestingPayment"
											variant="outlined"
											id="userRequestingPayment"
											fullWidth
										>
											{userRequestingPayment.firstName}{" "}
											{userRequestingPayment.lastName}
										</TextField>
									</Grid>
								)}

								<Grid item xs={12}>
									<TextField
										select
										value={accountPaymentTo || ""}
										onChange={(e) => setAccountPaymentTo(e.target.value)}
										name="accountPaymentTo"
										variant="outlined"
										fullWidth
										id="accountPaymentTo"
										label="Payment to account"
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
										label="Send request to"
										value={userApprovingPayment || ""}
										onChange={(e) => setUserApprovingPayment(e.target.value)}
										name="userApprovingPayment"
										variant="outlined"
										id="userApprovingPayment"
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
