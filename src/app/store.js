import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import storieReducer from '../features/stories/storieSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storieReducer,
  },
})
