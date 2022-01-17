const path = require('path')
const util = require("util")
const crypto = require('crypto')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')

const storage = new GridFsStorage({
  url: process.env.MDB_URI,
  cache: true,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(8, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const middleware = multer({ storage }).single('avatar')
const upload = util.promisify(middleware)
module.exports = upload