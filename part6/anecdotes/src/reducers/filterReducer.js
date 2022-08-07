import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      return action.payload
    }
  }
})

export const { createFilter } = filterReducer.actions
export default filterReducer.reducer