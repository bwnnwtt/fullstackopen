import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
  },
})

export default store
