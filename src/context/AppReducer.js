export default function appReducer(state, action) {
	switch (action.type) {
		case "GET_MY_PROFILE":
			return {
				...state,
				loding: false,
				myProfile: action.payload,
			};
		case "MY_PROFILE_ERROR":
			return {
				...state,
				error: action.payload,
				myProfile: {},
			};
		case "GET_TRANSACTIONS":
			return {
				...state,
				loding: false,
				transactions: action.payload,
			};
		case "DELETE_TRANSACTION":
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction) => transaction.id !== action.payload
				),
			};
		case "ADD_TRANSACTION":
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case "EDIT_TRANSACTION":
			return {
				...state,
				transactions: state.transactions.map((transaction) =>
					+transaction.id === +action.payload.id ? action.payload : transaction
				),
			};
		case "TRANSACTION_ERROR":
			return {
				...state,
				error: action.payload,
				transactions: [],
			};
		case "GET_TRANSACTION_REQUESTS":
			return {
				...state,
				loding: false,
				transactionRequestsReceived: action.payload.filter(
					(req) =>
						req.received === true &&
						req.dateOfApproval === undefined &&
						req.dateOfRejection === undefined
				),
				transactionRequestsReceivedAndConfirmed: action.payload.filter(
					(req) => req.received === true && req.dateOfApproval
				),
				transactionRequestsReceivedAndRejected: action.payload.filter(
					(req) => req.received === true && req.dateOfRejection
				),
				transactionRequestsSent: action.payload.filter(
					(req) => req.received === false
				),
			};

		case "TRANSACTION_REQUEST_ERROR":
			return {
				...state,
				error: action.payload,
				transactionRequests: [],
			};
		case "GET_CONTACTS":
			return {
				...state,
				loding: false,
				contacts: action.payload,
			};
		case "ADD_CONTACT":
			return {
				...state,
				contacts: [...state.contacts],
			};
		case "EDIT_CONTACTS":
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					+contact.id === +action.payload.id ? action.payload : contact
				),
			};
		case "CONTACTS_ERROR":
			return {
				...state,
				error: action.payload,
				contacts: [],
			};
		default:
			return state;
	}
}
