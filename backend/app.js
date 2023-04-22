/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require('express')
const app = express()
require('express-async-errors')

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

mongoose.connect(config.MONGO_URL)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
