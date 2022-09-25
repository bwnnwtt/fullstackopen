import { useEffect, useRef } from 'react'
// import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link, useMatch, Navigate } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import FullBlog from './components/FullBlog'
import { Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)
  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

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
      const type = 'danger'
      dispatch(setNotification({ message, type }, 5))
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => (
    <>
      {loggedUser.name} logged in{' '}
      <Button variant="dark" onClick={() => handleLogout()}>
        logout
      </Button>
    </>
  )

  return (
    <div className="container">
      <div className="container">
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
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element={<FullBlog />} />
        <Route
          path="/users"
          element={
            loggedUser ? <Users users={users} /> : <Navigate replace to="/" />
          }
        />
        <Route
          path="/"
          element={
            loggedUser !== null && (
              <div className="container">
                {blogForm()}
                <Blogs blogs={blogs} />
              </div>
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
