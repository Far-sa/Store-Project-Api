//? Create Schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/sign in
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/sign in
 *                  code:
 *                      type: integer
 *                      description: revived code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */

//? Get OTP
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [UserAuth(AdminPanel)]
 *          summary: login user in user panel with phone number
 *          description: one time password(OTP) login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: Internal Server Error
 */

//? Check OTP
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags : [UserAuth(AdminPanel)]
 *          summary: check-otp value in user controller
 *          description: check otp with mobile code and expires date
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: Internal Server Error
 */

//? POST REFRESH-TOKEN
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [UserAuth(AdminPanel)]
 *          summary: send refresh token for get new token and refresh token
 *          description : fresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description : success
 */
