const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
require('express-async-errors');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url is missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(400).json({ error: 'user is not blog creator' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    user: body.user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedNote);
});

blogsRouter.post(
  '/:id/comments',
  userExtractor,
  async (request, response, next) => {
    console.log('id', request.params.id);
    console.log('comments', request.body.comment);

    if (request.body.comment) {
      const currentBlog = await Blog.findById(request.params.id);
      currentBlog.comments = currentBlog.comments.concat(request.body.comment);
      await currentBlog.save();
      response.status(200).json(currentBlog);
    } else {
      response.status(400).send({ error: 'Comment is missing' });
    }
  }
);

module.exports = blogsRouter;
