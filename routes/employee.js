
const express = require("express");
const router = express.Router();
const fs = require('fs')
const upload = require('../middleware/upload')
const mongoose = require('mongoose')

const employee = require('../model/employee');

router.get('/', async(req,res,next)=>{
  await employee.find().select('first_name last_name bio avatar').exec()
  .then(result=>{
    res.status(200).json({employees: result})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({error: 'no employee found'})
  })

})


router.post('/', upload, async(req, res,next) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: 'uploads'
  });
  const _employee = new employee({
    _id: Math.floor(Math.random() * 100),
    first_name: req.body.fname,
    last_name: req.body.lname,
    bio: req.body.bio,
    avatar: req.file.filename
  })
  await _employee.save()
  .then( async (result) =>{
    res.status(200).json({ 'msg': `New employee`, result: result })
    try {
      const filename = result.avatar
      await bucket.openDownloadStreamByName(filename).
      pipe(fs.createWriteStream(`${__dirname}/../uploads/${filename}`)).
      on('error', function (error) {
        console.log("error" + error);
        res.status(404).json({
            msg: error.message
        });
      }).
      on('finish', function () {
          console.log('done!');
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({error: 'failed to load image'})
    }
    
  })
  .catch(error=>{
    console.error(error)
    res.status(400).json({error:'you must select a file.'})
  })
})

router.patch('/:id/avatar', upload, async(req, res,next) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: 'uploads'
  });
  if (req.file === undefined)  res.status(400).json({error:'you must select a file.'});
  await employee.findOneAndUpdate({_id: req.params.id},{ avatar: req.file.filename}).exec()
  .then(async (result) =>{
    const filename = result.avatar
    await bucket.openDownloadStreamByName(filename).
      pipe(fs.createWriteStream(`${__dirname}/../uploads/${filename}`)).
      on('error', function (error) {
        console.log("error" + error);
        res.status(404).json({
            msg: error.message
        });
      }).
      on('finish', function () {
          console.log('done!');
      });
     res.status(200).json(result);
  })
  .catch(error=>{
    console.error(error)
    res.status(400).json({error:'you must select a file.'})
  })
})

router.delete('/:id/avatar/:file', async(req, res,next) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: 'uploads'
  });
  const filename = req.params.file
  const file = await bucket.find({ filename  }).toArray()

  if(file.length < 1) res.status(404).json({msg: 'file not found'})
  
  bucket.delete(file[0]._id,async (error,result)=>{
    if(error) res.status(400).json({msg: 'Server error, try again'})
    await employee.findOneAndUpdate({_id: req.params.id},{ avatar: ""}).exec()
    .then(status =>{
      res.status(200).json({msg: status })
    })
    .catch(error =>{
      console.error(error)
      res.status(500).json({error: 'failed to delete avatar' })
    })
  })
})

router.get('/:id', async (req, res,next) => {
  await employee.findOne({_id: req.params.id}).select('first_name last_name bio avatar').exec()
  .then(result =>{
    res.status(200).json(result)
  })
  .catch(error =>{
    console.error(error)
    res.status(500).json({error: 'no employee found'})
  })

})

module.exports = router
