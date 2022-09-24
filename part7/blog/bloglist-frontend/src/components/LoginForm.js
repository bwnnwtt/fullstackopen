import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      const message = `user ${user.name} logged in!`
      const type = 'success'
      dispatch(setNotification({ message, type }, 5))
    } catch (exception) {
      const message = 'wrong username or password'
      const type = 'error'
      dispatch(setNotification({ message, type }, 5))
    }
  }

  return (
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
}

export default LoginForm
