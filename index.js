const Application = require('./app/server')
const dotenv = require('dotenv')

dotenv.config()

new Application(process.env.PORT, process.env.MONGO_URI)
