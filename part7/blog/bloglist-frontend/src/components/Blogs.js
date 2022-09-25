import { Stack } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
  return (
    <Stack gap={3}>
      {blogs.map((blog) => {
        return (
          <div className="bg-light" key={blog.id} hover>
            <a href={`/blogs/${blog.id}`}>{blog.title}</a>
          </div>
        )
      })}
    </Stack>
  )
}

export default Blogs
