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

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.loggedUser)

  useEffect(() => {
    dispatch(initializeBlogs())
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
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => (
    <p>
      {loggedUser.name} logged in{' '}
      <button onClick={() => handleLogout()}>logout</button>
    </p>
  )

  return (
    <div>
      {loggedUser === null && <LoginForm />}
      {loggedUser !== null && (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          {logout()}
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
