import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import TransactionRequestCardSent from "./TransactionRequestCardSent";
import TransactionRequestCardReceived from "./TransactionRequestCardReceived";
import makeStyles from "@mui/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	button: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	headerLinkButton: {
		background: "none!important",
		border: "none",
		padding: "0!important",
		fontFamily: "inherit",
		textDecoration: "inherit",
		cursor: "pointer",
		fontSize: "inherit",
	},
	addButton: {
		position: "fixed",
		display: "flex",
		flexDirection: "column",
		bottom: "10vh",
		right: "4vw",
	},
	transactionHeander: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottom: "1px solid #bbb",
		marginBottom: "40px",
	},
	specialH3: {
		borderBottom: "0px",
	},
	activeTab: {
		color: "#1976d2",
	},
	inactiveTab: {
		color: "inherit",
	},
	filterHeader: {
		borderBottom: "1px solid #bbb",
	},
}));

export const TransactionRequests = () => {
	const {
		transactionRequestsSent,
		transactionRequestsReceived,
		transactionRequestsReceivedAndConfirmed,
		getTransactionRequests,
	} = useContext(GlobalContext);
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		getTransactionRequests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		transactionRequestsSent,
		transactionRequestsReceived,
		transactionRequestsReceivedAndConfirmed,
	]);

	return (
		<>
			<ul className="list">
				<h4 className={classes.filterHeader}>To Confirm</h4>
				{transactionRequestsReceived.map((request) => (
					<TransactionRequestCardReceived
						key={request.id}
						request={request}
						confirmed={false}
					/>
				))}

				<h4 className={classes.filterHeader}>
					Confirmed {transactionRequestsReceivedAndConfirmed.size}
				</h4>
				{transactionRequestsReceivedAndConfirmed.map((request) => (
					<TransactionRequestCardReceived
						key={request.id}
						request={request}
						confirmed={true}
					/>
				))}
				<h4 className={classes.filterHeader}>Sent</h4>
				{transactionRequestsSent.map((request) => (
					<TransactionRequestCardSent key={request.id} request={request} />
				))}
			</ul>
			<div className={classes.addButton}>
				<Fab color="primary" aria-label="add" size="medium">
					<AddIcon
						onClick={() => history.push("/editTransactionRequest/new")}
					/>
				</Fab>
			</div>
		</>
	);
};
