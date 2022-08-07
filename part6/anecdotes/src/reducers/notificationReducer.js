import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeout = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      if (!action.payload) {
        return initialState
      }
    }
  } })

export const { addNotification, removeNotification } = notificationSlice.actions
export const setNotification = (message) => {
  return dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }
    dispatch(addNotification(message))
    timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}
export default notificationSlice.reducer