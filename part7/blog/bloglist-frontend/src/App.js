import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
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

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)

      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      const message = `user ${user.name} logged in!`
      const type = 'success'
      dispatch(setNotification({ message, type }, 5))
    } catch (exception) {
      const message = 'wrong username or password'
      const type = 'error'
      dispatch(setNotification({ message, type }, 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
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
        blogService.setToken(user.token)
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

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  )

  const addBlog = async (blogObject) => {
    if (!blogService.token) {
      blogService.setToken(user.token)
    }
    try {
      dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
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
            user={user}
          />
        ))}
      </div>
    </>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => (
    <p>
      {user.name} logged in{' '}
      <button onClick={() => handleLogout()}>logout</button>
    </p>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          {logout()}
          {/* <BlogForm createBlog={addBlog} /> */}
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
