const router = require('express').Router()

const {
  UserAuthController
} = require('../../controller/users/auth/auth.controller')

//@ Desc Register
//@ Route POST /user/register
router.post('/register')

//@ Desc Login
//@ Route POST /user/login
router.post('/login', UserAuthController.login)

module.exports = router
