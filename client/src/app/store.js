import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './slices/accountsSlice.js'
import videosReducer from './slices/videosSlice.js'


export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    videos: videosReducer
  },
});
