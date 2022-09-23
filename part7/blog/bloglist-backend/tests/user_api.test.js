const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('invalid users are not created', () => {

  test('username is less than 3 characters', async () => {
    const invalidUser = {
      username: "pj",
      name: "peejayjay",
      password: "qwerty"
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      
    expect(response.body.error).toBeDefined();

    const response2 = await api.get(`/api/users/${invalidUser.username}`)

    expect(response2.body).toBeNull()
  })

  test('password is less than 3 characters', async () => {
    const invalidUser = {
      username: "pj",
      name: "peejayjay",
      password: "qw"
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      
    expect(response.body.error).toBeDefined();
  })

  test('username is not given', async () => {
    const invalidUser = {
      name: "peejayjay",
      password: "qwerty"
    }

    const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)
    
    expect(response.body.error).toBeDefined();
  })

  test('password is not given', async () => {
    const invalidUser = {
      username: "pjj93",
      name: "peejayjay"
    }

    const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)
    
    expect(response.body.error).toBeDefined();
  })

})