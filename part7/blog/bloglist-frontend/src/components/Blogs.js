const Blogs = ({ blogs }) => {
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
      {blogs.map((blog) => {
        return (
          <div style={blogStyle} key={blog.id}>
            <a href={`/blogs/${blog.id}`}>{blog.title}</a>
          </div>
        )
      })}
    </>
  )
}

export default Blogs
