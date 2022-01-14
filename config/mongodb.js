
const mongoose = require('mongoose')

const linkMDB = async ()=>{
  try {
    const  access = await mongoose.connect(process.env.MDB_URI) 
    console.log(`|connection created|> ${access.connection.host} <|`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = linkMDB