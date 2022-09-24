import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)
  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setLoggedUser(null))
  }

  const handleLikes = async (blogObj) => {
    const blogObject = {
      user: blogObj.user.id,
      likes: blogObj.likes + 1,
      author: blogObj.author,
      title: blogObj.title,
      url: blogObj.url,
    }

    try {
      dispatch(updateBlog(blogObj.id, blogObject))
      const message = `added like to ${blogObject.title}!`
      const type = 'success'
      dispatch(setNotification({ message, type }, 5))
    } catch (exception) {
      const message = 'could not update blog!'
      const type = 'error'
      dispatch(setNotification({ message, type }, 5))
    }
  }

  const handleDelete = async (blogObj) => {
    const confirm = window.confirm(
      `Remove ${blogObj.title} by ${blogObj.author}`
    )

    if (confirm) {
      if (!blogService.token) {
        blogService.setToken(loggedUser.token)
      }

      try {
        dispatch(deleteBlog(blogObj.id))
        const message = `deleted ${blogObj.title}!`
        const type = 'success'
        dispatch(setNotification({ message, type }, 5))
      } catch (exception) {
        const message = 'could not delete blog!'
        const type = 'error'
        dispatch(setNotification({ message, type }, 5))
      }
    }
  }

  const addBlog = async (blogObject) => {
    if (!blogService.token) {
      blogService.setToken(loggedUser.token)
    }
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      const message = `A new blog ${blogObject.title} by ${blogObject.author} added`
      const type = 'success'
      dispatch(setNotification({ message, type }, 5))
    } catch (exception) {
      const message = 'Unable to add blog'
      const type = 'error'
      dispatch(setNotification({ message, type }, 5))
    }
  }

  const blogList = () => (
    <>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
            user={loggedUser}
          />
        ))}
      </div>
    </>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => (
    <>
      {loggedUser.name} logged in{' '}
      <button onClick={() => handleLogout()}>logout</button>
    </>
  )

  return (
    <>
      <div>
        <Notification notification={notification} />
        {loggedUser === null && <LoginForm />}
        {loggedUser !== null && (
          <div>
            <Link to="/">blogs</Link>
            <Link to="users">users</Link>
            {logout()}
            <h2>blog app</h2>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route
          path="/"
          element={
            loggedUser !== null && (
              <div>
                {blogForm()}
                {blogList()}
              </div>
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
