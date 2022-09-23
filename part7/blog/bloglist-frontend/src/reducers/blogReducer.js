import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      console.log('action', action)
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    await blogService.create(blog)
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.removeBlog(id)
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const { setBlogs, appendBlog, updateBlogs, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
