import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'

const accountsAdapter = createEntityAdapter()

const initialState = accountsAdapter.getInitialState({
    ids: ['a', 'b', 'c'],
    entities: {
        a: {id: 'a',
            name: 'a',
            avatar: null,
            self: true,
            subscribed: false
        },
        b: {
            id: 'b',
            name: 'b',
            avatar: null,
            self: false,
            subscribed: true
        },
        c: {id: 'c',
            name: 'c',
            avatar: null,
            self: false,
            subscribed: false
        }
    }
})



const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: accountsAdapter.addOne,
        subscribe: accountsAdapter.setOne
    }
})

export default accountsSlice.reducer

export const {addAccount, subscribe} = accountsSlice

