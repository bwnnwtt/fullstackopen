import { createSlice } from '@reduxjs/toolkit'

let prevTimeID = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return state = action.payload
    },
    clearNotification(state) {
      return state = null
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch(createNotification(message))

    clearTimeout(prevTimeID)
  
    prevTimeID = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer