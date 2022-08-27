const _ = require('lodash')

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

    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.filter(blog => blog.likes === maxLikes)[0]

  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    
    return {}

  } else {

    const authors = blogs.map(blog => blog.author)
    const countedAuthors = authors.reduce((allAuthors, author) => {
      allAuthors[author] ??= 0;
      allAuthors[author]++;

      return allAuthors;
    }, {})
    const authorWithMostBlogs = Object.keys(countedAuthors).reduce((a, b) => countedAuthors[a] > countedAuthors[b] ? a : b)
    
    return {
      author: authorWithMostBlogs,
      blogs: countedAuthors[authorWithMostBlogs]
    }

  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {

    return {}

  } else {

    const output = _(blogs)
                    .groupBy('author')
                    .map((objs, key) => ({
                        'author': key,
                        'likes': _.sumBy(objs, 'likes')
                    }))
                    .sortBy('likes')
                    .value()

    const mostLiked = output[output.length - 1]

    return mostLiked
    
  }

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }