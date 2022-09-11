const redisDB = require('redis')

const redisClient = redisDB.createClient({})

redisClient.connect()
redisClient.on('connect', () => console.log('connect to redis'))
redisClient.on('ready', () =>
  console.log('Connected to redis and ready to use')
)
redisClient.on('error', () => console.log('Redis Error', err.message))
redisClient.on('end', () => console.log('Disconnected from redis'))

module.exports = redisClient
