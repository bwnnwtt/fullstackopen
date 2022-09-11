import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleView = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    marginTop: 3,
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    paddingBottom: 10,
  }

  return (
    <div className='blog'>
      <div style={{ ...hideWhenVisible, ...blogStyle }} className='blogDefault'>
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
      </div>
      <div style={{ ...showWhenVisible, ...blogStyle }}>
        <div>{blog.title} {blog.author}<button onClick={toggleView}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && <div><button onClick={() => handleDelete(blog)}>remove</button></div>}
      </div>
    </div>
  )
}

export default Blog