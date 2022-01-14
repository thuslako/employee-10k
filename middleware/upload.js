const multer = require('multer')
const grid = require('multer-gridfs-storage')
const crypto = require('crypto')

const storage = new grid({
 url : process.env.MDB_URI, 
 cache: true,
 file: (req,file) => {
   return new Promise((resolve, reject)=>{
      crypto.randomBytes(8, (error, buffer) =>{
        if(error) return reject(error)
        const encryptedName = `${buffer.toString('hex')}-${Date.now()}`
        resolve({
          fileName: encryptedName,
          bucketName: 'uploads'
        })
      })
   })
 }
})

module.exports = multer({storage})