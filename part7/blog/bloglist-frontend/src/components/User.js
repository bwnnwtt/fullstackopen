const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="container">
      <h2>{user.name}</h2>
      <h3>
        <p>added blogs</p>
      </h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
