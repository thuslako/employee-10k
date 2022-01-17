
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' })

const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const employeeRouter = require('./routes/employee')
const connection = require('./config/mongodb')
connection()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(cors());

app.use('/employee',employeeRouter)
app.use('/*',(req,res,next)=>{
  res.status('404').send('Nothing to see here. Good day!')
})

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))