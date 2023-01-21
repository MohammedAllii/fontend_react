import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import storieService from './storieService'

const initialState = {
  stories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
// Create new storie
export const createStorie = createAsyncThunk(
  'stories/create',
  async (storieData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
    
      return await storieService.createStorie(storieData, token)
      
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user stories
export const getStories = createAsyncThunk(
  'stories/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await storieService.getStories(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user stories
export const deleteStorie = createAsyncThunk(
  'stories/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await storieService.deleteStorie(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const storieSlice = createSlice({
  name: 'storie',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStorie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createStorie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stories.push(action.payload)
      })
      .addCase(createStorie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stories = action.payload
      })
      .addCase(getStories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteStorie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteStorie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stories = state.stories.filter(
          (storie) => storie._id !== action.payload.id
        )
      })
      .addCase(deleteStorie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = storieSlice.actions
export default storieSlice.reducer
