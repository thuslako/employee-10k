const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const linkMDB = require('./config/mongodb')
dotenv.config({path: './config/.env'})

linkMDB()

const app = express()

if(process.env.NODE_ENV === 'dev') app.use(morgan('dev'))

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))