const express = require('express')
const prisma = require('@prisma/client')
const createError = require('http-errors')
const { create } = require("@hapi/joi/lib/ref");

const router = express.Router()

/**
 * @swagger
 *  /category/list:
 *      get:
 *          tags: [Prisma(Api)]
 *          summary: get list of blogs with postgreSQL and prisma
 *          responses:
 *              200:
 *                  description: success
 */

router.get('/list', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({})
    return res.status(200).json({
      data: {
        statusCode: 200,
        categories
      }
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 *  /category/list/{id}:
 *      get:
 *          tags: [Prisma(Api)]
 *          summary: delete category by ID with postgreSQL and prisma
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required : true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

router.get('/list/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: { blogs: true }
    })
    return res.status(200).json({
      data: {
        statusCode: 200,
        category
      }
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 *  /category/remove/{id}:
 *      delete:
 *          tags: [Prisma(Api)]
 *          summary: delete category by ID with postgreSQL and prisma
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required : true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

router.delete('/remove/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await findCategoryWithId(id)
    const category = await prisma.category.delete({
      where: { id: Number(id) }
    })
    if (!category)
      throw createError.InternalServerError('Deleting category failed')
    return res.status(200).json({
      data: {
        statusCode: 200,
        message: 'Category has been deleted successfully',
        category
      }
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 *  /category/add:
 *      post:
 *          tags: [Prisma(Api)]
 *          summary: create new category with postgreSQL and prisma
 *          parameters:
 *              -   in: formData
 *                  name: name
 *                  required : true
 *                  type: string
 *          responses:
 *              201:
 *                  description: created
 */

router.post('/add', async (req, res, next) => {
  try {
    const { name } = req.body
    const category = await prisma.category.create({
      data: { name }
    })
    if (!category)
      throw createError.InternalServerError('Adding category failed')

    return res.status(201).json({
      data: {
        statusCode: 201,
        message: 'category added successfully',
        category
      }
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 *  /category/update/{id}:
 *      put:
 *          tags: [Prisma(Api)]
 *          summary: updated a category by ID with postgreSQL and prisma
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: name
 *                  required : true
 *                  type: string
 *          responses:
 *              200:
 *                  description: created
 */

router.put('/update/:id', async (req, res, next) => {
  try {
    const { name } = req.body
    const { id } = req.params
    await findCategoryWithId(Number(id))
    // const category = await prisma.category.upsert({
    //     where : {id : Number(id)},
    //     create : {name, id : Number(id)},
    //     update : {name}
    // })
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }
    })
    if (!category)
      throw createError.InternalServerError(
        'adding or updating category failed'
      )

    return res.status(200).json({
      data: {
        statusCode: 200,
        message: 'category updated successfully',
        category
      }
    })
  } catch (error) {
    next(error)
  }
})

async function findCategoryWithId (id) {
  const categoryExist = await prisma.category.findUnique({
    where: { id: Number(id) }
  })
  if (!categoryExist) throw createError.NotFound('category not found')
  return categoryExist
}
module.exports = router
