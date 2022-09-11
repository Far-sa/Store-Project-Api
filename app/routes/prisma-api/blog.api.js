const express = require('express')
const prisma = require('@prisma/client')

const router = express.Router()

/**
 * @swagger
 *    /blogs/list:
 *       get :
 *           tags: [Prisma(Api)]
 *           summary: Get list of blogs with postgreSQL and Prisma
 *           responses:
 *                 200:
 *                     description: success
 */

router.get('/list', async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({ include: { category: true } })
    return res.status(200).json({
      data: {
        statusCode: 200,
        blogs
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
