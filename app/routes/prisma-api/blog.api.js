const express = require('express')
const prisma = require('@prisma/client')
const createError = require('http-errors')
const { id } = require('@hapi/joi/lib/base')

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

/**
 * @swagger
 *  /blogs/add:
 *      post:
 *          summary: upsert blog with prisma
 *          tags: [Prisma(Api)]
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: category_id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: id
 *                  type: string
 *                  required: false
 *          responses:
 *              201:
 *                  description: success || created
 */
router.post('/add', async (req, res, next) => {
  try {
    const { id } = req.body
    const data = req.body
    Object.keys(data).forEach(key => {
      if (typeof data[key] == 'string') data[key].trim()
      if ([undefined, null, 0, '', ' ', '0'].includes(data[key]))
        delete data[key]
      if (key == 'id') delete data[key]
    })
    // const blog = await prisma.blog.upsert({
    //     where : {id : Number(id)},
    //     create : {title, short_text, text, category_id : parseInt(category_id),updatedAt : Date.now()},
    //     update : {...data}
    // })
    if (id) await updateBlog(id, data)
    else await createBlog(req.body)
    return res.status(201).json({
      data: {
        status: 201,
        message: 'Updated blog successfully.'
      }
    })
  } catch (error) {
    next(error)
  }
})

async function createBlog (data) {
  const { title, short_text, text, category_id } = data
  const blog = await prisma.blog.create({
    data: {
      title,
      short_text,
      text,
      category_id: parseInt(category_id)
    }
  })
  if (!blog) throw createError.InternalServerError(' Blog created  failed  ')
}
async function updateBlog (id, data) {
  const blog = await prisma.blog.update({
    where: { id: Number(id) },
    data: { ...data }
  })
  if (!blog) throw createError.InternalServerError('Update blog failed')
}
module.exports = {
  blogApiPrisma: router
}

module.exports = router
