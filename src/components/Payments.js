import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { TransactionList } from "./TransactionList";
import { TransactionRequests } from "./TransactionRequests";
import makeStyles from "@mui/styles/makeStyles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

export const Payments = ({ setNavState }) => {
	const { getTransactions, getTransactionRequests } = useContext(GlobalContext);
	const classes = useStyles();

	const [selectedTab, setSelectedTab] = useState("transactions");

	useEffect(() => {
		getTransactions();
		getTransactionRequests();
		setNavState(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<>
			<h3>Payments</h3>

			<Tabs
				value={selectedTab}
				onChange={handleTabChange}
				textColor="primary"
				indicatorColor="primary"
				aria-label="primary tabs example"
				className={classes.tabs}
			>
				<Tab value="transactions" label="Transactions" />
				<Tab value="requests" label="Requests" />
			</Tabs>

			{selectedTab === "requests" ? (
				<TransactionRequests></TransactionRequests>
			) : (
				<TransactionList></TransactionList>
			)}
		</>
	);
};
