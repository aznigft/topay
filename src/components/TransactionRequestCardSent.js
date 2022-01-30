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

export default function TransactionRequestCardSent({ request }) {
	const classes = useStyles();
	const { deleteTransaction, dateFormat } = useContext(GlobalContext);

	let history = useHistory();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} spacing={2}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								{request.userApprovingPayment ? (
									<Typography
										variant="h7"
										mb={1}
										paragraph="true"
										fontWeight="600"
									>
										{request.userApprovingPayment.firstName}{" "}
										{request.userApprovingPayment.lastName}
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
							<Typography variant="body2" color="textSecondary" align="right">
								Due date:{" "}
								{new Date(request.dueDate).toLocaleDateString(
									"en-GB",
									dateFormat
								)}
							</Typography>
							{request.dateOfApproval && !request.paymentDate ? (
								<Typography variant="body2" color="textSecondary" align="right">
									Confirmation:{" "}
									{new Date(request.dateOfApproval).toLocaleDateString(
										"en-GB",
										dateFormat
									)}
								</Typography>
							) : (
								""
							)}
							{request.dateOfRejection ? (
								<Typography variant="body2" color="textSecondary" align="right">
									Rejection:{" "}
									{new Date(request.dateOfRejection).toLocaleDateString(
										"en-GB",
										dateFormat
									)}
								</Typography>
							) : (
								""
							)}
							{request.paymentDate ? (
								<Typography variant="body2" color="textSecondary" align="right">
									Payment:{" "}
									{new Date(request.paymentDate).toLocaleDateString(
										"en-GB",
										dateFormat
									)}
								</Typography>
							) : (
								""
							)}
						</Grid>

						{request.dateOfApproval || request.dateOfRejection ? (
							""
						) : (
							<Grid item xs={12}>
								<ButtonGroup
									variant="text"
									size="small"
									fullWidth={true}
									aria-label="text primary button group"
								>
									<Button
										onClick={() =>
											history.push("/editTransaction/" + request.id)
										}
									>
										Edit
									</Button>
									<Button color="primary">Withdraw</Button>
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
