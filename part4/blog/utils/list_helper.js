const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length !== 0 ? blogs.map(blog => blog.likes).reduce((prev, curr) => prev + curr, 0) : 0
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return {}
  } else {
    maxLikes = Math.max(...blogs.map(blog => blog.likes))
    // console.log("maxLikes: ", maxLikes)
    return blogs.filter(blog => blog.likes === maxLikes)[0]
  }
}

module.exports = { dummy, totalLikes, favoriteBlog }