const express = require('express')
const redisClient = require('../utils/redis')

const router = express.Router()

//* Redis Test
;(async () => {
  await redisClient.set('key', 'value')
  const value = await redisClient.get('key')
  console.log(value)
})()

router.use('/user', require('./users/auth'))
router.use('/developer', require('./developer.routes'))
router.use('/', require('./api/index'))

module.exports = router
