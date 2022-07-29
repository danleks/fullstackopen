const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const duplicateUser = await User.findOne({ username: body.username })
  if (duplicateUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  if (!(body.username && body.password)) {
    return response.status(400).json({ error: 'username and password should be provided' })
  }

  if (body.username.split('').length < 3 || body.password.split('').length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 chars long' })
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(body.password, salt)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter