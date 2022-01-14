const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  //send json list of all images
})

router.post('/image', (req, res) => {
  //upload new image
})

router.delete('/:fileName', (req, res) => {
  //delete selected image
})


module.exports = router
