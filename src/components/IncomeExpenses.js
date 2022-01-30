import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import makeStyles from "@mui/styles/makeStyles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
	layout: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		minHeight: "calc(100vh - 130px)",
	},
	topHeader: { justifyContent: "space-between" },
}));

export const IncomeExpenses = ({ setNavState }) => {
	const { transactions, getMyProfile } = useContext(GlobalContext);
	const transactionsAmounts = transactions.map((tr) => tr.amount);
	const income = transactionsAmounts
		.filter((amount) => amount > 0)
		.reduce((a, b) => a + b, 0)
		.toFixed(2);
	let history = useHistory();
	const classes = useStyles();
	const [myProfile, setMyProfile] = useState("");

	useEffect(() => {
		let disposed = false;
		setNavState(0);

		(async () => {
			if (disposed) return;
			const myTempProfile = await getMyProfile();
			setMyProfile(myTempProfile.data);
		})();

		return () => (disposed = true);
	}, [setNavState]);

	function logout() {
		AuthService.logout();
		history.push("/signIn");
	}

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event, product) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (option) => {
		setAnchorEl(null);
		if (option.value === "accounts") {
			history.push("/my-profile/accounts");
		}
	};

	const open = Boolean(anchorEl);

	const MenuOptions = [{ caption: "Accounts", value: "accounts" }];

	return (
		<>
			<div className={classes.layout}>
				<div>
					<div className="inc-exp-container-header">
						<div>
							{myProfile ? (
								<ListItem key={myProfile.id} className={classes.card}>
									<ListItemAvatar>
										<Avatar
											src={
												"https://avatars.dicebear.com/api/micah/" +
												myProfile.firstName +
												myProfile.lastName +
												".svg"
											}
										></Avatar>
									</ListItemAvatar>

									<ListItemText
										primary={myProfile.firstName + " " + myProfile.lastName}
										secondary={myProfile.email}
									/>
									<div>
										<IconButton
											edge="end"
											size="small"
											onClick={(e) => handleClick(e)}
										>
											<SettingsIcon color="disabled" />
										</IconButton>
										<Menu
											anchorEl={anchorEl}
											keepMounted
											onClose={handleClose}
											open={open}
										>
											{MenuOptions.map((option) => (
												<MenuItem
													key={option.caption}
													onClick={(e) => handleClose(option)}
												>
													{option.caption}
												</MenuItem>
											))}
										</Menu>
									</div>
								</ListItem>
							) : (
								""
							)}
						</div>
					</div>

					<div className="inc-exp-container">
						<div>
							<h4>Total amount in transactions</h4>
							<p className="money minus">{income}</p>
						</div>
					</div>
				</div>

				<div>
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						onClick={logout}
					>
						Logout
					</Button>
				</div>
			</div>
		</>
	);
};
