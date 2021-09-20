export default function appReducer (state, action) {

    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loding: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            } 
        case 'EDIT_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(transaction => +transaction.id === +action.payload.id ? action.payload : transaction)
            }     
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload,
                transactions: []
            }      
        default:
            return state;
    }
}