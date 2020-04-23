import path from 'path'
import multer from 'multer'

const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, file, callback) => {
      return callback(null, file.originalname)
    },
  }),
})

export default upload
