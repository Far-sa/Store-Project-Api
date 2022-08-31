const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

module.exports = class Application {
  #app = express()
  #PORT
  #DB_URI

  constructor (PORT, DB_URI) {
    this.#PORT = PORT
    this.#DB_URI = DB_URI
    this.configureApplication()
    this.connectDatabase()
    this.createServer()
    this.createRoutes()
    this.errorHandler()
  }

  configureApplication () {
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(express.static(path.join(__dirname, '..', 'public')))
  }

  connectDatabase () {
    mongoose.connect(this.#DB_URI, error => {
      if (!error) return console.log('Connected to MongoDB')
      return console.log('Database Connection Failed')
    })
  }

  createServer () {
    const http = require('http')
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log('Server is running on > http://localhost:' + this.#PORT)
    })
  }

  configMiddleware () {}
  createRoutes () {
    this.#app.use(require('./routes/router'))
  }

  errorHandler () {
    this.#app.use((req, res, next) => {
      return res.status(400).json({
        statusCode: 404,
        message: 'Page you are looking for does not exist'
      })
    })
    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500
      const message = error.message || 'Internal Server error occurred'
      return res.status(statusCode).json({
        statusCode,
        message
      })
    })
  }
}
