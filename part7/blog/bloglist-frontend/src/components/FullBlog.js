import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeComment, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const FullBlog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

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

  const addComment = (event) => {
    event.preventDefault()

    dispatch(makeComment(comment, blog.id))

    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => handleLikes(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>{blog.comments && blog.comments.map((c) => <li key={c}>{c}</li>)}</ul>
    </>
  )
}

export default FullBlog
