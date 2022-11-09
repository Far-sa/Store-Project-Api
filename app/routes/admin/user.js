const {
  UserController
} = require('../../controller/admin/user/user.controller')

const router = require('express').Router()

router.get('/list', UserController.getUsers)
module.exports = router
