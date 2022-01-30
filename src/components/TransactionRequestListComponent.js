import React from "react";
import TransactionRequestCardSent from "./TransactionRequestCardSent";
import TransactionRequestCardReceived from "./TransactionRequestCardReceived";
import makeStyles from "@mui/styles/makeStyles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

export default function TransactionRequestListComponent({
	showList,
	setShowList,
	requestList,
	listName,
}) {
	const classes = useStyles();

	const confirmed =
		requestList.length > 0
			? requestList[0].dateOfApproval || requestList[0].dateOfRejection
			: false;

	return (
		<>
			<h4
				className={classes.filterHeader}
				onClick={() => setShowList(!showList)}
			>
				{showList && requestList.length > 0 ? (
					<ArrowDropDownIcon fontSize="small" />
				) : (
					<ArrowRightIcon fontSize="small" />
				)}
				{listName} ( {requestList.length} )
			</h4>

			{showList && requestList
				? requestList.map((request) =>
						listName === "Sent" ? (
							<TransactionRequestCardSent
								key={request.id}
								request={request}
								confirmed={confirmed}
							/>
						) : (
							<TransactionRequestCardReceived
								key={request.id}
								request={request}
								confirmed={confirmed}
							/>
						)
				  )
				: ""}
		</>
	);
}
