const router = require('express').Router()

const {
  UserAuthController
} = require('../../controller/users/auth/auth.controller')
const { setHeaders } = require('../../middleware/Cors')

router.post('/get-otp', setHeaders, UserAuthController.getOTP)
router.post('/check-otp', setHeaders, UserAuthController.checkOtp)
router.post('/refresh-token', UserAuthController.refreshToken)

module.exports = router
