const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "my first post",
    author: "pjj93",
    url: "www.dummyurl.com/blog/posts/1",
    likes: 69
  },
  {
    title: "my second post",
    author: "pjj93",
    url: "www.dummyurl.com/blogs/posts/2",
    likes: 420
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('GET request returns correct number of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  expect(response.body).toHaveLength(initialBlogs.length)
    
})

test('id property in blog exists', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].id).toBeDefined();
})

test('POST request creates a new blog post', async () => {
  const newBlog = {
    title: "my new blog post",
    author: "pjj",
    url: "www.github.com/pjj93/test",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

})

test('like property is 0 by default', async () => {
  const newBlog = {
    title: "no likes",
    author: "pjj93",
    url: "www.dummyurl.com/blog/posts/nolikes"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.id === 0)

})

test('POST request returns 400 on missing properties', async () => {
  const newBlog = {}

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})