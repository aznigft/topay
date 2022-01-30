import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@mui/styles/makeStyles";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import TransactionRequestListComponent from "./TransactionRequestListComponent";

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: "fixed",
		display: "flex",
		flexDirection: "column",
		bottom: "10vh",
		right: "4vw",
	},
}));

export const TransactionRequests = () => {
	const {
		transactionRequestsSent,
		transactionRequestsReceived,
		transactionRequestsReceivedAndConfirmed,
		transactionRequestsReceivedAndRejected,
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
		transactionRequestsReceivedAndRejected,
	]);

	const [showToConfirm, setShowToConfirm] = useState(true);
	const [showConfirmed, setShowConfirmed] = useState(false);
	const [showRejected, setShowRejected] = useState(false);
	const [showSent, setShowSent] = useState(false);

	return (
		<>
			<ul className="list">
				<TransactionRequestListComponent
					showList={showToConfirm}
					setShowList={setShowToConfirm}
					requestList={transactionRequestsReceived}
					listName="To Confirm"
				/>

				<TransactionRequestListComponent
					showList={showConfirmed}
					setShowList={setShowConfirmed}
					requestList={transactionRequestsReceivedAndConfirmed}
					listName="Confirmed"
				/>

				<TransactionRequestListComponent
					showList={showRejected}
					setShowList={setShowRejected}
					requestList={transactionRequestsReceivedAndRejected}
					listName="Rejected"
				/>

				<TransactionRequestListComponent
					showList={showSent}
					setShowList={setShowSent}
					requestList={transactionRequestsSent}
					listName="Sent"
				/>
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
