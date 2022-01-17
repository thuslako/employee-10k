
const mongoose = require('mongoose')
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} 
module.exports = async ()=>{
  try {
      const connectionParams = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      };
      await mongoose.connect(process.env.MDB_URI, connectionParams);
      console.log("connected to database");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};



  