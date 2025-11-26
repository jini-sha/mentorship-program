
const mongoose = require('mongoose');
connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
console.log("Connected Successfully to DB")
  }catch(error){
    console.log("Error in DB connection", error);
  }}
module.exports = connectDB;