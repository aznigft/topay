import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import authHeader from "../services/auth-header";

const initialState = {
	transactions: [],
	transactionRequestsReceived: [],
	transactionRequestsSent: [],
	transactionRequestsReceivedAndConfirmed: [],
	contacts: [],
	myProfile: null,
	error: null,
	loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const baseUrl = "http://35.157.21.203:8081/";

	function getMyProfile() {
		try {
			const res = axios.get(baseUrl + "myProfile", {
				headers: authHeader(),
			});

			dispatch({
				type: "GET_MY_PROFILE",
				payload: res.data,
			});
			return new Promise((resolve, reject) => {
				if (true) {
					resolve(res);
				} else {
					reject("Error");
				}
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: "MY_PROFILE_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function saveBankAccount(bankAccount) {
		try {
			let res;

			if (!bankAccount.id) {
				res = await axios.post(baseUrl + "myProfile/accounts", bankAccount, {
					headers: authHeader(),
				});
			} else {
				res = await axios.put(baseUrl + "myProfile/accounts", bankAccount, {
					headers: authHeader(),
				});
			}

			const tempMyProfile = await getMyProfile();
			return tempMyProfile;
		} catch (err) {
			console.log(err);
			dispatch({
				type: "MY_PROFILE_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function deleteAccount(accountId) {
		try {
			const res = await axios.delete(
				baseUrl + "myProfile/accounts/" + accountId,
				{ headers: authHeader() }
			);

			const tempMyProfile = await getMyProfile();
			return tempMyProfile;
		} catch (err) {
			console.log(err);
			dispatch({
				type: "MY_PROFILE_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function getTransactions() {
		try {
			const res = await axios.get(baseUrl + "transactions", {
				headers: authHeader(),
			});

			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function getTransaction(id) {
		try {
			const res = await axios.get(baseUrl + "transactions/" + id, {
				headers: authHeader(),
			});

			return res.data;
		} catch (err) {
			console.log(err);
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function saveTransaction(transaction) {
		let res;

		if (!transaction.id) {
			res = await axios.post(baseUrl + "transactions", transaction, {
				headers: authHeader(),
			});
		} else {
			res = await axios.put(baseUrl + "transactions", transaction, {
				headers: authHeader(),
			});
		}

		try {
			if (!!res.data) {
				getTransactions();
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function deleteTransaction(id) {
		try {
			const res = await axios.delete(baseUrl + "transactions/" + id, {
				headers: authHeader(),
			});

			if (res.data === true) {
				getTransactions();
			}

			// dispatch({
			//     type: 'DELETE_TRANSACTION',
			//     payload: id
			// });
		} catch (err) {
			console.log(err);
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.error,
			});
		}
	}

	function editTransaction(transaction) {
		saveTransaction(transaction);

		// dispatch({
		//     type: 'EDIT_TRANSACTION',
		//     payload: transaction
		// })
	}

	async function saveTransactionRequest(transactionRequest) {
		let res;

		if (!transactionRequest.id) {
			res = await axios.post(
				baseUrl + "transaction-request",
				transactionRequest,
				{ headers: authHeader() }
			);
		} else {
			res = await axios.put(
				baseUrl + "transaction-request",
				transactionRequest,
				{ headers: authHeader() }
			);
		}

		try {
			if (!!res.data) {
				getTransactionRequests();
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: "TRANSACTION_REQUEST_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function getTransactionRequests() {
		try {
			const res = await axios.get(baseUrl + "transaction-requests", {
				headers: authHeader(),
			});

			console.log("requests");
			console.log(res.data);

			dispatch({
				type: "GET_TRANSACTION_REQUESTS",
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: "TRANSACTION_REQUEST_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function getTransactionRequest() {}

	async function getContacts() {
		try {
			const res = await axios.get(baseUrl + "contacts", {
				headers: authHeader(),
				params: { status: "" },
			});

			dispatch({
				type: "GET_CONTACTS",
				payload: res.data,
			});
			return res.data;
		} catch (err) {
			console.log(err);
			dispatch({
				type: "CONTACTS_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function confirmTransactionRequest(transactionRequestId) {
		const res = await axios.get(
			baseUrl + "transaction-requests/" + transactionRequestId + "/confirm",
			{
				headers: authHeader(),
			}
		);
		if (!!res.daya) {
			getTransactions();
			getTransactionRequests();
		}
	}

	async function addContact(emailAddress) {
		const contactRequest = { email: emailAddress };
		const res = await axios.post(baseUrl + "contacts", contactRequest, {
			headers: authHeader(),
		});

		try {
			if (!!res.data) {
				getContacts();
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: "CONTACTS_ERROR",
				payload: err.response.error,
			});
		}

		dispatch({
			type: "ADD_CONTACT",
		});
	}

	async function deleteContact(contactId) {
		const res = await axios.delete(baseUrl + "contacts/" + contactId, {
			headers: authHeader(),
		});

		try {
			if (!!res.data) {
				getContacts();
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: "CONTACTS_ERROR",
				payload: err.response.error,
			});
		}
	}

	async function changeRequestStatus(id, requestStatus) {
		const requestStatusChange = { requestId: id, status: requestStatus };

		const res = await axios.post(
			baseUrl + "contacts/status",
			requestStatusChange,
			{ headers: authHeader() }
		);

		try {
			if (!!res.data) {
				getContacts();
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: "CONTACTS_ERROR",
				payload: err.response.error,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				transactionRequestsReceived: state.transactionRequestsReceived,
				transactionRequestsSent: state.transactionRequestsSent,
				transactionRequestsReceivedAndConfirmed:
					state.transactionRequestsReceivedAndConfirmed,
				contacts: state.contacts,
				error: state.error,
				loading: state.loading,
				myProfile: state.myProfile,
				getMyProfile,
				saveBankAccount,
				deleteAccount,
				getTransaction,
				getTransactions,
				deleteTransaction,
				saveTransaction,
				editTransaction,
				getTransactionRequests,
				getTransactionRequest,
				saveTransactionRequest,
				confirmTransactionRequest,
				getContacts,
				addContact,
				deleteContact,
				changeRequestStatus,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
