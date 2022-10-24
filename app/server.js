const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const createError = require('http-errors')
const path = require('path')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
//const bodyParser = require('body-parser')

module.exports = class Application {
  #app = express()
  #PORT
  #DB_URI

  constructor (PORT, DB_URI) {
    this.#PORT = PORT
    this.#DB_URI = DB_URI
    this.configureApplication()
    this.initRedis()
    this.connectDatabase()
    this.createServer()
    this.createRoutes()
    this.errorHandler()
  }

  configureApplication () {
    this.#app.use(cors())
    this.#app.use(morgan('dev'))
    this.#app.use(express.json())
    //this.#app.use(bodyParser.urlencoded({ extended: false }))
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(express.static(path.join(__dirname, '..', 'public')))
    this.#app.use(
      '/api-doc',
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: '3.0.0',
            info: {
              title: 'I-paint',
              version: '1.0.0',
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
                url: 'http://localhost:5000'
              },
              {
                url: 'http://localhost:4000'
              }
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT'
                }
              }
            },
            security: [{ BearerAuth: [] }]
          },
          apis: ['./app/routes/**/*.js']
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
  initRedis () {
    require('./utils/redis')
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
