import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'

const initialState = {
    transactions: [
        {
            id: 0,
            payingAccount: 'User',
            recivingAccount: 'Allegro sp. z o.o.',
            deadLine: new Date('2021-09-03T00:00:01'),
            description: 'Transaction id - ASDCZXCASDAD',
            amount: 50,
            currency: 'PLN'
        },
        {
            id: 1,
            payingAccount: 'User',
            recivingAccount: 'Inea ',
            deadLine: new Date('2021-08-13T00:00:01'),
            description: 'Monthly bill for internet',
            amount: 30,
            currency: 'PLN'
        },
        {
            id: 2,
            payingAccount: 'User',
            recivingAccount: 'Stefan Burczymucha',
            deadLine: new Date('2021-11-08T00:00:01'),
            description: 'Bill split from last pub visit',
            amount: 13,
            currency: 'EUR'
        },
        {
            id: 3,
            payingAccount: 'User',
            recivingAccount: 'Spotify',
            deadLine: new Date('2021-08-15T00:00:01'),
            description: 'Aplication subscription',
            amount: 9,
            currency: 'EUR'
        },
        {
            id: 4,
            payingAccount: 'User',
            recivingAccount: 'Link 4',
            deadLine: new Date('2021-07-30T00:00:01'),
            description: 'Car insurance yearly fee',
            amount: 700,
            currency: 'PLN'
        },
        ]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    function editTransaction(transaction) {
        dispatch({
            type: 'EDIT_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        editTransaction
    }}>
        {children}
    </GlobalContext.Provider>); 
}