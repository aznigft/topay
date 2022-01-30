import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "../context/GlobalState";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ mx: 2, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 0,
						top: 0,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function PayTransactionDialogv2({
	dialogOpen,
	setDialogOpen,
	transaction,
}) {
	React.useEffect(() => {
		setSelectedTransaction(transaction);
	}, [transaction]);

	const { setTransactionAsPaid } = React.useContext(GlobalContext);

	const [selectedTransaction, setSelectedTransaction] = React.useState("");

	const handleClose = () => {
		setDialogOpen(false);
	};

	const handleConfirmingPayment = () => {
		console.log("Confirming transaction payment " + transaction.id);
		setTransactionAsPaid(transaction.id);
		handleClose();
	};

	return (
		<div>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={dialogOpen}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					Transaction details
				</BootstrapDialogTitle>

				{selectedTransaction === "" ? (
					<div>Loading</div>
				) : (
					<div>
						<DialogContent dividers sx={{ p: 1 }}>
							{transaction.receivingProfile ? (
								<Typography gutterBottom>
									Payment to: {transaction.receivingProfile.firstName}
								</Typography>
							) : (
								""
							)}

							{transaction.receivingAccount ? (
								<Typography gutterBottom>
									Account:{transaction.receivingAccount.bankName}
								</Typography>
							) : (
								""
							)}

							<Typography gutterBottom>
								Description:{transaction.description}
							</Typography>
							<Typography gutterBottom>Amount:{transaction.amount}</Typography>
						</DialogContent>
						<DialogActions>
							<Button autoFocus onClick={handleConfirmingPayment}>
								Save changes
							</Button>
						</DialogActions>
					</div>
				)}
			</BootstrapDialog>
		</div>
	);
}
