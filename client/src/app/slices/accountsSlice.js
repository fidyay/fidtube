import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const accountsAdapter = createEntityAdapter()

export const fetchAccounts = createAsyncThunk('fetchAccounts', async () => {   
    const token = localStorage.getItem('token')
    const response = await axios.get('/accounts', {headers: {"Authorization": token ? `Bearer ${token}` : ''}})
    return response.data
})

const initialState = accountsAdapter.getInitialState({status: 'idle'})

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        setAccounts: accountsAdapter.setMany,
        subscribe: (state, action) => {
            const token = localStorage.getItem('token')
            if (!token) return
            const { subscribtionAccountId } = action.payload
            const currentUserId = state.ids.find(id => state.entities[id].self) 
            axios.post('/subscribe', { currentUserId, subscribtionAccountId }, 
            {headers: {"Authorization": token ? `Bearer ${token}` : ''}})
            state.entities[subscribtionAccountId].subscribed = true
        },
        unsubscribe: (state, action) => {
            const token = localStorage.getItem('token')
            if (!token) return
            const { subscribtionAccountId } = action.payload
            const currentUserId = state.ids.find(id => state.entities[id].self) 
            axios.post('/unsubscribe', { currentUserId, subscribtionAccountId }, 
            {headers: {"Authorization": token ? `Bearer ${token}` : ''}})
            state.entities[subscribtionAccountId].subscribed = false
        },
        removeAccount: (state, action) => {
            state.ids.forEach(id => {
                state.entities[id].self = false
                state.entities[id].subscribed = false
            })
            accountsAdapter.removeOne(state, action.payload.id)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAccounts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            accountsAdapter.setMany(state, action.payload)
        })
        .addCase(fetchAccounts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchAccounts.rejected, (state, action) => {
            state.status = 'error'
        })
    }
})

export default accountsSlice.reducer

export const {setAccounts, subscribe, unsubscribe, removeAccount} = accountsSlice.actions

