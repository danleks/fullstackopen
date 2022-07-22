const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if(!request.user.id) {
        response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(request.user.id)

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    }
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true, context: 'query'})
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const {user} = await Blog.findById(request.params.id)

    if (!user) {
        response.status(401).json({error: 'unknown user'})
    }

    if (!(request.token && user.toString() === request.user.id)) {
        response.status(401).json({error: 'forbidden'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// for danleks: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmxla3MiLCJpZCI6IjYyZDk3NGRkZjYxYmY0YmNkN2JkMWJjZSIsImlhdCI6MTY1ODQ4ODQ0NSwiZXhwIjoxNjU4NDkyMDQ1fQ.zDuYlkpo-NyaLKzVghEV92y1NdhyAJes_Jr2CPZ8P5k

// for tommy: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYyZGE4OWZjZmYzZmVlZWVkN2ZlYThjNyIsImlhdCI6MTY1ODQ4OTM3MiwiZXhwIjoxNjU4NDkyOTcyfQ.n0dvvlOoe9Qez1dzCtX5rDICf5jLyzNjq-OgPULBrls
module.exports = blogsRouter