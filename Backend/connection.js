const mongoose = require("mongoose");

async function conectionDB(){
 try {
  const res = await mongoose.connect(process.env.MONGODB_URI)
  console.log(`Database connection Succesful with response ${res.toString()}`)
 } catch (e) {
  console.log('Database Connection failed' + e.message)
 }
}

module.exports=conectionDB