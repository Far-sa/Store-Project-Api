const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const createError = require('http-errors')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

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
    this.#app.use(morgan('dev'))
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(express.static(path.join(__dirname, '..', 'public')))
    this.#app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJsDoc({
          definition: {
            info: {
              title: 'I-paint',
              version: '1.1.0',
              description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
              license: {
                name: 'MIT'
              },
              contact: {
                name: 'Mr puppet',
                url: 'Far-sa github',
                email: 'info@email.com'
              }
            },
            servers: [
              {
                url: 'http://localhost:4000'
              }
            ]
          },
          apis: ['./routes/router.js']
        }),
        { explorer: true }
      )
    )
  }

  connectDatabase () {
    mongoose.connect(this.#DB_URI, error => {
      if (!error) return console.log('Connected to MongoDB')
      return console.log(error.message)
    })
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      process.exit(0)
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
      next(createError.NotFound('Page you are looking for not found'))
    })
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError()
      const statusCode = error.status || serverError.status
      const message = error.message || serverError.message
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message
        }
      })
    })
  }
}
