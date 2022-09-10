import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [update, setUpdate] = useState(null)

  function sortByLikes(a, b) {
    if ( a.likes > b.likes ) {
      return -1
    }
    if ( a.likes < b.likes) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortByLikes) )
    )  
  }, [update])

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
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = 'wrong username or password'
      const type = 'error'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
      url: blogObj.url
    }

    try {
      const updatedBlog = await blogService.update(blogObj.id, blogObject)
      setUpdate(Math.floor(Math.random() * 1000))
      const message = `added like to ${updatedBlog.title}!`
      const type = 'success'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      const message = 'could not update blog!'
      const type = 'error'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  const handleDelete = async (blogObj) => {

    const confirm = window.confirm(`Remove ${blogObj.title} by ${blogObj.author}`)

    if(confirm) {
      try {
        const deletedBlog = await blogService.removeBlog(blogObj.id)
        setUpdate(Math.floor(Math.random() * 1000))
        const message = `deleted ${blogObj.title}!`
        const type = 'success'
        setNotification({ message, type })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        const message = 'could not delete blog!'
        const type = 'error'
        setNotification({ message, type })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      {notification !== null && <Notification notification={notification}/>}
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const addBlog = async (blogObject) => {
    
    try {
      const addedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      const message = `A new blog ${addedBlog.title} by ${addedBlog.author} added`
      const type = 'success'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      const message = 'Unable to add blog'
      const type = 'error'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    
  }

  const blogList = () => (
    <>
      <div>
        {blogs.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            handleLikes={handleLikes} 
            handleDelete={handleDelete}
            user={user}
          />
        )}
      </div>
    </>
  )
  
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => (
    <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && 
        <div>
          <h2>blogs</h2>
          {notification !== null && <Notification notification={notification}/>}
          {logout()}
          {/* <BlogForm createBlog={addBlog} /> */}
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App
