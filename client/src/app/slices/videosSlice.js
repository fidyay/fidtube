import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const videosAdapter = createEntityAdapter()

export const fetchVideos = createAsyncThunk('fetchVideos', async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get('/videos', {headers: {"Authorization": token ? `Bearer ${token}` : ''}})
    return response.data
})


const initialState = videosAdapter.getInitialState({status: 'idle'})


const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideo: videosAdapter.setOne,
        removeAccountsVideos: (state, action) => {
            const accountId = action.payload.id
            const accountsVideosIds = []
            state.ids.forEach(videoId => {
                if (state.entities[videoId].author === accountId) {
                    accountsVideosIds.push(videoId)
                }
            })
            videosAdapter.removeMany(state, accountsVideosIds)
        },
        removeVideo: videosAdapter.removeOne
    },
    extraReducers(builder) {
        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.status = 'succeeded'
            videosAdapter.setMany(state, action.payload)
        })
        .addCase(fetchVideos.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchVideos.rejected, (state, action) => {
            state.status = 'error'
        })
    }
})


export default videosSlice.reducer

export const { setVideo, removeAccountsVideos, removeVideo } = videosSlice.actions

