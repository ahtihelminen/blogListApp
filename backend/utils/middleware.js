const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('./config')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')   
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else {
    console.log('authorization header not found')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.method !== 'GET'){
    const decodedToken = jwt.verify(request.token, config.SECRET)
    request.user = await User.findById(decodedToken.id)
  }
  next()
}

const errorHandler = async (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid or missing token' })
  }
  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler,
}