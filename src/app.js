var express = require('express')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var app = express()

// Server Config
app.use(methodOverride('X-HTTP-Method'))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('X-Method-Override'))
app.use(methodOverride('_method'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (request, response, next) {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' })
    response.end('')
  } else {
    next()
  }
})

// Router
app.use('/', require('./routes'))

// Error Handling
app.use(function (request, response, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})
app.use(function (err, request, response) {
  console.log(err.stack)
  response.status(err.status || 500).json({ err: err.message })
})

// Server Listener
module.exports = app
