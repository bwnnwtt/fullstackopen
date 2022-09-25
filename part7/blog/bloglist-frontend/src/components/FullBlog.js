import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
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
    <div className="container">
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <Button size="sm" variant="dark" onClick={() => handleLikes(blog)}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group className="mt-3 mb-3">
          <Form.Control
            id="comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button size="sm" variant="dark" type="submit">
            add comment
          </Button>
        </Form.Group>
      </Form>
      <ul>{blog.comments && blog.comments.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  )
}

export default FullBlog
