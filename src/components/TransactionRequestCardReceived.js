import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		// padding: theme.spacing(2),
		// margin: 'auto',
		maxWidth: 500,
		padding: 10,
		margin: 10,
	},
	ButtonGroup: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	Button: {
		borderTopRightRatious: "0",
		borderBottomRightRadius: "0",
		borderRight: "1px solid rgba(0, 0, 0, 0.23)",
		borderColor: "rgba(25, 118, 210, 0.5)",
	},
}));

export default function TransactionRequestCardReceived({ request, confirmed }) {
	const classes = useStyles();
	const {
		deleteTransaction,
		confirmTransactionRequest,
		rejectTransactionRequest,
		dateFormat,
	} = useContext(GlobalContext);

	//let history = useHistory();

	const handleConfirmRequest = (event, requestId) => {
		confirmTransactionRequest(requestId);
		// history.push("/payments");
	};

	const handleRejectRequest = (event, requestId) => {
		rejectTransactionRequest(requestId);
		//Dopisać uaktualnienie strony
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} spacing={2}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								{request.userRequestingPayment ? (
									<Typography
										variant="h7"
										mb={1}
										paragraph="true"
										fontWeight="600"
									>
										{request.userRequestingPayment.firstName}{" "}
										{request.userRequestingPayment.lastName}
									</Typography>
								) : (
									""
								)}
								<Typography variant="body2">{request.description}</Typography>
							</Grid>
						</Grid>
						<Grid item mb={1}>
							<Typography
								variant="h7"
								paragraph="true"
								align="right"
								mb={1}
								fontWeight="600"
							>
								{request.amount} {request.currency}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Due date:{" "}
								{new Date(request.dueDate).toLocaleDateString(
									"en-GB",
									dateFormat
								)}
							</Typography>
						</Grid>
						{confirmed ? (
							""
						) : (
							<Grid item xs={12}>
								<ButtonGroup
									variant="text"
									size="small"
									fullWidth={true}
									aria-label="text primary button group"
								>
									<Button onClick={(e) => handleConfirmRequest(e, request.id)}>
										Confirm
									</Button>
									<Button
										color="primary"
										onClick={(e) => handleRejectRequest(e, request.id)}
									>
										Reject
									</Button>
									<Button
										color="secondary"
										onClick={() => deleteTransaction(request.id)}
									>
										Delete
									</Button>
								</ButtonGroup>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
