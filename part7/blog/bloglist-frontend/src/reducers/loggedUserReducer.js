import { createSlice } from '@reduxjs/toolkit'

const loggedUserReducerSlice = createSlice({
  name: 'loggedUserReducer',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
  },
})

export const { setLoggedUser } = loggedUserReducerSlice.actions
export default loggedUserReducerSlice.reducer
