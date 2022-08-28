import { useState } from "react"

const Blog = ({blog}) => {

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
    <>
      <div style={{...hideWhenVisible, ...blogStyle}}>
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
      </div>
      <div style={{...showWhenVisible, ...blogStyle}}>
        <div>{blog.title} {blog.author}<button onClick={toggleView}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.user.name}</div>
        <div><button>remove</button></div>
      </div>
    </>
  )
}

export default Blog