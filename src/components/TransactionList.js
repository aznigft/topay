import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import TransactionCard from "./TransactionCard";
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
}));

export const TransactionList = () => {
	const { transactions, getTransactions } = useContext(GlobalContext);
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		getTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<ul className="list">
				{transactions.map((transaction) => (
					<TransactionCard key={transaction.id} transaction={transaction} />
				))}
			</ul>
			<div className={classes.addButton}>
				<Fab color="primary" aria-label="add" size="medium">
					<AddIcon onClick={() => history.push("/editTransaction/new")} />
				</Fab>
			</div>
		</>
	);
};
