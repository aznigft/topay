import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    async function getTransactions() {
        try{
            const res = await axios.get('http://localhost:8081/transactions')
        
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.error
            })
        }
    }

    async function deleteTransaction(id) {

        const res = await axios.delete('http://localhost:8081/transactions/' + id)

        try {

            if(res.data === true) {
                getTransactions();
            }
            
            // dispatch({
            //     type: 'DELETE_TRANSACTION',
            //     payload: id
            // });
        } catch(err) {
            console.log(err)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.error
            })
        }
    }

    async function addTransaction(transaction) {

        const res = await axios.post('http://localhost:8081/transactions', transaction)

        try{

            if(!!res.data ) {
                getTransactions();
            }
            // dispatch({
            //     type: 'ADD_TRANSACTION',
            //     payload: res.data
            // })
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.error
            })
        }

        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    function editTransaction(transaction) {

        addTransaction(transaction);

        // dispatch({
        //     type: 'EDIT_TRANSACTION',
        //     payload: transaction
        // })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        editTransaction
    }}>
        {children}
    </GlobalContext.Provider>); 
}