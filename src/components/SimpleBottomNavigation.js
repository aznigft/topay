import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Home from "@mui/icons-material/Home";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import Contacts from "@mui/icons-material/Contacts";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		position: "sticky",
		width: "100vw",
		bottom: 0,
		left: 0,
		right: 0,
	},
});

export default function SimpleBottomNavigation({ navState, setNavState }) {
	const classes = useStyles();

	return (
		<BottomNavigation
			value={navState}
			onChange={(event, newValue) => {
				setNavState(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction
				label="Home"
				icon={<Home />}
				component={Link}
				to="/"
			/>
			<BottomNavigationAction
				label="Payments"
				icon={<AccountBalanceWallet />}
				component={Link}
				to="/payments"
			/>
			<BottomNavigationAction
				label="Contacts"
				icon={<Contacts />}
				component={Link}
				to="/contacts"
			/>
		</BottomNavigation>
	);
}
