import React, { useEffect, useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ImageIcon from "@mui/icons-material/Image";
import makeStyles from "@mui/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FriendRequestDialog from "./FriendRequestDialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { GlobalContext } from "../context/GlobalState";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
	card: {
		padding: 0,
		margin: 0,
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

const Contacts = ({ setNavState }) => {
	const classes = useStyles();
	const [contactFilter, setContactFilter] = useState("friend");

	const [MenuOptions, setMenuOptions] = useState([]);
	const [contactGroup, setContactGroup] = useState([]);
	const [selectedContact, setSelectedContact] = useState();

	const { contacts, getContacts, changeRequestStatus, deleteContact } =
		useContext(GlobalContext);

	useEffect(() => {
		setNavState(2);
		getContacts();

		console.log("First effect");
	}, [setNavState, contactFilter]);

	useEffect(() => {
		switch (contactFilter) {
			case "friend":
				setContactGroup(
					contacts.filter((contact) => contact.status === "FRIEND")
				);
				setMenuOptions(ContactOptions);
				break;
			case "friendApproval":
				setContactGroup(
					contacts.filter(
						(contact) => contact.status === "WAITING_ON_FRIEND_APPROVAL"
					)
				);
				setMenuOptions(RequestsOptions);
				break;
			case "myApproval":
				setContactGroup(
					contacts.filter(
						(contact) => contact.status === "WAITING_ON_MY_APPROVAL"
					)
				);
				setMenuOptions(ToConfirmOptions);
				break;
			default:
				setContactGroup([]);
				setMenuOptions([]);
		}
	}, [contacts]);

	useEffect(() => {
		console.log(contactGroup);
	}, [contactGroup]);

	const [dialogOpen, setDialogOpen] = React.useState(false);
	const handleClickOpen = () => {
		setDialogOpen(true);
	};

	const handleFilterChange = (event, newValue) => {
		setContactFilter(newValue);
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const ContactOptions = [{ caption: "Delete", value: "delete" }];

	const ToConfirmOptions = [
		{ caption: "Confirm", value: "confirm" },
		{ caption: "Reject", value: "reject" },
	];

	const RequestsOptions = [{ caption: "Delete", value: "delete" }];

	const handleClick = (event, product) => {
		setAnchorEl(event.currentTarget);
		setSelectedContact(product);
	};

	const open = Boolean(anchorEl);

	const handleClose = (product, option) => {
		if (option !== "backdropClick") {
			console.log("Wyrbana opcja to");
			console.log(option);

			if (option.value === "confirm") {
				changeRequestStatus(product.id, option.value);
			} else if (option.value === "delete") {
				deleteContact(selectedContact.id);
			}
		}
		setSelectedContact({});
		setAnchorEl(null);
	};

	return (
		<div>
			<h3>Contacts</h3>
			<Tabs
				value={contactFilter}
				onChange={handleFilterChange}
				textColor="primary"
				indicatorColor="primary"
				aria-label="primary tabs example"
				className={classes.tabs}
			>
				<Tab value="friend" label="Contacts" />
				<Tab value="friendApproval" label="Requests" />
				<Tab value="myApproval" label="To confirm" />
			</Tabs>
			<List>
				{contactGroup.map((product, i) => (
					<ListItem
						divider={i < contactGroup.length - 1}
						key={product.id}
						className={classes.card}
					>
						<ListItemAvatar>
							<Avatar
								src={
									"https://avatars.dicebear.com/api/micah/" +
									product.friend.firstName +
									product.friend.lastName +
									".svg"
								}
							>
								{/* <ImageIcon
									style={{
										height: 48,
										width: 48,
									}}
								/> */}
							</Avatar>
						</ListItemAvatar>

						<ListItemText
							primary={product.friend.firstName + " " + product.friend.lastName}
							secondary={product.friend.email}
						/>

						<IconButton
							edge="end"
							size="small"
							onClick={(e) => handleClick(e, product)}
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
									onClick={(e) => handleClose(product, option)}
								>
									{option.caption}
								</MenuItem>
							))}
						</Menu>
					</ListItem>
				))}
			</List>
			<div className={classes.addButton}>
				<Fab color="primary" aria-label="add" size="medium">
					<AddIcon onClick={handleClickOpen} />
				</Fab>
				<FriendRequestDialog
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
				/>
			</div>
		</div>
	);
};

export default Contacts;
