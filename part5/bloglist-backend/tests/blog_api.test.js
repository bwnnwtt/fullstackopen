const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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


beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    username: "tester",
    name: "tester",
    password: "password"
  }

  await api
          .post('/api/users')
          .send(user)
          .set("Accept","application/json")
          .expect("Content-Type", /application\/json/)
})

beforeEach(async () => {
  const loginUser = {
    username: "tester",
    password: "password"
  }

  const loggedUser = await api
    .post("/api/login")
    .send(loginUser)
    .set("Accept","application/json")
    .expect("Content-Type", /application\/json/)

  await Blog.deleteMany({})

  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    
  await api
    .post('/api/blogs')
    .send(initialBlogs[1])
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
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
  const loginUser = {
    username: "tester",
    password: "password"
  }

  const loggedUser = await api
    .post("/api/login")
    .send(loginUser)
    .set("Accept","application/json")
    .expect("Content-Type", /application\/json/)

  const newBlog = {
    title: "my new blog post",
    author: "pjj",
    url: "www.github.com/pjj93/test",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

})

test('like property is 0 by default', async () => {
  const loginUser = {
    username: "tester",
    password: "password"
  }
  
  const loggedUser = await api
    .post("/api/login")
    .send(loginUser)
    .set("Accept","application/json")
    .expect("Content-Type", /application\/json/)

  const newBlog = {
    title: "no likes",
    author: "pjj93",
    url: "www.dummyurl.com/blog/posts/nolikes"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.id === 0)

})

test('POST request returns 400 on missing properties', async () => {
  const loginUser = {
    username: "tester",
    password: "password"
  }
  
  const loggedUser = await api
    .post("/api/login")
    .send(loginUser)
    .set("Accept","application/json")
    .expect("Content-Type", /application\/json/)

  const newBlog = {}

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .expect(400)
})

test('DELETE a resource by id', async () => {
  const loginUser = {
    username: "tester",
    password: "password"
  }
  
  const loggedUser = await api
    .post("/api/login")
    .send(loginUser)
    .set("Accept","application/json")
    .expect("Content-Type", /application\/json/)

  const response = await api.get('/api/blogs')

  const id = response.body[0].id

  await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", `Bearer ${loggedUser.body.token}`)

  const response2 = await api.get('/api/blogs')

  expect(response2.body).toHaveLength(initialBlogs.length - 1)
})

test('UPDATE a resouce by id', async () => {
  const response = await api.get('/api/blogs')

  const id = response.body[0].id

  const updatedBlog = {
    title: response.body[0].title,
    author: response.body[0].author,
    url: response.body[0].url,
    likes: 999
  }

  await api.put(`/api/blogs/${id}`).send(updatedBlog)

  const response2 = await api.get('/api/blogs')

  const blog = response2.body.find(blog => blog.id === id)

  expect(blog.likes).toEqual(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})