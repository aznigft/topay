import React, { useEffect, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import makeStyles from "@mui/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddBankAccountDialog from "./AddBankAccountDialog";
import { GlobalContext } from "../context/GlobalState";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
	card: {
		padding: 10,
		margin: 10,
		backgroundColor: "transparent",
		boxShadow: "none",
	},
	addButton: {
		position: "fixed",
		bottom: "10vh",
		right: "8vw",
	},
	tabs: {
		justifyContent: "space-between",
	},
}));

const BankAccounts = ({ setNavState }) => {
	const classes = useStyles();

	const MenuOptions = [
		{ caption: "Edit", value: "edit" },
		{ caption: "Delete", value: "delete" },
	];

	const emptyBankAccount = {
		id: "",
		name: "",
		number: "",
		bankName: "",
		visibleToOthers: true,
	};

	const [myProfile, setMyProfile] = React.useState(null);
	const [selectedBankAccount, setSelectedBankAccount] =
		React.useState(emptyBankAccount);

	const { getMyProfile, deleteAccount } = useContext(GlobalContext);

	useEffect(() => {
		let disposed = false;

		if (myProfile === null) {
			(async () => {
				if (disposed) return;
				const myTempProfile = await getMyProfile();
				setMyProfile(myTempProfile.data);
			})();
		}
		return () => (disposed = true);
		setNavState(0);
	}, [myProfile]);

	useEffect(() => {}, [selectedBankAccount]);

	const [dialogOpen, setDialogOpen] = React.useState(false);
	const openEditBankAccountDialog = () => {
		setDialogOpen(true);
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event, account) => {
		setSelectedBankAccount(account);
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);

	const handleClose = (option) => {
		if (option.value === "edit") {
			openEditBankAccountDialog();
		} else if (option.value === "delete") {
			hendleDeletingAccount(selectedBankAccount.id);
		}

		setAnchorEl(null);
	};

	async function hendleDeletingAccount(accountId) {
		const myTempAcc = await deleteAccount(accountId, setMyProfile);
		setMyProfile(myTempAcc.data);
		setSelectedBankAccount(emptyBankAccount);
	}

	return (
		<div>
			<h3>Accounts</h3>
			{myProfile === null ? (
				<div>Laoding</div>
			) : (
				<List>
					{myProfile.accounts.map((account, i) => (
						<ListItem
							divider={i < account.length - 1}
							key={account.id}
							className={classes.card}
						>
							<ListItemText primary={account.name} />

							<IconButton
								edge="end"
								size="small"
								onClick={(e) => handleClick(e, account)}
							>
								<MoreVertIcon />
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
						</ListItem>
					))}
				</List>
			)}

			<div className={classes.addButton}>
				<Fab color="primary" aria-label="add" size="medium">
					<AddIcon onClick={openEditBankAccountDialog} />
				</Fab>
				<AddBankAccountDialog
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
					bankAcccountDetails={selectedBankAccount}
					setSelectedBankAccount={setSelectedBankAccount}
					setMyProfile={setMyProfile}
				/>
			</div>
		</div>
	);
};

export default BankAccounts;
