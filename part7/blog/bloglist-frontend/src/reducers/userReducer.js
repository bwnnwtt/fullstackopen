import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userReducerSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    const sortedUsers = users
      .slice()
      .sort((a, b) => b.blogs.length - a.blogs.length)
    dispatch(setUsers(sortedUsers))
  }
}

export const { setUsers } = userReducerSlice.actions
export default userReducerSlice.reducer
