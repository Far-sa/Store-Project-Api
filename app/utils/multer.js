const multer = require('multer')
const path = require('path')
const fs = require('fs')
const createHttpError = require('http-errors')

//* make a default directory
const createRoute = req => {
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = date.getMonth().toString()
  const day = date.getDate().toString()
  const directory = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    'blogs',
    year,
    month,
    day
  )
  req.body.fileUploadPath = path.join('uploads', 'blogs', year, month, day)
  fs.mkdirSync(directory, { recursive: true })
  return directory
}

//* multer CF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req)
      return cb(null, filePath)
    }
    return null, null
  },
  filename: (req, file, cb) => {
    if (file?.originalname) {
      const ext = path.extname(file.originalname)
      const fileName = String(new Date().getTime() + ext)
      req.body.filename = fileName
      return cb(null, fileName)
    }
    cb(null, null)
  }
})

//* options
function fileFilter (req, file, cb) {
  const ext = path.extname(file.originalname)
  const mimType = ['.jpeg', '.jpg', '.png', '.webp', '.gif']
  if (mimType.includes(ext)) {
    return cb(null, true)
  }
  return cb(
    createHttpError.BadRequest('Please select an image in correct form')
  )
}
function videoFileFilter (req, file, cb) {
  const ext = path.extname(file.originalname)
  const mimType = ['.mp4', '.mov', '.mkv', '.mpg', 'avi']
  if (mimType.includes(ext)) {
    return cb(null, true)
  }
  return cb(createHttpError.BadRequest('Please select a correct form of video'))
}

const imageMaxSize = 1 * 1000 * 1000
const videoMaxSize = 300 * 1000 * 1000 // 300MB

const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: imageMaxSize }
})
const uploadVideo = multer({
  storage,
  videoFileFilter,
  limits: { fileSize: videoMaxSize }
})

module.exports = { uploadFile, uploadVideo }
