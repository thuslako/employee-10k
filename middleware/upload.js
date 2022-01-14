const multer = require('multer')
const grid = require('multer-gridfs-storage')

const storage = new grid({
 url : process.env.MDB_URI, 
 file: async (req,file) => {
  //  set image format and handle preupload checks 
 }
})

module.exports = storage